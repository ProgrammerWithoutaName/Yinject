"use strict";

var path = require('path');

var pathBuilder = function (basePath) {
    return function (relativeLocation) { return path.join(basePath, relativeLocation); };
};

var requireFromLocationBuilder = function (basePath) {
    return function (relativeLocation) { return require(path.join(basePath, relativeLocation)); };
};


// Path Utilities
module.exports.pathBuilder = pathBuilder;
// tired of typing "pathOf('../../../utilities/someUtility.js')" would be easier to simply do pathOfUtility('someUtility.js');
module.exports.pathOfUtility = pathBuilder(__dirname);
module.exports.pathOfEnumeration = pathBuilder(__dirname + '/../enumerations/');

// Require Utilities
// also tired of typing require(pathOf('something.js'))- it's a pain to write and read.
module.exports.requireFromLocationBuilder = requireFromLocationBuilder;
module.exports.requireUtility = requireFromLocationBuilder(__dirname);
module.exports.requireEnum = requireFromLocationBuilder(__dirname + '/../enumerations/');