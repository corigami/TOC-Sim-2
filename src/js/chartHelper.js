/*global $,*/

var BarChart = function(ctx,scenario){
this.output = [];
this.missedOps = [];
this.wip = [];
this.chart = chartHelper(ctx, this.output, scenario.days);
};

BarChart.prototype.updateOutput = function(output){
        this.chart.data.datasets[0].data.push(output);
    this.chart.update();
};

var chartHelper = function (ctx, output, _labels) {
    var graph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: _labels,
            datasets: [{
                label: '# of output',
                data: output,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            responsive: false,
            animation: false
        }
    });
    return graph;
};
