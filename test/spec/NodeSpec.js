/* global document, expect, describe, beforeEach, it, View*/

describe("Node Tests", function () {
    var node;
    var data1 = {
        idNumber: 1,
        baseCapacity: 5,
        initWIP: 4,
        capRange: 5,
        varFactor: 2,
        unitName: 'test item1'
    };

    var data2 = {
        idNumber: 2,
        baseCapacity: 5,
        initWIP: 4,
        capRange: 5,
        varFactor: 2,
        unitName: 'test item2'
    };

    var data2 = {
        idNumber: 3,
        baseCapacity: 5,
        initWIP: 4,
        capRange: 5,
        varFactor: 2,
        unitName: 'test item3'
    };


    beforeEach(function () {
        node = new Node(data1);
        node
    });

    describe("Constructor Tests", function () {
        it("should build a node object when passed appropriate data", function () {
            expect(node.idNum).toEqual(1);
            expect(node.baseCapacity).toEqual(5);
            expect(node.initWIP).toEqual(4);
            expect(node.capRange).toEqual(5);
            expect(node.varFactor).toEqual(2);
            expect(node.unitName).toEqual('test item1');
        });

    });

    describe("Functional Tests", function(){
        describe("Capacity Tests", function(){
            it("should be able to calculate Capacity", function(){
                expect(node.calcCap()).toBeTruthy();
            }) ;
        });

        describe("WIP Tests", function(){
            it("should be able to calculate WIP", function(){
                expect(node.calcWIP()).toBeTruthy();
            }) ;
        });

        describe("Efficiency Tests", function(){
            it("should be able to calculate Efficiency", function(){
                expect(node.calcEff()).toBeTruthy();
            }) ;
        });

        describe("Simulation Tests", function(){
            it("should be able to run a simulation production", function(){
                expect(node.runSim()).toBeTruthy();
            }) ;
        });

    });

});