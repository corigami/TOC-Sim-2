/* global */

/******************************************************************************************************************
 *
 *                                                    Controller Object
 *
 ******************************************************************************************************************/


/****************************************************************
 * Constructor
 * Definies the controller for the Simulator
 * @param view The view connected to the controller
 * @constructor
 *****************************************************************/
var Controller = function () {
    var self = this;
    var view,
        scenarios,
        model,
        connected = false;

    //scenario variables
    var curScenario,
        curDay;
    this.init();
};

/******************************************************************
 * Init
 * Initializes the controller
 *****************************************************************/
Controller.prototype.init = function () {
    this.view = new View();
    this.view.init(this);
    this.scenarios = [];
    this.curDay = 0;
    //Only have a local model at this point, so hard coding for now.
    //This can be extended to support pulling scenarios from a database
    this.model = new LocalModel(this.scenarios);
    this.view.resetDisplay();
};

/******************************************************************
 * resetAll
 * Resets the controller to it's initial state
 *****************************************************************/
Controller.prototype.resetAll = function () {
    this.curDay = 0;
    if(this.curScenario != undefined)
      this.curScenario.reset();
    this.view.resetDisplay();
    return true;
};

/******************************************************************
 *                       Getters and Setters
 * 
 *****************************************************************/

Controller.prototype.getView = function () {
    return this.view;
};

Controller.prototype.getScenarios = function () {
    return this.scenarios;
};

Controller.prototype.getCurrentScenario = function () {
    return this.curScenario;
};

Controller.prototype.setCurrentScenario = function (scenario) {
    this.curScenario = scenario;
};

Controller.prototype.getModel = function () {
    return this.model;
};

Controller.prototype.setModel = function (model) {
    this.model = model;
};

Controller.prototype.getModelName = function () {
    return this.model.getName();
};

Controller.prototype.getDay = function () {
    return this.curDay;
};

/******************************************************************
 * runSim
 * runs the simulation for one or more days (if specified)
 * @param numDays The number of days to run the simulator for
 *****************************************************************/
Controller.prototype.runSim = function (numDays) {
    if(!this.connected){
        this.curScenario.connectNodes();
    }
    //if its the first day, we need to create the graphs
    if(this.curDay==0){
        for(var i = 0; i < this.view.chartContexts.length; i++){
            var title;
            title = (i==0)? "System Output" : "Node " + i + " Output";
            this.view.drawChart(this.view.chartContexts[i], title);
        }
    }
    var daysToRun = (typeof numDays === 'undefined') ? 1 : numDays;
    for (var i = 0; i < daysToRun; i++) {
        //run production for each of the nodes
        this.curScenario.nodes.forEach(function (node) {
            node.runSim(this.curDay);
        }, this);

        //updates the data for the current scenario
        this.updateScenarioData();

        //update main chart
        this.view.charts[0].updateData(this.curScenario.prodData[this.curDay]);

        //update node charts
        for(var j = 1; j< this.view.charts.length; j++){
            this.view.charts[j].updateData(this.curScenario.nodes[j-1].prodData[this.curDay])
        }

        //transfer the output of each node to the next
        this.curScenario.nodes.forEach(function (node) {
            node.transferOutput(this.curDay);
        }, this);

        //update required resources display
        if(this.curScenario.simType = 'Network'){
            this.curScenario.nodes.forEach(function (node) {
                this.view.myMenu.updateRequiredResource(node);
            }, this);
        }
        this.curScenario.days.push(this.curDay+1);
        this.curDay++;
        
    }
    //now that we are done calculating everything, we can update the charts in the view.
    for(var i = 0; i< this.view.charts.length; i++){
        this.view.charts[i].chart.update();
    }
    this.view.setHeader(this.curScenario.getName() + " - Day:  " + this.curDay);
};//end runSim()

/******************************************************************
 * updateScenarioData
 * updates the current scenarios data to be used for graphs
 *****************************************************************/
Controller.prototype.updateScenarioData = function(){
    //we'll use the ProdData class to store information for the scenario
    var data = new ProdData();
    //output for the scenario is the output of the last node.
   // data.output = this.curScenario.nodes[this.curScenario.nodes.length-1].prodData[this.curDay].output;
    data.output = 0;
    //efficency, wip, and missed ops are totals of all nodes
    this.curScenario.nodes.forEach(function (node) {
        production = node.prodData[this.curDay];
        data.missedOps += production.missedOps;
        data.wip += production.wip;
        data.eff += production.effciency;
        data.output += production.output;
    }, this);
    data.eff = data.eff / this.curScenario.nodes.length;
    this.curScenario.prodData.push(data);
};

/******************************************************************
 * loadScenario
 * loads the scenario object into the the current simulation
 * @param scenario - scenario object to load
 *****************************************************************/
Controller.prototype.loadScenario = function (scenario) {
    this.curScenario = scenario;
    this.view.setHeader(this.curScenario.getName());
    this.view.myMenu.buildScenarioDetailsMenu(this.curScenario);
};

/******************************************************************
 * loadCustom
 * creates default data and scenario data and loads the scenario object
 * into the the current simulation
 * @param scenario - scenario object to load
 *****************************************************************/
Controller.prototype.loadCustom = function () {
    var myData = {};
    myData.name = "Custom";
    myData.description = "A custom scenario";
    myData.simType = $('#simType').val();
    myData.nodes = [];
    var numNodes = parseInt($('#nodes').val());
    for (var i = 1; i <= numNodes; i++){
        var nodeData = {};
        nodeData.idNum = i;
        nodeData.unitName = 'Item ' + i;
        if(myData.simType == 'Network'){
             myData.nodes.push(new NetworkNode(nodeData));
        }else{
            myData.nodes.push(new Node(nodeData));
        }
    }
    this.setCurrentScenario(new Scenario(myData));
    this.view.setHeader(this.getCurrentScenario().getName());
    this.view.myMenu.buildScenarioDetailsMenu(this.getCurrentScenario());
};

/******************************************************************
 * updateResource
 * adds required resources (item) to node
 * @param node - node to add required resource to
 * @param item - text name of item to add
 *****************************************************************/
Controller.prototype.updateResource = function (node, item) {
    var idString = '#' + node.idNum + "-" + this.curScenario.getNodeByName(item).idNum;
    var reqQty = parseInt($(idString + ' [name=requiredBox]').val());
    var onHandQty = parseInt($(idString + ' [name=onHandBox]').val());
    node.updateRequiredResource(item, reqQty);
    node.updateOnHandQty(item, onHandQty);

    //update our node matrix (inputs and outputs)
    var nodeToOutput = this.curScenario.getNodeByName(item);
    nodeToOutput.addOutputNode(node);
    node.addInputNode(nodeToOutput);
}

Controller.prototype.removeResource = function (node, item) {
    console.log("Removing: " + item + "  from node " + node.idNum);
    node.removeRequiredResource(item);
    node.deleteOnHandQty(item);

    //update our node matrix (inputs and outputs)
    var nodeToOutput = this.curScenario.getNodeByName(item);
    nodeToOutput.removeOutputNode(node);
    node.removeInputNode(nodeToOutput);
}