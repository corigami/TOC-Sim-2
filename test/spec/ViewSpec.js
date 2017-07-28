/* global document, expect, describe, beforeEach, it, View*/

/**
 *
 */
describe("View Tests", function () {
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

    describe("Constructor Tests", function(){
        it("should build a view when the controller is called",function(){
        expect(self.controller.getView()).not.toBeNull();
        });

        /*
        it("Control buttons should be hidden if not ready to run simulation",function (){
            expect($('#ctrl-container').is(":visible")).toBeFalsy();
        });
        */
    });

    describe("Function Tests", function(){
        it("resetDisplay() should reset the menu to default",function(){
            self.view.resetDisplay();
            expect(self.view.$headerText.text()).toEqual('ToC Simulator 2.0');
            expect(self.view.myMenu.getMenuTitle()).toEqual("Choose a Scenario");
        });

        it("getMain() should return the element with the 'main' id", function(){
           expect(self.view.getMain().attr('id')).toEqual("main");
        });

    });



});
