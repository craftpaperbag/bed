//
// collections
//

// !CAUTION! grobal namespace
SleepLogs = new Mongo.Collection("sleepLogs");

// dummy
//
if (Meteor.isServer) {
  SleepLogs.remove({});
  console.log("remove all");
  for (var i=0; i<20; i++) {
    var createdAt = new Date();
    createdAt.setMinutes(createdAt.getMinutes() + i);
    var token = "i=" + i;
    SleepLogs.insert({
      createdAt: createdAt,
      sleeping: true,
      token: token,
    });
  }
  console.log("insert 20 logs");
}
