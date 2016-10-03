var app = {
  requiredFeatures: ["2d_tracking", "geo"],
  arExperienceUrl: "www/theWorld.html",
  isDeviceSupported: false,
  startupConfiguration: {
    "camera_position": "back"
  },

  onARExperienceLoadedSuccessful: function (loadedURL) {
    // ... do something when the augmented reality experience finished loading
    app.wikitudePlugin.callJavaScript('createCircle(new AR.RelativeLocation(null, -10, 0), \'#97FF18\');');
  },
  onARExperienceLoadError: function (errorMessage) {
    // ... react on failures. That could be happen when the local path is wrong or the remote url returned an error code
    alert(errorMessage);
  },

  onDeviceSupported: function () {
    console.log('AR: supported');

    app.wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);

    app.wikitudePlugin.loadARchitectWorld(
      app.onARExperienceLoadedSuccessful,
      app.onARExperienceLoadError,
      app.arExperienceUrl,
      app.requiredFeatures,
      app.startupConfiguration
    );
  },

  onDeviceNotSupported: function (errorMessage) {
    // ... code that is executed if the device is not supported ...
    alert(errorMessage);
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('AR: Received Event: ' + id);
  },

  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    app.receivedEvent('deviceready');

    app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
    app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
//    alert('bindEvents');
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  // Application Constructor
  initialize: function () {
//    alert('initialize');
    this.bindEvents();
  }
};
