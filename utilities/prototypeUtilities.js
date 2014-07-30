"use strict";
var arrayUtils = require(__dirname + '/arrayUtilities.js');
var forEach = arrayUtils.forEach;

// Pulled from douglas Crockfords website
var extend = function (child, parent) {
    child.prototype = parent.prototype;
    return child;
};

//TODO: find Stack Overflow comment and attribute this to that comment.
var constructObjectWithArguments = function (constructor, args) {
    var F = function () {
        return constructor.apply(this, args);
    };

    F.prototype = constructor.prototype;
    return new F();
};

var buildArguments = function (argumentDeclarationArray, argumentValuesObject) {
    var args = [];
    forEach(argumentDeclarationArray, function (declaration) {
        args.push(argumentValuesObject[declaration]);
    });
    return args;
};

module.exports.extend = extend;
module.exports.constructObjectWithArguments = constructObjectWithArguments;
module.exports.buildArguments = buildArguments;