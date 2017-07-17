/* global $, Controller */
var View = function () {
    var controller,
        myMenu,
        $main,
        $menu;

    this.init();
};

/**
 * Initializes the view to its initial state
 */
View.prototype.init = function () {
    this.myMenu = new Menu();
    this.$main = $('#main');
    this.$menu = $('#menu');
};

/**
 * Resets the display to its initial state.
 */
View.prototype.resetDisplay = function () {
    this.$main.text("The data has been reset");
    this.$menu.empty();
    var myScenarios = this.controller.getScenarios();
    this.myMenu.buildScenarioMenu(myScenarios);
    this.$menu = this.myMenu.getMenu();
};

View.prototype.getMain = function(){
    return this.$main;
};

View.prototype.setMenu = function(){
    this.$menu.replaceWith(this.myMenu.getMenu());
};

View.prototype.setController = function(controller){
    this.controller = controller;
}
