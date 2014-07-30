"use strict";

var imports = require(__dirname + '/commonImports.js');


var DependencyDeclarationBase = imports.DependencyDeclarationBase;

var CustomDependencyDeclaration = function (dependencyName, constructor) {
    this._dependencyInformation = new imports.DependencyInformation();
    this._dependencyInformation.dependencyName(dependencyName);
    this._dependencyInformation.constructor(constructor);
    this._dependencyInformation.dependencyType(imports.dependencyTypes.customDependency);
    this._dependencyInformation.scope(imports.scopeTypes.defaultScope);

    this.from = function (location) {
        this._dependencyInformation.location(location);
    };

    this.populate = function () {
        var self = this;
        this._dependencyInformation.dependencies(imports.getFunctionArguments(this._dependencyInformation.constructor()));

        this._dependencyInformation.build = function (dependencies) {
            return imports.constructObjectWithArguments(self._dependencyInformation.constructor(), imports.buildArguments(this.dependencies, dependencies));
        };
    };
};

imports.extend(CustomDependencyDeclaration, DependencyDeclarationBase);

module.exports.CustomDependencyDeclaration = CustomDependencyDeclaration;