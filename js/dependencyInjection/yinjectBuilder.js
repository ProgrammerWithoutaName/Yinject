'use strict';


var buildYinjectDependencyBuilder = function ( nodeUtilities, yinjectFactory, scopeTypes, dependencyTypes) {
	var diUtilities = {};
	diUtilities.pathBuilder = nodeUtilities.pathBuilder;
	diUtilities.scopeTypes = scopeTypes;
	diUtilities.dependencyTypes = dependencyTypes;

	var yinjectDependencyBuilder = {};

	yinjectDependencyBuilder.addDependenciesToContainer = function (dependencyInjector, iocDeclarationsFileLocation) {
		var ioc = require(iocDeclarationsFileLocation);
		ioc.getDependencyDeclarations(dependencyInjector, diUtilities);
		return dependencyInjector;
	};

	yinjectDependencyBuilder.createDependencyInjectorContainer = function (dependencyFileLocationsArray) {
		var i;
		dependencyFileLocationsArray = dependencyFileLocationsArray || [];
		var container = yinjectFactory.createYinjector();

		for (i = 0; i < dependencyFileLocationsArray.length; i++) {
			container = yinjectDependencyBuilder.addDependenciesToContainer(container, dependencyFileLocationsArray[i]);
		}

		return container;
	};

	return yinjectDependencyBuilder;

};

module.exports.buildYinjectDependencyBuilder = buildYinjectDependencyBuilder;