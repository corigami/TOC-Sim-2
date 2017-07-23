/* global */

/**
 * Defines the menu object
 * @constructor
 */
var Menu = function(view){
        var menuTitle,
        $menuElement,
        $menuList;
        this.view = view;

    this.init(view);
};

Menu.prototype.init = function(){
    this.$menuElement = $('#menu');
    this.menuTitle="";
    this.$menuList = null;
};


/**
 * Creates the menu for scenario selection.  Builds menu items for each scenario that has
 * been loaded into the scenarios object.
 * @param scenarios data build the menu from.  Must be an array of Scenario objects
 */
Menu.prototype.buildScenarioMenu = function(scenarios) {
    var myView= this.view;
    var menu = this;
    this.buildMenuHeader("Choose a Scenario");

    //Build custom scenario option
    var i =0;
    var menuItem = $('<li></li>');
    menuItem.attr("id","scenario-menuItem-" + i++);
    menuItem.attr("class","scenario-menuItem");
    menuItem.append('<p class="scenario-title">Custom Scenario</p>');
    menuItem.append('<p class="scenario-desc">Choose this to define your own nodes</p>');
    menuItem.click(function(){
        toggleMenu();
        myView.setHeader("Custom Scenario");
        menu.buildCustomScenarioMenu();
    });
    this.$menuList.append(menuItem);

    //Build list of scenario options
    scenarios.forEach(function(scenario){
        var menuItem = $('<li></li>');
        menuItem.attr("id","scenario-menuItem-" + i++);
        menuItem.attr("class","scenario-menuItem");
        menuItem.append('<p class="scenario-title">' + scenario.getName() + '</p>');
        menuItem.append('<p class="scenario-desc">' + scenario.getDescription() + '</p>');
        menuItem.click(function(){
            toggleMenu();
            myView.setHeader(scenario.getName());
            menu.buildScenarioDetailsMenu(scenario);
        });
        this.$menuList.append(menuItem);
    },this);
};

/**
 *
 * @param scenario specific scenario details to load.
 */
Menu.prototype.buildScenarioDetailsMenu = function(scenario){
    //TODO finish logic for this function
    var myView= this.view;
    var menu = this;

    //build menu header
    this.buildMenuHeader(scenario.getName() + ' Details');

    //build menu item to display scenario info
    var i =0;
    var nodes = scenario.getNodes();

    //for each node create a menu item that shows its parameters.
    nodes.forEach(function(node){
        var nodeItem,
            nodeDetailContainer,
            nodeTable;

        nodeItem = $('<li></li>');
        nodeItem.attr("class","scenario-node-details");
        nodeDetailContainer = $('<div></div>');
        nodeTable = $('<table id="scenario-node-' + i +'-details" class="node-details">' +
            ' Node '+ node.idNum +'</table>');

        //Iterate through node properties and add to config table
        //Don't need to display idNum to user.
        Object.keys(node).forEach(function(key,index) {
            var rowEl = $('<tr></tr>');
            var keyEl = $('<td>' + key +': </td>');
            if(key != "idNum") {
                var valEl = $('<td><input type="text" id="node-' + node.idNum + '-val" value="' +
                    node[key] + '"></td>');
                rowEl.append(keyEl).append(valEl);
                nodeTable.append(rowEl);
            }
        });
        nodeDetailContainer.append(nodeTable);
        nodeItem.append(nodeDetailContainer);

        this.$menuList.append(nodeItem);
    },this);

};

/**
 * Builds the menu for user to input custom scenario options.
 */
Menu.prototype.buildCustomScenarioMenu = function(){
   //TODO build logic for this function
    this.menuTitle = "Input Custom Node Parameters"
};

Menu.prototype.buildMenuHeader = function(headerText){
    //empty the menu since we are rebuilding it
    this.$menuElement.empty();
    this.menuTitle = headerText;
    var $menuHeader =  $('<div id="menu-header">' + this.menuTitle + '</div>');
    this.$menuList = $('<ul id="menuList"></ul>');
    this.$menuElement.append($menuHeader);
    this.$menuElement.append(this.$menuList);
};



Menu.prototype.getMenu = function() {
    return this.$menuElement;

};

Menu.prototype.getMenuTitle = function(){
    return this.menuTitle;
};

/**
 * Helper function to handle hiding and sowing the menu.
 */
var toggleMenu = function(){
  var checkbox = $('#menuCheckbox');
  var status = checkbox.prop('checked');
    checkbox.prop('checked', !status);
};

