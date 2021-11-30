const express = require("express");
const path = require("path");
const morgan = require("morgan");
const data = require("./instrumentos.json");
const { query, validationResult } = require("express-validator");
const app = express();

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

app.post("/instrumento/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send("se agregó un instrumento");
});

// app.post("/instrumentos", [!query("textoDeFondo").isEmpty], (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const newInstrumentosValue = {
//     textoDeFondo: `${req.params}`,
//     titulo: `${req.titulo}`,
//     fecha: `${req.fecha}`,
//     descripcion: `${req.descripcion}`,
//     boton: `${req.boton}`,
//   };

//   data.instrumentos.push(newInstrumentoValue);

// try {
//   fs.writeFileSync("./data.json", JSON.stringify(data));
// } catch (err) {
//   console.log(err);
// }

// res.json(newInstrumentoValue);
// });

app.put("/instrumento/:id", (req, res) => {
  console.log(req.body);
  res.send("user " + req.params.id + " actualizado");
});

console.log(__dirname);

app.use(express.static("public"));

app.listen(5000, () => {
  console.log("server running on port", 5000);
});
