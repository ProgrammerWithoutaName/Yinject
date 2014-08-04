"use strict";
var arrayUtil = require(__dirname + '/../../js/utilities/arrayUtilities.js').buildArrayUtilities();
var chai = require('chai');
var expect = chai.expect;

var valueExistsInArray = arrayUtil.valueExistsInArray;
var forEach = arrayUtil.forEach;

var testArray = ['Foo', 'Bar', 3, 5, 12, 42];

describe("ArrayUtilities", function() {
	describe("valueExistsInArray",
		function() {
			beforeEach(function() { });
			afterEach(function() { });


			it('should find a value that exists in an array', function() {
				expect(valueExistsInArray(testArray, 'Foo')).to.be.true;
			});
			it("should not find a value that doesn't exist", function() {
				expect(valueExistsInArray(testArray,'FakeValue')).to.be.false;
			});
		});

	describe("forEach",
		function() {
			beforeEach(function() {});
			afterEach(function() {});
			var clonedArray = [];
			forEach(testArray, function(value) {
				clonedArray.push(value);
			});

			it('should scan over every value in the array', function(){
				var i;
				expect(testArray.length).to.be.equal(clonedArray.length);
				for(i = 0; i < clonedArray.length; i++) {
					expect(testArray[i]).to.be.equal(clonedArray[i]);
				}
			});
		});
});