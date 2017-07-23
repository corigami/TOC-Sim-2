/* global document, expect, describe, beforeEach, it, View*/

describe("View Tests", function () {
    var controller = new Controller();
    var view = controller.getView();

    beforeEach(function () {

    });

    describe("Constructor Tests", function(){
        it("should build a view when the controller is called",function(){
        expect(controller.getView()).not.toBeNull();
        });
        it("Control buttons should be hidden if not ready to run simulation",function (){
            expect($('#ctrl-container').is(":visible")).toBeFalsy();
        });
    });

    describe("Function Tests", function(){
        it("resetDisplay() should reset the menu to default",function(){
            view.resetDisplay();
            expect(view.$headerText.text()).toEqual('ToC Simulator 2.0');
            expect(view.myMenu.getMenuTitle()).toEqual("Choose a Scenario");
        });

        it("getMain() should return the element with the 'main' id", function(){
           expect(view.getMain().attr('id')).toEqual("main");
        });

        it("getMain() should return the element with the 'main' id", function(){
            expect(view.getMain().attr('id')).toEqual("main");
        });

    });



});
