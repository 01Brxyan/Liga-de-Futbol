// Obtener elementos del DOM
const nombreInput = document.getElementById("nombreEquipo");
const logoInput = document.getElementById("logoEquipo");
const agregarBtn = document.getElementById("agregarEquipo");
const listaEquipos = document.getElementById("listaEquipos");

// Cargar equipos guardados
let equipos = JSON.parse(localStorage.getItem("equipos")) || [];

// Mostrar los equipos
function mostrarEquipos() {
  listaEquipos.innerHTML = "";

  equipos.forEach((equipo, index) => {
    const li = document.createElement("li");
    li.classList.add("equipo");

    li.innerHTML = `
      <span class="equipo-nombre">${equipo.nombre}</span>
      <img src="${equipo.logo}" alt="Logo" class="equipo-logo" />
      <div class="botones">
        <button class="boton-editar" onclick="editarEquipo(${index})">Editar</button>
        <button class="boton-eliminar" onclick="eliminarEquipo(${index})">Eliminar</button>
      </div>
    `;

    listaEquipos.appendChild(li);
  });
}

// Convertir imagen a Base64
function toBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

// Agregar equipo
agregarBtn.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const file = logoInput.files[0];

  if (!nombre || !file) {
    alert("Por favor ingrese un nombre y seleccione un logo.");
    return;
  }

  toBase64(file, (base64) => {
    equipos.push({ nombre, logo: base64 });
    localStorage.setItem("equipos", JSON.stringify(equipos));
    mostrarEquipos();
    nombreInput.value = "";
    logoInput.value = "";
  });
});

// Editar equipo
function editarEquipo(index) {
  const equipo = equipos[index];
  const nuevoNombre = prompt("Nuevo nombre del equipo:", equipo.nombre);
  if (!nuevoNombre) return;

  const nuevoLogoInput = document.createElement("input");
  nuevoLogoInput.type = "file";
  nuevoLogoInput.accept = "image/*";

  nuevoLogoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      toBase64(file, (base64) => {
        equipos[index] = { nombre: nuevoNombre, logo: base64 };
        localStorage.setItem("equipos", JSON.stringify(equipos));
        mostrarEquipos();
      });
    } else {
      equipos[index].nombre = nuevoNombre;
      localStorage.setItem("equipos", JSON.stringify(equipos));
      mostrarEquipos();
    }
  });

  nuevoLogoInput.click();
}

// Eliminar equipo
function eliminarEquipo(index) {
  if (confirm("¿Deseas eliminar este equipo?")) {
    equipos.splice(index, 1);
    localStorage.setItem("equipos", JSON.stringify(equipos));
    mostrarEquipos();
  }
}

// Mostrar equipos al cargar
mostrarEquipos();


