/**
 * Definies the controller for the Simulator
 * @param view The view connected to the controller
 * @constructor
 */
var Controller = function () {
    var self = this;
    var view,
        scenarios,
        model;

    //scenario variables
    var curScenario,
        curDay;
    this.init();
};

/**
 * Initializes the controller
 */
Controller.prototype.init = function () {
    this.view = new View();
    this.view.init(this);
    this.scenarios = [];
    this.curDay = 0;
    //Only have a local model at this point, so hard coding for now.
    //This can be extended to support pulling scenarios from a database
    this.model = new LocalModel(this.scenarios);
    this.view.resetDisplay();
};

Controller.prototype.resetAll = function () {
    this.curDay = 0;
    if(this.curScenario != undefined)
      this.curScenario.reset();
    this.view.resetDisplay();
    return true;
};

Controller.prototype.getView = function () {
    return this.view;
};

Controller.prototype.getScenarios = function () {
    return this.scenarios;
};

Controller.prototype.setModel = function (model) {
    this.model = model;
};

Controller.prototype.getModel = function () {
    return this.model;
};

Controller.prototype.getModelName = function () {
    return this.model.getName();
};

Controller.prototype.getDay = function () {
    return this.curDay;
};

Controller.prototype.runSim = function (numDays) {
    this.view.setHeader(this.curScenario.getName() + " - Day:  " + this.curDay);
    //if its the first day, we need to create the graphs
    if(this.curDay==0){
        for(var i = 0; i < this.view.chartContexts.length; i++){
            var title;
            title = (i==0)? "System Output" : "Node " + i + " Output";
            this.view.drawChart(this.view.chartContexts[i], title);
        }
    }
    var daysToRun = (typeof numDays === 'undefined') ? 1 : numDays;
    for (var i = 0; i < daysToRun; i++) {
        console.log("running for :" + daysToRun + " days, on day: " + i);
        //run production for each of the nodes
        this.curScenario.nodes.forEach(function (element) {
            element.runSim(this.curDay);
        }, this);

        //update scenario data
        this.updateScenarioData();

        //update main chart
        this.view.charts[0].updateData(this.curScenario.prodData[this.curDay]);

        //update node charts
        for(var j = 1; j< this.view.charts.length; j++){
            this.view.charts[j].updateData(this.curScenario.nodes[j-1].prodData[this.curDay])
        }

        //transfer the output of each node to the next
        this.curScenario.nodes.forEach(function (element) {
            element.transferOutput(this.curDay);
        }, this);
        this.curScenario.days.push(this.curDay);
        this.curDay++;
        
    }
    //now that we are done calculating everything, we can update the charts in the view.
    for(var i = 0; i< this.view.charts.length; i++){
        this.view.charts[i].chart.update();
    }


};

Controller.prototype.updateScenarioData = function(){
    //we'll use the ProdData class to store information for the scenario
    var data = new ProdData();
    //output for the scenario is the output of the last node.
    data.output = this.curScenario.nodes[this.curScenario.nodes.length-1].prodData[this.curDay].output;

    //efficency, wip, and missed ops are totals of all nodes
    this.curScenario.nodes.forEach(function (node) {
        production = node.prodData[this.curDay];
        data.missedOps += production.missedOps;
        data.wip += production.wip;
        data.eff += production.effciency;
    }, this);
    data.eff = data.eff / this.curScenario.nodes.length;
    this.curScenario.prodData.push(data);
};

Controller.prototype.loadScenario = function (scenario) {
    this.curScenario = scenario;
    this.view.setHeader(this.curScenario.getName());
    this.view.myMenu.buildScenarioDetailsMenu(this.curScenario);
};