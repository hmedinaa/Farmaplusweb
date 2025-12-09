/* exportar.js - Lógica para AD05 */

// --- EXPORTAR A PDF ---
function exportarPDF(tablaId, titulo) {
    // Verificar si la librería cargó
    if (!window.jspdf) {
        alert("Error: Librería jsPDF no cargada.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.text(titulo, 14, 15);

    // Generar tabla desde el HTML
    doc.autoTable({ 
        html: '#' + tablaId,
        startY: 25,
        theme: 'grid', 
        headStyles: { fillColor: [45, 106, 79] }, // Color verde FarmaPlus
    });

    // Guardar archivo
    doc.save(titulo + '.pdf');
}

// --- EXPORTAR A EXCEL ---
function exportarExcel(tablaId, nombreArchivo) {
    // Verificar si la librería cargó
    if (!window.XLSX) {
        alert("Error: Librería SheetJS no cargada.");
        return;
    }

    const tabla = document.getElementById(tablaId);
    
    // Convertir tabla HTML a Libro de Excel
    const wb = XLSX.utils.table_to_book(tabla, { sheet: "Datos" });
    
    // Guardar archivo
    XLSX.writeFile(wb, nombreArchivo + '.xlsx');
}
