//
// bed.server
//

var SleepLogs = new Mongo.Collection("sleepLogs");

//
// dummy logs
//

SleepLogs.remove({});
console.log("remove all");

for (var i=0; i<20; i++) {
  var createdAt = new Date() - 60*1000*i;
  var token = "i=" + i;
  SleepLogs.insert({
    createdAt: createdAt,
    sleeping: true,
    token: token,
  });
}
console.log("insert 20 logs");

Meteor.publish("sleepLogs", function () {
  return SleepLogs.find({});
});

Meteor.startup(function () {
});

