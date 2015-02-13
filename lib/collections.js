//
// collections
//

// !CAUTION! grobal namespace
SleepLogs = new Mongo.Collection("sleepLogs");

//
// insert dummy data
//
if (Meteor.isServer) {
  console.log("now sleeplogs count: " + SleepLogs.find({}).count() );
  if ( SleepLogs.findOne({}) !== null ) {
    SleepLogs.remove({});
    console.log("remove all");
    var sleepingMinutes = 360;
    var createdAt = new Date();
    for (var i=0; i < sleepingMinutes; i++) {
      createdAt.setMinutes(createdAt.getMinutes() - 1);
      var token = "i=" + i;
      SleepLogs.insert({
        createdAt: createdAt,
        sleeping: true,
        token: token,
      });
    }
    console.log("insert " + sleepingMinutes + " logs");
  }
}
