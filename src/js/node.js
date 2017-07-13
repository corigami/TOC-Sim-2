/**
 * @description - object that represents scenario data and methods
 * @constructor
 */
var Scenario = function () {
    'use strict';
    var self = this;
    self.scenarios = Scenarios; //These are defined in the scenario.js file

    /**
     * @description - returns model location
     * @returns array of locations
     */
    self.getAllScenarios = function () {
        return self.scenarios;
    };

};
