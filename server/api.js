const express = require("express");
const router = express.Router();
const dataInstrument = require("./instruments.json");
const path = require("path");
const { query, validationResult, body } = require("express-validator");
const fs = require("fs");

//Get
router.get("/", (req, res) => {
  res.json(dataInstrument);
});

//Get list
router.get(
  "/listInstruments",
  [
    // query("limit").isInt({ min: 0, max: dataInstrument.instruments.length  }),
    // query("from").isInt({ min: 0, max: dataInstrument.instruments.length - 1 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let limit = req.query.limit;
    let from = req.query.from;

    if (limit >= dataInstrument.instruments.length) {
      limit = dataInstrument.instruments.length ;
      from = limit - 3;
    }
    res.status(200).json(dataInstrument.instruments.slice(from, limit));
  }
);

//Get by id
router.get("/:instrumentTitle", (req, res) => {
  const elem = dataInstrument.instruments.filter(
    (value) => value.titulo === req.params.instrumentTitle
  );
  if (elem.length > 0) {
    res.json(elem[0]);
    console.log(elem[0]);
  } else {
    res.status(404).json({
      msg: `404 No existe el instrumento solicitado ${req.query.instrumentTitle}`,
    });
  }
});

router.post("/instruments", [body("textoDeFondo").notEmpty()], (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newInstrumentValue = {
    textoDeFondo: `${req.body.textoDeFondo}`,
    titulo: `${req.body.titulo}`,
    fecha: `${req.body.fecha}`,
    descripcion: `${req.body.descripcion}`,
    boton: `${req.body.boton}`,
  };

  dataInstrument.instruments.push(newInstrumentValue);

  try {
    fs.writeFileSync("./instruments.json", JSON.stringify(dataInstrument));
  } catch (err) {
    console.log(err);
  }

  res.json(newInstrumentValue);
});

module.exports = router;
