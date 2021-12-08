const contenedor = document.querySelector(".container");
const sectionPag = document.getElementById("lugarParaLaPaginacion");
var from = 0;
var limit = 3;

const loadInstruments = async (from, limit) => {
  const instrumentosRecibidos = await fetch(
    `http://localhost:5000/api/listInstruments?limit=${limit}&from=${from}`
  );

  const instrumentosProcesados = await instrumentosRecibidos.json();
  console.log(instrumentosProcesados);

  instrumentosProcesados.forEach((instrumento) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    contenedor.appendChild(divCard);

    const divTextoFondo = document.createElement("div");
    divTextoFondo.classList.add("txtFondo");
    divTextoFondo.textContent = instrumento.textoDeFondo;
    divCard.appendChild(divTextoFondo);

    const imagenBx = document.createElement("div");
    imagenBx.classList.add("imgBx");
    divCard.appendChild(imagenBx);

    const imagen = document.createElement("img");
    imagen.classList.add("img-card");
    imagen.src = instrumento.imagen;
    imagenBx.appendChild(imagen);

    const contenidoBx = document.createElement("div");
    contenidoBx.classList.add("contentBx");
    divCard.appendChild(contenidoBx);

    const h2 = document.createElement("h2");
    h2.textContent = instrumento.titulo;
    contenidoBx.appendChild(h2);

    const divFecha = document.createElement("div");
    divFecha.classList.add("fecha");
    contenidoBx.appendChild(divFecha);

    const h3Fecha = document.createElement("h3");
    h3Fecha.textContent = instrumento.fecha;
    divFecha.appendChild(h3Fecha);

    const divDescripcion = document.createElement("div");
    divDescripcion.classList.add("descripcion");
    contenidoBx.appendChild(divDescripcion);

    const h3Desc = document.createElement("h3");
    h3Desc.textContent = instrumento.descripcion;
    divDescripcion.appendChild(h3Desc);

    const divBoton = document.createElement("div");
    contenidoBx.appendChild(divBoton);

    const adress = document.createElement("a");
    adress.href = instrumento.boton;
    adress.textContent = "Más Información";
    divBoton.appendChild(adress);
  });
};

const updateInstruments = async (from, limit) => {
  try {
    cards = contenedor.childNodes;
    const instrumentosRecibidos = await fetch(
      `http://localhost:5000/api/listInstruments?limit=${limit}&from=${from}`
    );
    console.log(instrumentosRecibidos);
    if (instrumentosRecibidos.status == 200) {
      const instrumentosProcesados = await instrumentosRecibidos.json();
      console.log(cards);
      console.log(instrumentosProcesados);

      for (i = 0; i < instrumentosProcesados.length; i++) {
        cardElements = cards[i].childNodes;

        cardElements[0].innerText = instrumentosProcesados[i].textoDeFondo;
        cardElements[1].firstChild.src =instrumentosProcesados[i].imagen;
        contentBxElements = cardElements[2].childNodes;
        console.log("Longitud del content " + contentBxElements.length);

        for (j = 0; j < contentBxElements.length; j++) {
          console.log(contentBxElements);
          contentBxElements[0].innerHTML = instrumentosProcesados[i].titulo;
          contentBxElements[1].firstChild.innerHTML = instrumentosProcesados[i].fecha;
          contentBxElements[2].firstChild.innerHTML = instrumentosProcesados[i].descripcion;
          contentBxElements[3].firstChild.href= instrumentosProcesados[i].boton;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

loadInstruments(from, limit);

if (contenedor.hasChildNodes) {
  console.log("tiene hijos");
  console.log(contenedor.childNodes);
}

const nextPage = () => {
  limit += 3;
  from += 3;
  updateInstruments(from, limit);
};

const prevPage = () => {
  limit -= 3;
  from -= 3;
  updateInstruments(from, limit);
};
