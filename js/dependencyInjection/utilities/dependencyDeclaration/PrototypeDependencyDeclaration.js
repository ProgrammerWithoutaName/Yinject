"use strict";
var imports = require(__dirname + '/imports.js');

var PrototypeDependencyDeclaration = function (dependencyName,
												prototype,
												dependencyInformation,
												dependencyValidationUtility,
												dependencyTypes,
												scopeTypes,
												functionUtilities,
												prototypeUtilities) {

	this._dependencyValidationUtility = dependencyValidationUtility;
	this._functionUtilities = functionUtilities;
	this._prototypeUtilities = prototypeUtilities;

	this._dependencyInformation = dependencyInformation;
	this._dependencyInformation.dependencyName(dependencyName);

	this._dependencyInformation.dependencyType(dependencyTypes.prototypeDependency);
	this._dependencyInformation.scope(scopeTypes.defaultScope);
	if(typeof prototype === 'function') {
		this._dependencyInformation.constructor(prototype);
	} else if(typeof prototype === 'string') { // ???? can I do this?
		this._dependencyInformation.prototypeName(prototype);
	}

};

PrototypeDependencyDeclaration.prototype.populate = function () {
	if(this._dependencyInformation.constructor() === undefined) {
		var module = require(this._dependencyInformation.location());
		this._dependencyInformation.constructor(module[this._dependencyInformation.prototypeName()]);
	}
	this._createBuildFromConstructor();
};

PrototypeDependencyDeclaration.prototype._createBuildFromConstructor = function () {
	var self = this;
	this._dependencyInformation.dependencies(self._functionUtilities.getFunctionArguments(self._dependencyInformation.constructor()));

	this._dependencyInformation.build = function (dependencies) {
		return self._prototypeUtilities.constructObjectWithArguments(self._dependencyInformation.constructor(),
			self._functionUtilities.buildArguments(self._dependencyInformation.dependencies(), dependencies));
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

PrototypeDependencyDeclarationFactory.createPrototypeDependencyDeclaration = function (dependencyName, prototype) {
	return new PrototypeDependencyDeclaration (dependencyName
		, prototype
		, this._dependencyInformationFactory.createDependencyInformation()
		, this._dependencyValidationUtility
		, this._dependencyTypes
		, this._scopeTypes
		, this._functionUtilities
		, this._prototypeUtilities);
};

imports.extend(PrototypeDependencyDeclaration,
	imports.LocationBasedDependencyDeclaration,
	imports.BaseDependencyDeclaration);


module.exports.PrototypeDependencyDeclarationFactory = PrototypeDependencyDeclarationFactory;
module.exports.PrototypeDependencyDeclaration = PrototypeDependencyDeclaration;