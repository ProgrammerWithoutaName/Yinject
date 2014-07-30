"use strict";
var imports = require(__dirname + '/commonImports.js');

var PrototypeDependencyDeclaration = function (dependencyName, prototypeName) {
    this._dependencyInformation = new imports.DependencyInformation();
    this._dependencyInformation.dependencyName(dependencyName);
    this._dependencyInformation.prototypeName(prototypeName);

    this._dependencyInformation.dependencyType(imports.dependencyTypes.prototypeDependency);
    this._dependencyInformation.scope(imports.scopeTypes.defaultScope);


    this.from = function (location) {
        this._dependencyInformation.location(location);
    };

    this.populate = function () {
        var module = require(this._dependencyInformation.location());
        var ModulePrototype = module[this._dependencyInformation.prototypeName()];
        this._dependencyInformation.dependencies(imports.getFunctionArguments(ModulePrototype));

        this._dependencyInformation.build = function (dependencies) {
            return imports.constructObjectWithArguments(ModulePrototype, imports.buildArguments(this.dependencies, dependencies));
        };
    };
};

imports.extend(PrototypeDependencyDeclaration, imports.DependencyDeclarationBase);

module.exports.PrototypeDependencyDeclaration = PrototypeDependencyDeclaration;