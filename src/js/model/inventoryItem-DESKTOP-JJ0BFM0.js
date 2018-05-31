/**
 * Defines a InventoryItem object (station)
 * @constructor
 */
var InventoryItem = function (name,num) {
    var name,
        num;

    this.init(name, num);

};

/**
 * Initializes the object
 */
InventoryItem.prototype.init = function(name, num){

    this.name = (typeof name === 'undefined') ? "An item" : name ;
    this.num =  (typeof num === 'undefined') ? 0 : num;
};

/**
 * Decreases num by a certain amount or 1 if not specified
 * @param qty amount to increase inventory by.
 */
InventoryItem.prototype.increase = function(qty){
    var incQty = (typeof qty === 'undefined') ? 1 : qty;
    this.num += incQty;
};

/**
 * Decreases num by a certain amount or 1 if not specified
 * @param qty amount to decrease inventory by.
 * @returns {boolean} true if it has enough, false if it can't be done.
 */
InventoryItem.prototype.decrease = function(qty){
    var decQty = (typeof qty === 'undefined') ? 1 : qty;
    if( decQty <= this.num){
        this.num -= decQty;
        return true;
    }else{
        return false;
    }
};