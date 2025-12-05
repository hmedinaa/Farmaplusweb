/**
 * ============================================
 * reportes.js (Commit 1 - Estructura inicial)
 * ============================================
 *
 * Este módulo corresponde a la HU10 – Reporte de Ventas.
 * En este primer commit se implementa:
 *  - Creación de archivo independiente.
 *  - Creación de tabla inicial para mostrar datos.
 *  - Creación de filtros de fecha (sin funcionalidad aún).
 *  - Estructura base para futura implementación del reporte.
 *
 * NO se realiza ninguna consulta real a la API en este commit.
 * NO se generan PDF ni gráficos aún.
 */

document.addEventListener("DOMContentLoaded", () => {

  /**
   * URL base del backend
   * Esta variable se reutilizará cuando se implementen los filtros reales (Commit 2).
   */
  const API_BASE = "http://localhost:4000/api";

  /**
   * Token almacenado durante el login.
   * Si no existe, el usuario se redirige al login.
   */
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No hay token, inicia sesión.");
    location.href = "login.html";
    return;
  }

  // Referencias a elementos del DOM
  const tableBody = document.querySelector("#tblReport tbody");
  const btnFiltrar = document.getElementById("btnFiltrar");


  /**
   * =======================================================
   * cargarVentas()
   * -------------------------------------------------------
   * Función inicial que solo coloca un mensaje informativo.
   *
   * En Commit 2 se reemplazará con lógica real para consultar
   * ventas desde /api/orders y filtrarlas por fechas.
   * =======================================================
   */
  async function cargarVentas() {

    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-muted py-3">
          No has realizado una búsqueda.<br>
          Selecciona un rango de fechas y presiona "Buscar ventas".
        </td>
      </tr>
    `;
  }

  /**
   * Evento del botón "Buscar ventas"
   * (En este commit solo imprime en consola)
   */
  btnFiltrar.addEventListener("click", () => {
    console.log("Filtro pendiente de implementar (Commit 2)");
  });

  // Carga inicial de vista
  cargarVentas();
});


/**
 * ============================================
 * logout()
 * --------------------------------------------
 * Cierra sesión limpiando el token y redirigiendo al login.
 * Se usa el mismo método que en otras vistas.
 * ============================================
 */
function logout() {
  localStorage.clear();
  location.href = "login.html";
}