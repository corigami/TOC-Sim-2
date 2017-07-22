/* global document, expect, describe, beforeEach, it, View*/

describe("View Tests", function () {
    var controller = new Controller();
    var view = controller.getView();

    beforeEach(function () {

    });

    describe("Reset Display", function () {
        it("should reset the menu to default",function(){
            console.log(view);
           view.resetDisplay();
           expect(view.$headerText.text()).toEqual('ToC Simulator 2.0');
           expect(view.myMenu.getMenuTitle()).toEqual("Choose a Scenario");
        });

    });

});
