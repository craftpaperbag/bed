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
    console.log("daySleepLogs start");
    back = back || 0;
    var today = new Date();
    today.setDate(today.getDate() - back);
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    today.setHours(0,0,0,0);
    tomorrow.setHours(0,0,0,0);
    console.log("today: "+today)
    console.log("tomorrow: "+tomorrow)

    var logs = SleepLogs.find({
      createdAt: {
        $gt: today, $lt: tomorrow
      }
    });
    var hours =[];
    for (var i=0; i<24; i++) {
      var minutes = [];
      for (var j=0; j<60; j++) {
        minutes.push(null);
      }
      hours[i] = minutes;
    }

    logs.forEach(function (log) {
      var h = log.createdAt.getHours();
      var m = log.createdAt.getMinutes();
      hours[h][m] = log.sleeping;
    });

    var data = [];
    for (var h=0; h<24; h++) {
      var slept = 0;
      var nodata = true;
      for (var m in hours[h]) {
        if ( hours[h][m] ) {
          slept ++;
        }
        if (hours[h][m] !== null) {
          nodata = false;
        }
      }
      if (nodata) {
        data.push(null);
      } else {
        data.push(slept);
      }
    }

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
