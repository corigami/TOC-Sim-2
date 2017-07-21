/* global $, Controller */
var View = function () {
    var controller,
        myMenu,
        $main,
        $menu,
        $headerText;

    this.init();
};

/**
 * Initializes the view to its initial state
 */
View.prototype.init = function () {
    this.myMenu = new Menu(this);
    this.$main = $('#main');
    this.$menu = $('#menu');
    this.$headerText = $('#headertext');
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
    this.setHeader('ToC Simulator 2.0');
};

View.prototype.getMain = function(){
    return this.$main;
};

View.prototype.setMenu = function(){
    this.$menu.replaceWith(this.myMenu.getMenu());

};

View.prototype.setController = function(controller){
    this.controller = controller;
};

View.prototype.setHeader = function(text){
    this.$headerText.text(text);
};