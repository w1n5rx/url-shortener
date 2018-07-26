var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ["webpack-hot-middleware/client", "./client/index.tsx"],
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
		frontendserver: {
				contentBase: __dirname + '/client',
		},

    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loaders: ['react-hot', 'awesome-typescript-loader'] },
						{ test: /\.scss$/, loaders: ['style', 'css', 'sass' ] }
        ],

        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};
