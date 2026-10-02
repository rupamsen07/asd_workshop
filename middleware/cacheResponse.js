const responseCache = new Map();
const CACHE_TTL_MS = 60_000;

function cacheResponse(req, res, next) {
    const cacheKey = req.originalUrl;
    const cachedEntry = responseCache.get(cacheKey);
    if (cachedEntry && Date.now() - cachedEntry.createdAt < CACHE_TTL_MS) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(cachedEntry.value);
    }
    if (cachedEntry) {
        responseCache.delete(cacheKey);
    }

    res.setHeader('X-Cache', 'MISS');
    const sendJson = res.json.bind(res);
    res.json = (body) => {
        responseCache.set(cacheKey, { value: body, createdAt: Date.now() });
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