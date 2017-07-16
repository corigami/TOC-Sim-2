/**
 * Definies the controller for the Simulator
 * @param view The view connected to the controller
 * @constructor
 */
var Controller = function(view) {
    var view,
        scenarios,
        model;

    this.init(view);
};

/**
 * Initializes the controllerr
 * @param view
 */
Controller.prototype.init = function(view){
    this.view = view;
    this.view.setController(this);
    this.scenarios = [];
    this.model = new LocalModel(this.scenarios);
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
/*
$(document).ready(function () {
    document.controller = new Controller(new View());
});
*/
