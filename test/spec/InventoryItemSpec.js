/* global document, expect, describe, beforeEach, it, View*/

describe("InventoryItem Tests", function () {
    var item;
    beforeEach(function () {
        //default constructor for tests
        item = new InventoryItem("widget", 10);
    });

    describe("Constructor Tests", function () {
        it("should create an item with no params", function () {
            item = new InventoryItem();
            expect(item).not.toBeNull();
            expect(item).not.toBeUndefined();
            expect(item.name).toEqual("An item");
            expect(item.num).toEqual(0);
        });

        it("should create an item with name and num params", function () {
            item = new InventoryItem("widget", 10);
            expect(item).not.toBeNull();
            expect(item).not.toBeUndefined();
            expect(item.name).toEqual("widget");
            expect(item.num).toEqual(10);
        });


    });

    describe("Functional Tests", function () {
        describe("increase() tests", function () {
            it("should increase the quantity by 1 with no params", function () {
                item.increase();
                expect(item.num).toEqual(11);
            });
            it("should increase the quantity by qty amount when passed as param", function () {
                item.increase(2);
                expect(item.num).toEqual(12);
            });
        });

        describe("decrease() tests", function () {
            it("should decrease the quantity by 1 with no params", function () {
                var status = item.decrease();
                expect(item.num).toEqual(9);
                expect(status).toBeTruthy();

            });
            it("should decrease the quantity by qty amount when passed as param", function () {
                var status = item.decrease(2);
                expect(item.num).toEqual(8);
                expect(status).toBeTruthy();
            });
            it("shouldn't do anything if the quantity by qty amount when passed is greater than avail", function () {
                var status = item.decrease(12);
                expect(item.num).toEqual(10);
                expect(status).toBeFalsy();
            });
        });
    });
});