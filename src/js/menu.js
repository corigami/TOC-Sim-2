/* global */

/**
 * Defines the menu object
 * @constructor
 */
var Menu = function(view){
        var menuTitle,
        $menuElement;
        this.view = view;

    this.init(view);
};

Menu.prototype.init = function(){
    this.$menuElement = $('#menu');
    this.menuTitle="";
};


/**
 * Creates the menu for scenario selection.  Builds menu items for each scenario that has
 * been loaded into the scenarios object.
 * @param scenarios data build the menu from.  Must be an array of Scenario objects
 */
Menu.prototype.buildScenarioMenu = function(scenarios) {
    var myView= this.view;
    var menu = this;
    this.$menuElement.empty();
    this.menuTitle = "Choose a Scenario";
    var $menuHeader =  $('<div id="menu-header">' + this.menuTitle + '</div>');
    var $menuList = $('<ul id="menuList"></ul>');
    this.$menuElement.append($menuHeader);
    this.$menuElement.append($menuList);
    var i =0;

    //Build custom scenario option
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
    $menuList.append(menuItem);

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
        $menuList.append(menuItem);
    },this);
};

/**
 *
 * @param scenario specific scenario details to load.
 */
Menu.prototype.buildScenarioDetailsMenu = function(scenario){
    //TODO finish logic for this function
    var nodes = scenario.getNodes();

    nodes.forEach(function(node){
        console.log(node);
    });

};

/**
 * Builds the menu for user to input custom scenario options.
 */
Menu.prototype.buildCustomScenarioMenu = function(){
   //TODO build logic for this function
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

