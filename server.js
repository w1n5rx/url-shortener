const express = require('express');
const shortId = require('shortid');
const cors = require('cors');
const bodyParser = require('body-parser');	// https://stackoverflow.com/a/43626891/5644090

const app = express();
const port = process.env.PORT || 8888;
const HTTP_CODE_404 = 404;
const HTTP_CODE_500 = 500;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var hashURLMap = {};

app.get('/v1/:hash', (req, res) => {
  res.send({ express: 'Hello From Express' });
  let hash = req.params.hash;
  const redirectURL = hashURLMap[hash];

	if (!redirectURL) {
		errorResponse(res, HTTP_CODE_404, `No redirect URL for ${hash}`);
	} else {
		res.redirect(redirectURL);
	}
});

const generateShortURL = (url) => {
	return shortId.generate();
}

app.post(`/v1/links`, (req, res) => {
	const url = req.body.url;

	let hash = generateShortURL(url);
	hashURLMap[hash] = url;

	if (!url) {
		errorResponse(res, HTTP_CODE_500, 'No URL provided in request body');
	} else {
		res.send({
			'hash': hash
		});
	}
});

app.delete(`/v1/links/:hash`, function(req, res) {
	let hash = req.params.hash;

	if (hashURLMap.hasOwnProperty(hash)) {
		delete hashURLMap[hash];
		res.end();
	} else {
		errorResponse(res, HTTP_CODE_500, `${hash} deletion failed`);
	}
});

const errorResponse = (res, status, text) => {
	res.status(status);
	res.send({ error: text });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
