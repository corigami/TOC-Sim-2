/* global $, Controller */
//TODO add option ability to change node values.
//TODO add resetAll Capability
var View = function () {
    var controller,
        myMenu,
        $main,
        $menu,
        $headerText,
        $buttonContainer,
        $runButton;
    this.charts = [];
    this.chartContexts = [];
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
    this.$runButton = this.$buttonContainer.find('#run-btn');
    this.$5Button = this.$buttonContainer.find('#5-btn');
    this.$10Button = this.$buttonContainer.find('#10-btn');
    var temp_ctrl = this.controller;
    this.$runButton.click(function(){
        if(temp_ctrl.curDay == 0){
            $('#5-btn').fadeIn(500);
            $('#10-btn').fadeIn(500);
        }
        temp_ctrl.runSim();
    });
    this.$5Button.click(function(){
        temp_ctrl.runSim(5);
    });
    this.$10Button.click(function(){
        temp_ctrl.runSim(10);
    });
   // this.createChartArea(this.$main,"chart");
};

/**
 * Resets the display to its initial state.
 */
View.prototype.resetDisplay = function () {
    this.$main.text("");
    this.$menu.empty();
    this.myMenu = new Menu(this);
    this.charts = [];   
    this.chartContexts = [];
    var myScenarios = this.controller.getScenarios();
    this.myMenu.buildScenarioMenu(myScenarios);
    this.$menu = this.myMenu.getMenu();
    this.setHeader('ToC Simulator 2.0');
    this.createChartArea(this.$main,"chart",400);
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
View.prototype.createChartArea = function(parent, idText, height){
    var canvasEl = $('<canvas height=' + height +'></canvas>'); 
    canvasEl.attr("id", idText);
    parent.append(canvasEl);
    var chartContext = document.getElementById(idText).getContext('2d');
    this.chartContexts.push(chartContext);
    return chartContext;
};

//todo fix drawChart to draw simulation data
View.prototype.drawChart = function(ctx, title){
    var barChart = new BarChart(ctx,this.controller.curScenario, title);
    this.charts.push(barChart);
    };

View.prototype.createNodeChartAreas = function(){
    this.controller.curScenario.nodes.forEach(function(node){
        var chartLabel = "Node" + node.idNum;
        console.log("creating context for node " + node.idNum);
        this.createChartArea(this.$main, chartLabel, 200);
    },this);

}
//todo add function to show mapping of data
