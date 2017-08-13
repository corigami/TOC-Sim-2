/**
 * Defines scenario objeccts, data and helper functions
 * @constructor
 */
var Scenario = function (data) {
    var name,
        description,
        simType,
        nodes,
        prodData;

    this.init(data);
};

/**
 * Initializes data.  Data should come from persistence adapter or storage class
 * @param data data to initialize the controller with.
 */
Scenario.prototype.init = function (data) {
    this.name = data.name;
    this.description = data.description;
    this.simType = data.simType;
    this.nodes = [];
    this.prodData = [];

    //create an array of Nodes from the raw data.
    data.nodes.forEach(function (nodeData) {
        var node = new Node(nodeData);
        this.nodes.push(node);
    }, this);

    this.connectNodes();

};

/**
 * returns our array of nodes;
 * @returns {Array} of Nodes
 */
Scenario.prototype.getNodes = function () {
    return this.nodes;
};


/**
 * Connects each node to each other
 */
Scenario.prototype.connectNodes = function () {
    if (this.simType = "Normal") {
        for (var i = 0; i < this.nodes.length; i++) {
            if (i != 0) {
                this.nodes[i].inputNode = this.nodes[i - 1];
            }
            if (i != this.nodes.length - 1) {
                this.nodes[i].outputNode = this.nodes[i + 1];
            }

        }
    }
    //todo add logic for SimType = "Network"
}

/**
 * Returns the name of the Scenario
 * @returns {String} Name of Scenario
 */
Scenario.prototype.getName = function () {
    return this.name;
};

/**
 * Returns type of simulation
 * @returns {String} simulation type.
 */
Scenario.prototype.getSimType = function () {
    return this.simType;
};

/**
 * Returns description of scenario
 * @returns {String}
 */
Scenario.prototype.getDescription = function () {
    return this.description;
}