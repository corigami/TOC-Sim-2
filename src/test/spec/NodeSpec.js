/* global document, expect, describe, beforeEach, it, View*/

describe("Node Tests", function () {
    var node;
    var data1 = {
        baseCapacity: 5,
        capRange: 5,
        idNumber: 1,
        initWIP: 4,
        prodValue: 1,
        required: 1,
        unitName: 'test item1',
        varFactor: 2
    };

    var data2 = {
        idNumber: 2,
        baseCapacity: 5,
        initWIP: 4,
        capRange: 5,
        prodValue: 2,
        varFactor: 2,
        required: 2,
        unitName: 'test item2'
    };

    var data3 = {
        idNumber: 3,
        baseCapacity: 5,
        initWIP: 4,
        capRange: 5,
        prodValue: 3,
        required: 3,
        varFactor: 2,
        unitName: 'test item3'
    };

    beforeEach(function () {
        node = new Node(data1);
    });

    describe("Constructor Tests", function () {
        it("should build a Node object when passed appropriate data", function () {
            expect(node.idNum).toEqual(1);
            expect(node.baseCapacity).toEqual(5);
            expect(node.initWIP).toEqual(4);
            expect(node.capRange).toEqual(5);
            expect(node.prodValue).toEqual(1);
            expect(node.varFactor).toEqual(2);
            expect(node.unitName).toEqual('test item1');
            expect(node.required).toEqual(1);
        });

        it("should build a NetworkNode object when passed appropriate data", function () {
            var networkNode = new NetworkNode(data1);
            expect(networkNode.idNum).toEqual(1);
            expect(networkNode.baseCapacity).toEqual(5);
            expect(networkNode.initWIP).toEqual(4);
            expect(networkNode.capRange).toEqual(5);
            expect(node.prodValue).toEqual(1);
            expect(networkNode.varFactor).toEqual(2);
            expect(networkNode.unitName).toEqual('test item1');
            expect(networkNode.required).toEqual(null);
        });
    });

    describe("Functional Tests", function () {
        describe("Random Generator Test - not exact but will find grossly broken distributions", function () {
            it("Should be able to generate a random value (uniform distribution)", function () {
                var ranVal = node.genRandom(0, 10);
                expect(ranVal).toBeGreaterThanOrEqual(0);
                expect(ranVal).toBeGreaterThanOrEqual(0);

                var arrayCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var i;
                for (i = 0; i < 1000; i++) {
                    var value = node.genRandom(0, 10);
                    arrayCount[value] = arrayCount[value] + 1;
                }
                var total = 0;
                for (i = 0; i <= 10; i++) {
                    total = total + (arrayCount[i] * i);
                }
                total = total / 1000;
                //using 1000 runs should give a us an mean very close to the median
                expect(total).toBeGreaterThanOrEqual(4.5);
                expect(total).toBeLessThanOrEqual(5.5);
            });

            it("Should be able to generate a random value (normal distribution)", function () {
                var ranVal = node.genRandom(0, 10);
                expect(ranVal).toBeGreaterThanOrEqual(0);
                expect(ranVal).toBeGreaterThanOrEqual(0);

                var arrayCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var i;
                for (i = 0; i < 1000; i++) {
                    var value = node.genRandom(0, 10, 2);
                    arrayCount[value] = arrayCount[value] + 1;
                }
                var total = 0;
                for (i = 0; i <= 10; i++) {
                    total = total + (arrayCount[i] * i);
                }
                total = total / 1000;
                //using 1000 runs should give a us an mean very close to the median
                expect(total).toBeGreaterThanOrEqual(4.5);
                expect(total).toBeLessThanOrEqual(5.5);
                //our values close to the median should occur more frequently than min and max
                expect(arrayCount[5]).toBeGreaterThan(arrayCount[0]);
                expect(arrayCount[5]).toBeGreaterThan(arrayCount[10]);
            });
        });
    });

    describe("Capacity Tests", function () {
        it("should be able to calculate Capacity", function () {
            var cap = node.calcCap();
            expect(cap).toBeGreaterThanOrEqual(node.baseCapacity - (node.capRange / 2));
            expect(cap).toBeLessThanOrEqual(node.baseCapacity + (node.capRange / 2));
        });
    });

    describe("WIP Tests", function () {
        describe("First node", function () {
            it("should be able to calculate WIP for node 1 based on capacity values", function () {
                production = node.prodData[0];
                production.capacity = 4; //hard code to avoid random values
                node.calcWIP(0);
                expect(production.wip).toEqual(4);
            });
        });

        describe("Other Nodes", function () {
            it("should be able to calulate WIP for all other nodes on day 0 based on initial WIP setting", function () {
                node = new Node(data2);
                production = node.prodData[0];
                node.calcWIP(0);
                expect(production.wip).toEqual(data2.initWIP);
            });

            it("should be able to calc WIP for all other nodes on any day but day zero", function () {
                node = new Node(data2);
                day1Data = new ProdData();
                node.prodData[1] = day1Data;
                day1Data.inputInv = 4;
                node.calcWIP(1);
                expect(day1Data.wip).toEqual(2); //data2 requires 2 inv items
            });
        });
    });
    
    describe("Efficiency Tests", function () {
        it("should be able to calculate Efficiency", function () {
            production = node.prodData[0];
            production.output = 2; //hard code to skip simuluation
            production.capacity = 4
            node.calcEff(0);
            expect(production.efficiency).toEqual(.5);
            production.output = 4; //hard code to skip simuluation
            production.capacity = 4
            node.calcEff(0);
            expect(production.efficiency).toEqual(1);
            production.output = 0; //hard code to skip simuluation
            production.capacity = 4
            node.calcEff(0);
            expect(production.efficiency).toEqual(0);
        });
    });

    describe("Simulation Tests", function () {
        describe("First node", function () {
            it("should be able to run a simulation production", function () {
                node.runSim(0);
                production = node.prodData[0];
                expect(production.output).toEqual(production.capacity);
                expect(production.invValue).toEqual(0);
                var value = production.capacity * node.prodValue;
                expect(production.outValue).toEqual(value);
            });
        });

        describe("Other Nodes", function () {
            it("should be able to run a simulation production", function () {
                node2 = new Node(data2);
                node2.inputNode = node;
                node2.runSim(0);
                production = node2.prodData[0];
                var cap = production.capacity;
                var wip = production.wip;
                if (cap <= wip) {
                    expect(production.output).toEqual(cap);
                } else {
                    expect(production.output).toEqual(wip);
                }
                expect(production.invValue).toEqual(node2.inputNode.prodValue * production.inputInv);
                var value = production.output * node2.prodValue;
                expect(production.outValue).toEqual(value);
            });
        });
    });
});