/* global */

/**
 * Defines the menu object
 * @constructor
 */
var Menu = function(){
    var menuTItle,
        $menuElement;

    this.init();
};

Menu.prototype.init = function(){
    this.$menuElement = $('#menu');
    this.menuTitle="";
};


/**
 * Creates the menu for scenario selection
 * @param scenarios data build the menu from.  Must be an array of Scenario objects
 */
Menu.prototype.buildScenarioMenu = function(scenarios) {
    this.$menuElement.empty();
    this.menuTitle = "Choose a Scenario";
    var $menuHeader =  $('<div id="menu-header">' + this.menuTitle + '</div>');
    var $menuList = $('<ul id="menuList"></ul>');
    this.$menuElement.append($menuHeader);
    this.$menuElement.append($menuList);
    var i =0;
    scenarios.forEach(function(scenario){
        var menuItem = $('<li></li>');
        menuItem.attr("id","scenario-menuItem-" + i++);
        menuItem.attr("class","scenario-menuItem");
        menuItem.append('<p class="scenario-title">' + scenario.getName() + '</p>');
        menuItem.append('<p class="scenario-desc">' + scenario.getDescription() + '</p>');
        menuItem.click(function(){
            toggleMenu();
            alert("you clicked " + scenario.getName());
        });
        $menuList.append(menuItem);
    },this);
};

Menu.prototype.getMenu = function() {
    return this.$menuElement;

};

/**
 * Helper function to handle hiding and sowing the menu.
 */
var toggleMenu = function(){
  var checkbox = $('#menuCheckbox');
  var status = checkbox.prop('checked');
    checkbox.prop('checked', !status);
};

