/**
 * Defines scenario Data and helper functions
 * @constructor
 */
var Scenario = function(data){
    var self = this;
        self.name = data.name,
        self.simType = data.simType,
        self.nodes = data.nodes;

    /**
     * returns our array of nodes;
     * @returns {Array} of Nodes
     */
    var getNodes = function(){
        return nodes;
    }

    /**
     *
     * @returns {String} Name of Scenario
     */
    var getName = function(){
        return name;
    }

    /**
     * Returns type of simulation
     * @returns {String} simulation type.
     */
    var getSimType = function(){
      return simType;
    };

}