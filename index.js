const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("port", process.env.PORT || 5000);

app.set("json spaces", 1);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", require("./api"));

app.use(express.static("public"));

app.listen(app.get("port"), () => {
  console.log(`server running on port ${app.get("port")}`);
});

/* 
app.put("/instrumento/:id", (req, res) => {
  console.log(req.body);
  res.send("user " + req.params.id + " actualizado");
});

console.log(__dirname);

app.use(express.static("public"));*/
