/******************************************************************************************************************
 *
 *                                                    Node Object
 *
 ******************************************************************************************************************/


/**
 * Defines a node object (station)
 * @param data data to initialize the node with.
 * @constructor
 */
var Node = function (data) {
    var self = this;
    var idNum, //node number
        baseCapacity, //baseline nominal capacity
        capRange, //how much our production can fluctuate (in units)
        initWIP, //the initial number of items we have inventory to produce
        inputNode, //the node we get our input from
        outputNode, //the node we send our output to
        prodValue, //how much is each output item worth
        required, //the number of inventory items required to produce 1 output
        varFactor, //adjusts the distribution of randomness (think number of dice rolled)
        unitName; //What does this node produce.

    //arrays
    var prodData; //data that stores simulation results
    this.init(data);
};

/**
 * Initializes the object
 * @param data data to initialize the node with.
 */
Node.prototype.init = function (data) {
    this.idNum = data.idNum;
    this.baseCapacity = (typeof data.baseCapacity === 'undefined') ? 1 : data.baseCapacity; //default amount of what the node can produce
    this.capRange = (typeof data.capRange === 'undefined') ? 0 : data.capRange; //initial amount of inventory initially in the queue
    this.initWIP = (typeof data.initWIP === 'undefined') ? 0 : data.initWIP;
    this.inputNode = null;
    this.outputNode = null;
    this.prodValue = (typeof data.prodValue === 'undefined') ? 1 : data.prodValue;
    this.required = (typeof data.required === 'undefined') ? 1 : data.required;
    this.unitName = (typeof data.unitName === 'undefined') ? "Default" : data.unitName;
    this.varFactor = (typeof data.varFactor === 'undefined') ? 1 : data.varFactor; //spread of how much the capacity range can fluctuate
    //init arrays;
    this.prodData = []; //array that stores data for each day of the simulation
    this.prodData.push(new ProdData());

    //init pre-production (day 0)data
    var production = this.prodData[0];
    production.wip = (typeof data.initWIP === 'undefined') ? 0 : data.initWIP;
    production.inputInv = production.wip * this.required;
};

/**
 * Simulates producing units based on the inventory it currently has.
 * It then stores its records its production data and transfers its output to nodes in its
 * outputNodes list.
 * @param day The day to calculate for
 */
Node.prototype.runSim = function (day) {

    var production = this.prodData[day]; //initialize starting values for day
    this.prodData[day + 1] = new ProdData(); //initialize tomorrows production data
    production.capacity = this.calcCap(); //update the day's capacity and Works In Progress
    this.calcWIP(day);
    
    //calculate the value of our current inventory
    if (this.inputNode != null) { //if we're not the first node
        production.invValue = production.inputInv * this.inputNode.prodValue
    } else {
        production.invValue = 0; //initial input has no value;
    }

    /*
     * Calculate output - now we need to "do work"...
     * if the wip for the day is greater than today's capacity , our output is equal to our capacity,
     * and we have 0 missed ops.
     * The starting inventory for tomorrow will be what's left over. And our missed ops will be equal
     * to 0 if we have more wip than capacity or capacity - wip if we don't
     */
    if (production.wip >= production.capacity) {
        production.missedOps = 0;
        production.output = production.capacity;
        //otherwise, our output is limited by our wip for the day, and we have our missed ops is equal to
        //today's capacity minus our WIP.
    } else {
        production.output = production.wip;
        production.missedOps = production.capacity - production.wip;
        this.prodData[day + 1].wip = 0;
    }
    //carry over leftover inventory to tomorrows inputInventory (don't need to do for first node)
    if (this.idNum != 1) {
        this.prodData[day + 1].inputInv = production.inputInv - production.output * this.required;
    }
    //calculate the value of today's work
    production.outValue = production.output * this.prodValue;

    //calculate efficiency
    this.calcEff(day);
};

/**
 * Transfers output of node to input of next node.
 * Assumes production has been run for the day for all nodes.
 * @param day The day to calculate for
 */
Node.prototype.transferOutput = function (day) {
    if (this.outputNode != null) {
        this.outputNode.prodData[day + 1].inputInv += this.prodData[day].output;
    }

}

/**
 * Calculates how many items it can produce based on required resources and current inventory
 * Assumes a prodData item as already been created for storing the days values;
 * @param day The day to calculate for
 */
Node.prototype.calcWIP = function (day) {
    var production = this.prodData[day];
    //if we're station 1, our WIP is our capacity
    if (production != undefined) {
        if (this.idNum == 1) {
            production.wip = production.capacity;
        } else if (day != 0) {
            //if it is the first day, all nodes use the init WIP which has already been initialized
            //otherwise its our current inventory divided by required amount.
            production.wip = production.inputInv / this.required;
        }
    } else {
        console.log("Error - prod data has not been initialized");
    }
};

/**
 * Calculates efficiency based on node capacity and how much it what it actually produced;
 * @param day The day to calculate for
 */
