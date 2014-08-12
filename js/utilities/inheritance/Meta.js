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
		fn.__meta.base.parentMethods.forEach(function (parentFn) {
			parentFn.apply(context, passedInArgs);
		});
	};
};

var build__callBaseSpecific = function(fn, parentName) {
	return function (context) {
		var passedInArgs = getBaseMethodArguments(arguments);

		var parentFn = fn.__meta.base.parentMethodContainer[parentName];
		parentFn.apply(context, passedInArgs);
	};
};

var Meta = function (fn, name, owner, propertyBuilderFactory, functionUtilities) {
	this._propertyBuilder = propertyBuilderFactory.createPropertyBuilder(this);
	this._functionUtilities = functionUtilities;

	this.name = name;
	this.fn = fn;
	this.owner = owner;

	// solves chicken and egg problem when owner is self.
	this._propertyBuilder.addGetterProperty('ownerName', function () { return fn.__meta.owner.__meta.name;});
	// add the __meta.base method.
	this._createBaseMethod();
	this._propertyBuilder.lockAllProperties();
	delete this._propertyBuilder;
};


Meta.prototype._createBaseMethod = function () {

	this._propertyBuilder.addPropertyWithStartingValue('base', build__BaseMethod(this.fn), false);
	this.base.parentMethods = [];
	this.base.parentMethodContainer = {};
	this.expectedArguments = this._functionUtilities.getFunctionArguments(this.fn);
};

Meta.prototype.addParent = function(name, parentFn) {
	this.base.parentMethodContainer[name] = parentFn;
	this.base.parentMethods.push(parentFn);
	this.base[name] = build__callBaseSpecific(this.fn, name);
};

// Factory
var MetaFactory = function (propertyBuilderFactory, functionUtilities) {
	this._propertyBuilderFactory = propertyBuilderFactory;
	this._functionUtilities = functionUtilities;
};

MetaFactory.prototype.createMeta = function (fn, name, owner) {
	return new Meta(fn, name, owner, this._propertyBuilderFactory, this._functionUtilities);
};

module.exports.Meta = Meta;
module.exports.MetaFactory = MetaFactory;