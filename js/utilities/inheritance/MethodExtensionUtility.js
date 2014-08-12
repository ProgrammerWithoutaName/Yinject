'use strict';

/*
Purpose: This is meant to be used when dealing with Prototype Inheritance.
so, inside of a function, you can call it's parents

Example;
Foo.prototype.doSomething = function (stuff) {
    //code
    this.doSomething.__base(this,stuff);
    or
    this.doSomething.__base['specificParent'](this,stuff);
}
 */


var isTypeOf = function (functionType) {
    var isType = false;

    var meta = this.type.__meta;

    if (meta) {
        isType = isType || meta.base.parentMethods.reduce(function (previousValue, currentValue) {
            var initialTypeCheck = isType || (currentValue === functionType);
            if (!initialTypeCheck && currentValue.isTypeOf) {
                return currentValue.isTypeOf(functionType);
            }
            return initialTypeCheck;
        }, isType);
    } else {
        isType = this.type === functionType;
    }

    return isType;
};

var getTypeUtilitiesFor = function (typeGiven) {

    return {
        type: typeGiven,
        isTypeOf: isTypeOf
    };
};

/***
 * this is attached to a method in a prototype. once it is, that method can extend a parent method.
 * once that parent method has been extended, it will be available in a call to __base.
 * @param parentMethod
 * @param parentMethodOwnerName
 */
var extendMethod = function (parentMethod, parentMethodOwnerName) {
    var name = parentMethod.__meta.ownerName || parentMethodOwnerName;
    this.__meta.addParent(name, parentMethod);
};

// Method Extension Utility Definition
var MethodExtensionUtility = function (metaFactory) {
    this._metaFactory = metaFactory;
};

MethodExtensionUtility.prototype.initInheritableMethod = function (fn, name, owner) {
    var meta = this._metaFactory.createMeta(fn, name, owner);
    fn.__meta = meta;
    fn.__base = meta.base;
    fn.extendMethod = extendMethod;
};

MethodExtensionUtility.prototype.getTypeUtilitiesFor = getTypeUtilitiesFor;

module.exports.MethodExtensionUtility = MethodExtensionUtility;