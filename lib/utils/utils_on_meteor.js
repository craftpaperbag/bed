//
// Utils depend on meteor
//
DEBUG = Meteor.settings["is_debug"];
debug = function (text) {
  if (DEBUG) {
    console.log(text);
  }
}
