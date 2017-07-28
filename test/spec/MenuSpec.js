/* global document, expect, describe, beforeEach, it */
describe("Menu Tests", function () {
    var self = this;
    self.controller = null;
    self.view = null;
    if(document.controller !== null && document.controller !== undefined){
        self.controller = document.controller;
    }else{
        document.controller = new Controller()
        self.controller = document.controller;
    }
    self.view = self.controller.getView();
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
        var scenarios = self.controller.getScenarios(),
            numScenarios = scenarios.length,
            numMenuItems;
        self.view.myMenu.buildScenarioMenu(scenarios);
        self.view.setMenu();
        numMenuItems = $('#menuList').find('li').length;
        expect(numMenuItems).toEqual(numScenarios + 1);

    });

    it("buildScenarioDetailsMenu should result in new menu being generated", function () {
        var scenarios = self.controller.getScenarios();
        self.view.myMenu.buildScenarioDetailsMenu(scenarios[0]);
        expect(self.view.myMenu.getMenuTitle()).not.toEqual("Choose a Scenario");
        expect(self.view.myMenu.getMenuTitle()).toEqual(scenarios[0].getName() + ' Details');
    });

    it("Control buttons should be visible if ready to run simulation", function () {
        var scenarios = self.controller.getScenarios();
        self.view.myMenu.buildScenarioDetailsMenu(scenarios[0]);
        expect($('#ctrl-container').is(":visible")).toBeTruthy();

    });

    it("buildCustomScenarioMenu should result in new menu being generated", function () {
        self.view.myMenu.buildCustomScenarioMenu();
        expect(self.view.myMenu.getMenuTitle()).not.toEqual("Choose a Scenario");
        expect(self.view.myMenu.getMenuTitle()).toEqual("Input Custom Node Parameters");
    });
});
