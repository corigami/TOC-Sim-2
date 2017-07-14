/* global $, Controller */
var View = function () {
    var self = this;
    self.controller;
    self.myMenu = new Menu();

    self.$main = $('#main');
    self.$menu = $('#menu');

    self.setController = function(controller){
        this.controller = controller;
    }

    self.resetDisplay = function () {
        self.$main.text("The data has been reset");
        self.$menu.empty();
        var myScenarios = self.controller.getScenarios();
        self.myMenu.buildMainMenu(myScenarios);
        self.$menu = self.myMenu.getMenu();

    };

    self.getMain = function(){
        return self.$main;
    };

    self.setMenu = function(){
      self.$menu.replaceWith(self.myMenu.getMenu());
    };
};

