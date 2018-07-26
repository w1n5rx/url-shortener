const express = require('express');
const bodyParser = require('body-parser');
const shortId = require('shortid');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 8888;
const API_URL = '/v1';

var hashToUrlMap = {
	'testHash': 'http://www.test.com'
};

const createShortLinkHashFromUrl = (url) => {
	return shortId.generate();
}

app.post(`${API_URL}/links`, function(req, res) {
	const url = req.body.url;

	const shortLinkHash = createShortLinkHashFromUrl(url);
	hashToUrlMap[shortLinkHash] = url;

	if (!url) {
		errorResponse(res, 500, 'No URL provided in request body');
	} else {
		res.send({
			'hash': shortLinkHash
		});
	}
});

app.delete(`${API_URL}/links/:hash`, function(req, res) {
	const hash = req.params.hash;

	if (hashToUrlMap.hasOwnProperty(hash)) {
		delete hashToUrlMap[hash];
		res.end();
	} else {
		errorResponse(res, 500, `Failed to delete hash ${hash}`);
	}
});

app.get(`/:hash`, function(req, res) {
	const hash = req.params.hash;
	const redirectUrl = hashToUrlMap[hash];

	if (!redirectUrl) {
		errorResponse(res, 404, `No redirect url for ${hash}`);
	} else {
		res.redirect(redirectUrl);
	}
});

const errorResponse = (res, status, text) => {
	res.status(status);
	res.send({ error: text });
}

app.listen(PORT, function () {
  console.log(`Url Shortening server now running on port ${PORT}.`);
});
