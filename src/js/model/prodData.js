/**
 * Defines a Production Data object that simply stores data.
 * @constructor
 */
var ProdData = function () {
    var capacity,
        efficiency,
        missedOps,
        output,
        inputInv,
        invValue,
        outValue,
        wip;


    this.init();
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
    this.output = 0;
    this.prodVal = 0;
    this.wip = 0;
    this.wipValue = 0;


};

ProdData.prototype.print = function(){

    for (var property in this) {
        if (this.hasOwnProperty(property)) {
            console.log(property+ ": " + this[property]);
        }
    }


}