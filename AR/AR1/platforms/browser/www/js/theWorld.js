// Construct the AR.Tracker with the path to your wtc file
var tracker = new AR.Tracker("assets/tracker.wtc");

var circle = new AR.Circle(5);

new AR.Trackable2DObject(tracker, "hello_wikitude_qr", {
  drawables: {cam: circle}
});
