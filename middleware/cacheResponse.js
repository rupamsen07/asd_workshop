const responseCache = new Map();

function cacheResponse(req, res, next) {
    const cacheKey = req.originalUrl;
    if (responseCache.has(cacheKey)) {
        return res.json(responseCache.get(cacheKey));
    }

    const sendJson = res.json.bind(res);
    res.json = (body) => {
        responseCache.set(cacheKey, body);
        return sendJson(body);
    };

    next();
}

module.exports = cacheResponse;