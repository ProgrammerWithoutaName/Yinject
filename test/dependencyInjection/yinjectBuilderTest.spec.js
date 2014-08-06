'use strict';
var yinjectBuilderModule = require(__dirname + '/../../js/dependencyInjection/yinjectBuilder.js');
var chai = require('chai');
var expect = chai.expect;

// buildYinjectDependencyBuilder = function ( nodeUtilities, yinjectFactory, scopeTypes, dependencyTypes) {
// addDependenciesToContainer  (dependencyInjector, iocDeclarationsFileLocation)
// createDependencyInjectorContainer (dependencyFileLocationsArray)

describe('yinjectBuilder', function () {
	var nodeUtilMock = {pathBuilder: {typeName:'pathBuilder'}};
	var yinjectFactoryMock = {
		createYinjector: function () {
			return { typeName:'yinject'};
		}
	};
	var scopeTypesMock = { typeName:'scopeTypes'};
	var dependencyTypesMock = { typeName:'dependencyTypes'};
	var testLocation = __dirname + '/builderTestDeclarations.js';

	describe('addDependenciesToContainer', function () {
		var yinjectBuilder = yinjectBuilderModule.buildYinjectDependencyBuilder(nodeUtilMock, yinjectFactoryMock, scopeTypesMock, dependencyTypesMock);
		var containerMock = {};

		// using require to pull the files. Test file located in same directory as this test. file is "builderTestDeclarations.js"
		yinjectBuilder.addDependenciesToContainer(containerMock, testLocation);
		it('should call "getDependencyDeclarations" in the module given to it.', function () {
			expect(containerMock.testWasSuccessful).to.include(true);
		});
		it('should pass dependencies to getDependencyDeclarations correctly', function () {
			expect(containerMock.diUtilities[0].scopeTypes.typeName).to.equal(scopeTypesMock.typeName);
			expect(containerMock.diUtilities[0].dependencyTypes.typeName).to.equal(dependencyTypesMock.typeName);
			expect(containerMock.diUtilities[0].pathBuilder.typeName).to.equal(nodeUtilMock.pathBuilder.typeName);
		});

	});

	describe('createDependencyInjectionContainer', function () {
		var yinjectBuilder = yinjectBuilderModule.buildYinjectDependencyBuilder(nodeUtilMock, yinjectFactoryMock, scopeTypesMock, dependencyTypesMock);
		var testCount = 10;
		var i;
		var testLocations = [];
		for(i = 0; i < testCount; i++) {
			testLocations.push(testLocation);
		}

		it('should create an empty container if nothing is passed in', function () {
			var returnedContainer;
			var testRun = function(){ returnedContainer = yinjectBuilder.createDependencyInjectorContainer();};
			expect(testRun).to.not.throw(Error);
			expect(returnedContainer).to.not.be.undefined;
		});
		it('should loop through all locations given to it', function () {
			var returnedContainer;
			var testRun = function(){ returnedContainer = yinjectBuilder.createDependencyInjectorContainer(testLocations)};
			expect(testRun).to.not.throw(Error);
			expect(returnedContainer.testWasSuccessful.length).to.equal(10);
		});
	});
});