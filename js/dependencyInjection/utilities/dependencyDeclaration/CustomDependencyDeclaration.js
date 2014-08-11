"use strict";

// this is only meant for getting utilities that can't be injected.
var imports = require(__dirname + '/imports.js');

var CustomDependencyDeclaration = function (dependencyName,
											constructor,
											dependencyInformation,
											dependencyValidationUtility,
											functionUtilities,
											propertyBuilderFactory,
											dependencyTypes,
											scopeTypes) {
	CustomDependencyDeclaration.__base['BaseDependencyDeclaration'] (this,
		dependencyName,
		propertyBuilderFactory,
		dependencyValidationUtility,
		dependencyInformation,
		scopeTypes);


	this._dependencyInformation.constructorFunction = constructor;
	this._dependencyInformation.dependencyType = dependencyTypes.customDependency;

	this._functionUtilities = functionUtilities;

	var self = this;
	this._propertyBuilder.addGetterProperty('dependencyInformation', function () {
		self.populate();
		return self._dependencyInformation;
	});
};

CustomDependencyDeclaration.prototype.populate = function () {
	this._dependencyInformation.dependencies(this._functionUtilities.getFunctionArguments(this._dependencyInformation.constructor()));

	this._createBuildFromCustomFunction();
};

CustomDependencyDeclaration.prototype._createBuildFromCustomFunction = function () {
	var self = this;
	self._dependencyInformation.dependencies(this._functionUtilities.getFunctionArguments(self._dependencyInformation.constructor()));

	this._dependencyInformation.build = function (dependencies) {
		var constructedArguments = self._functionUtilities.buildArguments(self._dependencyInformation.dependencies(), dependencies);
		return self._functionUtilities.safeFunctionApply(self._dependencyInformation.constructor(), constructedArguments);
	};
};


// in strongly type languages, I'd simply make a type to cover this.
// Unfortunately, in JS, I feel like this would be not as clear as listing everything out
var CustomDependencyDeclarationFactory = function (dependencyInformationFactory,
												   dependencyValidationUtility,
													dependencyTypes,
													scopeTypes,
													functionUtilities) {

	this._dependencyInformationFactory = dependencyInformationFactory;
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._dependencyTypes = dependencyTypes;
	this._scopeTypes = scopeTypes;
	this._functionUtilities = functionUtilities;
};

CustomDependencyDeclarationFactory.createCustomDependencyDeclaration = function (dependencyName, constructor) {
	return new CustomDependencyDeclaration(dependencyName,
		constructor,
		this._dependencyInformationFactory.createDependencyInformation(),
		this._dependencyValidationUtility,
		this._dependencyTypes,
		this._scopeTypes,
		this._functionUtilities )
};


imports.inheritenceUtilities.prototypeOf('CustomDependencyDeclaration',CustomDependencyDeclaration).
	extends(imports.baseDependencyDeclarationContainer,
			imports.locationBasedDependencyDeclarationContainer);

module.exports.CustomDependencyDeclarationFactory = CustomDependencyDeclarationFactory;
module.exports.CustomDependencyDeclaration = CustomDependencyDeclaration;