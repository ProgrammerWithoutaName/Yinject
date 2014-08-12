'use strict';
var requestScope = 'request';
var singletonScope = 'singleton';
var defaultScope = 'default';

/*
 Scope:
 Default: creates new dependency each time
 Request: Only creates one of the types per "resolve"
 Singleton: creates
 */

var allValues = [requestScope, singletonScope, defaultScope];
var scopeTypes;

scopeTypes = {
    requestScope: requestScope,
    singletonScope: singletonScope,
    defaultScope: defaultScope,
    allValues: allValues,
    typeIsValid: function (givenScope) {
        return (allValues.lastIndexOf(givenScope) > -1);
    }
};

module.exports.scopeTypes = scopeTypes;