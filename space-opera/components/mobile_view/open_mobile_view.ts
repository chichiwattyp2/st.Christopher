/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {GltfModel} from '@google/model-viewer-editing-adapter/lib/main';
import {createSafeObjectUrlFromArrayBuffer} from '@google/model-viewer-editing-adapter/lib/util/create_object_url';
import {customElement, html, internalProperty, query} from 'lit-element';
// @ts-ignore, the qrious package isn't typed
import QRious from 'qrious';

import {reduxStore} from '../../space_opera_base.js';
import {openMobileViewStyles} from '../../styles.css.js';
import {ArConfigState, State} from '../../types.js';
import {getCamera} from '../camera_settings/reducer.js';
import {getConfig} from '../config/reducer.js';
import {ConnectedLitElement} from '../connected_lit_element/connected_lit_element.js';
import {FileModalElement} from '../file_modal/file_modal.js';
import {getHotspots} from '../hotspot_panel/reducer.js';
import {getEdits} from '../materials_panel/reducer.js';
import {getGltfModel, getGltfUrl} from '../model_viewer_preview/reducer.js';
import {dispatchSetIosName} from '../relative_file_paths/reducer.js';
import {MobileModal} from './components/mobile_modal.js';

import {dispatchAr, dispatchArModes, dispatchIosSrc, getArConfig} from './reducer.js';
import {EditorUpdates, envToSession, getPingUrl, getRandomInt, getSessionUrl, gltfToSession, MobilePacket, MobileSession, post, prepareGlbBlob, prepareUSDZ, URLs, usdzToSession} from './types.js';

/**
 * Section for displaying QR Code and other info related for mobile devices.
 * This is the section on the editor under the File Manager.
 */
@customElement('open-mobile-view')
export class OpenMobileView extends ConnectedLitElement {
  static styles = openMobileViewStyles;

  @internalProperty() pipeId = getRandomInt(1e+20);

  @internalProperty() isDeployed = false;
  @internalProperty() isDeployable = false;
  @internalProperty() isSendingData = false;
  @internalProperty() contentHasChanged = false;

  @internalProperty() openedIOS: boolean = false;
  @internalProperty() iosAndNoUsdz = false;
  @query('me-file-modal') fileModal!: FileModalElement;

  @internalProperty() urls: URLs = {gltf: '', env: '', usdz: ''};
  @internalProperty() lastUrlsSent: URLs = {gltf: '', env: '', usdz: ''};
  @internalProperty() gltfModel?: GltfModel;
  @internalProperty() snippet: any = {};
  @internalProperty() lastSnippetSent: any = {};

  @query('mobile-modal') mobileModal!: MobileModal;
  @internalProperty() haveReceivedResponse: boolean = false;

  @internalProperty() arConfig?: ArConfigState;
  @internalProperty() defaultToSceneViewer: boolean = false;

  @internalProperty() sessionList: MobileSession[] = [];
  @internalProperty() mobilePingUrl = getPingUrl(this.pipeId);

  stateChanged(state: State) {
    this.arConfig = getArConfig(state);
    this.gltfModel = getGltfModel(state);
    const gltfURL = getGltfUrl(state);
    if (gltfURL !== undefined) {
      this.isDeployable = true;
    }

    // Update urls with most recent from redux state.
    // If the values are different from this.lastUrlsSent, values are sent when
    // the refresh button is pressed.
    this.urls = {
      gltf: gltfURL,
      env: getConfig(state).environmentImage,
      usdz: this.arConfig.iosSrc
    };

    this.snippet = {
      config: getConfig(state),
      arConfig: this.arConfig,
      camera: getCamera(state),
      hotspots: getHotspots(state),
      edits: getEdits(state),
    };

    this.contentHasChanged = this.getContentHasChanged();
    this.defaultToSceneViewer =
        this.arConfig.arModes === 'scene-viewer webxr quick-look';
    this.iosAndNoUsdz = this.openedIOS && this.arConfig.iosSrc === undefined;
  }

  // True if any content we'd send to the mobile view has changed.
  getContentHasChanged(): boolean {
    return (
        (this.isNewSource(this.urls.usdz, this.lastUrlsSent.usdz) &&
         this.isNewSource(this.urls.gltf, this.lastUrlsSent.gltf)) ||
        this.stateHasChanged() ||
        this.isNewSource(this.urls.env, this.lastUrlsSent.env));
  }

