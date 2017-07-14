/* global */

function Menu(){
    var self = this;
    self.$menuElement = $('<ul id="menu"></ul>');
    self.menuTitle="";

    self.clear = function () {
        $menuElement = $('<ul id="menu" ></ul>');
    };
    self.getMenu = function() {
        return self.$menuElement;

    };

    self.buildMainMenu = function(scenarios) {
        self.menuTitle = "Main Menu";
        var i =0;
        scenarios.forEach(function(scenario){
           var menuItem = $('<li></li>');
           menuItem.attr("id","scenario-menuItem-" + i++);
           menuItem.text(scenario.getName());
           self.$menuElement.append(menuItem);
        });
    };
}