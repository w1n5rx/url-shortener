var open = require('open');
var express = require('express');
var webpack = require('webpack');
var path = require('path');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

const webpackConfig = require('../webpack.config');

console.log('Starting application server ...');

var host = 'localhost';
var port = 8889;

var localServer = `http://${host}:${port}/`;

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.listen(port, 'localhost', function (err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log(`Listening at ${localServer}`);
	open(localServer);
});

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});
