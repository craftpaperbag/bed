var makeCircleChartData = function (list) {
  /* [
   *   {
   *    value: 100,
   *    color: "#aaa",
   *    highlight: "#ccc",
   *    label: "My Label",
   * } ] 
   */
  var data = [
    {
      value: 7*12,
      color: "#aaa",
      highlight: "#ccc",
      label: "sleeping"
    },
  
    {
      value: 12*12,
      color: "#13df33",
      highlight: "#55ff88",
      label: "awakening"
    },
    {
      value: 5*12,
      color: "#eee",
      highlight: "#fff",
      label: "no data"
    },
  ]
  return data;
}

var make24hChartData = function (list /* [ { label: "abc", data: [1,2,3...] } ...] */) {
  var h24 = [];
  for (var i=0; i<24; i++) {
    h24.push(i);
  }
  var datasets = [];
  for (var i in list) {
    var e = list[i];
    var dataset = {
      label: e["label"],
      data: e["data"],
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      // and more options...
    };
    datasets.push(dataset);
  }
  var data = {
    labels: h24,
    datasets: datasets,
  };
  console.log(data)
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
    var ctx = document.getElementById("graph").getContext("2d");
    var data = make24hChartData([
      {label: "hoge", data: [1,2,3]}  
    ]);
    Chart.defaults.global.responsive = true;
    var graph = new Chart(ctx).Line(data);

    var circleCtx = document.getElementById("circle").getContext("2d");
    var circleData = makeCircleChartData();
    var circleGraph = new Chart(circleCtx).Pie(circleData)
    var circleCtx = document.getElementById("circle2").getContext("2d");
    var circleData = makeCircleChartData();
    var circleGraph = new Chart(circleCtx).Pie(circleData)
    var circleCtx = document.getElementById("circle3").getContext("2d");
    var circleData = makeCircleChartData();
    var circleGraph = new Chart(circleCtx).Pie(circleData)
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
