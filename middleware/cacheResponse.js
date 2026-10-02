const responseCache = new Map();

function cacheResponse(req, res, next) {
    const cacheKey = req.originalUrl;
    if (responseCache.has(cacheKey)) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(responseCache.get(cacheKey));
    }

    res.setHeader('X-Cache', 'MISS');
    const sendJson = res.json.bind(res);
    res.json = (body) => {
        responseCache.set(cacheKey, body);
        return sendJson(body);
    };

    next();
}

function invalidateCache(req, res, next) {
    let invalidated = false;
    const clearOnSuccess = () => {
        if (!invalidated && res.statusCode >= 200 && res.statusCode < 300) {
            responseCache.clear();
            invalidated = true;
        }
    };

    const sendJson = res.json.bind(res);
    res.json = (body) => {
        clearOnSuccess();
        return sendJson(body);
    };

    const endResponse = res.end.bind(res);
    res.end = (...args) => {
        clearOnSuccess();
        return endResponse(...args);
    };

    next();
}

module.exports = { cacheResponse, invalidateCache };