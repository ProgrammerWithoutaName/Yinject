"use strict";

var testArray = ['Foo', 'Bar', 3, 5, 12, 42];

describe("ArrayUtilities.valueExistsInArray",
	function() {
		beforeEach(function() { });
		afterEach(function() { });
		it('should find a value that exists in an array', function() {

			expect(valueExistsInArray(testArray, 'Foo')).to.be.true;
		});
	});
