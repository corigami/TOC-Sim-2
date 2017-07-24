//TODO add logic for run button.
/**
 * Definies the controller for the Simulator
 * @param view The view connected to the controller
 * @constructor
 */
var Controller = function() {
        this.view;
        this.scenarios;
        this.model;
    this.init();
};

/**
 * Initializes the controller
 */
Controller.prototype.init = function(){
    this.view = new View();
    this.view.setController(this);
    this.scenarios = [];

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

