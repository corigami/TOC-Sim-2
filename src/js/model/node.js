//TODO extend Node object to NetworkNode to separate functionality
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
    this.baseCapacity = data.baseCapacity;          //default amount of what the node can produce
    this.initWIP = data.initWIP;                    //initial amount of inventory initially in the queue
    this.capRange = data.capRange;                  //spread of how much the capacity range can fluctuate
    this.varFactor = data.varFactor;
    this.unitName = data.unitName;

    //init arrays;
    this.inputNodes = [];        //nodes that produce the items that this node requires
    this.inventoryItems = new Map();    //array used to store simulated stock.
    this.outputNodes = [];       //nodes that receive our output.
    this.prodData = [];          //array that stores data for each day of the simulation
    this.reqResources = new Map();      //array to store items and amounts required.


};
/**
 * Simulates producing units based on the inventory it currently has.
 * It then stores its records its production data and transfers its output to nodes in its
 * outputNodes list.
 */
Node.prototype.runSim = function () {
};

/**
 * Calculates how many items it can produce based on required resources and current inventory
 * Assumes a prodData item as already been created for storing the days values;
 */
Node.prototype.calcWIP = function (day) {
    //Not Finished!!!!
    //todo create inventory items based on initWIP values, for linear simulations
    //todo create inventory items based on initWIP values for network simulations
    //if we're station 1, our WIP is our capacity
    //if it is the first day, all nodes use the init WIP
    if (this.idNum === 1) {  //if first node, use capacity
        return this.prodData[day].capacity;
    } else if (day === 1) {
        return this.initWIP;
    } else {
        //if its not, we have to make a calculation based on whats in the inventory
        //todo Complelete calcWIP using reqResources and Inventory Item;
    }
};

/**
 * Calculates efficiency based on node capacity and how much it what it actually produced;
 */
Node.prototype.calcEff = function () {
};

/**
 */
Node.prototype.calcCap = function () {
    var min = this.baseCapacity - this.capRange / 2;
    var max = this.baseCapacity + this.capRange / 2;
    min = (min < 0) ? 0 : min;
    return this.genRandom(min, max, this.varFactor);
};

/**
 * Helper function for node simulation
 * Generates a random value.  The higher the variance factor, the closer the distribution will
 * be to the median (max-min)/2)
 * @param min min value for random generator
 * @param max max value for random generator
 * @param varFactor increases likelhood
 * @returns {number} random number.
 */
Node.prototype.genRandom = function (min, max, varFact) {
    //if varFactor is not specified, use varFactor of 1 (uniform distribution)
    var varFactor = (typeof varFact === 'undefined') ? 1 : varFact;
    var total = 0;
    var capacity = 0;
    for (var i = 1; i <= varFactor; i++) {
        capacity = (Math.random() * (max - min + 1) + min);
        total += capacity;
    }
    return Math.floor(total / varFactor);
};
