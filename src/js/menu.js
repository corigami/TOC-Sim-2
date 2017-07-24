/* global */

/**
 * Defines the menu object
 * @constructor
 */
var Menu = function (_view) {
    var menuTitle,
        $menuElement,
        $menuList,
        view;

    this.init(_view);
};

/**
 * Initializes Menu to default parameters.
 * @param _view reference to the view the menu object is being added to.
 */
Menu.prototype.init = function (_view) {
    this.$menuElement = $('#menu');
    this.menuTitle = "";
    this.$menuList = null;
    this.view = _view;
};

/**
 * Creates the menu for scenario selection.  Builds menu items for each scenario that has
 * been loaded into the scenarios object.
 * @param scenarios data build the menu from.  Must be an array of Scenario objects
 */
Menu.prototype.buildScenarioMenu = function (scenarios) {
    var myView = this.view;
    var menu = this;
    this.buildMenuHeader("Choose a Scenario");

    //Build custom scenario option
    var i = 0;
    var menuItem = $('<li></li>');
    menuItem.attr("id", "scenario-menuItem-" + i++);
    menuItem.attr("class", "scenario-menuItem");
    menuItem.append('<p class="scenario-title">Custom Scenario</p>');
    menuItem.append('<p class="scenario-desc">Choose this to define your own nodes</p>');
    menuItem.click(function () {
        toggleMenu();
        myView.setHeader("Custom Scenario");
        menu.buildCustomScenarioMenu();
    });
    this.$menuList.append(menuItem);

    //Build list of scenario options
    scenarios.forEach(function (scenario) {
        var menuItem = $('<li></li>');
        menuItem.attr("id", "scenario-menuItem-" + i++);
        menuItem.attr("class", "scenario-menuItem");
        menuItem.append('<p class="scenario-title">' + scenario.getName() + '</p>');
        menuItem.append('<p class="scenario-desc">' + scenario.getDescription() + '</p>');
        menuItem.click(function () {
            toggleMenu();
            myView.setHeader(scenario.getName());
            menu.buildScenarioDetailsMenu(scenario);
        });
        this.$menuList.append(menuItem);
    }, this);
};

/**
 * Loads all the scenario specific data into the menu so it can be manipulated during the
 * running simulation.
 * @param scenario specific scenario details to load.
 */
Menu.prototype.buildScenarioDetailsMenu = function (scenario) {
    var myView = this.view;
    var menu = this;

    //build menu header
    this.buildMenuHeader(scenario.getName() + ' Details');

    //build menu item to display scenario info
    var i = 0;
    var nodes = scenario.getNodes();

    //for each node create a menu item that shows its parameters.
    nodes.forEach(function (node) {
        var nodeItem,
            nodeDetailContainer,
            nodeTable;

        nodeItem = $('<li></li>');
        nodeItem.attr("class", "scenario-node-details");
        nodeDetailContainer = $('<div></div>');
        nodeTable = $('<table id="scenario-node-' + i + '-details" class="node-details">' +
            ' Node ' + node.idNum + '</table>');

        //Iterate through node properties and add to config table
        //Don't need to display idNum to user.
        Object.keys(node).forEach(function (key, index) {
            var rowEl = $('<tr></tr>');
            var keyEl = $('<td>' + key + ': </td>');
            if (key !== "idNum") {
                var valEl = $('<td><input type="text" id="node-' + node.idNum + '-val" value="' +
                    node[key] + '"></td>');
                rowEl.append(keyEl).append(valEl);
                nodeTable.append(rowEl);
            }
        });
        nodeDetailContainer.append(nodeTable);
        nodeItem.append(nodeDetailContainer);
        this.$menuList.append(nodeItem);

    }, this);
    myView.showButtons();
};

/**
 * Builds the menu for user to input custom scenario options.
 */
Menu.prototype.buildCustomScenarioMenu = function () {
    //TODO build logic for this function
    this.menuTitle = "Input Custom Node Parameters"
};

/**
 * Creates the header for the the menu
 * @param headerText text to be displayed in the menu header
 */
Menu.prototype.buildMenuHeader = function (headerText) {
    //empty the menu since we are rebuilding it
    this.$menuElement.empty();
    this.menuTitle = headerText;
    var $menuHeader = $('<div id="menu-header">' + this.menuTitle + '</div>');
    this.$menuList = $('<ul id="menuList"></ul>');
    this.$menuElement.append($menuHeader);
    this.$menuElement.append(this.$menuList);
};

/**
 * returns the menu element
 * @returns {*|jQuery|HTMLElement}
 */
Menu.prototype.getMenu = function () {
    return this.$menuElement;

};

/**
 * Gets the Title of the current menu
 * @returns {string|string|*}
 */
Menu.prototype.getMenuTitle = function () {
    return this.menuTitle;
};

/**
 * Helper function to handle hiding and sowing the menu.
 */
var toggleMenu = function () {
    var checkbox = $('#menuCheckbox');
    var status = checkbox.prop('checked');
    checkbox.prop('checked', !status);
};

/**
 * Helper function to handle showing the menu.
 */
var showMenu = function () {
    var checkbox = $('#menuCheckbox');
    checkbox.prop('checked', true);
};

/**
 * Helper function to handle showing the menu.
 */
var hideMenu = function () {
    var checkbox = $('#menuCheckbox');
    checkbox.prop('checked', false);
};