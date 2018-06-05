/* global $, Controller */
var View = function () {
    var controller,
        viewType,
        myMenu,
        $main,
        $chartView,
        $pertView,
        $menu,
        $headerText,
        $buttonContainer,
        $mapButton,
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
    this.$chartView = $('#chart-container');
    this.$pertView = $('#pert-container');
    this.$menu = $('#menu');
    this.$headerText = $('#headertext');
    this.$viewButton = $('#viewButton');
    this.$buttonContainer = $('#ctrl-container');
    this.$runButton = this.$buttonContainer.find('#run-btn');
    this.$5Button = this.$buttonContainer.find('#5-btn');
    this.$10Button = this.$buttonContainer.find('#10-btn');
    this.$reloadButton = $('#reload-button');
    var temp_ctrl = this.controller;
    this.$runButton.click(function () {
        if (temp_ctrl.curDay == 0) {
            $('#5-btn').fadeIn(500);
            $('#10-btn').fadeIn(500);
        }
        temp_ctrl.runSim();
    });
    this.$5Button.click(function () {
        temp_ctrl.runSim(5);
    });
    this.$10Button.click(function () {
        temp_ctrl.runSim(10);
    });
    this.$reloadButton.click(function () {
        $(this).toggleClass("flip");
        temp_ctrl.resetAll();
    });
    var tempView = this;
    this.$viewButton.click(function(){
        tempView.toggleView();
    });
};

/**
 * Resets the display to its initial state.
 */
View.prototype.resetDisplay = function () {
    this.$chartView.empty();
    this.$pertView.empty();
    deletePert();
    this.myMenu = new Menu(this);
    this.charts = [];
    this.chartContexts = [];
    var myScenarios = this.controller.getScenarios();
    this.myMenu.buildScenarioMenu(myScenarios);
    this.$menu = this.myMenu.getMenu();
    this.setHeader('ToC Simulator 2.0');
    this.createChartArea($('#chart-container'), "chartArea", 400);
    this.viewType="charts";
    this.hideButtons();
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
    this.$buttonContainer.show();
    this.$viewButton.show();
};

/**
 * Hides the simulation navigation buttons
 */
View.prototype.hideButtons = function () {
    this.$buttonContainer.fadeOut(500);
    this.$viewButton.fadeOut(500);
    this.$reloadButton.fadeOut(500, function () {
        $(this).removeClass("flip");
    }); `   `
};

View.prototype.toggleView = function(){
    if(this.viewType == 'charts'){
        this.showPert();
    }else{
        this.showCharts();
    }
};

View.prototype.showCharts = function () {
    $('#pert-container').hide();
    $('#chart-container').show();
    this.viewType = 'charts';
};

View.prototype.showPert = function () {
    $('#pert-container').show();
    $('#chart-container').hide();
    this.viewType = 'pert';
}

//todo add various visual representations of data

View.prototype.createChartArea = function (parent, idText, height) {
    var canvasEl = $('<canvas height=' + height + '></canvas>');
    canvasEl.attr("id", idText);
    parent.append(canvasEl);
    var chartContext = document.getElementById(idText).getContext('2d');
    this.chartContexts.push(chartContext);
    return chartContext;
};

View.prototype.drawChart = function (ctx, title) {
    var barChart = new BarChart(ctx, this.controller.curScenario, title);
    this.charts.push(barChart);
};

View.prototype.createNodeChartAreas = function () {
    this.controller.curScenario.nodes.forEach(function (node) {
        var chartLabel = "Node" + node.idNum;
        this.createChartArea(this.$chartView, chartLabel, 200);
    }, this);

}

//todo add function to show mapping of data