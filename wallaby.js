var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({
    // webpack options, such as
    // module: {
    //   loaders: [...]
    // },
    // externals: { jquery: "jQuery" }
  }
);

module.exports = function (wallaby) {
  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
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
