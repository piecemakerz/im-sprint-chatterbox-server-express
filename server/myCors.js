const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

function myCors(req, res, next) {
  for (const key in defaultCorsHeaders) {
    res.set(key, defaultCorsHeaders[key]);
  }
  next();
}

module.exports = myCors;
