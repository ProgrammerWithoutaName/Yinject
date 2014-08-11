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


var isTypeOf = function(functionType) {
	var isType = false;

	var base = this.type;

	isType |= base.parentMethods.reduce(function(previousValue, currentValue){
		var initialTypeCheck = isType || (currentValue == functionType);
		if(!initialTypeCheck && currentValue.isTypeOf) {
			return currentValue.isTypeOf(functionType);
		}
		return initialTypeCheck;
	}, isType);

	return isType;
};

var getTypeUtilitiesFor = function(typeGiven) {

	return {
		type: typeGiven,
		isTypeOf: isTypeOf
	};
};

var extendMethod = function(parentMethod, parentMethodOwnerName) {
	this.__base[parentMethod.__ownerName || parentMethodOwnerName] = parentMethod;
	this.__base.parentMethods.push(parentMethod);
};


var getBaseMethodArguments = function(args) {
	var argArray = Array.prototype.slice.call(args, 0);
	// filter out context.
	argArray.shift();
	return argArray;
};

var build__BaseMethod = function(fn) {
	return function (context) {
		var passedInArgs = getBaseMethodArguments(arguments);

		// call all instances
		fn.__base.parentMethods.forEach(function (parentFn) {
			parentFn.apply(context, passedInArgs);
		});
	};
};


// Method Extension Utility Definition
var MethodExtensionUtility = function (functionUtilities, propertyBuilderFactory) {
	this._functionUtilities = functionUtilities;
	this._propertyBuilderFactory = propertyBuilderFactory;
};

MethodExtensionUtility._createBaseMethod = function (fn, propertyBuilder) {
	fn.__base = undefined;

	propertyBuilder.addPropertyWithStartingValue('__base', build__BaseMethod(fn), false);
	fn.__base.parentMethods = [];
	fn.extendMethod = extendMethod;
	fn.expectedArguments = this._functionUtilities.getFunctionArguments(fn);
};

MethodExtensionUtility.prototype.initInheritableMethod = function(fn, name, owner) {
	fn.__name = name;
	fn.__owner = owner || fn;
	// initially undefined, just declaring that this exists.
	fn.__ownerName = undefined;

	var propertyBuilder = this._propertyBuilderFactory.createPropertyBuilder(fn);

	propertyBuilder.addGetterProperty('__ownerName', function () { return fn.__owner.__name;});
	this._createBaseMethod(fn, propertyBuilder);
	propertyBuilder.lockAllProperties();
};

MethodExtensionUtility.prototype.getTypeUtilitiesFor = getTypeUtilitiesFor;

module.exports.MethodExtensionUtility = MethodExtensionUtility;