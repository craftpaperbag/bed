//
// bed.client
//
console.log("bed.js load start")

//
// Subscribe
//

Meteor.subscribe("sleepLogs");

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

Template.body.helpers({
  recents: function () {
    return SleepLogs.find({}, {sort: {createdAt: -1}, limit: 5});
  },
  createdDate: function () {
    return new Date(this.createdAt);
  },
});

Meteor.startup(function () {
  // setup graph
  Chart.defaults.global.responsive = true;
  // Pie
  var pieCtx = document.getElementById("pie").getContext("2d");
  var pieData = makeCircleChartData();
  var pieOptions = {
    segmentShowStroke: false,
  };
  var pieGraph = new Chart(pieCtx).Pie(pieData, pieOptions);

  // line
  var lineCtx = document.getElementById("line").getContext("2d");
  var hours = [];
  var samples = [];
  for (var i=0; i<24; i++) {
    hours.push(String(i)+"時");
    samples.push( Math.round(Math.random() * 60) );
  }
  var lineGraph = new Chart(lineCtx).Line({
    labels: hours,
    datasets: [
      {
        label: "寝てた分",
        fillColor: "rgba(42,44,43,0.5)",
        strokeColor: "#2a2c2b",
        pointColor: "#2a2c2b",
        pointStrokeColor: "#2a2c2b",
        pointHighlightFill: "#2a2c2b",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: samples,
      },
    ],
  }, {
    scaleLabel: "<%=value%>分間",
  });
});

SleepLogs.minutesPerHour = function () {
  // raw logs --> list of total sleeping minutes per hour
  return Utils.todayString();
}
console.log(SleepLogs.minutesPerHour());