Node.prototype.calcEff = function (day) {
    var production = this.prodData[day];
    production.efficiency = production.output / production.capacity;
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

/******************************************************************************************************************
 *
 *                                                    Network Node Object
 *
 ******************************************************************************************************************/


/**
 * Extends the node for network connections;
 * @constructor
 */
var NetworkNode = function (data) {
    //Additional arrays required for network.
    var scenaro,
        inputNodes,
        outputNodes, //list of nodes that will receive output
        inventoryItems, //list of items required to produce work and quantity
        reqResources; //list of items and quantity required for each item

    this.init(data);
};

//link this object to the Node parent class Prototype
NetworkNode.prototype = Object.create(Node.prototype);

NetworkNode.prototype.init = function (data) {
    Node.prototype.init.call(this, data); // calls super init function
    this.required = null;
    this.inputNodes = []; //nodes that produce the items that this node requires
    this.resourceToNodeMap
    this.onHandResources = new Map(); //array used to store simulated stock.
    this.outputNodes = []; //nodes that receive our output.
    this.reqResources = new Map(); //array to store items and amounts required.
};

/**
 * Simulates producing units based on the inventory it currently has.
 * It then stores its records its production data and transfers its output to nodes in its
 * outputNodes list.
 * @param day The day to calculate for
 */
NetworkNode.prototype.runSim = function (day) {

    var production = this.prodData[day]; //initialize starting values for day
    this.prodData[day + 1] = new ProdData(); //initialize tomorrows production data
    production.capacity = this.calcCap(); //update the day's capacity and Works In Progress
    this.calcWIP(day);
    
    //calculate the value of our current inventory
    if (this.inputNodes.length != 0) { //if we're not the first node
        var subTotal = 0;
        this.onHandResources.forEach(function(value, key){
            subTotal += value * this.onHandResources.get(key);
        }, this);
        production.invValue = subTotal;
    } else {
        production.invValue = 0; //initial input has no value;
    }

    /*
     * Calculate output - now we need to "do work"... if the wip for the day is greater than today's capacity , 
     * our output is equal to our capacity, and we have 0 missed ops. The starting inventory for tomorrow will 
     * be what's left over. And our missed ops will be equal to 0 if we have more wip than capacity or capacity - wip 
     * if we don't
     */

    if (production.wip >= production.capacity) {
        production.missedOps = 0;
        production.output = production.capacity;
        //otherwise, our output is limited by our wip for the day, and we have our missed ops is equal to
        //today's capacity minus our WIP.
    } else {
        production.output = production.wip;
        production.missedOps = production.capacity - production.wip;
        this.prodData[day + 1].wip = 0;
    }
    //this is just for data

    //calculate the value of today's work
    production.outValue = production.output * this.prodValue;

    //calculate efficiency
    this.calcEff(day);
    
};

/**
 * Calculates how many items it can produce based on required resources and current inventory
 * Assumes a prodData item as already been created for storing the days values;
 */
NetworkNode.prototype.calcWIP = function (day) {
    var node = this;
    var production = this.prodData[day];
    //if we're station 1, our WIP is our capacity
    if (production != undefined) {
        if(this.inputNodes.length == 0){
            production.wip = production.capacity;
        } //act like a regular node, as we don't have any dependancies
        else  { //if (day != 0)
            var canProduce = true;
            while(canProduce){
                this.reqResources.forEach(function(value, key){
                    if(this.onHandResources.get(key) < value){
                        canProduce = false;
                    }
                }, this);
                if(canProduce){ //we have enough resources to make 1 item
                    production.wip++;
                    this.onHandResources.forEach(function(value, key){
                        var newVal = value - this.reqResources.get(key);
                        this.onHandResources.set(key, newVal);
                    }, this);
                }
            }
        }   
    }
        
} 

/**
 * Transfers output of node to input of next node.
 * Assumes production has been run for the day for all nodes.
 * @param day The day to calculate for
 */
NetworkNode.prototype.transferOutput = function (day) {
    if (this.outputNodes.length != 0) {
        var production = this.prodData[day];
        var output = production.output; 
        while(output > 0){
            for(var i = 0; i < this.outputNodes.length && output > 0; i++){
                var outputNode = this.outputNodes[i];
                outputNode.updateOnHandQty(this.unitName, outputNode.onHandResources.get(this.unitName)+1);
                output--;
            }
        }
    }
}





NetworkNode.prototype.addInputNode = function(node){
    if(!this.inputNodes.includes(node)){
        this.inputNodes.push(node);
    }
}

NetworkNode.prototype.removeInputNode = function(node){
    if(this.inputNodes.includes(node)){
    this.inputNodes.splice(node,1);
    }
}

NetworkNode.prototype.addOutputNode = function(node){
    if(!this.outputNodes.includes(node)){
        this.outputNodes.push(node);
    }
}

NetworkNode.prototype.removeOutputNode = function(node){
    if(this.outputNodes.includes(node)){
        this.outputNodes.splice(node,1);
        }
}

NetworkNode.prototype.updateRequiredResource = function(item, qty){
    this.reqResources.set(item, qty);
    console.log("Node " + this.idNum);
    console.log(this.reqResources);
}

NetworkNode.prototype.removeRequiredResource = function(item){
    this.reqResources.delete(item);
}

NetworkNode.prototype.updateOnHandQty = function(item,qty){
    this.onHandResources.set(item,qty);
}

NetworkNode.prototype.deleteOnHandQty = function(item){
    this.onHandResources.delete(item);
}

NetworkNode.prototype.hasRequirement = function(item){
   return this.reqResources.has(item);
}

NetworkNode.prototype.getNodeValue = function(itemName){
    var value = 0;
    this.inputNodes.forEach(function(node){
        if(node.unitName == itemName){
            value = node.prodValue;
        }
    });
    return value;
 }
