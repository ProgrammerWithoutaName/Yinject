"use strict";

//TODO: find Stack Overflow comment and attribute this to that comment.
var constructObjectWithArguments = function (constructor, args) {
	var F = function () {
		return constructor.apply(this, args);
	};

	F.prototype = constructor.prototype;
	return new F();
};

module.exports.constructObjectWithArguments = constructObjectWithArguments;