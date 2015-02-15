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
  if ( true ) {
    SleepLogs.remove({});
    console.log("remove all");

    var dummyNum = 1;
    var date = new Date();

    for (var i=0; i < dummyNum; i++) {
      var dummy = [];
      for (var h=0; h<24; h++) { dummy.push( Math.ceil( 60*Math.random() ) ) }
      SleepLogs.insert({
        date: Utils.dateToNum(date),
        sleeping: dummy,
        lastTime: Utils.dateToNum(date, true),
        lastStatus: true,
      });
      date.setDate(date.getDate() - 1);
    }
    console.log("insert " + dummyNum + " logs");
  }
}
