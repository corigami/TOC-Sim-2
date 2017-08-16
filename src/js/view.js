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
View.prototype.createChartArea = function(parent, idText){
    var canvasEl = $('<canvas></canvas>'); 
    canvasEl.attr("id", idText);
    parent.append(canvasEl);
    return ctx = document.getElementById(idText).getContext('2d');
};

//todo fix drawChart to draw simulation data
View.prototype.drawChart = function(ctx){
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

}

//todo add function to show mapping of data
