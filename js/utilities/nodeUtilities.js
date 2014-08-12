"use strict";

var path = require('path');

var pathBuilder = function (basePath) {
    return function (relativeLocation) { return path.join(basePath, relativeLocation); };
};

var requireFromLocationBuilder = function (basePath) {
    return function (relativeLocation) { return require(path.join(basePath, relativeLocation)); };
};

var buildNodeUtilities = function () {
    var nodeUtilities = {};
    // add builders
    nodeUtilities.pathBuilder = pathBuilder;
    nodeUtilities.requireFromLocationBuilder = requireFromLocationBuilder;

    // Default Paths
    nodeUtilities.pathOfUtility = pathBuilder(__dirname);
    nodeUtilities.pathOfEnumeration = pathBuilder(__dirname + '/../enumerations/');

    // Default Requires
    nodeUtilities.requireUtility = requireFromLocationBuilder(__dirname);
    nodeUtilities.requireEnum = requireFromLocationBuilder(__dirname + '/../enumerations/');

    return nodeUtilities;
};


module.exports.buildNodeUtilities = buildNodeUtilities;