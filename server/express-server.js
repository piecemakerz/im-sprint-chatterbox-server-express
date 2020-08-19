const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
const fs = require("fs");
const util = require("util");
const myCors = require("./myCors");
const myBodyParserJSON = require("./myBodyParserJSON");
const getMessages = require("./getMessages");
const postMessages = require("./postMessages");
const init = require("./init");

global.data = null;
global.readFileAsync = util.promisify(fs.readFile);
global.writeFileAsync = util.promisify(fs.writeFile);

init();

const app = express();
const PORT = process.env.NODE_ENV === "production" ? 3001 : 3002;

// app.use(cors());
// app.use(bodyParser.json());

app.use(myCors);
app.use(myBodyParserJSON);

app.get("/messages", getMessages);
app.post("/messages", postMessages);

app.listen(PORT, () => {
  console.log(`server listen on ${PORT}`);
});
