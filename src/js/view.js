/* global $, Controller */

var View = function () {
    var controller,
        myMenu,
        $main,
        $menu,
        $headerText,
        $buttonContainer,
        $runButton;
};

/**
 * Initializes the view to its initial state
 */
View.prototype.init = function (_controller) {
    this.controller = _controller;
    this.myMenu = new Menu(this);
    this.$main = $('#main');
    this.$menu = $('#menu');
    this.$headerText = $('#headertext');
    this.$buttonContainer = $('#ctrl-container');
    this.$runButton = this.$buttonContainer.find('#next-btn');
    var temp_ctrl = this.controller;
    this.$runButton.click(function(){
        temp_ctrl.runSim();
    });
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

/**
 * Gets the main container from the DOM
 * @returns {*|jQuery|HTMLElement}
 */
View.prototype.getMain = function () {
    return this.$main;
};

/**
 * Sets the currently generated menu from the menu object and applies it to the view.
 */
View.prototype.setMenu = function () {
    this.$menu.replaceWith(this.myMenu.getMenu());
};

/**
 * Gets the currently generated menu from the menu object and applies it to the view.
 */
View.prototype.getMenu = function () {
    return this.myMenu;
};


/**
 * Sets the application controller so the view has a reference.
 * @param controller
 */
View.prototype.setController = function (controller) {
    this.controller = controller;
};


/**
 * Sets the main header text.
 * @param text the text to be applied to the header
 */
View.prototype.setHeader = function (text) {
    this.$headerText.text(text);
};

/**
 * Displays the simulation navigation buttons
 */
View.prototype.showButtons = function () {
    this.$buttonContainer.fadeIn(1000);
};

/**
 * Hides the simulation navigation buttons
 */
View.prototype.hideButtons = function () {
    this.$buttonContainer.hide();
};

//todo add various visual representations of data

//todo add function to chart data after a simulation is run.

//todo add function to show mapping of data
