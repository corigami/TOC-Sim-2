/* global document, expect, describe, beforeEach, it, View*/

describe("Node Tests", function () {

    beforeEach(function () {

    });

    describe("Constructor Tests", function () {
        it("should build a node object when passed appropriate data", function () {
            var data = {
                idNumber: 1,
                baseCapacity: 5,
                initWIP: 4,
                capRange: 5,
                varFactor: 2,
                unitName: 'test item'
            };

            var node = new Node(data);
            expect(node.idNum).toEqual(1);
            expect(node.baseCapacity).toEqual(5);
            expect(node.initWIP).toEqual(4);
            expect(node.capRange).toEqual(5);
            expect(node.varFactor).toEqual(2);
            expect(node.unitName).toEqual('test item');
        });

    });

});