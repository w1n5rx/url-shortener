### Objective
Create an application similar to `bit.ly` - the link shortener using plain React/Redux and Express.

# Back-end Service

## Overview

The back-end is based on [Express](http://http://expressjs.com/), a Node.js web application framework.

* **Create new short link**

```plain
HTTP POST /v1/links
```

Payload,

```json
{
	"url": "<target-url>"
}
```

Response,

```json
{
	"hash": "<short-link-hash>"
}
```

* **Access short link**

```plain
HTTP GET /v1/{short-link-hash}
```

As response the API should redirect to `target-url`.


## References
1. https://bit.ly/2GaLHH1¸
2. https://bit.ly/2Ly5fGZ
3. https://bit.ly/2JNDyoP
