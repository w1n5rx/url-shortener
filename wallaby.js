var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({
  }
);

module.exports = function (wallaby) {
  return {
    files: [
			{ pattern: 'src/**/*.ts?(x)', load: false },
			{ pattern: 'src/**/*.test.ts', ignore: true },
			{ pattern: 'src/**/*.driver.ts', instrument: false }
    ],

    tests: [
			{ pattern: 'src/**/*Spec.ts', load: false },
			{ pattern: 'src/**/*.test.ts?(x)', load: false }
    ],

    postprocessor: webpackPostprocessor,
		testFramework: 'mocha',

    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    }
  };
};
