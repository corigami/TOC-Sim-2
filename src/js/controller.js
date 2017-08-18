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
    console.log("curday: " + this.curDay);
    this.view.setHeader(this.curScenario.getName() + " - Day:  " + this.curDay);
    //if its the first day, we need to create the graphs
    if(this.curDay==0){
        this.view.drawChart(this.view.chartContexts[0]);
    }
    var daysToRun = (typeof numDays === 'undefined') ? 1 : numdays;
    for (var i = 0; i < daysToRun; i++) {
        //run production for each of the nodes
        this.curScenario.nodes.forEach(function (element) {
            element.runSim(this.curDay);
        }, this);

        //update scenario data
        this.updateScenarioData();

        //update chart
        this.view.charts[0].updateOutput(this.curScenario.prodData[this.curDay].output);

        //transfer the output of each node to the next
        this.curScenario.nodes.forEach(function (element) {
            element.transferOutput(this.curDay);
        }, this);
        this.curScenario.days.push(this.curDay);
        this.curDay++;
        
    }

};

Controller.prototype.updateScenarioData = function(){
    //we'll use the ProdData class to store information for the scenario
    var data = new ProdData();
    //output for the scenario is the output of the last node.
    data.output = this.curScenario.nodes[this.curScenario.nodes.length-1].prodData[this.curDay].output;

    //efficency, wip, and missed ops are totals of all nodes
    var eff = data.effciency;
    var wip = data.wip;
    var missedOps = data.missedOps;
    this.curScenario.nodes.forEach(function (node) {
        production = node.prodData[this.curDay];
        missedOps += production.missedOps;
        wip += production.wip;
        eff += production.effciency;
    }, this);
    eff = eff / this.curScenario.nodes.length;
    this.curScenario.prodData.push(data);
};

Controller.prototype.loadScenario = function (scenario) {
    this.curScenario = scenario;
    this.view.setHeader(this.curScenario.getName());
    this.view.myMenu.buildScenarioDetailsMenu(this.curScenario);
};