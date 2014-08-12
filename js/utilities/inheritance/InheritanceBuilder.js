'use strict';

// Utilities that have no business being public
var buildMethodContainer = function (name, owningType) {
	return {
		name: name,
		method: owningType.prototype[name],
		owner: owningType
	};
};

var buildConstructorContainer = function (name, givenType) {
	return {
		name:name,
		method:givenType,
		owner:givenType
	};
};

var buildTypeContainer = function (name, givenType) {
	return {
		name:name,
		givenType: givenType,
		proto: givenType.prototype,
		constructorContainer: buildConstructorContainer(name,givenType),
		getContainerForMethod: function (name) {
			return buildMethodContainer(name, givenType);
		}
	};
};

/**
 * ### InheritanceBuilder (childType, methodExtensionUtility)
 *
 * Creates an InheritanceBuilder, which enables the given type to extend other prototypes.
 * uses methodExtensionUtility, which open up the ability for a method that overrides another method to call it's parent's implementation
 * through the use of method.__base(this,arguments);
 *

 * a method in the child and explicitly call __base(this,arguments);
 *
 *  var methodExtensionUtility = new require('MethodExtensionUtility.js').MethodExtensionUtility(...);
 * 	var Foo = function (someRequirement) {
 * 		Foo.__base(this, someRequirement);
 * 	};
 *
 * 	Foo.prototype.doSomething = function() {
 * 		this.oneThing = 'SomeString';
 * 	}
 *  var extender = new InheritanceBuilder({name:'Foo', givenType:Foo}, methodExtensionUtility);
 *
 * @param {Object} childContainer - this object should contain two variables:
 * 	{
 * 		{String} name: name of child type,
 * 		{Function} givenType: Constructor of child type.
 * 	}
 * @param {Object} methodExtensionUtility utility for extending 'methods' (Functions that specifically belong to prototypes.)
 * @api public
 */
var InheritanceBuilder = function(childContainer, methodExtensionUtility) {
	this._methodExtensionUtility = methodExtensionUtility;
	this.childContainer = buildTypeContainer(childContainer.name, childContainer.givenType, childContainer.givenType);
	this.childType = this._methodExtensionUtility.getTypeUtilitiesFor(this.childContainer.givenType);
};

/**
 * ### InheritanceBuilder.extend (childType, methodExtensionUtility)
 * extends the given type
 *
 * Since this allows for multiple inheritance, it will call all available parents implementations of given method. So, if you have
 * two parents that have the same method that a child overrides, you can either call both, or a specific one through the use of
 * __base['parentName'](this,arguments);
 *
 * Since multiple inheritance is possible, the first method that is implemented will be the one that the child inherits.
 * this will not modify the parent methods __base call. If you want to call both implementations, you will have to create
 *

 *  var methodExtensionUtility = new require('MethodExtensionUtility.js').MethodExtensionUtility(...);
 * 	var Bar = function(someRequirement) {
 * 		this._someRequirement = someRequirement;
 * 	};
 *
 * 	Bar.prototype.doSomething = function(valueToPass) { //value to pass doesn't have to match in child method, but it's nice to have.
 * 		this._someRequirement.doAction(valueToPass);
 * 	};
 *
 * 	Bar.prototype.doBar = function () { this.barValue = 'bar';};
 *
 * 	Bar.prototype.overLapInherit = function () { this.overLap = 'bar'; };
 *
 * 	var Other = function(otherRequirement) {
 * 		this._otherRequirement = otherRequirement;
 * 	};
 *
 * 	Other.prototype.doSomething(valueToPass) {
 * 		this._otherRequirement.doOtherThing(valueToPass);
 * 	}:
 *
 * 	Other.prototype.doOther = function () { this.otherValue = 'other'};
 *
 * 	Other.prototype.overLapInherit = function () { this.overLap = 'other'; };
 *
 * 	var Foo = function (someRequirement, otherRequirement) {
 * 		Foo.__base['Bar'](this, someRequirement);
 * 		Foo.__base['Other'](this, otherRequirement);
 * 	};
 *
 * 	Foo.prototype.doSomething = function(valueToPass) {
 * 		this.oneThing = 'SomeString';
 * 		Foo.prototype.doSomething.__base(this, valueToPass);
 * 	};
 *
 * 	Foo.prototype.doFoo = function () { this.fooValue = 'foo'; };
 *
 *
 *
 *  var extender = new InheritanceBuilder({name:'Foo', givenType:Foo}, methodExtensionUtility);
 *
 *  extender.extend( {'Bar', Bar}, {'Other', Other});
 *
 *  var fooInstance = new Foo(requirementA, requirementB);
 *  fooInstance.doFoo();
 *  // fooInstance.fooValue = 'foo' at this point.
 *
 *  fooInstance.doBar();
 *  // fooInstance.barValue is 'bar'
 *
 *  fooInstance.doOther();
 *  // fooInstance.otherValue is 'other'
 *
 *  fooInstance.doSomething('randomValue');
 *  // fooInstance.oneThing is 'SomeString'(from Foo.doSomething),
 *  // otherRequirement.doOtherThing(valueToPass) was called from Bar
 *  // someRequirement.doAction(valueToPass) was called from Other
 *
 *  fooInstance.overLapInherit();
 *  // fooInstance.overLap is 'Bar', as Bar was the first parent to be extended.
 *
 *
 * @param {Object} types - this object should contain two variables:
 * 	{
 * 		{String} name: name of child type,
 * 		{Function} givenType: Constructor of child type.
 * 	}
 */
