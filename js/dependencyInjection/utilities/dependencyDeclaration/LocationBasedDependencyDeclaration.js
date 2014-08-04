"use strict";

var LocationBasedDependencyDeclaration = function () {
	throw 'LocationBasedDependencyDeclaration is not meant to be instantiated.';
};

LocationBasedDependencyDeclaration.prototype.from = function (location) {
	self._dependencyInformation.location(location);
};


module.exports.LocationBasedDependencyDeclaration = LocationBasedDependencyDeclaration;