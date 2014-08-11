"use strict";
var imports = require(__dirname + '/imports.js');

var PrototypeDependencyDeclaration = function (dependencyName,
												prototype,
												dependencyInformation,
												dependencyValidationUtility,
												dependencyTypes,
												scopeTypes,
												functionUtilities,
												prototypeUtilities,
												propertyBuilderFactory) {
	PrototypeDependencyDeclaration.__base['BaseDependencyDeclaration'] (this,
		dependencyName,
		propertyBuilderFactory,
		dependencyValidationUtility,
		dependencyInformation,
		scopeTypes);

	// dependencies specific to prototype
	this._functionUtilities = functionUtilities;
	this._prototypeUtilities = prototypeUtilities;

	// initial info specific to prototype
	this._dependencyInformation.dependencyType = dependencyTypes.prototypeDependency;

	if(typeof prototype === 'function') {
		this._dependencyInformation.constructorFunction = prototype;
	} else if(typeof prototype === 'string') { // ???? can I do this?
		this._dependencyInformation.prototypeName = prototype;
	}

	var self = this;
	this._propertyBuilder.addGetterProperty('dependencyInformation', function () {
		self.populate();
		return self._dependencyInformation;
	});
};

/*
 ### populate()
 takes information given and populates the rest of dependencyInformation.
 */
PrototypeDependencyDeclaration.prototype.populate = function () {
	if(this._dependencyInformation.constructorFunction === undefined) {
		var module = require(this._dependencyInformation.location);
		this._dependencyInformation.constructorFunction = module[this._dependencyInformation.prototypeName];
	}
	this._createBuildFromConstructor();
};

PrototypeDependencyDeclaration.prototype._createBuildFromConstructor = function () {
	var self = this;
	this._dependencyInformation.dependencies = self._functionUtilities.getFunctionArguments(self._dependencyInformation.constructor);

	this._dependencyInformation.build = function (dependencies) {
		return self._prototypeUtilities.constructObjectWithArguments(self._dependencyInformation.constructorFunction,
			self._functionUtilities.buildArguments(self._dependencyInformation.dependencies, dependencies));
	};
};


var PrototypeDependencyDeclarationFactory = function (dependencyInformationFactory,
														dependencyValidationUtility,
														dependencyTypes,
														scopeTypes,
														functionUtilities,
														prototypeUtilities) {
	this._dependencyInformationFactory = dependencyInformationFactory;
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._dependencyTypes = dependencyTypes;
	this._scopeTypes = scopeTypes;
	this._functionUtilities = functionUtilities;
	this._prototypeUtilities = prototypeUtilities;
};

PrototypeDependencyDeclarationFactory.prototype.createPrototypeDependencyDeclaration = function (dependencyName, prototype) {
	return new PrototypeDependencyDeclaration (dependencyName
		, prototype
		, this._dependencyInformationFactory.createDependencyInformation()
		, this._dependencyValidationUtility
		, this._dependencyTypes
		, this._scopeTypes
		, this._functionUtilities
		, this._prototypeUtilities);
};

//define inheritance for PrototypeDependencyDeclaration.
imports.prototypeOf('PrototypeDependencyDeclaration',PrototypeDependencyDeclaration).
	extends(imports.baseDependencyDeclarationContainer,
			imports.locationBasedDependencyDeclarationContainer);

module.exports.PrototypeDependencyDeclarationFactory = PrototypeDependencyDeclarationFactory;
module.exports.PrototypeDependencyDeclaration = PrototypeDependencyDeclaration;