  envIsHdr(): boolean {
    return typeof this.urls.env === 'string' &&
        this.urls.env.substr(this.urls.env.length - 4) === '.hdr';
  }

  editsHaveChanged() {
    if (this.snippet.edits !== undefined &&
        this.lastSnippetSent.edits !== undefined) {
      return JSON.stringify(this.snippet.edits) !==
          JSON.stringify(this.lastSnippetSent.edits);
    }
    return false;
  }

  stateHasChanged() {
    return JSON.stringify(this.snippet) !==
        JSON.stringify(this.lastSnippetSent);
  }

  isNewSource(src: string|undefined, lastSrc: string|undefined) {
    return src !== undefined && (src !== lastSrc);
  }

  isNewModel() {
    return this.isNewSource(this.urls.gltf, this.lastUrlsSent.gltf) ||
        this.editsHaveChanged();
  }

  // Used for non-stale sessions, to only send updated content.
  getUpdatedContent(): EditorUpdates {
    return {
      gltfChanged: this.isNewModel(), stateChanged: this.stateHasChanged(),
          envChanged: this.isNewSource(this.urls.env, this.lastUrlsSent.env),
          envIsHdr: this.envIsHdr(), gltfId: getRandomInt(1e+20),
          usdzId: getRandomInt(1e+20),
          iosChanged: this.isNewSource(this.urls.usdz, this.lastUrlsSent.usdz)
    }
  }

  // If a session didn't received content last time (isStale), we'll force
  // everything to update.
  getStaleContent(): EditorUpdates {
    return {
      gltfChanged: true, stateChanged: true,
          envChanged: this.urls.env !== undefined, envIsHdr: this.envIsHdr(),
          gltfId: getRandomInt(1e+20), usdzId: getRandomInt(1e+20),
          iosChanged: this.urls.usdz !== undefined
    }
  }

  // For a single session, POST all of the relevant content that needs to be
  // updated for that session.
  // A session will remain stale if any of the POSTs fail. A stale session will
  // be forced to send all of the content the next time the refresh button is
  // clicked.
  async sendSessionContent(
      session: MobileSession, updatedContent: EditorUpdates,
      usdzBlob: Blob|undefined, gltfBlob: Blob|undefined,
      envBlob: Blob|undefined) {
    if (session.isStale) {
      updatedContent = this.getStaleContent();
    }
    session.isStale = true;

    const packet: MobilePacket = {updatedContent: updatedContent};
    if (updatedContent.stateChanged) {
      packet.snippet = this.snippet;
    }

    await post(JSON.stringify(packet), getSessionUrl(this.pipeId, session.id));

    if (session.os === 'iOS' && updatedContent.iosChanged && usdzBlob) {
      await post(
          usdzBlob,
          usdzToSession(this.pipeId, session.id, updatedContent.usdzId));
    }

    if (updatedContent.gltfChanged && gltfBlob) {
      await post(
          gltfBlob,
          gltfToSession(this.pipeId, session.id, updatedContent.gltfId));
    }

    if (updatedContent.envChanged && envBlob) {
      await post(envBlob, envToSession(this.pipeId, session.id));
    }

    // The isStale flag will stay true if all of the requests are not delivered.
    session.isStale = false;
  }

  // Send any state, model, or environment iamge that has been updated since the
  // last refresh.
  // TODO: Now that the posts are asynchronous, need to find a new way to deal
  // with knowing when isSendingData should be set to false.
  async postInfo() {
    this.isSendingData = true;
    const updatedContent = this.getUpdatedContent();
    const staleContent = this.getStaleContent();

    // If any of the sessions are stale, we want to prepare the relavent blobs
    // to POST before we loop through the sessions
    let haveStale = false;
    for (let session of this.sessionList) {
      haveStale = haveStale || session.isStale;
    }

    // Blobs will be defined if their content has changed since the last
    // refresh, or if any session is stale -- a stale session requires us to
    // send all content to that session.
    const usdzBlob =
        (updatedContent.iosChanged || (haveStale && staleContent.iosChanged)) ?
        await prepareUSDZ(this.urls.usdz!) :
        undefined;

    const gltfBlob = (updatedContent.gltfChanged ||
                      (haveStale && staleContent.gltfChanged)) ?
        await prepareGlbBlob(this.gltfModel!) :
        undefined;

    let envBlob = undefined;
    if (updatedContent.envChanged || (haveStale && staleContent.envChanged)) {
      const response = await fetch(this.urls.env!);
      if (!response.ok) {
        throw new Error(`Failed to fetch url: ${this.urls.env!}`);
      }
      envBlob = await response.blob();
    }

    // Iterate through the list of active mobile sessions, and allow them to
    // post their information asynchronously.
    for (let session of this.sessionList) {
      this.sendSessionContent(
          session, {...updatedContent}, usdzBlob, gltfBlob, envBlob);
    }

    this.lastSnippetSent = {...this.snippet};
    this.lastUrlsSent['env'] = this.urls['env'];
    this.lastUrlsSent['usdz'] = this.urls['usdz'];
    this.lastUrlsSent['gltf'] = this.urls['gltf'];

    this.contentHasChanged = this.getContentHasChanged();
    this.isSendingData = false;
  }

