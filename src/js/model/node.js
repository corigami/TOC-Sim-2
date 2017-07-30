//TODO build node object out.
/**
 * Defines a node object (station)
 * @constructor
 */
var Node = function (data) {
    var idNum,
        baseCapacity,
        initWIP,
        capRange,
        varFactor,
        unitName;

    //arrays
    var inputNodes,
        inventoryItems, //list of items required to produce work and quantity
        outputNodes,    //list of nodes that will receive output
        prodData,      //data that stores simulation results
        reqResources;  //list of items and quantity required for each item
    this.init(data);

};

/**
 * Initializes the object
 */
Node.prototype.init = function (data) {
    this.idNum = data.idNumber;
    this.baseCapacity = data.baseCapacity;
    this.initWIP = data.initWIP;
    this.capRange = data.capRange;
    this.varFactor = data.varFactor;
    this.unitName = data.unitName;
    this.prodData = [];

    //init arrays;
    this.inputNodes = [];
    this.inventoryItems = [];
    this.outputNodes = [];
    this.prodData = [];
    this.reqResources = [];
};
/**
 * Simulates producing units based on the inventory it currently has.
 * It then stores its records its production data and transfers its output to nodes in its
 * outputNodes list.
 */
Node.prototype.runSim = function(){
};

/**
 * Calculates how many items it can produce based on required resources and current inventory
 */
Node.prototype.calcWIP = function(){
};

/**
 * Calculates efficiency based on node capacity and how much it what it actually produced;
 */
Node.prototype.calcEff = function(){
};

/**
 * Calculates capacity based on node variance factors;
 */
Node.prototype.calcCap = function(){
};