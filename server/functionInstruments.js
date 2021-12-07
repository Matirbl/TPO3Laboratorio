const instrumentsData = require("./instruments.json");
const instrumentsArray = [];
// const contenedor = document.querySelector('.contenido');

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
  console.log(arregloInstrumentos);
  arregloInstrumentos.forEach((value) => {
    let h1 = document.createElement("h1");
    h1.innerText = "value.titulo";
    contenedor.appendChild(h1);
  });
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

module.exports = { getByTitle, getRange, getLenght, cargarInstrumentos };
