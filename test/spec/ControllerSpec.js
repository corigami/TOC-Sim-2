/* global document, expect, describe, beforeEach, it, View*/

describe("Controller Tests", function () {
    var self = this;
    self.controller = null;
    self.view = null;
    if(document.controller !== null && document.controller !== undefined){
        self.controller = document.controller;
    }else{
        document.controller = new Controller()
        self.controller = document.controller;
    }
    beforeEach(function () {

    });

    describe("Constructor Tests", function () {
        it("should build a controller object", function () {

            expect(self.controller).not.toBeNull();
            expect(self.controller.getScenarios()).not.toBeNull();
            expect(self.controller.getModel()).not.toBeNull();
            expect(self.controller.getView()).not.toBeNull();
        });
    });

    describe("Reset All", function () {

        it("resetAll should return true", function () {
            expect(self.controller.resetAll()).toBe(true);
        });

        it("View should reset main content", function(){
            expect(self.controller.getView().getMain().text()).toBe("");
        });

        it("Should load the Local Model by default", function(){

            expect(self.controller.getModelName()).toEqual("LocalModel");
        });

        it("Should retrieve scenarios from the model, function", function(){
            var numOfScenarios = self.controller.getScenarios().length;
            expect(numOfScenarios).toBeGreaterThan(0);
        });

    });

    describe("Simulation Tests", function(){

       it("should advance the scenario a day when user clicks run", function(){
           self.controller.resetAll();
           var scenario = self.controller.getScenarios()[0];
           self.controller.loadScenario(scenario);
           var currentDay = self.controller.getDay();
           self.controller.runSim();
           expect(self.controller.getDay()).toEqual(currentDay+1);
       });

       it("should advance the scenario 5 days when user clicks the '5' button", function(){
       var scenario = self.controller.getScenarios()[0];
       self.controller.loadScenario(scenario);
       self.controller.resetAll();
        var currentDay = self.controller.getDay();
        self.controller.runSim(5);
        expect(self.controller.getDay()).toEqual(currentDay+5);
    });

    it("should advance the scenario 5 days when user clicks the '10' button", function(){
        var scenario = self.controller.getScenarios()[0];
        self.controller.loadScenario(scenario);
        self.controller.resetAll();
        var currentDay = self.controller.getDay();
        self.controller.runSim(10);
        expect(self.controller.getDay()).toEqual(currentDay+10);
    });

    });
    self.controller.init();
});
