//
// Utilities
//
// !CAUTION! grobal name space

Utils = {};

Utils.todayString = function () {
  return this.dayString();
}

Utils.dayString = function (date, hm) {
  date = date || new Date();
  var today = "";
  today += date.getYear() + 1900;
  today += "/";
  today += date.getMonth() + 1;
  today += "/";
  today += date.getDate();
  if (hm) {
    today += " " + String("00" + date.getHours()).slice(-2);
    today += ":" + String("00" + date.getMinutes()).slice(-2);
  }
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

//
// for data structure
//
Utils.numToDate = function (num) {
  // yyyymmddHHMM --> Date(yyyy/mm/dd HH:MM)
  // 時差は日本。
  var str = String( Array(12+1).join("0") + String(num) ).slice(-12);
  //console.log("str:" + str);
  var date = new Date();
  date.setYear( Number(str.substr(0, 4)) );
  date.setMonth( Number(str.substr(4, 2)) - 1 );
  date.setDate( Number(str.substr(6, 2)) );
  date.setHours( Number(str.substr(8, 2)) );
  date.setMinutes( Number(str.substr(10, 2)) );
  return date;
}
