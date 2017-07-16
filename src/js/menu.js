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
    this.$menuElement = $('<ul id="menu"></ul>');
    console.log(this.$menuElement);
    this.menuTitle="";
};

Menu.prototype.buildMainMenu = function(scenarios) {
    this.menuTitle = "Main Menu";
    var i =0;
    scenarios.forEach(function(scenario){
        var menuItem = $('<li></li>');
        menuItem.attr("id","scenario-menuItem-" + i++);
        menuItem.text(scenario.getName());
        this.$menuElement.append(menuItem);
    },this);
};

Menu.prototype.getMenu = function() {
    return this.$menuElement;

};