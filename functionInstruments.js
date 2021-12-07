const instrumentsData = require("./instrumentos.json");

const instrumentsArray = [];

instrumentsArray.forEach;

function getLenght() {
  return instrumentsData.instruments.length();
}

function getByTitle(instrumentTitle) {
  const elem = instrumentsData.instruments.filter(
    (value) => value.titulo === instrumentTitle
  );
  return elem;
}

function getRange(from, limit) {
  return instrumentsData.instruments.slice(from, limit);
}

function cargarInstrumentos(arregloInstrumentos) {

  arregloInstrumentos.forEach((value)=>{


    
  })
}

// function devolverTitulo(tituloInstrumento) {
//   let arregloInst = [];
//   instrumentsData.array.forEach((instrumento) => {
//     if (instrumento.tituloInstrumento == tituloInstrumento) {
//       arregloInst.push(instrumento);
//     }
//   });
//   return arregloInst;
// }

module.exports = { getByTitle, getRange, getLenght };
