const formulario = document.getElementById("formulario");
const lista = document.querySelector("#tabla-1 tbody");

cargarEventos();

function cargarEventos() {
  formulario.addEventListener("submit", ingresar);
  lista.addEventListener("click", eliminarElemento);
}

function ingresar(e) {
  e.preventDefault();
  const nombreInput = document.getElementById("nombre");
  const nombre = nombreInput.value.trim();

  if (nombre === "") return;

  const info = {
    nombre: nombre,
    id: Date.now(),
  };

  insertarDatos(info);
  formulario.reset();
}

function insertarDatos(dato) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${dato.nombre}</td>
    <td><a href="#" class="borrar" data-id="${dato.id}"><box-icon type='solid' name='x-circle'></box-icon></a></td>

  `;
  lista.appendChild(row);
}

function eliminarElemento(e) {
  e.preventDefault();
  const botonEliminar = e.target.closest(".borrar");

  if (botonEliminar) {
    botonEliminar.parentElement.parentElement.remove();
  }
}

lista.addEventListener("click", function (e) {
  const fila = e.target.closest("tr");

  if (e.target.closest(".borrar")) return;

  if (fila) {
    fila.classList.toggle("tarea-completada");
  }
});
