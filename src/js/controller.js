/**
 * Definies the controller for the Simulator
 * @param view The view connected to the controller
 * @constructor
 */
var Controller = function() {
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
Controller.prototype.init = function(){
    this.view = new View();
    this.view.init(this);
    this.scenarios = [];
    this.curDay = 0;
    //Only have a local model at this point, so hard coding for now.
    //This can be extended to support pulling scenarios from a database
    this.model = new LocalModel(this.scenarios);
    this.view.resetDisplay();
};

Controller.prototype.resetAll = function(){
    this.view.resetDisplay();
    return true;
};

Controller.prototype.getView = function(){
    return this.view;
};

Controller.prototype.getScenarios = function(){
    return this.scenarios;
};

Controller.prototype.setModel = function(model){
    this.model = model;
};

Controller.prototype.getModel = function(){
    return this.model;
};

Controller.prototype.getModelName = function(){
    return this.model.getName();
};

Controller.prototype.getDay = function(){
    return this.curDay;
};

Controller.prototype.runSim = function(numDays){
    var daysToRun = (typeof numDays === 'undefined') ? 1: numdays;
    for (var i=0; i < daysToRun; i++){
     //   console.log("numDays:" + numDays);
       // console.log("Day: " + this.curDay);

        //run production for each of the nodes
        this.curScenario.nodes.forEach(function(element) {
      //      console.log("Node: " + element.idNum);
            element.runSim(this.curDay);
           // element.prodData[this.curDay].print();
        }, this);

        //transfer the output of each node to the next
        this.curScenario.nodes.forEach(function(element) {
            element.transferOutput(this.curDay);
        }, this);

            this.curDay++;
        }
        this.view.setHeader(this.curScenario.getName() + " - Day:  " + this.curDay);
};

Controller.prototype.loadScenario = function(scenario){
    this.curScenario = scenario;
    this.view.setHeader(this.curScenario.getName());
    this.view.myMenu.buildScenarioDetailsMenu(this.curScenario);
};

