"use strict";

var expect = require('chai').expect;

var appModule = require(__dirname + '/../app.js');

var yinject = appModule;


describe('Integration Test', function () {
	var container, functionUtilities, scopeTypes;
	container = yinject.createDependencyInjectorContainer ([__dirname + '/testModules/diDeclarations.js']);
	it('should not throw an error on a valid run', function () {
		var testRun = function () {
			container = yinject.createDependencyInjectorContainer ([__dirname + '/testModules/diDeclarations.js']);
		};
		expect(testRun).to.not.throw();
	});

	it('should resolve a given dependency with sub dependencies', function () {

		var testRun = function () {
			functionUtilities = container.resolve('functionUtilities');
			scopeTypes = container.resolve('scopeTypes');
		};
		expect(testRun).to.not.throw();
	});
});