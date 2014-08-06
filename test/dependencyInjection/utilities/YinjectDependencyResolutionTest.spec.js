'use strict';
var yinjectDependencyResolutionModule = require(__dirname + '/../../../js/dependencyInjection/utilities/YinjectDependencyResolution.js');
var scopeTypes = require(__dirname + '/../../../js/enumerations/scopeTypes.js').scopeTypes;

var chai = require('chai');
var expect = chai.expect;

var guid = (function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return function() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	};
})();

describe('YinjectDependencyResolutionFactory', function () {
	var YinjectDependencyResolutionFactory = yinjectDependencyResolutionModule.YinjectDependencyResolutionFactory;
	scopeTypes._name = 'scopeTypes';
	var factory = new YinjectDependencyResolutionFactory(scopeTypes);

	describe('createDependencyResolution', function () {
		it('should pass the correct dependencies when building a new YinjectDependencyResolution', function () {
			var dependencyResolution = factory.createDependencyResolution();
			expect(dependencyResolution._scopeTypes._name).to.equal(scopeTypes._name);
		});

		it('should create a new instance of Yinject each time it is called', function() {
			var dependencyResolutionA = factory.createDependencyResolution();
			var dependencyResolutionB = factory.createDependencyResolution();
			expect(dependencyResolutionA).to.not.equal(dependencyResolutionB);
		});
	});
});

