/**
 * Defines scenario objeccts, data and helper functions
 * @constructor
 */
var Scenario = function (data) {
    var name,
        description,
        simType,
        nodes;

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

    //create an array of Nodes from the raw data.
    data.nodes.forEach(function (nodeData) {
        var node = new Node(nodeData);
        this.nodes.push(node);
    }, this);

};

/**
 * returns our array of nodes;
 * @returns {Array} of Nodes
 */
Scenario.prototype.getNodes = function () {
    return this.nodes;
};

/**
 *
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