InheritanceBuilder.prototype.extend = function(types) {
	// I am extending 1 or many
	// I expect {name: type:} either in array, or as a total number of types.
	var extendTypes;
	var self = this;

	if(typeof types == 'Array') {
		extendTypes = types;
	} else {
		extendTypes = Array.prototype.slice.call(arguments,0);
	}

	extendTypes.forEach(function (parentType) {
		var parentContainer = buildTypeContainer(parentType.name, parentType.givenType);
		self._extendSingle(parentContainer);
	});

	return this;
};

InheritanceBuilder.prototype._extendSingle = function (parentTypeContainer) {
	// make the type inheritable if it isn't already.

	this._confirmMethodInit(this.childContainer.constructorContainer);
	this._confirmMethodInit(parentTypeContainer.constructorContainer);

	if(this.childType.isTypeOf(parentTypeContainer.givenType)) {
		return;
	}

	this.childContainer.givenType.extendMethod(parentTypeContainer.givenType, parentTypeContainer.name);

	this._extendBaseMethods(parentTypeContainer);
};

InheritanceBuilder.prototype._extendBaseMethods = function(parentTypeContainer) {
	this._confirmMethodInit(parentTypeContainer.constructorContainer);
	var childProto = this.childContainer.proto;
	var parentProto = parentTypeContainer.proto;

	// we intentionally iterate over the constructor and pull it in as well.
	// since it exists, we also want the ability to call parent constructors. Same logic applies.
	for(var item in parentProto) {
		if (!childProto.hasOwnProperty(item)) {
			childProto[item] = parentProto[item];
		} else if (typeof childProto[item] === 'function' && item !== 'constructor') {
			this._addMethodParent(item,parentTypeContainer);
		}
	}
};

InheritanceBuilder.prototype._addMethodParent = function (functionName,parentContainer) {

	this._confirmMethodInit(this.childContainer.getContainerForMethod(functionName));
	this._confirmMethodInit( parentContainer.getContainerForMethod(functionName));

	// ONLY add method parent if the child actually owns the function given.
	if(this.childContainer.proto[functionName].__meta.ownerName === this.childContainer.name) {
		this.childContainer.proto[functionName].extendMethod(parentContainer.proto[functionName]);
	}
};

InheritanceBuilder.prototype._confirmMethodInit = function(methodContainer) {
	if(!methodContainer.method.__meta) {
		this._methodExtensionUtility.initInheritableMethod(methodContainer.method, methodContainer.name, methodContainer.owner);
	}
};

var InheritanceBuilderFactory = function(methodExtensionUtility) {
	this._methodExtensionUtility = methodExtensionUtility;
};

InheritanceBuilderFactory.prototype.createInheritanceBuilder = function(childContainer) {
	return new InheritanceBuilder(childContainer, this._methodExtensionUtility);
};

module.exports.InheritanceBuilder = InheritanceBuilder;
module.exports.InheritanceBuilderFactory = InheritanceBuilderFactory;