describe('YinjectDependencyResolution', function () {
	describe('add', function () {
		var scopeTypes = {};
		var dependencyResolution = new yinjectDependencyResolutionModule.YinjectDependencyResolution(scopeTypes);

		var orderCalled = 1;
		var verifyCalled = 0;
		var getDependencyInformationCalled = 0;
		var populateCalled = 0;

		var testDependency = {
			dependencyName: 'test',
			mockName: 'dependencyInformation',
			verify: function () {verifyCalled = orderCalled; orderCalled++;},
			populate: function () {populateCalled = orderCalled; orderCalled++;},
			getDependencyInformation: function () {
				getDependencyInformationCalled = orderCalled;
				orderCalled++;
				return {
					dependencyName: function () { return 'test'; },
					isMockOf: testDependency.mockName
				};
			}
		};

		var testCall = function () { dependencyResolution.add(testDependency); };

		it('should not error out when called with valid information', function () {
			expect(testCall).to.not.throw(Error);
		});

		it('should call verify on the object given before calling anything else', function () {
			expect(verifyCalled).to.equal(1);
		});

		it('should call populate on the object given before getting dependencyInformation', function () {
			expect(populateCalled).to.be.lessThan(getDependencyInformationCalled);
		});

		it('should call getDependencyInformation on the object given to get the dependencyInformation', function () {
			expect(getDependencyInformationCalled).to.be.greaterThan(0);
		});

		it('should add dependencyInformation to container using the dependencyName field in dependencyInformation', function () {
			expect(dependencyResolution.container[testDependency.dependencyName]).to.not.be.undefined;
			expect(dependencyResolution.container[testDependency.dependencyName].dependencyName()).to.equal(testDependency.dependencyName);
			expect(dependencyResolution.container[testDependency.dependencyName].isMockOf).to.equal(testDependency.mockName);
		});
	});


	describe('resolve', function () {


		// create 15 fake dependencies

		// fake dependency maker:
		var MockDependency = function (dependencyName, scopeType, dependencies, buildFunction) {
			this.dependencyName = function() {return dependencyName;} ;
			this.scopeType = function () {return scopeType;} ;
			this.dependencies = function () { return dependencies;} ;
			this.build = buildFunction;
		};

		var createBuildFunction = function (name) {
			return function(resolvedDependencies) {
				return {
					name:name,
					givenDependencies:resolvedDependencies,
					id: guid() // this is here so I can confirm build is being called multiple times.
				};
			};
		};

		// basics
		var defaultDependencyNone = new MockDependency('defaultNone', scopeTypes.defaultScope, [], createBuildFunction('defaultNone'));
		var requestDependencyNone = new MockDependency('requestNone', scopeTypes.requestScope, [], createBuildFunction('requestNone'));
		var singletonDependencyNone = new MockDependency('singletonNone', scopeTypes.singletonScope, [], createBuildFunction('singletonNone'));

		// 1 level sub dependencies
		var dependenciesSub1 = ['defaultNone','requestNone','singletonNone'];
		var defaultDependencySub1 = new MockDependency('defaultSub1', scopeTypes.defaultScope, dependenciesSub1, createBuildFunction('defaultSub1'));
		var requestDependencySub1 = new MockDependency('requestSub1', scopeTypes.requestScope, dependenciesSub1, createBuildFunction('requestSub1'));
		var singletonDependencySub1 = new MockDependency('singletonSub1', scopeTypes.singletonScope, dependenciesSub1, createBuildFunction('singletonSub1'));

		// 2 level sub dependencies
		var dependenciesSub2 = ['defaultSub1','requestSub1','singletonSub1'];
		var defaultDependencySub2 = new MockDependency('defaultSub2', scopeTypes.defaultScope, dependenciesSub2, createBuildFunction('defaultSub2'));
		var requestDependencySub2 = new MockDependency('requestSub2', scopeTypes.requestScope, dependenciesSub2, createBuildFunction('requestSub2'));
		var singletonDependencySub2 = new MockDependency('singletonSub2', scopeTypes.singletonScope, dependenciesSub2, createBuildFunction('singletonSub2'));

		// 3 level (for more than 2 test.)
		// 2 level sub dependencies
		var dependenciesSub3 = ['defaultSub2','requestSub2','singletonSub2'];
		var defaultDependencySub3 = new MockDependency('defaultSub3', scopeTypes.defaultScope, dependenciesSub3, createBuildFunction('defaultSub3'));
		var requestDependencySub3 = new MockDependency('requestSub3', scopeTypes.requestScope, dependenciesSub3, createBuildFunction('requestSub3'));
		var singletonDependencySub3 = new MockDependency('singletonSub3', scopeTypes.singletonScope, dependenciesSub3, createBuildFunction('singletonSub3'));

		//setup:
		var resolver = new yinjectDependencyResolutionModule.YinjectDependencyResolution(scopeTypes);
		resolver.container[defaultDependencyNone.dependencyName()] = defaultDependencyNone;
		resolver.container[requestDependencyNone.dependencyName()] = requestDependencyNone;
		resolver.container[singletonDependencyNone.dependencyName()] = singletonDependencyNone;

		resolver.container[defaultDependencySub1.dependencyName()] = defaultDependencySub1;
		resolver.container[requestDependencySub1.dependencyName()] = requestDependencySub1;
		resolver.container[singletonDependencySub1.dependencyName()] = singletonDependencySub1;

		resolver.container[defaultDependencySub2.dependencyName()] = defaultDependencySub2;
		resolver.container[requestDependencySub2.dependencyName()] = requestDependencySub2;
		resolver.container[singletonDependencySub2.dependencyName()] = singletonDependencySub2;

		resolver.container[defaultDependencySub3.dependencyName()] = defaultDependencySub3;
		resolver.container[requestDependencySub3.dependencyName()] = requestDependencySub3;
		resolver.container[singletonDependencySub3.dependencyName()] = singletonDependencySub3;

		var testDependency = function (dependencyMock) {
			var returned;
			resolver.resolve(dependencyMock.dependencyName());
			var testMethod = function () {returned = resolver.resolve(dependencyMock.dependencyName());};
			expect(testMethod).to.not.throw(Error);
			expect(returned.name).to.equal(dependencyMock.dependencyName());
			return returned;
		};

		var returnedSingletonsNone = [];

		// basic resolution.
		it('should resolve a default dependency without any dependencies', function () {
			var returned = testDependency(defaultDependencyNone);
			expect(returned.givenDependencies).is.empty;
		});
		it('should resolve a request dependency without any dependencies', function () {
			var returned = testDependency(requestDependencyNone);
			expect(returned.givenDependencies).is.empty;
		});
		it('should resolve a singleton dependency without any dependencies', function () {
			var returned = testDependency(singletonDependencyNone);
			expect(returned.givenDependencies).is.empty;
			returnedSingletonsNone.push(returned);
		});

		var pushDependenciesForTesting = function(givenDependencies) {
			returnedSingletonsNone.push(givenDependencies[singletonDependencyNone.dependencyName()]);
		};

		var confirmMocksDependencyIsCorrect = function(mock,implementationGiven) {
			expect(mock.dependencyName()).to.equal(implementationGiven.name);
		};

		var confirmDependenciesForLevel1AreCorrect = function (givenDependencies) {
			expect(givenDependencies).is.not.undefined;
			expect(givenDependencies).is.not.empty;
			confirmMocksDependencyIsCorrect(defaultDependencyNone, givenDependencies[defaultDependencyNone.dependencyName()]);
			confirmMocksDependencyIsCorrect(requestDependencyNone, givenDependencies[requestDependencyNone.dependencyName()]);
			confirmMocksDependencyIsCorrect(singletonDependencyNone, givenDependencies[singletonDependencyNone.dependencyName()]);

			pushDependenciesForTesting(givenDependencies);
		};

		// basic resolution with sub dependencies
		it('should resolve a default dependency with 1 level of dependencies', function () {
			var returned = testDependency(defaultDependencySub1);
			confirmDependenciesForLevel1AreCorrect(returned.givenDependencies);
		});

		it('should resolve a request dependency with 1 level of dependencies', function () {
			var returned = testDependency(requestDependencySub1);
			confirmDependenciesForLevel1AreCorrect(returned.givenDependencies);
		});
		it('should resolve a singleton dependency with 1 level of dependencies', function () {
			var returned = testDependency(requestDependencySub1);
			confirmDependenciesForLevel1AreCorrect(returned.givenDependencies);
		});

		var confirmDependenciesForLevel2AreCorrect = function (givenDependencies) {
			expect(givenDependencies).is.not.undefined;
			expect(givenDependencies).is.not.empty;
			// confirm level 2
			confirmMocksDependencyIsCorrect(defaultDependencySub1, givenDependencies[defaultDependencySub1.dependencyName()]);
			confirmMocksDependencyIsCorrect(requestDependencySub1, givenDependencies[requestDependencySub1.dependencyName()]);
			confirmMocksDependencyIsCorrect(singletonDependencySub1, givenDependencies[singletonDependencySub1.dependencyName()]);

			// confirm level 1
			confirmDependenciesForLevel1AreCorrect(givenDependencies[defaultDependencySub1.dependencyName()].givenDependencies);
			confirmDependenciesForLevel1AreCorrect(givenDependencies[requestDependencySub1.dependencyName()].givenDependencies);
			confirmDependenciesForLevel1AreCorrect(givenDependencies[requestDependencySub1.dependencyName()].givenDependencies);
		};

		// basic resolution with sub dependencies
		it('should resolve a default dependency with 2 levels of dependencies', function () {
			var returned = testDependency(defaultDependencySub2);
			confirmDependenciesForLevel2AreCorrect(returned.givenDependencies);
		});

		it('should resolve a request dependency with 2 levels of dependencies', function () {
			var returned = testDependency(requestDependencySub2);
			confirmDependenciesForLevel2AreCorrect(returned.givenDependencies);
		});

		it('should resolve a singleton dependency with 2 levels of dependencies', function () {
			var returned = testDependency(requestDependencySub2);
			confirmDependenciesForLevel2AreCorrect(returned.givenDependencies);
		});

		// on to the last set. After three levels, this should be able to handle N levels
		// basic resolution with sub dependencies
		var confirmDependenciesForLevel3AreCorrect = function (givenDependencies) {
			expect(givenDependencies).is.not.undefined;
			expect(givenDependencies).is.not.empty;
			// confirm level 2
			confirmMocksDependencyIsCorrect(defaultDependencySub2, givenDependencies[defaultDependencySub2.dependencyName()]);
			confirmMocksDependencyIsCorrect(requestDependencySub2, givenDependencies[requestDependencySub2.dependencyName()]);
			confirmMocksDependencyIsCorrect(singletonDependencySub2, givenDependencies[singletonDependencySub2.dependencyName()]);

			// confirm level 1
			confirmDependenciesForLevel2AreCorrect(givenDependencies[defaultDependencySub2.dependencyName()].givenDependencies);
			confirmDependenciesForLevel2AreCorrect(givenDependencies[requestDependencySub2.dependencyName()].givenDependencies);
			confirmDependenciesForLevel2AreCorrect(givenDependencies[requestDependencySub2.dependencyName()].givenDependencies);
		};

		it('should resolve a default dependency with 2 levels of dependencies', function () {
			var returned = testDependency(defaultDependencySub3);
			confirmDependenciesForLevel3AreCorrect(returned.givenDependencies);
		});

		it('should resolve a request dependency with 2 levels of dependencies', function () {
			var returned = testDependency(requestDependencySub3);
			confirmDependenciesForLevel3AreCorrect(returned.givenDependencies);
		});
		it('should resolve a singleton dependency with 2 levels of dependencies', function () {
			var returned = testDependency(requestDependencySub3);
			confirmDependenciesForLevel3AreCorrect(returned.givenDependencies);
		});

		// Scope Type behavior verification on top level
		it('should resolve default dependencies with a new dependency each call', function () {
			var firstCall = resolver.resolve(defaultDependencyNone.dependencyName());
			var secondCall = resolver.resolve(defaultDependencyNone.dependencyName());
			expect(firstCall).to.not.equal(secondCall);
		});
		it('should resolve a request dependency with a new dependency each call', function () {
			var firstCall = resolver.resolve(requestDependencyNone.dependencyName());
			var secondCall = resolver.resolve(requestDependencyNone.dependencyName());
			expect(firstCall).to.not.equal(secondCall);
		});

		it('should resolve a singleton dependency with the same dependency each call', function () {
			var firstCall = resolver.resolve(singletonDependencyNone.dependencyName());
			var secondCall = resolver.resolve(singletonDependencyNone.dependencyName());
			expect(firstCall).to.equal(secondCall);
		});

		var getResolvedSubDependenciesLevel2 = function ( dependencyName, givenDependencies) {
			var resolvedArray = [];
			resolvedArray.push(givenDependencies[defaultDependencySub1.dependencyName()].givenDependencies[dependencyName]);
			resolvedArray.push(givenDependencies[requestDependencySub1.dependencyName()].givenDependencies[dependencyName]);
			return resolvedArray;
		};

		// scope type behavior verification on sub-level
		it('should resolve a default dependency with a new instance each time it is requested inside of a single resolve', function () {
			var resolved = resolver.resolve(defaultDependencySub2.dependencyName());
			var resolvedDefaults = getResolvedSubDependenciesLevel2(defaultDependencyNone.dependencyName(), resolved.givenDependencies);

			var length = resolvedDefaults.length;
			while(resolvedDefaults.length > 0) {
				var lastValue = resolvedDefaults[resolvedDefaults.length -1];
				resolvedDefaults = resolvedDefaults.splice(0,resolvedDefaults.length -1);
				expect(resolvedDefaults).to.not.include(lastValue);
				length = resolvedDefaults.length;
			}

		});
		it('should resolve a request dependency with the same instance each time it is requested inside of a single resolve', function () {
			var resolved = resolver.resolve(defaultDependencySub2.dependencyName());
			var resolvedDefaults = getResolvedSubDependenciesLevel2(requestDependencyNone.dependencyName(), resolved.givenDependencies);
			expect(resolvedDefaults[0]).to.equal(resolvedDefaults[1]);
		});

		it('should resolve a singleton dependency with the same instance each time it is requested inside of a single resolve', function () {
			var length = returnedSingletonsNone.length;
			while(returnedSingletonsNone.length > 1) {
				var lastValue = returnedSingletonsNone[returnedSingletonsNone.length -1];
				returnedSingletonsNone = returnedSingletonsNone.splice(0,returnedSingletonsNone.length -1);
				expect(returnedSingletonsNone).to.include(lastValue);
				length = returnedSingletonsNone.length;
			}
		});

	});
});