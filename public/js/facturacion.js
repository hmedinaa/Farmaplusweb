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
