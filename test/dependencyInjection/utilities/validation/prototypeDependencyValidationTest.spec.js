'use strict';
var prototypeDependencyValidationModule = require(__dirname + '/../../../../js/dependencyInjection/utilities/validation/prototypeDependencyValidation.js');


var chai = require('chai');
var expect = chai.expect;

// buildPrototypeDependencyValidationUtility (baseDependencyValidationUtility)

describe('prototypeDependencyValidationUtility', function () {
	// mock  baseDependencyValidationUtility.verifyModuleExists(dependencyInformation);
	var baseDependencyValidationUtility = {};
	baseDependencyValidationUtility.verifyModuleExists = function() {
		return {
			TestPrototype: function () {}
		}
	};
	var prototypeDependencyValidation = prototypeDependencyValidationModule.buildPrototypeDependencyValidationUtility(baseDependencyValidationUtility);

	describe('verifyPrototypeDependencyInformation',function(){

		it('should throw an error if prototype does not exist in the module and there is no constructor', function () {
			var dependencyInformationMock = {
				constructorName: 'none',
				location: 'somewhere',
				dependencyName: 'fake',
				constructorFunction: null
			};

			var testRun = function () { prototypeDependencyValidation.verifyPrototypeDependencyInformation(dependencyInformationMock) };
			expect(testRun).to.throw("prototype 'none' was not found on given module 'somewhere'.");
		});

		it('should throw an error if no prototype name exists and no constructor exists', function () {
			var dependencyInformationMock = {
				constructorName: null,
				location: 'somewhere',
				dependencyName: 'fake',
				constructorFunction: null
			};

			var testRun = function () { prototypeDependencyValidation.verifyPrototypeDependencyInformation(dependencyInformationMock) };
			expect(testRun).to.throw("prototype name required for dependency type of 'prototype' for dependency fake");
		});

		it('should throw an error if constructor exists but is not a function', function () {
			var dependencyInformationMock = {
				constructorName: undefined,
				location: 'somewhere',
				dependencyName: 'fake',
				constructorFunction: 'foo'
			};

			var testRun = function () { prototypeDependencyValidation.verifyPrototypeDependencyInformation(dependencyInformationMock) };
			expect(testRun).to.throw("prototype fake's constructor is not a function.");
		});

		it('should not throw an error if constructorName exists on the given module', function () {
			var dependencyInformationMock = {
				constructorName: 'TestPrototype',
				location: 'TestPrototype',
				dependencyName: 'fake',
				constructorFunction: function () {return null;}
			};

			var testRun = function () { prototypeDependencyValidation.verifyPrototypeDependencyInformation(dependencyInformationMock) };
			expect(testRun).to.not.throw();
		});

		it('should not throw an error if constructor exists and is a function', function () {
			var dependencyInformationMock = {
				constructorName: undefined,
				location: null,
				dependencyName:  null,
				constructorFunction: function () {}
			};

			var testRun = function () { prototypeDependencyValidation.verifyPrototypeDependencyInformation(dependencyInformationMock) };
			expect(testRun).to.not.throw();
		});
	});
});