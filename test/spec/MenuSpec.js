/* global document, expect, describe, beforeEach, it */
describe("Menu Tests", function () {
    var self = this;
    self.view = new View();
    self.controller = new Controller(self.view)

    beforeEach(function () {
    });

    it("Menu object should not be null", function () {
        expect(self.view.myMenu).not.toBeNull();
    });

    it("getMenu should return a DIV element", function () {
        var el = self.view.myMenu.getMenu();
        expect(el).not.toBeNull();
        expect(el.prop('nodeName')).toEqual("UL");
    });

    it("Menu object and menuElement should not be null after clearing menu", function () {
        var el = self.view.myMenu.getMenu();
        self.view.myMenu.clear();
        expect(el).not.toBeNull();
        expect(self.view.myMenu).not.toBeNull();
    });

    it("buildMainMenu() should result in a menu with scenario items plus a custom option", function () {
        self.view.myMenu.buildMainMenu(self.controller.getScenarios());
        console.log(self.view.myMenu.getMenu());
        self.view.setMenu();
          });
});
