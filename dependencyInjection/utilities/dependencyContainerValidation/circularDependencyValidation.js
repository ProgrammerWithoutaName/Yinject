"use strict";
var nodeUtilities = require(__dirname + '/../../../utilities/nodeUtilities.js');
var requireUtility = nodeUtilities.requireUtility;

var arrayUtilities = requireUtility('arrayUtilities.js');

var forEach = arrayUtilities.forEach;
// Circular dependency Check
var checkForCircularDependencies;

var getErrorChainString = function (errorChain) {
    return "'" + errorChain.join("' -> '") + "'";
};

var getCircularDependencyError = function (dependencyParent, dependencyChild, dependencyChain) {

    var errorChain = dependencyChain.slice(0);
    errorChain.push(dependencyParent);
    errorChain.push(dependencyChild);

    return "Circular reference detected in dependency '" + dependencyParent +
        "'. Circular dependency chain is: " + getErrorChainString(errorChain);
};

var detectCircularDependency = function (dependenciesInChain, dependencyToVerify) {
    // detect error
    forEach(dependenciesInChain, function (chainDependency) {
        if (chainDependency === dependencyToVerify.dependencyName()) {
            throw getCircularDependencyError(dependencyToVerify.dependencyName(), dependencyToVerify.dependencyName(), dependenciesInChain);
        }
        forEach(dependencyToVerify.dependencies(), function (requiredDependency) {
            if (chainDependency === requiredDependency) {
                throw getCircularDependencyError(dependencyToVerify.dependencyName(), requiredDependency, dependenciesInChain);
            }
        });
    });
};

var checkChildren = function (dependencyContainer, parentDependency, dependenciesInChain) {
    dependenciesInChain.push(parentDependency.dependencyName());
    // chain down to detect errors.
    forEach(parentDependency.dependencies(), function (dependency) {
        var chainClone = dependenciesInChain.slice(0);
        checkForCircularDependencies(dependencyContainer, dependencyContainer[dependency], chainClone);
    });
};

checkForCircularDependencies = function (dependencyContainer, dependencyToVerify, dependenciesInChain) {
    if (!dependenciesInChain) {
        dependenciesInChain = [];
    }

    detectCircularDependency(dependenciesInChain, dependencyToVerify);
    checkChildren(dependencyContainer, dependencyToVerify, dependenciesInChain);
};

module.exports.checkForCircularDependencies = checkForCircularDependencies;