//TODO extend Node object to NetworkNode to separate functionality
/**
 * Defines a node object (station)
 * @constructor
 */
var Node = function (data) {
    var self = this;
    var idNum,
        baseCapacity,
        initWIP,
        capRange,
        prodValue,
        required,
        varFactor,
        unitName;

    //arrays
    var prodData;     //data that stores simulation results
    this.init(data);
};

/**
 * Initializes the object
 */
Node.prototype.init = function (data) {
    this.idNum = data.idNumber;
    this.baseCapacity = (typeof data.baseCapacity === 'undefined') ? 5: data.baseCapacity;     //default amount of what the node can produce
    this.capRange = (typeof data.capRange === 'undefined') ? 5: data.capRange;     //initial amount of inventory initially in the queue
    this.initWIP = (typeof data.initWIP === 'undefined') ? 0: data.initWIP;
    this.prodValue = (typeof data.prodValue === 'undefined') ? 1: data.prodValue;
    this.required = (typeof data.required === 'undefined') ? 1: data.required;
    this.unitName = (typeof data.unitName === 'undefined') ? "Default" : data.unitName;
    this.varFactor =(typeof data.varFactor === 'undefined') ? 1: data.varFactor;                //spread of how much the capacity range can fluctuate
    //init arrays;
    self.prodData = [];          //array that stores data for each day of the simulation
    self.prodData.push(new ProdData());

    //init pre-production data
    var production = self.prodData[0];
    production.wip = (typeof data.initWIP === 'undefined') ? 0: data.initWIP;
    production.inputInv = production.wip * this.required;
};
/**
 * Simulates producing units based on the inventory it currently has.
 * It then stores its records its production data and transfers its output to nodes in its
 * outputNodes list.
 */
Node.prototype.runSim = function (day) {
    //initialize starting values for day
    var production = self.prodData[day];
    var tomorrowProd = new ProdData();
    this.prodData[day+1] = tomorrowProd;
    production.capacity = this.calcCap();

    //todo unfinished
    //calculate output
    //now we need to "do work"
    //if the new wip for the day is greater than today's capacity,  our output is equal to our capacity,
    //and we have 0 missed ops.  The starting WIP for tomorrow will be what's left over.
    if (production.wip >= production.capacity * this.required) {
        production.outputInv = production.capacity;
        production.missedOp = 0;
        production.prodValue = production.outputInv * this.prodValue;

        //otherwise, our output is limited by our wip for the day, and we have our missed ops is equal to
        //today's capacity minus our WIP.
    } else {

        this.outputInv[day] = this.wip[day];
        this.missedOp[day] = todayCapacity - startingWip;
        this.wip[day + 1] = 0;
    }


};

/**
 * Calculates how many items it can produce based on required resources and current inventory
 * Assumes a prodData item as already been created for storing the days values;
 */0
Node.prototype.calcWIP = function (day) {
    //Not Finished!!!!
    //todo create inventory items based on initWIP values, for linear simulations
    //todo create inventory items based on initWIP values for network simulations
    //if we're station 1, our WIP is our capacity
    //if it is the first day, all nodes use the init WIP
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


/*
********************************************************************************
Network node declaration
*********************************************************************************
 */
/**
 * Extends the node for network connections;
 * @constructor
 */
var NetworkNode = function (data) {
    //Additional arrays required for network.
    var inputNodes,
        outputNodes,    //list of nodes that will receive output
        inventoryItems, //list of items required to produce work and quantity
        reqResources;  //list of items and quantity required for each item

    this.init(data);
};

//link this object to the Node parent class Prototype
NetworkNode.prototype = Object.create(Node.prototype);

NetworkNode.prototype.init = function(data) {
    Node.prototype.init.call(this,data); // calls super init function
    this.required = null;
    this.inputNodes = [];        //nodes that produce the items that this node requires
    this.inventoryItems = new Map();    //array used to store simulated stock.
    this.outputNodes = [];       //nodes that receive our output.
    this.reqResources = new Map();      //array to store items and amounts required.
    console.log(this);
};

/**
 * Calculates how many items it can produce based on required resources and current inventory
 * Assumes a prodData item as already been created for storing the days values;
 */
NetworkNode.prototype.calcWIP = function (day) {
    //Not Finished!!!!
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
}
