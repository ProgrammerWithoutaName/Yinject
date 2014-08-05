'use strict';
var yinjectModule = require(__dirname + '/../../js/dependencyInjection/Yinject.js');
var chai = require('chai');
var expect = chai.expect;


//(yinjectDependencyResolution, dependencyDeclarationUtility, dependencyContainerValidation)

//resolve
//ForDependency
// .usePrototype
// .useModule
// .useCustom

// Tests:
// usePrototype returns a prototypeDependencyDeclaration
// useModule returns a moduleDeclaration
// useCustom returns a customDeclaration
// ForDependency passes the name to prototype, module, and custom
// forDependency also saves to "uncheckedDependencys" correctly

// resolve compiles all unchecked
// resolve attempts to resolve

// test for yinject builder

describe('YinjectFactory', function () {
	var YinjectFactory = yinjectModule.YinjectFactory;
	var depResolutionName = 'depResolution';
	var depResolutionFactory = {
		name: 'depResolutionFactory',
		createDependencyResolution: function () { return { name:depResolutionName}; }
	};
	var declaration = { name: 'declaration'};
	var containerValidation = { name: 'containerValidation'};
	var factory = new YinjectFactory(depResolutionFactory, declaration, containerValidation);

	describe('createYinjector', function () {
		it('should pass the correct dependencies when building a new Yinject', function () {
			var yinject = factory.createYinjector();
			expect(yinject._dependencyContainerValidation.name).to.equal(containerValidation.name);
			expect(yinject._resolver.name).to.equal(depResolutionName);
			expect(yinject._dependencyDeclaration.name).to.equal(declaration.name);
		});

		it('should create a new instance of Yinject each time it is called', function() {
			var yinjectA = factory.createYinjector();
			var yinjectB = factory.createYinjector();
			expect(yinjectA).to.not.equal(yinjectB);
		});
	});
});

describe('Yinject', function() {
	describe('resolve', function(){
		it('should add unchecked resolutions to the resolver', function () {
			var depResolution = {};
			var declaration = {};
			var containerValidation = {};
			containerValidation.validateContainer = function () {};
			depResolution.add = function (item) { itemsGiven.push(item.name); };
			depResolution.resolve = function () {};

			var itemsGiven = [];

			var yinject = new yinjectModule.Yinject(depResolution, declaration, containerValidation);
			yinject._uncheckedDeclarations.push({name:'declaration'});
			yinject._uncheckedDeclarations.push({name:'other'});

			yinject.resolve('foo');
			expect(itemsGiven.length).to.equal(2);
			expect(itemsGiven).to.include('declaration');
			expect(itemsGiven).to.include('other');
		});

		it('should attempt to validate dependency container', function () {
			var depResolution = {};
			var declaration = {};
			var containerValidation = {};
			var wasValidated = false;
			containerValidation.validateContainer = function () { wasValidated = true; };
			depResolution.add = function () { };
			depResolution.resolve = function () {};
			depResolution.container = {name:'container'};

			var yinject = new yinjectModule.Yinject(depResolution, declaration, containerValidation);
			yinject._uncheckedDeclarations.push({name:'declaration'});
			yinject._uncheckedDeclarations.push({name:'other'});
			yinject.resolve('foo');

			expect(wasValidated).to.be.true;
		});

		it('should attempt to resolve the dependency given', function () {
			var depResolution = {};
			var declaration = {};
			var containerValidation = {};
			var wasResolved = false;
			containerValidation.validateContainer = function () { };
			depResolution.add = function () { };
			depResolution.resolve = function () { wasResolved = true; };
			depResolution.container = {name:'container'};
			var yinject = new yinjectModule.Yinject(depResolution, declaration, containerValidation);
			yinject.resolve('foo');

			expect(wasResolved).to.be.true;
		});
	});

	describe('forDependency', function () {
		var depResolution = {};
		var declaration = {};
		var containerValidation = {};
		var wasValidated = false;
		containerValidation.validateContainer = function () { wasValidated = true; };
		depResolution.add = function () { };
		depResolution.resolve = function () {};
		depResolution.container = {name:'container'};

		var yinject = new yinjectModule.Yinject(depResolution, declaration, containerValidation);

		describe('useModule', function () {
			it('should attach itself to unchecked dependencies', function () {});
			it('should return a moduleDependencyDeclaration', function () {});
		});

		describe('usePrototype', function () {
			it('should attach itself to unchecked dependencies', function () {});
			it('should return a prototypeDependencyDeclaration', function () {});
		});

		describe('useCustom', function () {
			it('should attach itself to unchecked dependencies', function () {});
			it('should return a customDependencyDeclaration', function () {});
		});

		it('should pass name on to useModule', function () {});
		it('should pass name on to usePrototype', function () {});
		it('should pass name on to useCustom', function () {});
	});
});