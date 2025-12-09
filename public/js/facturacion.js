// ================================
// HU09 — Día 3
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
// HU09 — Día 4
// Apertura de boleta individual (vista previa)
// ================================

// Botón para abrir boleta en nueva pestaña
document.getElementById("btnBoleta").addEventListener("click", () => {
  if (!ventaSeleccionada) return alert("Selecciona una venta primero.");

  // Abrir boleta.html mostrando la venta seleccionada
  window.open(`boleta.html?id=${ventaSeleccionada}`, "_blank");
});

