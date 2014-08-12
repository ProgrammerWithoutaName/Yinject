"use strict";

var LocationBasedDependencyDeclaration = function () {
};

LocationBasedDependencyDeclaration.prototype.from = function (location) {
	this._dependencyInformation.location = location;
	return this;
};


module.exports.LocationBasedDependencyDeclaration = LocationBasedDependencyDeclaration;