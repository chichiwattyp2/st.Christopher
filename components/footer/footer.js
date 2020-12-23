const FooterContent = `
  <style>
    #footer{
      padding: 2em 12vw;
    }

    .lead {
      font-family: ClobberGroteskW01-Medium;
      font-style: normal;
      font-weight: bold;
      font-size: 1.75em;
      line-height: 140%;
color: #ffffff;
    }

    .buttons > button,
    .buttons > a {
        margin-right: 3.125em;
        cursor: pointer;
    }

    .paragraph {
        font-family: ClobberGroteskW01-Medium;
        max-width: 31.25em;
    }

    /* Buttons */
.primary-button,
.secondary-button,
.passive-button {
  display: inline-block;
  font-family: ClobberGroteskW01-Medium;
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.25em;
  height: 3.5em;
  border: none;
  border: 1px solid #ffffff;
  box-sizing: border-box;

  padding: 1em 1.25em;
  margin: 1.875em 0;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
}

.primary-button:active,
.secondary-button:active,
.passive-button:active {
  transform: translateY(4px);
}

.primary-button {
  background: transparent;
}

.primary-button:hover {
  background: transparent;
}

.secondary-button {
  background: transparent;
}

.secondary-button:hover {
  background: transparent;
}

.passive-button {
  background: transparent;
}

.passive-button:hover {
  background: transparent;
}

.cursor-pointer {
  cursor: pointer;
}

    .buttons > .publish-disabled {
        cursor: default;
        opacity: 0.4;
    }
  </style>

  <div>
    <div id="footer">
    <p class="lead">
      3. Export the project
    </p>

    <p class="paragraph">
      publish your Web App on Github or download the package containing all files and generated code to save it locally.
    </p>

    <div class="buttons">
      <button id="github-publish" class="primary-button publish-disabled">
        Publish on Github
      </button>

      <button id="zip-publish" disabled class="passive-button publish-disabled">
        Download package
      </button>
    </div>
    </div>
  </div>`;

class PageFooter extends HTMLElement {
  shadow = null;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = FooterContent;
  }
}

customElements.define("page-footer", PageFooter);
