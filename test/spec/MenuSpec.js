/* global document, expect, describe, beforeEach, it */
describe("Menu Tests", function () {
    var self = this;
    self.view = new View();
    self.controller = new Controller(self.view);

    beforeEach(function () {
    });

    it("Menu object should not be null", function () {
        expect(self.view.myMenu).not.toBeNull();
    });

    it("getMenu should return a DIV element", function () {
        var el = self.view.myMenu.getMenu();
        expect(el).not.toBeNull();
        expect(el.prop('nodeName')).toEqual("DIV");
    });

    it("buildScenarioMenu() should result in a menu with scenario items plus a custom option", function () {
        self.view.myMenu.buildScenarioMenu(self.controller.getScenarios());
        self.view.setMenu();
    });
});

    //TODO add test for onclick function.

    //TODO add test for loading scenario options once a scenario is picked});
