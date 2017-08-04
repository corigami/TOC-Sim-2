/**
 * Defines a Production Data object that simply stores data.
 * @constructor
 */
var ProdData = function () {
    var capacity,
        efficiency,
        missedOps,
        outputInv,
        inputInv,
        wip,
        wipValue;


    this.init(data);
};

/**
 * Initializes the object
 */
ProdData.prototype.init = function () {
    //init primitives
    this.capacity =0;
    this.efficiency = 0;
    this.missedOps = 0;
    this.inputInv = 0;
    this.outputInv = 0;
    this.prodVal = 0;
    this.wip = 0;
    this.wipValue = 0;


};
