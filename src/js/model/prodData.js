//TODO build node object out.
/**
 * Defines a Production Data object that simply stores data.
 * @constructor
 */
var ProdData = function () {
    var efficiency,
        missedOps,
        output,
        outputInv,
        prodVal,
        wip,
        wipValue;


    this.init(data);
};

/**
 * Initializes the object
 */
ProdData.prototype.init = function () {
    this.efficiency = 0;
    this.missedOps = 0;
    this.output = 0;
    this.outputInv = 0;
    this.prodVal = 0;
    this.wip = 0;
    this.wipValue = 0;
};
