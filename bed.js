var makeCircleChartData = function (list) {
  var data = [
    {
      value: 5*60,
      color: "#2a2c2b",
      highlight: "#2a2c2b",
      label: "sleeping"
    },
    {
      value: 7*60,
      color: "#ee4458",
      highlight: "#ee4458",
      label: "awakening"
    },
    {
      value: 12*60,
      color: "#e2e6f3",
      highlight: "#e2e6f3",
      label: "no data"
    },
  ]
  return data;
}

// -------------------------------------------------------------------------

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^
// SERVER
// --------------------------
// CLIENT
// vvvvvvvvvvvvvvvvvvvvvvvvvv


if (Meteor.isClient) {
  Meteor.startup(function () {
    // setup graph
    Chart.defaults.global.responsive = true;
    var circleCtx = document.getElementById("circle").getContext("2d");
    var circleData = makeCircleChartData();
    var options = {
      segmentShowStroke: false,
    };
    var circleGraph = new Chart(circleCtx).Pie(circleData, options);
  });

  Template.body.helpers({
    hours: function () {
      var hours = [];
      for (var i=0; i<24; i++) {
        hours.push({
          hour: i,
          sleepRatio: 1.0, /* 1: 全部寝てた 1>x>0:寝てた比率 0: 起きてた null: データなし */
        });
      }
      return hours;
    },
  });

/*
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
*/
}
