"use strict";
var nodeUtilities = require(__dirname + '/../../js/utilities/nodeUtilities.js').buildNodeUtilities();
// we only need to test 2 forms of functionality here
// RequireFromLocation
// pathOf

var requireFromLocationBuilder = nodeUtilities.requireFromLocationBuilder;
var pathBuilder = nodeUtilities.pathBuilder;

var chai = require('chai');
var expect = chai.expect;

var testModuleLocation = __dirname + '/testModuleValues/test.js';

describe('nodeUtilities', function () {
	describe('pathBuilder', function () {
		var pathOf = pathBuilder(__dirname);

		it('should return the correct path of the given file with a leading slash', function () {
			expect(pathOf('/testModuleValues/test.js')).to.equal(testModuleLocation);
		});

		it('should return the correct path of the given file without a leading slash', function () {
			expect(pathOf('testModuleValues/test.js')).to.equal(testModuleLocation);
		});
	});

	describe('requireFromLocationBuilder', function () {
		var requireFromLocation = requireFromLocationBuilder(__dirname);
		it('should return correct module when given path with a leading slash', function () {
			var module = requireFromLocation('/testModuleValues/test.js');
			expect(module.testWasSuccessful).to.be.true;
		});

		it('should return correct module when given path without a leading slash', function () {
			var module = requireFromLocation('testModuleValues/test.js');
			expect(module.testWasSuccessful).to.be.true;
		});
	});
});