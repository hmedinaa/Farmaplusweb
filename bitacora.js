/* bitacora.js - Lógica para AD03 */
const API_BASE = 'http://localhost:4000/api';
const tabla = document.getElementById('tblBitacora');

// Verificación de seguridad básica
const token = localStorage.getItem('token');
if (!token) location.href = 'login.html';

// Encabezados para las peticiones
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token
};

// Cargar logs aplicando filtros
async function cargarBitacora() {
  // Obtener valores de los inputs
  const usuario = document.getElementById('filtroUsuario').value;
  const accion = document.getElementById('filtroAccion').value;
  const fecha = document.getElementById('filtroFecha').value;

  // Construir la URL con parámetros 
  const params = new URLSearchParams();
  if (usuario) params.append('usuario', usuario);
  if (accion) params.append('accion', accion);
  if (fecha) params.append('fecha', fecha);

  try {
    tabla.innerHTML = '<tr><td colspan="4" class="text-center">Cargando...</td></tr>';

    const response = await fetch(`${API_BASE}/logs?${params.toString()}`, { headers });
    const data = await response.json();

    tabla.innerHTML = '';

    if (!data.ok) {
      alert('Error: ' + data.error);
      return;
    }

    // Renderizar resultados
    if (data.logs.length === 0) {
      tabla.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No se encontraron registros con esos filtros.</td></tr>';
      return;
    }

    data.logs.forEach(log => {
      // Formatear fecha 
      const fechaFormat = new Date(log.fecha).toLocaleString();
      
      // Colores según la acción 
      let badgeClass = 'bg-secondary';
      if(log.accion.includes('ELIMINAR')) badgeClass = 'bg-danger';
      if(log.accion.includes('CREAR')) badgeClass = 'bg-success';
      if(log.accion === 'LOGIN') badgeClass = 'bg-primary';

      const row = `
        <tr>
          <td><small>${fechaFormat}</small></td>
          <td class="fw-bold text-dark">${log.usuario}</td>
          <td><span class="badge ${badgeClass}">${log.accion}</span></td>
          <td class="text-muted">${log.detalle}</td>
        </tr>
      `;
      tabla.innerHTML += row;
    });

  } catch (error) {
    console.error(error);
    tabla.innerHTML = '<tr><td colspan="4" class="text-danger text-center">Error de conexión con el servidor</td></tr>';
  }
}

// Función auxiliar para limpiar
function limpiarFiltros() {
  document.getElementById('filtroUsuario').value = '';
  document.getElementById('filtroAccion').value = '';
  document.getElementById('filtroFecha').value = '';
  cargarBitacora(); // Recargar todo limpio
}

function logout() {
  localStorage.clear();
  location.href = "login.html";
}

// Cargar al inicio
document.addEventListener('DOMContentLoaded', cargarBitacora);
