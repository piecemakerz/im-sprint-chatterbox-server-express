const path = require("path");

async function init() {
  const savedData = await readFileAsync(path.join(__dirname, "message.txt"));
  data = JSON.parse(savedData.toString());
}

module.exports = init;
