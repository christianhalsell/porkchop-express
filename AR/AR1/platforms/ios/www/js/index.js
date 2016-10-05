var app = {
  isArchitectWorldLoaded: false,

  onARExperienceLoadedSuccessful: function (loadedURL) {
    // ... do something when the augmented reality experience finished loading
    app.isArchitectWorldLoaded = true;
  },
  onARExperienceLoadError: function (errorMessage) {
    // ... react on failures. That could be happen when the local path is wrong or the remote url returned an error code
    alert(errorMessage);
  },

  onDeviceSupported: function (architectWorld) {
    console.log('AR: supported');

    app.wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);

    app.wikitudePlugin.loadARchitectWorld(
      app.onARExperienceLoadedSuccessful,
      app.onARExperienceLoadError,
      architectWorld.path,
      architectWorld.requiredFeatures,
      architectWorld.startupConfiguration
    )
  },

  onDeviceNotSupported: function (errorMessage) {
    // ... code that is executed if the device is not supported ...
    alert(errorMessage);
  },

  loadARchitectWorld: function (architectWorld) {
    app.wikitudePlugin.isDeviceSupported(
      function () {
        app.onDeviceSupported(architectWorld);
      },
      app.onDeviceNotSupported,
      architectWorld.requiredFeatures
    );
  },

  loadCustomARchitectWorldFromURL: function (url) {
//    alert(url);
    var world = {
      "path": url,
      "requiredFeatures": [
              "2d_tracking",
              "geo"
          ],
      "startupConfiguration": {
        "camera_position": "back"
      }
    };
    app.isArchitectWorldLoaded = false;
    app.loadARchitectWorld(world);
  },

  // deviceready Event Handler
  onDeviceReady: function () {
//    alert('device ready');
    app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    //    alert('bindEvents');
    document.addEventListener('deviceready', this.onDeviceReady, false);

    document.getElementById('btnOne').addEventListener('click', function () {
      app.loadCustomARchitectWorldFromURL('www/scan.html');
    });

    document.getElementById('btnTwo').addEventListener('click', function () {
      app.loadCustomARchitectWorldFromURL('www/world_3d.html');
    });
  },

  // Application Constructor
  initialize: function () {
    this.bindEvents();
  }
};
