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

    it("Control buttons should be visible if ready to run simulation",function (){
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

//TODO add test for onclick function.

//TODO add test for loading scenario options once a scenario is picked});
