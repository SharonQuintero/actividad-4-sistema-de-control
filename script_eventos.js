async function crearEvento() {
    let nombre = document.getElementById("nombre").value
    let fecha = document.getElementById("fecha").value
    let lugar = document.getElementById("lugar").value

    await fetch(`/api/eventos?nombre=${encodeURIComponent(nombre)}&fecha=${fecha}&lugar=${encodeURIComponent(lugar)}`, {
  method: 'POST'
    })

    cargarEventos()

}

async function editarEventos(id){
  const nuevoNombre = prompt("Nuevo nombre del evento:");
  const nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD):");
  const nuevoLugar = prompt("Nuevo lugar del evento:");
nuevoNombre
  await fetch(`/api/eventos/${id}?nombre=${encodeURIComponent(nuevoNombre)}&fecha=${nuevaFecha}&lugar=${encodeURIComponent(nuevoLugar)}`, {
    method: 'PUT'
  });

  cargarEventos();


}

async function eliminarEvento(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
    await fetch(`/api/eventos/${id}`, {
      method: 'DELETE'
    });
    cargarEventos();
  }
}

function cerrarSesion() {
    window.location.href = "index.html";
  }
  
  async function cargarEventos() {
    const resp = await fetch('/api/eventos');
    const eventos = await resp.json();
    let divEventos = document.getElementById("eventos");
    divEventos.innerHTML = "";
    eventos.forEach(ev => {
      divEventos.innerHTML += `
        <div class="evento">
          <strong>${ev.nombre}</strong><br>
          ${ev.fecha}<br> ${ev.lugar}<br><br>
          <button onclick="editarEvento('${ev.id}')">Editar</button>
          <button onclick="eliminarEvento('${ev.id}')" style="background:red;">Eliminar</button>
        </div>
      `;
    });
  }
  
  cargarEventos();