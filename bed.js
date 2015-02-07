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
    // Pie
    var pieCtx = document.getElementById("pie").getContext("2d");
    var pieData = makeCircleChartData();
    var pieOptions = {
      segmentShowStroke: false,
    };
    var pieGraph = new Chart(pieCtx).Pie(pieData, pieOptions);
    // line
    // Pie
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
