/**
 * facturasController.js
 *
 * Controlador encargado de:
 *  - Generar facturas electrónicas basadas en pedidos enviados por el frontend
 *  - Guardar dichas facturas en un archivo JSON simulando una base de datos
 *  - Proveer un endpoint para descargar facturas en PDF (en construcción)
 *
 * Cada función dentro de este controlador responde a una ruta.
 */

const fs = require("fs");
const path = require("path");

// Cargar facturas existentes desde archivo JSON
let facturas = require("../data/facturas.json");

module.exports = {

  /**
   * generarFactura(req, res)
   *
   * Genera una factura electrónica basada en los datos de un pedido recibido
   * desde el frontend. La factura se guarda en facturas.json como registro
   * persistente.
   *
   * Flujo:
   * 1. Recibe un objeto "pedido" desde req.body
   * 2. Crea una factura con número único, cliente, productos y total
   * 3. Guarda la factura en el archivo JSON
   * 4. Devuelve la factura generada al frontend
   *
   * @param {Object} req - Información enviada desde el cliente
   * @param {Object} res - Respuesta enviada al cliente
   */
  generarFactura(req, res) {
    const { pedido } = req.body;

    const nuevaFactura = {
      id: facturas.length + 1,
      numero: "F-" + Date.now(), // Número único basado en timestamp
      cliente: pedido?.cliente || "Cliente desconocido",
      productos: pedido?.productos || [],
      total: pedido?.total || 0,
      fecha: new Date().toISOString()
    };

    // Guardar en array temporal
    facturas.push(nuevaFactura);

    // Persistir en disco
    fs.writeFileSync(
      path.join(__dirname, "../data/facturas.json"),
      JSON.stringify(facturas, null, 2)
    );

    // Respuesta al frontend
    res.json({ message: "Factura generada", factura: nuevaFactura });
  },

  /**
   * descargarPDF(req, res)
   *
   * Esta función será la encargada de generar y devolver
   * el archivo PDF correspondiente a una factura.
   *
   * Por ahora solo devuelve un texto temporal hasta implementar
   * la funcionalidad PDF (Día 4 del plan de commits).
   *
   * @param {Object} req - Contiene el ID de la factura solicitada
   * @param {Object} res - Respuesta (PDF o mensaje provisional)
   */
  descargarPDF(req, res) {
    res.send("PDF en construcción...");
  }
};
