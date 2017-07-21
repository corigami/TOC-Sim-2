/* global document, expect, describe, beforeEach, it, View*/

describe("View Tests", function () {
    var menu;
    var view = new View();
    var controller = new Controller(view);


    beforeEach(function () {

    });

    describe("Reset Display", function () {
        it("should reset the menu to default",function(){
           view.resetDisplay();
           expect(view.$headerText.text()).toEqual('ToC Simulator 2.0');
           expect(view.myMenu.getMenuTitle()).toEqual("Choose a Scenario");
        });

    });

});
