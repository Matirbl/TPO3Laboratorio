const contenedor = document.querySelector(".container");

const obtenerInstrumentos = async () => {
  const instrumentosRecibidos = await fetch("http://localhost:5000/api/");
  const instrumentosProcesados = await instrumentosRecibidos.json();
  console.log(instrumentosProcesados);
  const div = document.createElement("h1");
  div.textContent = instrumentosProcesados.instruments[1].titulo;
  console.log(div);
  contenedor.appendChild(div);
};

obtenerInstrumentos();
