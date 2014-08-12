"use strict";

// Everything here was pulled from Angular's Dependency Injection. I reworked it to make the code a bit clearer, but this
// is pretty much exactly the same, but most likely less efficient.
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;


var removeCommentsFromFunctionText = function (functionText) {
    return functionText.replace(STRIP_COMMENTS, '');
};

var getArgumentDeclaration = function (functionText) {
    return functionText.match(FN_ARGS)[1];
};

var createArgumentArray = function (argumentDeclarationText) {
    var args = [];
    argumentDeclarationText.split(FN_ARG_SPLIT).forEach(function (arg) {
        if (arg !== '') {
            args.push(arg.trim());
        }
    });
    return args;
};

var pullArgumentsFromFunctionText = function (functionText) {
    functionText = removeCommentsFromFunctionText(functionText);
    var argumentDeclarations = getArgumentDeclaration(functionText);
    return createArgumentArray(argumentDeclarations);
};

// we have to use RegEx for this.
//Used Angulars libraries to make this. Thank you Google/Angular team.
var getFunctionArguments = function (fn) {
    // confirm fn is a function.
    if (typeof fn !== 'function') {
        return [];
    }
    return pullArgumentsFromFunctionText(fn.toString());
};




module.exports.getFunctionArguments = getFunctionArguments;