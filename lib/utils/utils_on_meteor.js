//
// Utils depend on meteor
//
if (Meteor.isServer) {
  DEBUG = Meteor.settings["is_debug"];
  debug = function (text) {
    if (DEBUG) {
      console.log(text);
    }
  }
}
