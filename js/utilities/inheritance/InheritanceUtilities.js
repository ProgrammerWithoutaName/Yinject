'use strict';

// this is really meant to be a base set of object functionality.

var InheritanceUtilities = function (methodExtensionUtility, functionUtilities, inheritanceBuilderFactory) {
	this._methodExtensionUtility = methodExtensionUtility;
	this._functionUtilities = functionUtilities;
	this._inheritanceBuilderFactory = inheritanceBuilderFactory;

	this._initInheritanceObjectType();

	this.getTypeUtilitiesFor = methodExtensionUtility.getTypeUtilitiesFor;
};

InheritanceUtilities.prototype._initInheritanceObjectType = function () {
	var self = this;
	var InheritanceObject = function () {
		this._type = self._methodExtensionUtility.getTypeUtilitiesFor(this.constructor);
	};

// shouldn't matter. Specifically, this most likely should never get used. If this is, something is being done wrong.
	InheritanceObject.prototype.isTypeOf = function(type) {
		return this._type.isTypeOf(type);
	};

	InheritanceObject.__prototypeName = 'InheritanceObject';

	this._methodExtensionUtility.initInheritableMethod('inheritanceObject',InheritanceObject);

	this._InheritanceObjectType = InheritanceObject;
};

/**
 * ###prototypeOf(typeName, type)
 * This method is used to start the definition of an inheritance tree. not intended to be called on it's own, but instead
 * as part of a chain.
 * exampleCall:
 * prototypeOf('Foo',Foo).extends({'Bar',Bar});
 *
 * can also be chained for multiple inheritance:
 * prototypeOf('Foo',Foo).
 * 	extends({'Bar',Bar}).
 * 	extends({'Other',Other});
 *
 * 	or simply called with an array,
 * * prototypeOf('Foo',Foo).
 * 	extends({'Bar',Bar}, {'Other',Other});
 *
 * or series of containers for extension:
 * 	prototypeOf('Foo',Foo).
 * 	extends([{'Bar',Bar}, {'Other',Other}]);
 *
 * @param typeName - name used for given type
 * @param type - constructor/type definition of Type
 * @returns {*}
 */
InheritanceUtilities.prototype.prototypeOf = function (typeName, type) {
	this._methodExtensionUtility.initInheritableMethod(typeName,type);
	var inheritanceDefinition = this._inheritanceBuilderFactory.createInheritanceBuilder({
		name: typeName,
		givenType: type
	});

	inheritanceDefinition.extend({
		name: this._InheritanceObjectType.__prototypeName,
		givenType: this._InheritanceObjectType});
	return inheritanceDefinition;
};

module.exports.InheritanceUtilities = InheritanceUtilities;

