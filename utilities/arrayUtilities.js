"use strict";

var valueExistsInArray = function (array, value) {
    var i;
    for (i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
};

var forEach = function (array, callback) {
    var i;
    for (i = 0; i < array.length; i++) {
        callback(array[i]);
    }
};

module.exports.valueExistsInArray = valueExistsInArray;
module.exports.forEach = forEach;