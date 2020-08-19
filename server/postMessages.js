const path = require("path");

async function postMessages(req, res) {
  const getData = req.body;
  const date = Date.now().toString();
  const newData = { ...getData, id: data.id, date };
  data.id += 1;
  data.results.push(newData);

  await writeFileAsync(
    path.join(__dirname, "message.txt"),
    JSON.stringify(data)
  );

  res.end(
    JSON.stringify({
      id: data.id - 1,
    })
  );
}

module.exports = postMessages;
