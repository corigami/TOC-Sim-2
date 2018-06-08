/* global */

/******************************************************************************************************************
 *
 *                                                    Menu Object
 *
 ******************************************************************************************************************/

 /************************************************************* 
 *  Menu Constructor
 **************************************************************/
var Menu = function (_view) {
    var menuTitle,
        $menuElement,
        $menuList,
        view;

    this.init(_view);
};

/****************************************************************
 * init
 * 
 * Initializes Menu to default parameters.
 * @param _view reference to the view the menu object is being added to.
 ****************************************************************/
Menu.prototype.init = function (_view) {
    this.$menuElement = $('#menu');
    this.menuTitle = "";
    this.$menuList = null;
    this.view = _view;
};

/*****************************************************************
 * buildScenarioMenu
 * 
 * Creates the menu for scenario selection.  Builds menu items for each scenario that has
 * been loaded into the scenarios object.
 * @param scenarios data build the menu from.  Must be an array of Scenario objects
 ****************************************************************/
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
       // toggleMenu();
        myView.setHeader("Custom Scenario");
        menu.buildCustomScenarioMenu();
        myView.$reloadButton.show();
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
            myView.controller.loadScenario(scenario);
            myView.$reloadButton.show();
        });
        this.$menuList.append(menuItem);
    }, this);
};

/*****************************************************************
 * buildScenarioDetailsMenu
 * 
 * Loads all the scenario specific data into the menu so it can be manipulated during the
 * running simulation.
 * @param scenario specific scenario details to load.
 ****************************************************************/
Menu.prototype.buildScenarioDetailsMenu = function (scenario) {
    var myView = this.view;
    var menu = this;

    //build menu header
    this.buildMenuHeader(scenario.getName() + ' Details');

    //build menu item to display scenario info
    let i = 1;
    var nodes = scenario.getNodes();

    //for each node create a menu item that shows its parameters.
    nodes.forEach(function (node) {
        var nodeItem,
            nodeDetailContainer,
            nodeNetworkContainer,
            nodeTable;
        nodeItem = $('<div class="node-item"></div>');
        nodeItem.attr("class", "scenario-node-details");
        nodeDetailContainer = $('<div class="nodeDetailContainer"></div>');
        nodeTable = $('<table id="scenario-node-' + i + '-details" class="node-details">' +
            ' Node ' + node.idNum + '</table>');

        //Iterate through node properties and add to config table
        //Don't need to display idNum to user.
        Object.keys(node).forEach(function (key, index) {
            var rowEl = $('<tr></tr>');
            var keyEl = $('<td>' + key + ': </td>');

            //we don't want to display arrays and the idNum as user editable data
            if (key !== "idNum" && !(node[key] instanceof Array ||node[key] instanceof Map || node[key] instanceof Node) && node[key] != null) {
                var idText = "node-" + node.idNum +"-" + key + "-val";
                var valEl = $('<td><input type="text" id="'+ idText + '" value="' + node[key] + '"></td>');
                rowEl.append(keyEl).append(valEl);
                nodeTable.append(rowEl);
                //update the node if user changes values.
                valEl.change(function(){
                    node[key] = parseFloat($('#'+idText).val());
                });
            }
        });

        nodeItem.append(nodeDetailContainer);
        nodeDetailContainer.append(nodeTable);

        if(scenario.getSimType() == "Network"){
            rowEl = $('<tr></tr>');
            var dataEl1 = $('<td></td>');
            var dataEl2 = $('<td></td>');
            var networkButton = $('<button id="networkbutton-' + i + '" class="networkbutton"> Nodes </button>');
            rowEl.append(dataEl1).append(dataEl2);
            dataEl2.append(networkButton);
            nodeTable.append(rowEl);
            var parent = this;
            var idString = '#networkContainer-'+ i;
            networkButton.click(function(){
                parent.toggleNodes(idString);
              });
            var addNodeButton = $('<button id="addNodeButton-' + i +'" class="addbutton"> Add required resource </button>');
            networkContainer = $('<div id="networkContainer-' + i + '" class="networkContainer"></div>');
            networkLabels = $('<div id="networkNodeLabels-' +i+ '">' +
                                '<div class="resourceLabel">Resource</div>' +
                                '<div class="resourceLabel">Amount Required</div>' +
                                '<div class="resourceLabel">On Hand</div>' +
                            '</div>');
            var id = i;
            var buttonId = '#addNodeButton-' + i;
            addNodeButton.click(function(){
                parent.updateResource(id, buttonId);
            });
            networkContainer.append(networkLabels);
            networkContainer.append(addNodeButton);
            networkContainer.hide();
            nodeItem.append(networkContainer);
        }
        this.$menuList.append(nodeItem);
        i++;
    }, this);

    $('#networkContainer-1').show();
    buildPert();
    myView.createNodeChartAreas();
    myView.showCharts();
    myView.showButtons();
}; //end buildScenarioDetailsMenu()

/*****************************************************************
 * updateResource
 * 
 * Helper function that calls the appropriate controller function and updates the
 * UI
 * @param id
 ****************************************************************/
