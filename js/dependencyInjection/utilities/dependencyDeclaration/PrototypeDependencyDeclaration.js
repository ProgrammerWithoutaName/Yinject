"use strict";
var imports = require(__dirname + '/commonImports.js');

var PrototypeDependencyDeclaration = function (dependencyName, prototype) {
    this._dependencyInformation = new imports.DependencyInformation();
    this._dependencyInformation.dependencyName(dependencyName);
    this._dependencyInformation.prototypeName(prototypeName);

    this._dependencyInformation.dependencyType(imports.dependencyTypes.prototypeDependency);
    this._dependencyInformation.scope(imports.scopeTypes.defaultScope);
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
	this._dependencyInformation.dependencies(imports.getFunctionArguments(self._dependencyInformation.constructor()));

	this._dependencyInformation.build = function (dependencies) {
		return imports.constructObjectWithArguments(self._dependencyInformation.constructor(),
			imports.buildArguments(self._dependencyInformation.dependencies(), dependencies));
	};
};


// multiple inheritance with override. order matters, so starting from the left going right will define
// what functions will be kept when there are collisions. if Foo is defined in the child class, we will use childClasses foo
// over the parents 'foo' implementation.
// if there are multiple parents, same thing. in extend(child,parent1,parent2), if foo is defined in parent1 and parent2,
// parent1 implementation will be used over parent2.

imports.extend(PrototypeDependencyDeclaration,
	imports.LocationBasedDependencyDeclaration,
	imports.DependencyDeclarationBase);

module.exports.PrototypeDependencyDeclaration = PrototypeDependencyDeclaration;