'use strict';
var customDependencyValidationModule = require(__dirname + '/../../../../js/dependencyInjection/utilities/validation/customDependencyValidation.js');

var chai = require('chai');
var expect = chai.expect;

describe('customDependencyValidation', function () {
	describe('verifyCustomDependencyInformation', function () {
		var customValidation = customDependencyValidationModule.buildCustomDependencyValidationUtility();

		it('should throw an error if no constructor exists', function () {
			var dependencyInformationMock = {
				dependencyName: 'fake',
				constructorFunction:null
			};
			var testRun = function () {customValidation.verifyCustomDependencyInformation(dependencyInformationMock);};
			expect(testRun).to.throw();

		});

		it('should throw an error if constructor exists, but is not a function', function () {
			var dependencyInformationMock = {
				dependencyName: 'fake',
				constructorFunction: 'not a function'
			};
			var testRun = function () {customValidation.verifyCustomDependencyInformation(dependencyInformationMock);};
			expect(testRun).to.throw();
		});
		it('should not throw an error if constructor exists and is a function', function () {
			var dependencyInformationMock = {
				dependencyName: function () { return 'fake';},
				constructorFunction: function () {return function () {};}
			};
			var testRun = function () {customValidation.verifyCustomDependencyInformation(dependencyInformationMock);};
			expect(testRun).to.not.throw();
		});
	});
});