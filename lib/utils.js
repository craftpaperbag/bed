//
// Utilities
//
// !CAUTION! grobal name space

Utils = {};
Utils.todayString = function () {
  var now = new Date();
  var today = "";
  today += now.getYear() + 1900;
  today += "/";
  today += now.getMonth() + 1;
  today += "/";
  today += now.getDate();
  return today;
}
