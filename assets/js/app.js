const input = document.querySelector("input");
const button = document.querySelector("#add-tarea");
const list = document.querySelector("#list");
const realizadas = document.querySelector("#realizadas");
const total = document.querySelector("#total");
const pendientes = document.querySelector("#pendientes");

let tareas = [
  { id: generarID(), name: "Hacer la compra", done: false },
  { id: generarID(), name: "Estudiar JavaScript", done: false },
  { id: generarID(), name: "Hacer ejercicio", done: false },
];

let idTareaEditando = null;

function generarID() {
  let contadorID = 0;
  contadorID = Math.floor(Math.random() * 100);
  return ++contadorID;
}

button.addEventListener("click", () => {
  const tareaNombre = input.value.trim();
  if (tareaNombre === "") {
    alert("No puedes agregar una tarea vacía");
    return;
  }
  if (idTareaEditando === null) {
    tareas.push({ id: generarID(), name: tareaNombre, done: false });
  } else {
    const index = tareas.findIndex((tarea) => tarea.id === idTareaEditando);
    if (index !== -1) {
      tareas[index].name = tareaNombre;
    }
    button.textContent = "Agregar";
    button.removeAttribute("style");
    idTareaEditando = null;
  }
  input.value = "";
  render();
});

const render = () => {
  const tableContent = tareas
    .map((tarea) => {
      return `
      <tr>
        <td>${tarea.id}</td>
        <td>${tarea.name}</td>
        <td>
        <input type="checkbox" id="check_${tarea.id}" ${
        tarea.done ? "checked" : ""
      } onchange="check(${tarea.id}, this.checked)">
      <button onclick="editar(${tarea.id})">✏️</button>
      <button onclick="borrar(${tarea.id})">❌</button>
        </td>

      </tr>
    `;
    })
    .join("");
  list.innerHTML = tableContent;
  actualizacionTareas();
};

const check = (id, checked) => {
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    tareas[index].done = checked;
    actualizacionTareas();
    render();
  }
};

const actualizacionTareas = () => {
  const tareasRealizadas = tareas.filter((tarea) => tarea.done).length;
  const tareasPendientes = tareas.length - tareasRealizadas;

  realizadas.innerHTML = "Realizadas: " + tareasRealizadas;
  pendientes.innerHTML = "Pendientes: " + tareasPendientes;
  total.innerHTML = "Total: " + tareas.length;
};

const borrar = (id) => {
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    tareas.splice(index, 1);
    if (tareas.length === 0) {
      contadorID = 0;
    }
  }
  actualizacionTareas();
  render();
};

const editar = (id) => {
  const index = tareas.findIndex((tarea) => tarea.id === id);
  if (index !== -1) {
    input.value = tareas[index].name;
    button.textContent = "Editar";
    button.style.backgroundColor = "orange";
    idTareaEditando = id;
  }
};

render();
