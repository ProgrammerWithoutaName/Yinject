'use strict';


var Reflection = function ( owner, arrayUtilities) {
	this._owner = owner;
	this._ownerParents = [];
	this._owner.__reflection = this;
	this._arrayUtilities = arrayUtilities;
};

Reflection.prototype.addParent = function (prototype) {
	this._ownerParents.push(prototype);
};

Reflection.prototype.getParentTypes = function (parentArray) {
	var parentTypesToReturn = parentArray || [];

	this._arrayUtilities.forEach(this._ownerParents, function(parent){
		parentTypesToReturn.push(parent);
		if(parent.__reflection) {
			parent.__reflection.getParentTypes(parentTypesToReturn);
		}
	});

	return parentTypesToReturn;
};

Reflection.prototype.isTypeOf = function (typeToMatch) {
	var parents = this.getParentTypes();
	parents.push(this._owner);
	return this._arrayUtilities.valueExistsInArray(parents, typeToMatch);
};

var ReflectionFactory = function (arrayUtilities) {
	this._arrayUtilities = arrayUtilities;
};

ReflectionFactory.prototype.createReflection = function (ownerType) {
	return new Reflection(ownerType, this._arrayUtilities);
};

module.exports.ReflectionFactory = ReflectionFactory;
module.exports.Reflection = Reflection;