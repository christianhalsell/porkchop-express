# AR

Augementd Reality (AR) is the term for viewing the world through a device camera while an overlay
or enhancement displays over the amer view. This has been made popular with the game pokemon go.
Some AR can be keyed off of a barcode, qr code or other image.

## Setup

For purposes of the demo, we will use Node, PhoneGap, Cordova and Wikitude. Xcode
will be helpful to build to an ios device. Android is supported but not covered here.

## PhoneGap

###http://phonegap.com/<br>

PhoneGap is a framework to develop web apps in a hybrid way, not just a 'shell'. The framework
uses a mixture of web techology such as html and javascript and has access to native features
such as push notifivcations and the camera.

Install the PhoneGap CLI from the terminal<br>
`$ npm install -g phonegap`

To create a new PhoneGap 'hello world' project in your current directory, use: <br>
`$ phonegap create my-app/`

Add the ios platform to the project. Note, this uses a cordova command which phonegap can
execute. Cordova cli is needed to execute the command on it's own.<br>
`$ phonegap cordova platform add ios`

To build your app to an iphone, connect it to your mac through usb and use:<br>
`$ phonegap run ios`

This will build the project and push it to the device. The 'hello world' app displays
a large image with a device status container which will turn green when `deviceready` has fired from
`index.js`.

```javascript
document.addEventListener('deviceready', this.onDeviceReady, false);
```

In the `index.html` file you will see a refernce to a `cordova.js` file. This file is automatically
added to your project at runtime, you will not find it in your projects' files.
```
<script type="text/javascript" src="cordova.js"></script>
```

## Cordova

###https://github.com/apache/cordova-cli

PhoneGap is an open source distribution of Cordova, which is included with phonegap but the cli can be used to perform cordova only commands.

From the terminal:<br>
`$npm install -g cordova`

The same phonegap cordova commands can be run by omitting 'phonegap'<br>
`$ cordova platform add ios`

## Wikitude

###http://www.wikitude.com/

Wikitude is an AR framework which has an integration with phonegap as as well as other
platforms such as the Unity game engine.

Wikitude requires a license. You will need to sign up and get a free trial license of your
own to develop. We already have one we can use. The trial license will overlay the word
'_Trial_' on the screen.

http://www.wikitude.com/developer/documentation/phonegap

The sample app never quite worked well, however it's worth downloading to get the sample files
to look at.

The wikitude plugin will need to go in your phonegap project's `plugins` folder. The plugin
folder will be named `com.wikitude.phonegap.WikitudePlugin`. The license key will need to be
added to `/www/WikitudePlugin.js`. Around line 11 you will find  the following. Add your key here:
```javascript
this._sdkKey = "";
```

To initialize wikitude in your phonegap app, add the following to `deviceready`.

```javascript
app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
```

`onDeviceSupported` & `onDeviceNotSupported` are functions you will need to create.
`requiredFeatures` is a variable you will define

```javascript
app.requiredFeatures = ["2d_tracking", "geo"];
```

##Xcode

Make sure you have the latest version of xcode (8 at the time of this).

If you have added ios to your project, you will find a `.xcodeproj` file in `platforms/ios`.
In order to get your AR app to work on ios, you will need to set permisions in the `Info.plist`
file in `/resources`. Add a new row `Privacy - Camera Usage Description` (NSCameraUsageDescription) and enter some text.
This will be presented to the user to ask to use the camera.

You will also need to be part of a development team for signing. This is found in targets
on the tab general, under signing. You will also need to provision your ios device.
