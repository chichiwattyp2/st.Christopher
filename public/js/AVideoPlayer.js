var AVideoPlayer = function() {
  // Values
  this.duration = 0;
  this.current_progress = 0;
  this.progressWidth = 4;
  this.paused = true;
  this.settingspanel = true;
  // Elements
  this.elProgressBar = null;
  this.elProgressTrack = null;
  this.elProgressFill = null;
  this.elAlertSound = null;
  this.elVideo = null;
  this.elVideoScreen = null;
  this.elControlBack = null;
  this.elControlPlay = null;
  this.elControlVolume = null;
  this.elControlOpen = null;
  this.elControlSettings = null;
  this.elSettingsPanel = null;
  this.elSettingsbutton1b = null;
  this.elSettingsbutton2b = null;
  this.elSettingsbutton3b = null;
  this.elSettingsbutton4b = null;
  this.elSettingsbutton5b = null;
  this.elSettingsbutton6b = null;
  this.elSettingsbutton7b = null;
  this.elSettingsbutton8b = null;
  this.elFlatborder = null;
  // Init
  this._initElements = function() {
    this.elProgressBar = document.getElementById("progress-bar");
    this.elProgressTrack = document.getElementById("progress-bar-track");
    this.elProgressFill = document.getElementById("progress-bar-fill");
    this.elAlertSound = document.getElementById("alert-sound");
    this.elVideo = document.getElementById("video-src");
    this.elVideoScreen = document.getElementById("video-screen");
    this.elControlBack = document.getElementById("control-back");
    this.elControlPlay = document.getElementById("control-play");
    this.elControlVolume = document.getElementById("control-volume");
    this.elControlOpen = document.getElementById("control-open");
    this.elControlSettings = document.getElementById("control-settings");
    this.elSettingsPanel = document.getElementById("settings-panel");
    this.elSettingsbutton1b = document.getElementById("settings-button1b");
    this.elSettingsbutton2b = document.getElementById("settings-button2b");
    this.elSettingsbutton3b = document.getElementById("settings-button3b");
    this.elSettingsbutton4b = document.getElementById("settings-button4b");
    this.elSettingsbutton5b = document.getElementById("settings-button5b");
    this.elSettingsbutton6b = document.getElementById("settings-button6b");
    this.elSettingsbutton7b = document.getElementById("settings-button7b");
    this.elSettingsbutton8b = document.getElementById("settings-button8b");
    this.elFlatborder = document.getElementById("flatborder");

    this.elVideoScreen = document.getElementById("video-screen");
  };

  /*this._determinateProgressWidth = function() {
    this.progressWidth = this.elProgressBar.getAttribute('geometry').width;
  }*/

  /* PROGRESS */
  this.setProgress = function(progress) {
    /*if (this.progressWidth == undefined) {
      this.progressWidth == 4;
    }*/
    var new_progress = this.progressWidth * progress;
    this._setProgressWidth(new_progress);
    var progress_coord = this._getProgressCoord();
    if (progress_coord != undefined) {
      progress_coord.x = -(this.progressWidth - new_progress) / 2;
      this._setProgressCoord(progress_coord);
    }
  };
  this._getProgressCoord = function() {
    return AFRAME.utils.coordinates.parse(
      this.elProgressFill.getAttribute("position")
    );
  };
  this._getProgressWidth = function() {
    return parseFloat(this.elProgressFill.getAttribute("width"));
  };
  this._setProgressCoord = function(coord) {
    this.elProgressFill.setAttribute("position", coord);
  };
  this._setProgressWidth = function(width) {
    this.elProgressFill.setAttribute("width", width);
  };

  /* UI SETTERS */
  this.isProgressBarVisible = function(isVisible) {
    this.elProgressTrack.setAttribute("visible", isVisible);
    this.elProgressFill.setAttribute("visible", isVisible);
  };
  this.isControlVisible = function(isVisible) {
    this.elControlBack.setAttribute("visible", isVisible);
    this.elControlVolume.setAttribute("visible", isVisible);
  };

  this.isSettingVisible = function(isVisible) {
    this.elSettingsPanel.setAttribute("visible", isVisible);
    this.elSettingsbutton1b.setAttribute("visible", isVisible);
    this.elSettingsbutton2b.setAttribute("visible", isVisible);
    this.elSettingsbutton3b.setAttribute("visible", isVisible);
    this.elSettingsbutton4b.setAttribute("visible", isVisible);
    this.elSettingsbutton5b.setAttribute("visible", isVisible);
    this.elSettingsbutton6b.setAttribute("visible", isVisible);
    this.elSettingsbutton7b.setAttribute("visible", isVisible);
    this.elSettingsbutton8b.setAttribute("visible", isVisible);
  };

  function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  // ambilight draw code
  function drawImage(playerid, item) {
    var k = item;
    if (typeof k == "undefined") {
      return;
    }

    try {
      if (playerid.paused || playerid.ended) {
        var totlcheckcanvas = document.getElementById("totlCanvas" + k + "");
        if (totlcheckcanvas) {
          var canvas = document.getElementById("totlCanvas" + k + "");
          var context = canvas.getContext("2d");

          var imageData = context.getImageData(0, 0, 1, 1);
          var data = imageData.data;

          var p1 = context.getImageData(0, 0, 1, 1).data;
          var p2 = context.getImageData(1, 0, 1, 1).data;
          var p3 = context.getImageData(2, 0, 1, 1).data;
          var p4 = context.getImageData(3, 0, 1, 1).data;
          var p5 = context.getImageData(4, 0, 1, 1).data;
          var p6 = context.getImageData(5, 0, 1, 1).data;
          var p7 = context.getImageData(6, 0, 1, 1).data;
          var p8 = context.getImageData(7, 0, 1, 1).data;
          var p9 = context.getImageData(8, 0, 1, 1).data;
          var p10 = context.getImageData(9, 0, 1, 1).data;

          var p11 = context.getImageData(10, 0, 1, 1).data;
          var p12 = context.getImageData(11, 0, 1, 1).data;
          var p13 = context.getImageData(12, 0, 1, 1).data;
          var p14 = context.getImageData(13, 0, 1, 1).data;
          var p15 = context.getImageData(14, 0, 1, 1).data;
          var p16 = context.getImageData(15, 0, 1, 1).data;
          var p17 = context.getImageData(16, 0, 1, 1).data;
          var p18 = context.getImageData(17, 0, 1, 1).data;

          var p19 = context.getImageData(18, 0, 1, 1).data;
          var p20 = context.getImageData(19, 0, 1, 1).data;
          var p21 = context.getImageData(20, 0, 1, 1).data;
          var p22 = context.getImageData(21, 0, 1, 1).data;
          var p23 = context.getImageData(22, 0, 1, 1).data;
          var p24 = context.getImageData(23, 0, 1, 1).data;
          var p25 = context.getImageData(24, 0, 1, 1).data;
          var p26 = context.getImageData(25, 0, 1, 1).data;

          var p27 = context.getImageData(26, 0, 1, 1).data;
          var p28 = context.getImageData(27, 0, 1, 1).data;
          var p29 = context.getImageData(28, 0, 1, 1).data;
          var p30 = context.getImageData(29, 0, 1, 1).data;
          var p31 = context.getImageData(30, 0, 1, 1).data;
          var p32 = context.getImageData(31, 0, 1, 1).data;
          var p33 = context.getImageData(32, 0, 1, 1).data;
          var p34 = context.getImageData(33, 0, 1, 1).data;
          var p35 = context.getImageData(34, 0, 1, 1).data;
          var p36 = context.getImageData(35, 0, 1, 1).data;
          var p37 = context.getImageData(36, 0, 1, 1).data;

          var hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
          var hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
          var hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
          var hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);
          var hex5 = "#" + ("000000" + rgbToHex(p5[0], p5[1], p5[2])).slice(-6);
          var hex6 = "#" + ("000000" + rgbToHex(p6[0], p6[1], p6[2])).slice(-6);
          var hex7 = "#" + ("000000" + rgbToHex(p7[0], p7[1], p7[2])).slice(-6);
          var hex8 = "#" + ("000000" + rgbToHex(p8[0], p8[1], p8[2])).slice(-6);
          var hex9 = "#" + ("000000" + rgbToHex(p9[0], p9[1], p9[2])).slice(-6);
          var hex10 =
            "#" + ("000000" + rgbToHex(p10[0], p10[1], p10[2])).slice(-6);

          var hex11 =
            "#" + ("000000" + rgbToHex(p11[0], p11[1], p11[2])).slice(-6);
          var hex12 =
            "#" + ("000000" + rgbToHex(p12[0], p12[1], p12[2])).slice(-6);
          var hex13 =
            "#" + ("000000" + rgbToHex(p13[0], p13[1], p13[2])).slice(-6);
          var hex14 =
            "#" + ("000000" + rgbToHex(p14[0], p14[1], p14[2])).slice(-6);
          var hex15 =
            "#" + ("000000" + rgbToHex(p15[0], p15[1], p15[2])).slice(-6);
          var hex16 =
            "#" + ("000000" + rgbToHex(p16[0], p16[1], p16[2])).slice(-6);
          var hex17 =
            "#" + ("000000" + rgbToHex(p17[0], p17[1], p17[2])).slice(-6);
          var hex18 =
            "#" + ("000000" + rgbToHex(p18[0], p18[1], p18[2])).slice(-6);

          var hex19 =
            "#" + ("000000" + rgbToHex(p19[0], p19[1], p19[2])).slice(-6);
          var hex20 =
            "#" + ("000000" + rgbToHex(p20[0], p20[1], p20[2])).slice(-6);
          var hex21 =
            "#" + ("000000" + rgbToHex(p21[0], p21[1], p21[2])).slice(-6);
          var hex22 =
            "#" + ("000000" + rgbToHex(p22[0], p22[1], p22[2])).slice(-6);
          var hex23 =
            "#" + ("000000" + rgbToHex(p23[0], p23[1], p23[2])).slice(-6);
          var hex24 =
            "#" + ("000000" + rgbToHex(p24[0], p24[1], p24[2])).slice(-6);
          var hex25 =
            "#" + ("000000" + rgbToHex(p25[0], p25[1], p25[2])).slice(-6);
          var hex26 =
            "#" + ("000000" + rgbToHex(p26[0], p26[1], p26[2])).slice(-6);

          var hex27 =
            "#" + ("000000" + rgbToHex(p27[0], p27[1], p27[2])).slice(-6);
          var hex28 =
            "#" + ("000000" + rgbToHex(p28[0], p28[1], p28[2])).slice(-6);
          var hex29 =
            "#" + ("000000" + rgbToHex(p29[0], p29[1], p29[2])).slice(-6);
          var hex30 =
            "#" + ("000000" + rgbToHex(p30[0], p30[1], p30[2])).slice(-6);
          var hex31 =
            "#" + ("000000" + rgbToHex(p31[0], p31[1], p31[2])).slice(-6);
          var hex32 =
            "#" + ("000000" + rgbToHex(p32[0], p32[1], p32[2])).slice(-6);
          var hex33 =
            "#" + ("000000" + rgbToHex(p33[0], p33[1], p33[2])).slice(-6);
          var hex34 =
            "#" + ("000000" + rgbToHex(p34[0], p34[1], p34[2])).slice(-6);
          var hex35 =
            "#" + ("000000" + rgbToHex(p35[0], p35[1], p35[2])).slice(-6);
          var hex36 =
            "#" + ("000000" + rgbToHex(p36[0], p36[1], p36[2])).slice(-6);
        }

        // ----
        document.getElementById("top1").setAttribute("light", "color", hex1);
        document.getElementById("top2").setAttribute("light", "color", hex2);
        document.getElementById("top3").setAttribute("light", "color", hex3);
        document.getElementById("top4").setAttribute("light", "color", hex4);
        document.getElementById("top5").setAttribute("light", "color", hex5);
        document.getElementById("top6").setAttribute("light", "color", hex6);
        document.getElementById("top7").setAttribute("light", "color", hex7);
        document.getElementById("top8").setAttribute("light", "color", hex8);
        document.getElementById("top9").setAttribute("light", "color", hex9);
        document.getElementById("top10").setAttribute("light", "color", hex10);

        document.getElementById("right1").setAttribute("light", "color", hex11);
        document.getElementById("right2").setAttribute("light", "color", hex12);
        document.getElementById("right3").setAttribute("light", "color", hex13);
        document.getElementById("right4").setAttribute("light", "color", hex14);
        document.getElementById("right5").setAttribute("light", "color", hex15);
        document.getElementById("right6").setAttribute("light", "color", hex16);
        document.getElementById("right7").setAttribute("light", "color", hex17);
        document.getElementById("right8").setAttribute("light", "color", hex18);

        document.getElementById("left1").setAttribute("light", "color", hex19);
        document.getElementById("left2").setAttribute("light", "color", hex20);
        document.getElementById("left3").setAttribute("light", "color", hex21);
        document.getElementById("left4").setAttribute("light", "color", hex22);
        document.getElementById("left5").setAttribute("light", "color", hex23);
        document.getElementById("left6").setAttribute("light", "color", hex24);
        document.getElementById("left7").setAttribute("light", "color", hex25);
        document.getElementById("left8").setAttribute("light", "color", hex26);

        document
          .getElementById("bottom1")
          .setAttribute("light", "color", hex27);
        document
          .getElementById("bottom2")
          .setAttribute("light", "color", hex28);
        document
          .getElementById("bottom3")
          .setAttribute("light", "color", hex29);
        document
          .getElementById("bottom4")
          .setAttribute("light", "color", hex30);
        document
          .getElementById("bottom5")
          .setAttribute("light", "color", hex31);
        document
          .getElementById("bottom6")
          .setAttribute("light", "color", hex32);
        document
          .getElementById("bottom7")
          .setAttribute("light", "color", hex33);
        document
          .getElementById("bottom8")
          .setAttribute("light", "color", hex34);
        document
          .getElementById("bottom9")
          .setAttribute("light", "color", hex35);
        document
          .getElementById("bottom10")
          .setAttribute("light", "color", hex36);

        return false;
      }
    } catch (err) {}

    var totlshowtime = playerid;
    var sourceWidth = totlshowtime.videoWidth;
    var sourceHeight = totlshowtime.videoHeight;

    var totlcheckcanvas = document.getElementById("totlCanvas" + k + "");
    if (totlcheckcanvas) {
    } else {
      var totlnewcanvas = document.createElement("canvas");
      totlnewcanvas.setAttribute("id", "totlCanvas" + k + "");
      totlnewcanvas.width = "36";
      totlnewcanvas.height = "1";
      totlnewcanvas.style.display = "none";
      document.body.appendChild(totlnewcanvas);
    }

    var canvas = document.getElementById("totlCanvas" + k + "");
    var context = canvas.getContext("2d");

    var colorlamp1X = (sourceWidth * 5) / 100; // top
    var colorlamp1Y = (sourceHeight * 2) / 100;
    var colorlamp2X = (sourceWidth * 15) / 100;
    var colorlamp2Y = (sourceHeight * 2) / 100;
    var colorlamp3X = (sourceWidth * 25) / 100;
    var colorlamp3Y = (sourceHeight * 2) / 100;
    var colorlamp4X = (sourceWidth * 35) / 100;
    var colorlamp4Y = (sourceHeight * 2) / 100;
    var colorlamp5X = (sourceWidth * 45) / 100;
    var colorlamp5Y = (sourceHeight * 2) / 100;
    var colorlamp6X = (sourceWidth * 55) / 100;
    var colorlamp6Y = (sourceHeight * 2) / 100;
    var colorlamp7X = (sourceWidth * 65) / 100;
    var colorlamp7Y = (sourceHeight * 2) / 100;
    var colorlamp8X = (sourceWidth * 75) / 100;
    var colorlamp8Y = (sourceHeight * 2) / 100;
    var colorlamp9X = (sourceWidth * 85) / 100;
    var colorlamp9Y = (sourceHeight * 2) / 100;
    var colorlamp10X = (sourceWidth * 95) / 100;
    var colorlamp10Y = (sourceHeight * 2) / 100;

    var colorlamp11X = (sourceWidth * 98) / 100; // right
    var colorlamp11Y = (sourceHeight * 15) / 100;
    var colorlamp12X = (sourceWidth * 98) / 100;
    var colorlamp12Y = (sourceHeight * 25) / 100;
    var colorlamp13X = (sourceWidth * 98) / 100;
    var colorlamp13Y = (sourceHeight * 35) / 100;
    var colorlamp14X = (sourceWidth * 98) / 100;
    var colorlamp14Y = (sourceHeight * 45) / 100;
    var colorlamp15X = (sourceWidth * 98) / 100;
    var colorlamp15Y = (sourceHeight * 55) / 100;
    var colorlamp16X = (sourceWidth * 98) / 100;
    var colorlamp16Y = (sourceHeight * 65) / 100;
    var colorlamp17X = (sourceWidth * 98) / 100;
    var colorlamp17Y = (sourceHeight * 75) / 100;
    var colorlamp18X = (sourceWidth * 98) / 100;
    var colorlamp18Y = (sourceHeight * 85) / 100;

    var colorlamp19X = (sourceWidth * 2) / 100; // left
    var colorlamp19Y = (sourceHeight * 15) / 100;
    var colorlamp20X = (sourceWidth * 2) / 100;
    var colorlamp20Y = (sourceHeight * 25) / 100;
    var colorlamp21X = (sourceWidth * 2) / 100;
    var colorlamp21Y = (sourceHeight * 35) / 100;
    var colorlamp22X = (sourceWidth * 2) / 100;
    var colorlamp22Y = (sourceHeight * 45) / 100;
    var colorlamp23X = (sourceWidth * 2) / 100;
    var colorlamp23Y = (sourceHeight * 55) / 100;
    var colorlamp24X = (sourceWidth * 2) / 100;
    var colorlamp24Y = (sourceHeight * 65) / 100;
    var colorlamp25X = (sourceWidth * 2) / 100;
    var colorlamp25Y = (sourceHeight * 75) / 100;
    var colorlamp26X = (sourceWidth * 2) / 100;
    var colorlamp26Y = (sourceHeight * 85) / 100;

    var colorlamp27X = (sourceWidth * 5) / 100; // bottom
    var colorlamp27Y = (sourceHeight * 98) / 100;
    var colorlamp28X = (sourceWidth * 15) / 100;
    var colorlamp28Y = (sourceHeight * 98) / 100;
    var colorlamp29X = (sourceWidth * 25) / 100;
    var colorlamp29Y = (sourceHeight * 98) / 100;
    var colorlamp30X = (sourceWidth * 35) / 100;
    var colorlamp30Y = (sourceHeight * 98) / 100;
    var colorlamp31X = (sourceWidth * 45) / 100;
    var colorlamp31Y = (sourceHeight * 98) / 100;
    var colorlamp32X = (sourceWidth * 55) / 100;
    var colorlamp32Y = (sourceHeight * 98) / 100;
    var colorlamp33X = (sourceWidth * 65) / 100;
    var colorlamp33Y = (sourceHeight * 98) / 100;
    var colorlamp34X = (sourceWidth * 75) / 100;
    var colorlamp34Y = (sourceHeight * 98) / 100;
    var colorlamp35X = (sourceWidth * 85) / 100;
    var colorlamp35Y = (sourceHeight * 98) / 100;
    var colorlamp36X = (sourceWidth * 95) / 100;
    var colorlamp36Y = (sourceHeight * 98) / 100;

    try {
      context.drawImage(
        totlshowtime,
        colorlamp1X,
        colorlamp1Y,
        1,
        1,
        0,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp2X,
        colorlamp2Y,
        1,
        1,
        1,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp3X,
        colorlamp3Y,
        1,
        1,
        2,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp4X,
        colorlamp4Y,
        1,
        1,
        3,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp5X,
        colorlamp5Y,
        1,
        1,
        4,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp6X,
        colorlamp6Y,
        1,
        1,
        5,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp7X,
        colorlamp7Y,
        1,
        1,
        6,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp8X,
        colorlamp8Y,
        1,
        1,
        7,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp9X,
        colorlamp9Y,
        1,
        1,
        8,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp10X,
        colorlamp10Y,
        1,
        1,
        9,
        0,
        1,
        1
      );

      context.drawImage(
        totlshowtime,
        colorlamp11X,
        colorlamp11Y,
        1,
        1,
        10,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp12X,
        colorlamp12Y,
        1,
        1,
        11,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp13X,
        colorlamp13Y,
        1,
        1,
        12,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp14X,
        colorlamp14Y,
        1,
        1,
        13,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp15X,
        colorlamp15Y,
        1,
        1,
        14,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp16X,
        colorlamp16Y,
        1,
        1,
        15,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp17X,
        colorlamp17Y,
        1,
        1,
        16,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp18X,
        colorlamp18Y,
        1,
        1,
        17,
        0,
        1,
        1
      );

      context.drawImage(
        totlshowtime,
        colorlamp19X,
        colorlamp19Y,
        1,
        1,
        18,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp20X,
        colorlamp20Y,
        1,
        1,
        19,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp21X,
        colorlamp21Y,
        1,
        1,
        20,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp22X,
        colorlamp22Y,
        1,
        1,
        21,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp23X,
        colorlamp23Y,
        1,
        1,
        22,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp24X,
        colorlamp24Y,
        1,
        1,
        23,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp25X,
        colorlamp25Y,
        1,
        1,
        24,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp26X,
        colorlamp26Y,
        1,
        1,
        25,
        0,
        1,
        1
      );

      context.drawImage(
        totlshowtime,
        colorlamp27X,
        colorlamp27Y,
        1,
        1,
        26,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp28X,
        colorlamp28Y,
        1,
        1,
        27,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp29X,
        colorlamp29Y,
        1,
        1,
        28,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp30X,
        colorlamp30Y,
        1,
        1,
        29,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp31X,
        colorlamp31Y,
        1,
        1,
        30,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp32X,
        colorlamp32Y,
        1,
        1,
        31,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp33X,
        colorlamp33Y,
        1,
        1,
        32,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp34X,
        colorlamp34Y,
        1,
        1,
        33,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp35X,
        colorlamp35Y,
        1,
        1,
        34,
        0,
        1,
        1
      );
      context.drawImage(
        totlshowtime,
        colorlamp36X,
        colorlamp36Y,
        1,
        1,
        35,
        0,
        1,
        1
      );

      var imageData = context.getImageData(0, 0, 1, 1);
      var data = imageData.data;

      var p1 = context.getImageData(0, 0, 1, 1).data;
      var p2 = context.getImageData(1, 0, 1, 1).data;
      var p3 = context.getImageData(2, 0, 1, 1).data;
      var p4 = context.getImageData(3, 0, 1, 1).data;
      var p5 = context.getImageData(4, 0, 1, 1).data;
      var p6 = context.getImageData(5, 0, 1, 1).data;
      var p7 = context.getImageData(6, 0, 1, 1).data;
      var p8 = context.getImageData(7, 0, 1, 1).data;
      var p9 = context.getImageData(8, 0, 1, 1).data;
      var p10 = context.getImageData(9, 0, 1, 1).data;

      var p11 = context.getImageData(10, 0, 1, 1).data;
      var p12 = context.getImageData(11, 0, 1, 1).data;
      var p13 = context.getImageData(12, 0, 1, 1).data;
      var p14 = context.getImageData(13, 0, 1, 1).data;
      var p15 = context.getImageData(14, 0, 1, 1).data;
      var p16 = context.getImageData(15, 0, 1, 1).data;
      var p17 = context.getImageData(16, 0, 1, 1).data;
      var p18 = context.getImageData(17, 0, 1, 1).data;

      var p19 = context.getImageData(18, 0, 1, 1).data;
      var p20 = context.getImageData(19, 0, 1, 1).data;
      var p21 = context.getImageData(20, 0, 1, 1).data;
      var p22 = context.getImageData(21, 0, 1, 1).data;
      var p23 = context.getImageData(22, 0, 1, 1).data;
      var p24 = context.getImageData(23, 0, 1, 1).data;
      var p25 = context.getImageData(24, 0, 1, 1).data;
      var p26 = context.getImageData(25, 0, 1, 1).data;

      var p27 = context.getImageData(26, 0, 1, 1).data;
      var p28 = context.getImageData(27, 0, 1, 1).data;
      var p29 = context.getImageData(28, 0, 1, 1).data;
      var p30 = context.getImageData(29, 0, 1, 1).data;
      var p31 = context.getImageData(30, 0, 1, 1).data;
      var p32 = context.getImageData(31, 0, 1, 1).data;
      var p33 = context.getImageData(32, 0, 1, 1).data;
      var p34 = context.getImageData(33, 0, 1, 1).data;
      var p35 = context.getImageData(34, 0, 1, 1).data;
      var p36 = context.getImageData(35, 0, 1, 1).data;

      var hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
      var hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
      var hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
      var hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);
      var hex5 = "#" + ("000000" + rgbToHex(p5[0], p5[1], p5[2])).slice(-6);
      var hex6 = "#" + ("000000" + rgbToHex(p6[0], p6[1], p6[2])).slice(-6);
      var hex7 = "#" + ("000000" + rgbToHex(p7[0], p7[1], p7[2])).slice(-6);
      var hex8 = "#" + ("000000" + rgbToHex(p8[0], p8[1], p8[2])).slice(-6);
      var hex9 = "#" + ("000000" + rgbToHex(p9[0], p9[1], p9[2])).slice(-6);
      var hex10 = "#" + ("000000" + rgbToHex(p10[0], p10[1], p10[2])).slice(-6);

      var hex11 = "#" + ("000000" + rgbToHex(p11[0], p11[1], p11[2])).slice(-6);
      var hex12 = "#" + ("000000" + rgbToHex(p12[0], p12[1], p12[2])).slice(-6);
      var hex13 = "#" + ("000000" + rgbToHex(p13[0], p13[1], p13[2])).slice(-6);
      var hex14 = "#" + ("000000" + rgbToHex(p14[0], p14[1], p14[2])).slice(-6);
      var hex15 = "#" + ("000000" + rgbToHex(p15[0], p15[1], p15[2])).slice(-6);
      var hex16 = "#" + ("000000" + rgbToHex(p16[0], p16[1], p16[2])).slice(-6);
      var hex17 = "#" + ("000000" + rgbToHex(p17[0], p17[1], p17[2])).slice(-6);
      var hex18 = "#" + ("000000" + rgbToHex(p18[0], p18[1], p18[2])).slice(-6);

      var hex19 = "#" + ("000000" + rgbToHex(p19[0], p19[1], p19[2])).slice(-6);
      var hex20 = "#" + ("000000" + rgbToHex(p20[0], p20[1], p20[2])).slice(-6);
      var hex21 = "#" + ("000000" + rgbToHex(p21[0], p21[1], p21[2])).slice(-6);
      var hex22 = "#" + ("000000" + rgbToHex(p22[0], p22[1], p22[2])).slice(-6);
      var hex23 = "#" + ("000000" + rgbToHex(p23[0], p23[1], p23[2])).slice(-6);
      var hex24 = "#" + ("000000" + rgbToHex(p24[0], p24[1], p24[2])).slice(-6);
      var hex25 = "#" + ("000000" + rgbToHex(p25[0], p25[1], p25[2])).slice(-6);
      var hex26 = "#" + ("000000" + rgbToHex(p26[0], p26[1], p26[2])).slice(-6);

      var hex27 = "#" + ("000000" + rgbToHex(p27[0], p27[1], p27[2])).slice(-6);
      var hex28 = "#" + ("000000" + rgbToHex(p28[0], p28[1], p28[2])).slice(-6);
      var hex29 = "#" + ("000000" + rgbToHex(p29[0], p29[1], p29[2])).slice(-6);
      var hex30 = "#" + ("000000" + rgbToHex(p30[0], p30[1], p30[2])).slice(-6);
      var hex31 = "#" + ("000000" + rgbToHex(p31[0], p31[1], p31[2])).slice(-6);
      var hex32 = "#" + ("000000" + rgbToHex(p32[0], p32[1], p32[2])).slice(-6);
      var hex33 = "#" + ("000000" + rgbToHex(p33[0], p33[1], p33[2])).slice(-6);
      var hex34 = "#" + ("000000" + rgbToHex(p34[0], p34[1], p34[2])).slice(-6);
      var hex35 = "#" + ("000000" + rgbToHex(p35[0], p35[1], p35[2])).slice(-6);
      var hex36 = "#" + ("000000" + rgbToHex(p36[0], p36[1], p36[2])).slice(-6);

      document.getElementById("top1").setAttribute("light", "color", hex1);
      document.getElementById("top2").setAttribute("light", "color", hex2);
      document.getElementById("top3").setAttribute("light", "color", hex3);
      document.getElementById("top4").setAttribute("light", "color", hex4);
      document.getElementById("top5").setAttribute("light", "color", hex5);
      document.getElementById("top6").setAttribute("light", "color", hex6);
      document.getElementById("top7").setAttribute("light", "color", hex7);
      document.getElementById("top8").setAttribute("light", "color", hex8);
      document.getElementById("top9").setAttribute("light", "color", hex9);
      document.getElementById("top10").setAttribute("light", "color", hex10);

      document.getElementById("right1").setAttribute("light", "color", hex11);
      document.getElementById("right2").setAttribute("light", "color", hex12);
      document.getElementById("right3").setAttribute("light", "color", hex13);
      document.getElementById("right4").setAttribute("light", "color", hex14);
      document.getElementById("right5").setAttribute("light", "color", hex15);
      document.getElementById("right6").setAttribute("light", "color", hex16);
      document.getElementById("right7").setAttribute("light", "color", hex17);
      document.getElementById("right8").setAttribute("light", "color", hex18);

      document.getElementById("left1").setAttribute("light", "color", hex19);
      document.getElementById("left2").setAttribute("light", "color", hex20);
      document.getElementById("left3").setAttribute("light", "color", hex21);
      document.getElementById("left4").setAttribute("light", "color", hex22);
      document.getElementById("left5").setAttribute("light", "color", hex23);
      document.getElementById("left6").setAttribute("light", "color", hex24);
      document.getElementById("left7").setAttribute("light", "color", hex25);
      document.getElementById("left8").setAttribute("light", "color", hex26);

      document.getElementById("bottom1").setAttribute("light", "color", hex27);
      document.getElementById("bottom2").setAttribute("light", "color", hex28);
      document.getElementById("bottom3").setAttribute("light", "color", hex29);
      document.getElementById("bottom4").setAttribute("light", "color", hex30);
      document.getElementById("bottom5").setAttribute("light", "color", hex31);
      document.getElementById("bottom6").setAttribute("light", "color", hex32);
      document.getElementById("bottom7").setAttribute("light", "color", hex33);
      document.getElementById("bottom8").setAttribute("light", "color", hex34);
      document.getElementById("bottom9").setAttribute("light", "color", hex35);
      document.getElementById("bottom10").setAttribute("light", "color", hex36);
    } catch (err) {}
  }

  // ambilight play detect
  var startambilight = window.setInterval(function() {
    try {
      var htmlplayer = document.getElementById("video-src");
      var item = 0;
      if (htmlplayer.play) {
        drawImage(htmlplayer, item);
      }
    } catch (err) {} // i see nothing, that is good
  }, 20); // 20 refreshing it

  /* EVENTS */
  this._addPlayerEvents = function() {
    var that = this;
    this.elVideo.pause();
    this.elVideo.onplay = function() {
      that.duration = this.duration;
    };
    this.elVideo.ontimeupdate = function() {
      if (that.duration > 0) {
        that.current_progress = this.currentTime / that.duration;
      }
      that.setProgress(that.current_progress);
    };
  };

  this._addControlsEvent = function() {
    var that = this;

    this.elControlPlay.addEventListener("click", function() {
      that._playAudioAlert();
      if (that.elVideo.paused) {
        this.setAttribute("src", "#pause");
        that.elVideo.play();
        that.paused = false;
        that.isProgressBarVisible(true);
        that.isControlVisible(true);
      } else {
        this.setAttribute("src", "#play");
        that.elVideo.pause();
        that.paused = true;
        that.isProgressBarVisible(false);
        that.isControlVisible(false);
      }
    });

    this.elControlVolume.addEventListener("click", function() {
      that._playAudioAlert();
      if (that.elVideo.muted) {
        that.elVideo.muted = false;
        this.setAttribute("src", "#volume-normal");
      } else {
        that.elVideo.muted = true;
        this.setAttribute("src", "#volume-mute");
      }
    });

    this.elControlBack.addEventListener("click", function() {
      that._playAudioAlert();
      that.elVideo.currentTime = 0;
    });

    this.elControlSettings.addEventListener("click", function() {
      if (that.settingspanel) {
        that.settingspanel = false;
        that.isSettingVisible(true);
      } else {
        that.settingspanel = true;
        that.isSettingVisible(false);
      }
    });

    this.elSettingsbutton1b.addEventListener("click", function() {
      document.getElementById("mainscene").setAttribute("fog", "color:black;");
      that.elFlatborder.setAttribute("material", "color", "black");
    });
    this.elSettingsbutton2b.addEventListener("click", function() {
      document
        .getElementById("mainscene")
        .setAttribute("fog", "color:#111111;");
      that.elFlatborder.setAttribute("material", "color", "#111111");
    });
    this.elSettingsbutton3b.addEventListener("click", function() {
      document.getElementById("mainscene").setAttribute("fog", "color:white;");
      that.elFlatborder.setAttribute("material", "color", "white");
    });
    this.elSettingsbutton4b.addEventListener("click", function() {
      document.getElementById("mainscene").setAttribute("fog", "color:purple;");
      that.elFlatborder.setAttribute("material", "color", "purple");
    });
    this.elSettingsbutton5b.addEventListener("click", function() {
      document.getElementById("mainscene").setAttribute("fog", "color:red;");
      that.elFlatborder.setAttribute("material", "color", "red");
    });
    this.elSettingsbutton6b.addEventListener("click", function() {
      document.getElementById("mainscene").setAttribute("fog", "color:yellow;");
      that.elFlatborder.setAttribute("material", "color", "yellow");
    });
    this.elSettingsbutton7b.addEventListener("click", function() {
      document
        .getElementById("mainscene")
        .setAttribute("fog", "color:darkblue;");
      that.elFlatborder.setAttribute("material", "color", "darkblue");
    });
    this.elSettingsbutton8b.addEventListener("click", function() {
      document
        .getElementById("mainscene")
        .setAttribute("fog", "color:darkgreen;");
      that.elFlatborder.setAttribute("material", "color", "darkgreen");
    });

    /*this.elVideoScreen.addEventListener('click', function () {
        that._playAudioAlert();
        if (that.elVideo.paused) {
            that.elControlPlay.setAttribute('src', '#pause');
            that.elVideo.play();
            that.paused = false;
            that.isProgressBarVisible(true);
            that.isControlVisible(true);
        } else {
            that.elControlPlay.setAttribute('src', '#play');
            that.elVideo.pause();
            that.paused = true;
            that.isProgressBarVisible(false);
            that.isControlVisible(false);
        }
    });*/
  };

  this._addProgressEvent = function() {
    var that = this;
    this.elProgressBar.addEventListener("click", function(e) {
      if (
        e.detail == undefined ||
        e.detail.intersection == undefined ||
        that.duration === 0
      ) {
        return;
      }
      let seekedPosition =
        (e.detail.intersection.point.x + that.progressWidth / 2) /
        that.progressWidth;
      try {
        let seekedTime = seekedPosition * that.duration;
        that.elVideo.currentTime = seekedTime;
      } catch (e) {}
    });
  };

  this._playAudioAlert = function() {
    if (
      this.elAlertSound.components !== undefined &&
      this.elAlertSound.components.sound !== undefined
    ) {
      this.elAlertSound.components.sound.playSound();
    }
  };

  /* MOBILE PATCH TO PLAY VIDEO */
  this._mobileFriendly = function() {
    if (AFRAME.utils.device.isMobile()) {
      var that = this;
      let video_permission = document.getElementById("video-permission");
      let video_permission_button = document.getElementById(
        "video-permission-button"
      );

      video_permission.style.display = "block";
      video_permission_button.addEventListener(
        "click",
        function() {
          video_permission.style.display = "none";
          that.elVideo.play();
          that.elVideo.pause();
        },
        false
      );
    }
  };

  this.init = function() {
    this._initElements();
    //this._determinateProgressWidth();
    this.setProgress(this.current_progress);
    this._addPlayerEvents();
    this._addControlsEvent();
    this._addProgressEvent();
    this._mobileFriendly();
  };

  this.init();
};
