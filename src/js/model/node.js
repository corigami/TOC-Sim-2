//TODO build node object out.
/**
 * Defines a node object (station)
 * @constructor
 */
var Node = function (data) {
    var idNum,
        baseCapacity,
        initWIP,
        capRange,
        varFactor,
        unitName;

    this.init(data);

};

/**
 * Initializes the object
 */
Node.prototype.init = function(data){
    this.idNum = data.idNumber;
    this.baseCapacity = data.baseCapacity;
    this.initWIP = data.initWIP;
    this.capRange = data.capRange;
    this.varFactor = data.varFactor;
    this.unitName = data.unitName;
};