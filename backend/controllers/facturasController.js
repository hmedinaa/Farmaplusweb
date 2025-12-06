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
   * DÍA 2 — Versión mejorada con validaciones y cálculo automático.
   *
   * Mejoras agregadas:
   *  ✔ Validación de que el pedido exista y contenga productos.
   *  ✔ Cálculo automático del total basado en cada producto (precio × cantidad).
   *  ✔ Generación formal del número de factura: F001-00001.
   *  ✔ Se agrega estado inicial: "emitida".
   * 
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

    // Validación 1: pedido debe existir
    if (!pedido) {
      return res.status(400).json({
        ok: false,
        error: "No se recibió ningún pedido para generar factura."
      });
    }
    
    // Validación 2: Debe tener productos
    if (!pedido.productos || pedido.productos.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "El pedido no contiene productos válidos."
      });
    }

    // Cálculo automático del total
    let totalCalculado = 0;
    pedido.productos.forEach(p => {
      if (p.precio && p.cantidad) {
        totalCalculado += Number(p.precio) * Number(p.cantidad);
      }
    });

    // Número de factura en formato oficial F001-00001
    const numeroFactura = `F001-${String(facturas.length + 1).padStart(5, "0")}`;

    const nuevaFactura = {
      id: facturas.length + 1,
      numero: numeroFactura,
      cliente: pedido.cliente || "Cliente desconocido",
      productos: pedido.productos,
      total: totalCalculado,
      fecha: new Date().toISOString(),
      estado: "emitida" // NUEVO: estado inicial de la factura
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
