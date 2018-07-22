const express = require('express');
const shortId = require('shortid');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8888;
const HTTP_CODE_404 = 404;
app.use(cors());

var hashURLMap = {};

app.get('/v1/:hash', (req, res) => {
  res.send({ express: 'Hello From Express' });
  const hash = req.params.hash;
  const redirectUrl = hashURLMap[hash];

	if (!redirectUrl) {
		errorResponse(res, HTTP_CODE_404, `No redirect URL for ${hash}`);
	} else {
		res.redirect(redirectUrl);
	}
});

const errorResponse = (res, status, text) => {
	res.status(status);
	res.send({ error: text });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
