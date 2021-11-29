const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/indice.html"));
});

app.get("/instrumento", (req, res) => {
  console.log(req.body);
  res.send("get recibido");
});

app.post("/instrumento", (req, res) => {
  res.send("post recibido");
});


app.post("/instrumento/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  res.send("se agregó un instrumento");
});

console.log(__dirname);
app.listen(5000, () => {
  console.log("server running on port", 5000);
});
