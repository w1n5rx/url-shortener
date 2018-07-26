var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ["webpack-hot-middleware/client", "./dev/index.tsx"],
		plugins: [
			new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin()
		],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/"
    },
		devServer: {
				contentBase: __dirname + '/dev',
		},

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
				// root: [path.resolve('./dev')],
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loaders: ['react-hot', 'awesome-typescript-loader'] },
						{ test: /\.scss$/, loaders: ['style', 'css', 'sass' ] }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
};
