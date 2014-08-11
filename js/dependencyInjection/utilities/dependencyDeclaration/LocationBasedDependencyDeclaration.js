"use strict";

var LocationBasedDependencyDeclaration = function () {
};

LocationBasedDependencyDeclaration.prototype.from = function (location) {
	self._dependencyInformation.location(location);
};


module.exports.LocationBasedDependencyDeclaration = LocationBasedDependencyDeclaration;