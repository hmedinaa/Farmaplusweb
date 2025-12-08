/* logger.js
   Encargado del AD02: Registro automático de acciones 
*/
const API_LOGS = 'http://localhost:4000/api/logs'; 

async function registrarAuditoria(accion, detalle) {
  const token = localStorage.getItem('token');
  const usuario = localStorage.getItem('userName') || 'Desconocido';

  // Paquete de datos del log
  const body = {
    usuario: usuario,
    accion: accion,       //  'LOGIN', 'CREAR_PRODUCTO', 'ELIMINAR_CLIENTE'
    detalle: detalle,     //  'Usuario ingresó al sistema', 'Se borró el ID 4'
    fecha: new Date().toISOString(),
    plataforma: 'Web'
  };

  try {
    // fetch sin 'await' para no bloquear la pantalla del usuario 
    fetch(API_LOGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body)
    });
    console.log(`[AD02] Auditoría registrada: ${accion}`);
  } catch (err) {
    console.error("Error al registrar auditoría:", err);
  }
}
