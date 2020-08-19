async function myBodyParserJSON(req, res, next) {
  if (req.method === "POST") {
    var data = "";
    req.on("data", function (chunk) {
      data += chunk.toString();
    });
    req.on("end", function () {
      req.body = JSON.parse(data);
      next();
    });
  } else {
    next();
  }
}

module.exports = myBodyParserJSON;
