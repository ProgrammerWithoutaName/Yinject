"use strict";
var imports = require(__dirname + '/commonImports.js');

var ModuleDependencyDeclaration = function (dependencyName, moduleName) {
    this._dependencyInformation = new imports.DependencyInformation();
    this._dependencyInformation.dependencyName(dependencyName);
    this._dependencyInformation.location(moduleName);
    this._dependencyInformation.dependencies([]);
    this._dependencyInformation.dependencyType(imports.dependencyTypes.moduleDependency);
    this._dependencyInformation.scope(imports.scopeTypes.defaultScope);

    this.populate = function () {
        var self = this;
        this._dependencyInformation.build = function () {
            return require(self._dependencyInformation.location());
        };
    };
};

imports.extend(ModuleDependencyDeclaration, imports.DependencyDeclarationBase);

module.exports.ModuleDependencyDeclaration = ModuleDependencyDeclaration;