Menu.prototype.updateResource = function(id, buttonId){
    var curNode = this.view.controller.curScenario.getNodeById(id);
    var resourceCont = $('<div class="resourceContainer"></div>');
    var resource = $('<select id="resource-' + id + '" class="resourceItemBox"></select>');
    resourceCont.append(resource);
    var opt = $('<option value="none">Choose...</option>');
    resource.append(opt);
    this.view.controller.curScenario.getNodes().forEach(function (node) {
        if(node.idNum != id && !curNode.hasRequirement(node.unitName)){
            var opt = $('<option value="' + node.unitName+'">'+ node.unitName + '</option>');
            resource.append(opt);
        }
    });
    opt = $('<option value="Remove">Remove</option>');
    resource.append(opt);
    var previous = '';
    var controller = this.view.controller;
    resource.on('click', function(){
        previous = resource.val();
    }).change(function(){
            var resourceItem = resource.val();
            //if user selects remove, remove the 
            if(resourceItem == 'Remove' && resourceItem!= 'none'){
                resourceCont.remove(); 
                controller.removeResource(curNode, previous);
            //We are just adding 
            }else if(previous == 'none'){     
                controller.updateResource(curNode, resourceItem);
                resourceCont.attr('id', curNode.idNum + "-" + controller.curScenario.getNodeByName(resourceItem).idNum);
            //we are changing resources
            }else{
                controller.removeResource(curNode, previous);
                controller.updateResource(curNode, resourceItem);
            }
        });
    var requiredBox = $('<input type="text" name="requiredBox" class="resourceItemBox" value="1"></input>');
    requiredBox.change(function(){
        controller.updateResource(curNode, resource.val()); 
    });

    var onHandBox = $('<input type="text" name="onHandBox" class="resourceItemBox" value="1"></input>');
    onHandBox.change(function(){
        controller.updateResource(curNode, resource.val());  
    });
    resourceCont.append(requiredBox).append(onHandBox);
    resourceCont.insertBefore(buttonId);
}

Menu.prototype.toggleNodes = function(id){
    if ($(id).is(":visible")){
        $(id).hide(200);
    }else{
        $('.networkContainer').hide(200);
        $(id).show(200);
    }
};

/*****************************************************************
 * buildCustomScenarioMenu
 * 
 * Builds the menu for user to input custom scenario options.
 ****************************************************************/
Menu.prototype.buildCustomScenarioMenu = function () {
    var myView = this.view;
    this.$menuList.empty();
    this.buildMenuHeader('Custom Scenario Details');
    var customDetailContainer = $('<div id="custom-settings" class="custom-settings">' +
                                    '<p> Number of Nodes: <input id="nodes" class="settings-input" type="text" name="Stations" value="5"></p>' +
                                    '<p>Simulation Type: <select id="simType" name="simType" class="settings-input select-box"> ' +
                                      '<option value="Normal">Normal</option> ' + 
                                      '<option value="Network" selected="selected">Network</option></select></p>' +
                                    '<button id="load-custom-button" class="load-custom-button" onClick="" type="button" >Load Scenario</button>' +
                                    '</div>');

    this.$menuList.append(customDetailContainer);
    $('#load-custom-button').click(function(){
        myView.controller.loadCustom();
    });
};

/*****************************************************************
 *  buildMenuHeader
 * 
 * Creates the header for the the menu
 * @param headerText text to be displayed in the menu header
 ****************************************************************/
Menu.prototype.buildMenuHeader = function (headerText) {
    //empty the menu since we are rebuilding it
    this.$menuElement.empty();
    this.menuTitle = headerText;
    var $menuHeader = $('<div id="menu-header">' + this.menuTitle + '</div>');
    this.$menuList = $('<ul id="menuList"></ul>');
    this.$menuElement.append($menuHeader);
    this.$menuElement.append(this.$menuList);
};

Menu.prototype.updateRequiredResource = function(node){
    node.onHandResources.forEach(function(value,key){
        var idString = '#' + node.idNum + '-' + this.view.controller.curScenario.getNodeByName(key).idNum;
        var elem =  $(idString + ' [name=onHandBox]');
        elem.attr('value', value);
   }, this);
}

/****************************************************************************************************************************
 * 
 *                                                           Helper Functions
 * 
 ****************************************************************************************************************************/

/*****************************************************************
 * returns the menu element
 * @returns {*|jQuery|HTMLElement}
 ****************************************************************/
Menu.prototype.getMenu = function () {
    return this.$menuElement;
};

/*****************************************************************
 * Gets the Title of the current menu
 * @returns {string|string|*}
 ****************************************************************/
Menu.prototype.getMenuTitle = function () {
    return this.menuTitle;
};

/*****************************************************************
 * Helper function to handle hiding and sowing the menu.
 ****************************************************************/
var toggleMenu = function () {
    var checkbox = $('#menuCheckbox');
    var status = checkbox.prop('checked');
    checkbox.prop('checked', !status);
};

/*****************************************************************
 * Helper function to handle showing the menu.
 ****************************************************************/
var showMenu = function () {
    var checkbox = $('#menuCheckbox');
    checkbox.prop('checked', true);
};

/*****************************************************************
 * Helper function to handle showing the menu.
 ****************************************************************/
var hideMenu = function () {
    var checkbox = $('#menuCheckbox');
    checkbox.prop('checked', false);
};