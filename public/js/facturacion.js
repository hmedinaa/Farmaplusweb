// ================================
// HU09 — Día 3 (Viernes)
// Selección de venta y apertura de modal
// ================================

let ventaSeleccionada = null;

// Abrir modal al hacer clic en "Ver"
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-view")) {

    ventaSeleccionada = e.target.dataset.id;

    document.getElementById("infoVenta").innerText =
      "Venta seleccionada: #" + ventaSeleccionada;

    const modal = new bootstrap.Modal(document.getElementById("modalVenta"));
    modal.show();
  }
});

// ================================
// HU09 — Día 4 (Lunes)
// Apertura de boleta individual (vista previa)
// ================================

// Botón para abrir boleta en nueva pestaña
document.getElementById("btnBoleta").addEventListener("click", () => {
  if (!ventaSeleccionada) return alert("Selecciona una venta primero.");

  // Abrir boleta.html mostrando la venta seleccionada
  window.open(`boleta.html?id=${ventaSeleccionada}`, "_blank");
});

/**
 * ================================================
 * HU09 — Día 5
 * Generación de Boleta Individual en PDF
 * ================================================
 *
 * Esta función se encarga de crear y descargar un PDF
 * correspondiente a una venta específica seleccionada
 * desde la tabla de pedidos.
 *
 * Funcionalidades implementadas:
 *  - Obtiene los datos reales de la venta desde la tabla #tblOrders
 *  - Construye un documento PDF con jsPDF
 *  - Inserta datos importantes: cliente, productos, total y fecha
 *  - Genera el archivo final con el nombre: Boleta_<ID>.pdf
 *
 * Flujo:
 * 1. Buscar la fila en la tabla que coincida con el ID recibido.
 * 2. Extraer los campos: cliente, productos, total y fecha.
 * 3. Crear un PDF usando jsPDF.
 * 4. Dibujar encabezado, tabla de productos y total final.
 * 5. Descargar el archivo al usuario.
 *
 * Esta funcionalidad forma parte del proceso de emisión
 * de comprobantes en el frontend y complementa la HU09,
 * permitiendo visualizar y exportar una boleta específica.
 *
 * @param {Number} id - ID de la venta seleccionada
 */
function generarPdfVenta(id) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Boleta - FarmaPlus`, 20, 20);
  doc.setFontSize(12);
  doc.text(`Venta #${id}`, 20, 30);

  // Buscar la fila de esa venta en la tabla
  const fila = [...document.querySelectorAll("#tblOrders tbody tr")]
    .find(tr => tr.children[0].textContent == id);

  if (!fila) return alert("No se encontraron datos de la venta");

  const cliente = fila.children[1].textContent;
  const productos = fila.children[2].textContent;
  const total = fila.children[3].textContent;
  const fecha = fila.children[5].textContent;

  doc.text(`Cliente: ${cliente}`, 20, 45);
  doc.text(`Fecha: ${fecha}`, 20, 55);

  doc.autoTable({
    startY: 70,
    head: [["Productos"]],
    body: [[productos]]
  });

  doc.text(`Total: ${total}`, 20, doc.lastAutoTable.finalY + 20);

  doc.save(`Boleta_${id}.pdf`);
}
