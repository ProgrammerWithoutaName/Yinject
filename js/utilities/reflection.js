'use strict';


var Reflection = function ( owner, arrayUtilities) {
	this.owner = owner;
	this.ownerParents = [];
	this.owner.prototype.__reflection = this;
	this._arrayUtilities = arrayUtilities;
};

Reflection.prototype.addParent = function (prototype) {
	this.ownerParents.push(prototype);
};

Reflection.prototype.getParentTypes = function (prototype, parentArray) {
	var parentTypesToReturn = parentArray || [];
	var i;
	for(i = 0; i < this.ownerParents; i++) {
		parentTypesToReturn.push(this.ownerParents[i]);
		if(!!this.ownerParents[i].__reflection) {
			this.ownerParents[i].__reflection.getParentTypes(prototype,parentTypesToReturn);
		}
	}
	return parentTypesToReturn;
};

Reflection.prototype.isTypeOf = function (prototypeToMatch) {
	var parents = this.getParentTypes();
	parents.push(this.owner);
	return this._arrayUtilities.valueExistsInArray(prototypeToMatch, parents);
};

var ReflectionFactory = function (arrayUtilities) {
	this._arrayUtilities = arrayUtilities;
};

ReflectionFactory.prototype.createReflection = function (ownerType) {
	return new Reflection(ownerType, this._arrayUtilities);
};

module.exports.ReflectionFactory = ReflectionFactory;
module.exports.Reflection = Reflection;