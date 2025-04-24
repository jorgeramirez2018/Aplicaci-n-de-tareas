const formulario = document.getElementById("formulario");
const lista = document.querySelector("#tabla-body");
const button = document.querySelector("#btn");
const eliminarTodosButton = document.querySelector("#eliminarDatos");

cargarEventos();

function cargarEventos() {
  formulario.addEventListener("submit", ingresar);
  lista.addEventListener("click", eliminarElemento);
  eliminarTodosButton.addEventListener("click", eliminarTodasLasTareas);

  mostrarTareasGuardadas();
}

function ingresar(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) return;

  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push({ nombre });

  localStorage.setItem("tareas", JSON.stringify(tareas));

  lista.innerHTML = "";
  mostrarTareasGuardadas();
  formulario.reset();
}

function mostrarTareasGuardadas() {
  const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];

  tareasGuardadas.forEach((tarea) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tarea.nombre}</td>
      <td>
        <a href="#" class="borrar">
          <box-icon name='x-circle' type='solid'></box-icon>
        </a>
      </td>
    `;
    lista.appendChild(row);
  });
}

function eliminarElemento(e) {
  e.preventDefault();

  const boton = e.target.closest(".borrar");

  if (boton) {
    const fila = boton.closest("tr");
    const nombreTarea = fila.querySelector("td").textContent;
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas = tareas.filter((tarea) => tarea.nombre !== nombreTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));

    fila.remove();
  }
}

function eliminarTodasLasTareas(e) {
  e.preventDefault();

  localStorage.removeItem("tareas");

  lista.innerHTML = "";
}
lista.addEventListener("click", function (e) {
  const fila = e.target.closest("tr");

  if (fila) {
    if (fila.classList.contains("fila-seleccionada")) {
      fila.classList.remove("fila-seleccionada");
    } else {

      document
        .querySelectorAll("#tabla-body tr")
        .forEach((f) => f.classList.remove("fila-seleccionada"));
      fila.classList.add("fila-seleccionada");
    }
  }
});