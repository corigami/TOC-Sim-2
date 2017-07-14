/* global scenarioDefinitions */
/**
 * Created by Corey Willinger on 7/13/2017.
 */

/**
 * Base model for loading data
 * @constructor
 */
var Model = function () {
    var self = this;
    self.name = "BaseModel";

    self.getScenarios = function () {
        //do nothing
    };
}

/**
 * Extends the model for local persistance;
 * @constructor
 */
var LocalModel = function (array) {
    var self = this;
    self.name = "LocalModel";

    var i =0;
    scenarioDefinitions.forEach(function (el) {
        array[i] = new Scenario(el);
        i++;
    });

    self.getScenarios = function(){
        return;
    };

    self.getName = function () {
        return self.name;
    };
};
LocalModel.prototype = Object.create(Model.prototype);
