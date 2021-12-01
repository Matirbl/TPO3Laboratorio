const express = require("express");
const path = require("path");
const morgan = require("morgan");
const data = require("./instrumentos.json");
const { query, validationResult } = require("express-validator");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/indice.html"));
});

app.get("/instrumento/:titulo", (req, res) => {
  const elem = data.instrumentos.filter(
    (value) => value.titulo === req.params.titulo
  );
  if (elem.length > 0) {
    res.json(elem[0]);
  } else {
    res
      .status(404)
      .json({ msg: `No Value with the id of ${req.params.titulo}` });
  }
});

app.post("/instrumentos", [query("textoDeFondo").notEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Llegué bien");
  console.log(req.param("textoDeFondo"));
  const newInstrumentoValue = {
    textoDeFondo: `${req.query.textoDeFondo}`,
    titulo: `${req.query.titulo}`,
    fecha: `${req.query.fecha}`,
    descripcion: `${req.query.descripcion}`,
    boton: `${req.query.boton}`,
  };

  data.instrumentos.push(newInstrumentoValue);

  try {
    fs.writeFileSync("./instrumentos.json", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }

  res.json(newInstrumentoValue);
});

app.put("/instrumento/:id", (req, res) => {
  console.log(req.body);
  res.send("user " + req.params.id + " actualizado");
});

console.log(__dirname);

app.use(express.static("public"));

app.listen(5000, () => {
  console.log("server running on port", 5000);
});
