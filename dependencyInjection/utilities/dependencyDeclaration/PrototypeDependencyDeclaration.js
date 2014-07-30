"use strict";
var imports = require(__dirname + '/commonImports.js');

var PrototypeDependencyDeclaration = function (dependencyName, prototypeName) {
	var self = this;
    this._dependencyInformation = new imports.DependencyInformation();
    this._dependencyInformation.dependencyName(dependencyName);
    this._dependencyInformation.prototypeName(prototypeName);

    this._dependencyInformation.dependencyType(imports.dependencyTypes.prototypeDependency);
    this._dependencyInformation.scope(imports.scopeTypes.defaultScope);


    this.from = function (location) {
		self._dependencyInformation.location(location);
    };

    this.populate = function () {
        var module = require(self._dependencyInformation.location());
        var ModulePrototype = module[self._dependencyInformation.prototypeName()];
        this._dependencyInformation.dependencies(imports.getFunctionArguments(ModulePrototype));

        this._dependencyInformation.build = function (dependencies) {
			var object = imports.constructObjectWithArguments(ModulePrototype, imports.buildArguments(self._dependencyInformation.dependencies(), dependencies));
            return object;
        };
    };
};

imports.extend(PrototypeDependencyDeclaration, imports.DependencyDeclarationBase);

module.exports.PrototypeDependencyDeclaration = PrototypeDependencyDeclaration;