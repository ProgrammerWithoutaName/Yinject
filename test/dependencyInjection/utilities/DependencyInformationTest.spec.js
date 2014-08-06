'use strict';
var dependencyInformationModule = require(__dirname + '/../../../js/dependencyInjection/utilities/DependencyInformation.js');


var chai = require('chai');
var expect = chai.expect;

//DependencyInformation (propertyFactory, dependencyTypes, scopeTypes)
// DependencyInformationFactory (propertyFactory, dependencyTypes, scopeTypes)


describe('DependencyInformationFactory', function () {
	var scopeTypes = { _name: 'scopeTypes'};
	var dependencyTypes = {_name: 'dependencyTypes'};
	var propertyFactory = {_name: 'propertyFactory',
	createProperty: function(){
		return {addSetEvent:function(){}, addGetEvent:function(){}};
	}};

	var DependencyInformationFactory = dependencyInformationModule.DependencyInformationFactory;
	scopeTypes._name = 'scopeTypes';
	var factory = new DependencyInformationFactory(propertyFactory,scopeTypes,dependencyTypes);

	describe('createDependencyInformation', function () {
		it('should pass the correct dependencies when building a new DependencyInformation', function () {
			var dependencyInformation = factory.createDependencyInformation();
			expect(dependencyInformation._scopeTypes._name).to.equal(scopeTypes._name);
		});

		it('should create a new instance of Yinject each time it is called', function() {
			var dependencyInformationA = factory.createDependencyInformation();
			var dependencyInformationB = factory.createDependencyInformation();
			expect(dependencyInformationA).to.not.equal(dependencyInformationB);
		});
	});
});
//DependencyInformation is pretty much just a data-model. Not sure what I could do test wise.