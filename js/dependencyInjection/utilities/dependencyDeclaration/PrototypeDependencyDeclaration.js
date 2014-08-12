"use strict";
var imports = require(__dirname + '/imports.js');

var PrototypeDependencyDeclaration = function (dependencyName,
												prototype,
												dependencyInformation,
												dependencyValidationUtility,
												functionUtilities,
												prototypeUtilities,
												propertyBuilderFactory,
												dependencyTypes,
												scopeTypes) {
	PrototypeDependencyDeclaration.__base['BaseDependencyDeclaration'] (this,
		dependencyName,
		dependencyInformation,
		dependencyValidationUtility,
		propertyBuilderFactory,
		scopeTypes);

	// dependencies specific to prototype
	this._functionUtilities = functionUtilities;
	this._prototypeUtilities = prototypeUtilities;

	// initial info specific to prototype
	dependencyInformation.dependencyType = dependencyTypes.prototypeDependency;

	if(typeof prototype === 'function') {
		dependencyInformation.constructorFunction = prototype;
	} else if(typeof prototype === 'string') { // ???? can I do this?
		dependencyInformation.constructorName = prototype;
	}

	var self = this;
	this._propertyBuilder.addGetterProperty('dependencyInformation', function () {
		self.populate();
		return dependencyInformation;
	});
};

/*
 ### populate()
 takes information given and populates the rest of dependencyInformation.
 */
PrototypeDependencyDeclaration.prototype.populate = function () {
	var location = this._dependencyInformation.location;
	var constructorName = this._dependencyInformation.constructorName;
	if(!(this._dependencyInformation.constructorFunction)) {
		var module = require(location);
		this._dependencyInformation.constructorFunction = module[(constructorName)];
	}
	this._createBuildFromConstructor();
};

PrototypeDependencyDeclaration.prototype._createBuildFromConstructor = function () {
	var self = this;
	this._dependencyInformation.dependencies = self._functionUtilities.getFunctionArguments(self._dependencyInformation.constructorFunction);

	this._dependencyInformation.build = function (dependencies) {
		return self._prototypeUtilities.constructObjectWithArguments(self._dependencyInformation.constructorFunction,
			self._functionUtilities.buildArguments(self._dependencyInformation.dependencies, dependencies));
	};
};


//define inheritance for PrototypeDependencyDeclaration.
imports.inheritanceUtilities.prototypeOf('PrototypeDependencyDeclaration',PrototypeDependencyDeclaration).
	extend(imports.baseDependencyDeclarationContainer,
	imports.locationBasedDependencyDeclarationContainer);


// base factory
var PrototypeDependencyDeclarationFactory = function (dependencyInformationFactory,
														dependencyValidationUtility,
														functionUtilities,
														prototypeUtilities,
														propertyBuilderFactory,
														dependencyTypes,
														scopeTypes) {
	if(dependencyInformationFactory === undefined) {
		throw 'dependencyInformation is undefined.'
	}
	this._dependencyInformationFactory = dependencyInformationFactory;
	this._dependencyValidationUtility = dependencyValidationUtility;
	this._dependencyTypes = dependencyTypes;
	this._scopeTypes = scopeTypes;
	this._functionUtilities = functionUtilities;
	this._prototypeUtilities = prototypeUtilities;
	this._propertyBuilderFactory = propertyBuilderFactory;
};

PrototypeDependencyDeclarationFactory.prototype.createPrototypeDependencyDeclaration = function (dependencyName, prototype) {

	return new PrototypeDependencyDeclaration (dependencyName
		, prototype
		, this._dependencyInformationFactory.createDependencyInformation()
		, this._dependencyValidationUtility
		, this._functionUtilities
		, this._prototypeUtilities
		, this._propertyBuilderFactory
		, this._dependencyTypes
		, this._scopeTypes);
};


module.exports.PrototypeDependencyDeclarationFactory = PrototypeDependencyDeclarationFactory;
module.exports.PrototypeDependencyDeclaration = PrototypeDependencyDeclaration;