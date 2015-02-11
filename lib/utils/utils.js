//
// Utilities
//
// !CAUTION! grobal name space

Utils = {};

Utils.todayString = function () {
  return this.dayString();
}

Utils.dayString = function (date) {
  date = date || new Date();
  var today = "";
  today += date.getYear() + 1900;
  today += "/";
  today += date.getMonth() + 1;
  today += "/";
  today += date.getDate();
  return today;
}

Utils.yesterday = function (date) {
  return this.back();
}

Utils.back = function (num, date) {
  date = date || new Date();
  if (num === undefined ) { num = 1 }
  date.setDate(date.getDate() - num);
  return date;
}
