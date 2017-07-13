/* global scenarioDefinitions */
/**
 * Created by Corey Willinger on 7/13/2017.
 */

/**
 * Base model for loading data
 * @constructor
 */
var Model = function () {
    self = this;
    this.name = "BaseModel";

    this.getScenarios = function () {
        //do nothing
    };
}

/**
 * Extends the model for local persistance;
 * @constructor
 */
var LocalModel = function (array) {
    this.name = "LocalModel";
    var i =0;
    scenarioDefinitions.forEach(function (el) {
        array[i] = new Scenario(el);
        i++;
    });

    this.getScenarios = function(){

        return;
    }


    this.getName = function () {
        return name;
    }
};
LocalModel.prototype = Object.create(Model.prototype);