  // update haveReceivedResponse when a ping was received from the mobile view
  async waitForPing() {
    const response = await fetch(this.mobilePingUrl);
    if (response.ok) {
      const json: MobileSession = await response.json();
      this.haveReceivedResponse = true;
      this.sessionList.push(json);
      if (json.os === 'iOS') {
        this.openedIOS = true;
      }
      this.postInfo();
      return true;
    }
    return false;
  }

  // If a ping was received, then a new page has been opened or a page was
  // refreshed.
  async pingLoop() {
    await this.waitForPing();
    this.pingLoop();
  }

  openModal() {
    this.mobileModal.open();
  }

  // The editor is waiting for at least one mobile session to ping back.
  async onDeploy() {
    this.openModal();
    const wasPinged = await this.waitForPing();
    if (wasPinged) {
      this.pingLoop();
    } else {
      this.onDeploy();
    }
  }

  // Initialize AR values and start deploy loop
  async onInitialDeploy() {
    this.isDeployed = true;
    reduxStore.dispatch(dispatchAr(true));
    reduxStore.dispatch(dispatchArModes('webxr scene-viewer quick-look'));
    await this.onDeploy();
  }

  onEnableARChange(isEnabled: boolean) {
    reduxStore.dispatch(dispatchAr(isEnabled));
  }

  onSelectArMode(isSceneViewer: boolean) {
    this.defaultToSceneViewer = isSceneViewer;
    if (this.defaultToSceneViewer) {
      reduxStore.dispatch(dispatchArModes('scene-viewer webxr quick-look'));
    } else {
      reduxStore.dispatch(dispatchArModes('webxr scene-viewer quick-look'));
    }
  }

  async onUploadUSDZ() {
    const files: any = await this.fileModal.open();
    if (!files) {
      /// The user canceled the previous upload
      return;
    }
    const arrayBuffer = await files[0].arrayBuffer();
    reduxStore.dispatch(dispatchSetIosName(files[0].name));
    const url = createSafeObjectUrlFromArrayBuffer(arrayBuffer).unsafeUrl;
    reduxStore.dispatch(dispatchIosSrc(url));
  }

  render() {
    return html`
    <mobile-expandable-section 
      .isDeployed=${this.isDeployed} 
      .isDeployable=${this.isDeployable}
      .onInitialDeploy=${this.onInitialDeploy.bind(this)}
      .haveReceivedResponse=${this.haveReceivedResponse}
      .isSendingData=${this.isSendingData}
      .contentHasChanged=${this.contentHasChanged}
      .openModal=${this.openModal.bind(this)}
      .postInfo=${this.postInfo.bind(this)}
      .defaultToSceneViewer=${this.defaultToSceneViewer}
      .onSelectArMode=${this.onSelectArMode.bind(this)}
      .arConfig=${this.arConfig}
      .onEnableARChange=${this.onEnableARChange.bind(this)}
      .iosAndNoUsdz=${this.iosAndNoUsdz}
      .onUploadUSDZ=${this.onUploadUSDZ.bind(this)}
    >
    </mobile-expandable-section>
    <me-file-modal accept=".usdz"></me-file-modal>
    <mobile-modal .pipeId=${this.pipeId}></mobile-modal>
    <div style="margin-bottom: 40px;"></div>
  `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'open-mobile-view': OpenMobileView;
  }
}
