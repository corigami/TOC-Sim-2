/* global document, expect, describe, beforeEach, it, View*/

describe("Controller Tests", function () {
    var self = this;

    describe("Constructor Tests", function () {
        it("should build a controller object", function () {
            self.controller = new Controller();
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
            expect(self.controller.getView().getMain().text()).toBe("The data has been reset");
        });

        it("Should load the Local Model by default", function(){

            expect(self.controller.getModelName()).toEqual("LocalModel");
        });

        it("Should retrieve scenarios from the model, function", function(){
            var numOfScenarios = self.controller.getScenarios().length;
            expect(numOfScenarios).toBeGreaterThan(0);
        });


    });

});
