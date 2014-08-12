'use strict';
var dependencyValidationModule = require(__dirname + '/../../../../js/dependencyInjection/utilities/validation/dependencyValidation.js');
var dependencyTypes = require(__dirname + '/../../../../js/enumerations/dependencyTypes.js').dependencyTypes;

var chai = require('chai');
var expect = chai.expect;

// buildDependencyValidationUtility = function (dependencyTypes,
//	baseDependencyValidationUtility,
//	prototypeValidationUtility,
//	customDependencyValidationUtility)

describe('dependencyValidationUtility', function () {
	describe('verifyDependencyInformation', function () {
		// Mock Setup
		var baseDependencyValidationMock = {};
		var prototypeValidationDependencyMock = {};
		var customDependencyValidationMock = {};

		baseDependencyValidationMock.verifyBaseDependencyInformation = function (dependencyInformation) {
			dependencyInformation.baseWasCalled = true;
		};

		baseDependencyValidationMock.verifyModuleExists = function (dependencyInformation) {
			dependencyInformation.moduleWasCalled = true;
		};

		prototypeValidationDependencyMock.verifyPrototypeDependencyInformation = function (dependencyInformation) {
			dependencyInformation.prototypeWasCalled = true;
		};

		customDependencyValidationMock.verifyCustomDependencyInformation = function (dependencyInformation) {
			dependencyInformation.customWasCalled = true;
		};

		var createDependencyInformationMock = function (dependencyType) {
			return {
				baseWasCalled: false,
				prototypeWasCalled: false,
				moduleWasCalled: false,
				customWasCalled: false,
				dependencyType: dependencyType
			};
		};

		// Test Setup
		var validation = dependencyValidationModule.buildDependencyValidationUtility( baseDependencyValidationMock,
			prototypeValidationDependencyMock,
			customDependencyValidationMock,
			dependencyTypes);

		var prototypeDI = createDependencyInformationMock(dependencyTypes.prototypeDependency);
		var moduleDI = createDependencyInformationMock(dependencyTypes.moduleDependency);
		var customDI = createDependencyInformationMock(dependencyTypes.customDependency);

		// Test Run
		validation.verifyDependencyInformation(prototypeDI);
		validation.verifyDependencyInformation(moduleDI);
		validation.verifyDependencyInformation(customDI);

		// Test Validation
		it('should call "verifyModuleExists" from baseDependencyValidation if dependencyType is module', function () {
			expect(moduleDI.moduleWasCalled).to.be.true;
		});

		it('should not call verifyPrototypeDependencyInformation or verifyCustomDependencyInformation if dependencyType is module', function () {
			expect(moduleDI.prototypeWasCalled).to.be.false;
			expect(moduleDI.customWasCalled).to.be.false;
		});

		it('should call "verifyPrototypeDependencyInformation if dependencyType is prototype', function () {
			expect(prototypeDI.prototypeWasCalled).to.be.true;
		});

		it('should not directly call verifyModuleExists or verifyCustomDependencyInformation if dependencyType is prototype', function () {
			expect(prototypeDI.moduleWasCalled).to.be.false;
			expect(prototypeDI.customWasCalled).to.be.false;
		});

		it('should call "verifyCustomDependencyInformation" if dependencyType is custom', function () {
			expect(customDI.customWasCalled).to.be.true;
		});

		it('should not directly call verifyModuleExists or verifyPrototypeDependencyInformation if dependencyType is prototype', function () {
			expect(customDI.moduleWasCalled).to.be.false;
			expect(customDI.prototypeWasCalled).to.be.false;
		});

		it('should call verifyBaseDependencyInformation from baseDependencyValidation was called for all dependencyTypes', function () {
			expect(prototypeDI.baseWasCalled).to.be.true;
			expect(moduleDI.baseWasCalled).to.be.true;
			expect(customDI.baseWasCalled).to.be.true;
		});
	});

});