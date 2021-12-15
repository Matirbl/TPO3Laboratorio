const contenedor = document.querySelector(".container");
const sectionPag = document.getElementById("lugarParaLaPaginacion");
var from = 0;
var limit = 3;
var range = 3;

const jsonInstrumentos = async (from, limit) => {
  const allInstruments = await fetch(`http://localhost:5000/api`);
  const instrumentsRet = await allInstruments.json();
  console.log(instrumentsRet);
  return instrumentsRet;
};

function fillCards(titulo, instrumento) {
  $.ajax({
    url: "http://localhost:5000/api/" + titulo,
    type: "get",
    dataType: "json",
    beforeSend: function () {
      $("#" + instrumento + "_h4").html("cargando...");
    },
    success: function (data) {
      console.log(data);
      $("#" + instrumento + "_h4").html(data["titulo"]);
      $("#" + instrumento + "_img").attr("src", data["imagen"]);
      $("#" + instrumento + "_desc").html(
        data["descripcion"].substr(0, 80) + "..."
      );
      $("#" + instrumento + "_btn").attr("href", data["boton"]);
    },
  }).fail(function () {
    $("#" + instrumento + "_h4").html("guitar not found");
  });
  return false;
}

const loadInstruments = async (from, limit) => {
  const instrumentosRecibidos = await fetch(
    `http://localhost:5000/api/list?limit=${limit}&from=${from}`
  );
  const instrumentosProcesados = await instrumentosRecibidos.json();
  // console.log(instrumentosProcesados);

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
      `http://localhost:5000/api/list?limit=${limit}&from=${from}` //hacerlo afuera y llamar
    );

    // console.log(instrumentosRecibidos);
    if (instrumentosRecibidos.status == 200) {
      const instrumentosProcesados = await instrumentosRecibidos.json();
      console.log(cards);
      console.log(instrumentosProcesados);

      for (i = 0; i < instrumentosProcesados.length; i++) {
        cardElements = cards[i].childNodes;

        cardElements[0].innerText = instrumentosProcesados[i].textoDeFondo;
        cardElements[1].firstChild.src = instrumentosProcesados[i].imagen;
        contentBxElements = cardElements[2].childNodes;
        console.log("Longitud del content " + contentBxElements.length);

        for (j = 0; j < contentBxElements.length; j++) {
          console.log(contentBxElements);
          contentBxElements[0].innerHTML = instrumentosProcesados[i].titulo;
          contentBxElements[1].firstChild.innerHTML =
            instrumentosProcesados[i].fecha;
          contentBxElements[2].firstChild.innerHTML =
            instrumentosProcesados[i].descripcion;
          contentBxElements[3].firstChild.href =
            instrumentosProcesados[i].boton;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const instrumentosTotales = jsonInstrumentos();

console.log("instrumentos populares: " + instrumentosTotales);

const nextPage = () => {
  // if (limit + range <= instrumentosTotales.length) {
  limit += range;
  from += range;
  console.log("valor from: " + from + "valor limit: " + limit);
  // }
  updateInstruments(from, limit);
};

const prevPage = () => {
  // if (from - range >= 0) {
  limit -= range;
  from -= range;
  // }
  updateInstruments(from, limit);
};
