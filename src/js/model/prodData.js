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
    this.capacity =0;      //capacity for the day 
    this.efficiency = 0;   //efficiency for the day
    this.missedOps = 0;    //how much wasn't produced due to low WIP
    this.inputInv = 0;     //starting stock for the day
    this.output = 0;       //how much was produced
    this.outValue = 0;     //what was the total value of the output
    this.wip = 0;          //how many things can we make based on inventory
    this.invValue = 0;     //what is the value of our starting stock


};

ProdData.prototype.print = function(){

    for (var property in this) {
        if (this.hasOwnProperty(property)) {
            console.log(property+ ": " + this[property]);
        }
    }


}