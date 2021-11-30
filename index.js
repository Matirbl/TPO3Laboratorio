const express = require("express");
const path = require("path");
const morgan = require("morgan");
const data = require("./instrumentos.json");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/indice.html"));
});

app.get("/instrumento", (req, res) => {
  console.log(req.body);
  res.send("get recibido");
});

app.post("/instrumento/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send("se agregó un instrumento");
});

app.post('/instrumentos', [
  query('populares'),
] , (req, res) => {

      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }

      const newInstrumentosValue = {
        "textoDeFondo": `${req.params}`,
        //"imagen": `${moment().format('DD-MM-YYYY')}`,
        "titulo": `${req.params}`,
        "fecha": `${req.params}`,
        "descripcion": `${req.params}`,
        "boton": `$${req.params}`
      };

      data.instrumentos.push(newInstrumentoValue);

      try{
        fs.writeFileSync("./data.json", JSON.stringify(data));
      } catch(err) {
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
