//
// bed.server
//

//
// dummy logs
//


Meteor.publish("sleepLogs", function () {
  return SleepLogs.find({});
});

/*  daySleepLogs( [back] );
 *
 * ---- back >= 0 ----
 *
 *            n-2      n-1       n
 *  date  |---------|--------|-------|---->
 *                  |        |    ^  |
 *                  |        |   now |
 *                  |        |=======|
 *                  |        | back: 0
 *                  |========|
 *                    back: 1
 *
 *
 * ---- return array ----
 * [
 *   60,  <--0:00〜0:59
 *   60,  <--1:00〜1:59
 *   60,  ...
 *   45,
 *   10,
 *   0,
 *   0,
 *   ...
 *   0,
 *   null, <--23:00〜23:59 nodata
 *   null
 * ]
 */

Meteor.methods({
  daySleepLogs: function (back) {
    back = back || 0;
    var today = new Date();
    today.setDate(today.getDate() - back);
    var todayString = Utils.dateToNum(today);

    var log = SleepLogs.findOne({
      date: todayString
    });

    var data = log.sleeping;

    // グラフをきれいにするため、
    // データありより過去のデータ無しに対して０を挿入
    var skipit = true;
    for (var h=23; h>=0; h--) {
      if (skipit) {
        if (data[h] !== null) {
          skipit = false;
        }
      } else {
        if (data[h] === null) {
          data[h] = 0;
        }
      }
    }
    return data;
  },
});

Meteor.startup(function () {
});
