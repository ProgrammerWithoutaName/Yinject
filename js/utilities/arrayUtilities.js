"use strict";

var buildArrayUtilities = function () {
	var arrayUtilities = {};

	arrayUtilities.valueExistsInArray = function (array, value) {
		var i;
		for (i = 0; i < array.length; i++) {
			if (array[i] === value) {
				return true;
			}
		}
		return false;
	};

	arrayUtilities.forEach = function (array, callback) {
		var i;
		for (i = 0; i < array.length; i++) {
			callback(array[i]);
		}
	};

	return arrayUtilities;
};


module.exports.buildArrayUtilities = buildArrayUtilities;