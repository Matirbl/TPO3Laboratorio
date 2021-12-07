const contenedor = document.querySelector(".container");

const obtenerInstrumentos = async () => {
  const instrumentosRecibidos = await fetch("http://localhost:5000/api/");
  const instrumentosProcesados = await instrumentosRecibidos.json();

  instrumentosProcesados.instruments.forEach((instrumento) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    contenedor.appendChild(divCard);

    const divTextoFondo = document.createElement("div");
    divTextoFondo.classList.add("txtFondo");
    divTextoFondo.textContent = instrumento.titulo;
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

obtenerInstrumentos();
