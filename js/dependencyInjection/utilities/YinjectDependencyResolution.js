"use strict";

var YinjectDependencyResolution = function (scopeTypes) {
    // private
    this.container = {};
    this._singletons = {};
    this._scopeTypes = scopeTypes;
};

YinjectDependencyResolution.prototype._resolveWithoutScope = function (dependencyInformation, scopes) {
    var resolvedDependencies = {};
    var dependenciesToResolve = dependencyInformation.dependencies;
    var i, currentDependencyInformation;

    for (i = 0; i < dependenciesToResolve.length; i++) {
        currentDependencyInformation = this.container[dependenciesToResolve[i]];


        if (currentDependencyInformation.scopeType === this._scopeTypes.defaultScope) {
            resolvedDependencies[currentDependencyInformation.dependencyName] = this._resolveWithoutScope(currentDependencyInformation, scopes);
        } else {

            resolvedDependencies[currentDependencyInformation.dependencyName] = this._resolveFromScope(scopes[currentDependencyInformation.scopeType],
                currentDependencyInformation,
                scopes);
        }
    }
    return dependencyInformation.build(resolvedDependencies);
};

YinjectDependencyResolution.prototype._resolveFromScope = function (scope, dependencyInformation, scopes) {
    if (scope[dependencyInformation.dependencyName] === undefined) {
        scope[dependencyInformation.dependencyName] = this._resolveWithoutScope(dependencyInformation, scopes);
    }
    return scope[dependencyInformation.dependencyName];
};

// public
YinjectDependencyResolution.prototype.add = function (declaration) {
    declaration.verify();
    declaration.populate();
    var dependencyInformation = declaration.dependencyInformation;
    this.container[dependencyInformation.dependencyName] = dependencyInformation;
};

YinjectDependencyResolution.prototype.resolve = function (dependencyName) {
    var scopes = {};
    scopes[this._scopeTypes.requestScope] = {};
    scopes[this._scopeTypes.singletonScope] = this._singletons;

    var givenDependencyInformation = this.container[dependencyName];
    var resolvedDependency;

    if (givenDependencyInformation.scopeType === this._scopeTypes.defaultScope) {
        resolvedDependency = this._resolveWithoutScope(givenDependencyInformation, scopes);
    } else {
        resolvedDependency = this._resolveFromScope(scopes[givenDependencyInformation.scopeType], givenDependencyInformation, scopes);
    }
    return resolvedDependency;
};

var YinjectDependencyResolutionFactory = function (scopeTypes) {
    this._scopeTypes = scopeTypes;
};

YinjectDependencyResolutionFactory.prototype.createDependencyResolution = function () {
    return new YinjectDependencyResolution(this._scopeTypes);
};

module.exports.YinjectDependencyResolution = YinjectDependencyResolution;
module.exports.YinjectDependencyResolutionFactory = YinjectDependencyResolutionFactory;

