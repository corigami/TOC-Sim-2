/*global $,*/

var BarChart = function (ctx, scenario, title) {
    this.output = [];
    this.missedOps = [];
    this.wip = [];
    this.chart = chartHelper(ctx, this.output, this.missedOps, this.wip, scenario.days, title);
};



BarChart.prototype.updateData = function(newData){
    this.updateOutput(newData.output);
    this.updateMissedOps(newData.missedOps);
    this.updateWIP(newData.wip);
    //this.chart.update();
}

BarChart.prototype.updateOutput = function (output) {
    this.chart.data.datasets[0].data.push(output);
};

BarChart.prototype.updateMissedOps = function (missedOps) {
    this.chart.data.datasets[1].data.push(missedOps);
};

BarChart.prototype.updateWIP = function (WIP) {
    this.chart.data.datasets[2].data.push(WIP);
};

var chartHelper = function (ctx, output, missedOps, wip, _labels, chartTitle) {
    var graph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: _labels,
            datasets: [{
                label: '# of output',
                data: output,
                backgroundColor: 'rgba(50, 255, 50, 0.2)',
                borderColor: 'rgba(50, 255, 50, 1)',
                borderWidth: 1
            }, {
                label: 'missed opportunities',
                data: missedOps,
                backgroundColor: 'rgba(255, 50, 50, 0.2)',
                borderColor: 'rgba(255, 159, 50, 1)',
                borderWidth: 1
            },
            {
                label: "WIP",
                type: 'line',
                data: wip,
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
                }]
        },
        options: {
            title: {
                display: true,
                text: chartTitle,
                position: 'left'
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Output / Missed'
                    },
                    ticks: {
                        beginAtZero: true,
                    },
                }, {
                    type: "linear",
                    display: true,
                    position: "right",
                    id: "y-axis-2",
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true,

                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'WIP'
                    },
                    ticks: {
                        beginAtZero: true,
                    }

                }]
            },
            responsive: true,
            animation: false
        }
    });
    return graph;
};