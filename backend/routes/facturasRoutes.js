/**
 * facturasRoutes.js
 *
 * Define las rutas asociadas a la generación y descarga de facturas.
 * Express Router permite separar estas rutas en un módulo independiente.
 *
 * Rutas definidas:
 *  - POST /api/facturas/generar -> Generar una nueva factura desde un pedido
 *  - GET /api/facturas/:id/pdf -> Descargar la factura en formato PDF
 */

const express = require("express");
const router = express.Router();
const facturaCtrl = require("../controllers/facturasController");

// Ruta para generar factura desde datos enviados por el frontend
router.post("/generar", facturaCtrl.generarFactura);

// Ruta para descargar la factura en PDF según ID
router.get("/:id/pdf", facturaCtrl.descargarPDF);

module.exports = router;
