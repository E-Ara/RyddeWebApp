import { getCurrentPoints } from "./tasks.js";

let VeronicaPoints = await getCurrentPoints("Veronica");
let DagPoints = await getCurrentPoints("Dag");
let KaiaPoints = await getCurrentPoints("Kaia");
let TeoPoints = await getCurrentPoints("Teo");
console.log("Veronica", VeronicaPoints);
console.log("Dag", DagPoints);
console.log("Kaia", KaiaPoints);
console.log("Teo", TeoPoints);

// Set a callback to run when the Google Visualization API is loaded.
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Person', 'Poeng'],
    ['Veronica', VeronicaPoints],
    ['Dag', DagPoints],
    ['Kaia', KaiaPoints],
    ['Teo', TeoPoints]
  ]);

  var options = {
    chart: {
      title: 'Leaderboard',
      subtitle: 'Hvem har flest poeng',
    },
    bars: 'horizontal' // Required for Material Bar Charts.
  };

  var options = {
    width: 600,
    height: 400,
    legend: { position: 'top', maxLines: 3 },
    bar: { groupWidth: '50%' },
  };

  var chart = new google.charts.Bar(document.getElementById('chart_div'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}