/* global scenarioDefinitions */
/**
 * Created by Corey Willinger on 7/13/2017.
 */

/**
 * Base model for loading data
 * @constructor
 */
var Model = function () {
    var name;

    this.init();
};
/**
 * Initializes the model.  Loads data from peristience into the passed array
 */
Model.prototype.init = function(){
    this.name =  "BaseModel";
};

/**
 * Extends the model for local persistance;
 * @constructor
 */
var LocalModel = function (array) {
    this.init(array);
};
//link this object to the Parent class Prototype
LocalModel.prototype = Object.create(Model.prototype);

/**
 * Initializes the model.  Loads data from peristience into the passed array
 * @param array Location
 */
LocalModel.prototype.init = function(array){
    this.name = "LocalModel"
    var i =0;
    scenarioDefinitions.forEach(function (el) {
        array[i] = new Scenario(el);
        i++;
    });
};

self.getScenarios = function(){
    return;
};

self.getName = function () {
    return self.name;
};