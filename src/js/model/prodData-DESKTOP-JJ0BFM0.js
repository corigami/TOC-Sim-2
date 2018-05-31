/**
 * Defines a Production Data object that simply stores data.
 * @constructor
 */
var ProdData = function () {
    var capacity,        //capacity for the day 
        efficiency,      //efficiency for the day
        inputInv,        //starting stock for the day
        invValue,        //what is the value of our starting stock
        missedOps,       //how much wasn't produced due to low WIP
        output,          //how much was produced
        outValue,        //what was the total value of the output 
        wip;             //how many things can we make based on inventory
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
    this.invValue = 0;    
    this.output = 0;      
    this.outValue = 0;    
    this.wip = 0;          
   


};

ProdData.prototype.print = function(){
    for (var property in this) {
        if (this.hasOwnProperty(property)) {
            console.log(property+ ": " + this[property]);
        }
    }
}