"use strict";
var chai = require('chai');
var functionUtilities = require(__dirname + '/../../js/utilities/functionUtilities.js');

var expect = chai.expect;

var buildArguments = functionUtilities.buildArguments;
var safeFunctionApply = functionUtilities.safeFunctionApply;

// Test values
var testFunctionArgumentNames = ['test1', 'test2', 'test3'];
var testFunctionValues = ['foo',42,'something'];

var testFunctionArgumentValues = {
	test1: testFunctionValues[0],
	test2: testFunctionValues[1],
	test3: testFunctionValues[2]
};

var testBadFunction = function (value) {
	this.badModify = value;
};

describe('functionUtilities', function () {

	describe('buildArguments', function () {
		var returnedArgs = buildArguments(testFunctionArgumentNames, testFunctionArgumentValues);

		it('should return the correct values in the correct order', function () {
			expect(returnedArgs[0]).to.equal(testFunctionValues[0]);
			expect(returnedArgs[1]).to.equal(testFunctionValues[1]);
			expect(returnedArgs[2]).to.equal(testFunctionValues[2]);
		});
	});

	describe('safeFunctionApply', function () {
		it('should not be able to modify any context', function () {
			safeFunctionApply(testBadFunction, ['badValue']);
			expect(this.badModify).to.be.undefined;
		});
	});
});

