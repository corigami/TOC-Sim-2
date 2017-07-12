/* global document, expect, describe, beforeEach, it, View*/

describe("Controller Tests", function () {
    var self = this;
    self.controller = new Controller(new View());
    beforeEach(function () {

    });

    describe("Reset All", function () {

        it("resetAll should return true", function () {
            expect(self.controller.resetAll()).toBe(true);
        });

        it("View should reset main content", function(){
            expect(self.controller.getView().getMain().text()).toBe("The data has been reset");
        });

    });

});
