/**
 * server.js
 *
 * Punto de entrada del backend. Configura el servidor Express,
 * habilita CORS y JSON, y registra las rutas del módulo de facturación.
 * 
 * - Inicializa Express
 * - Permite comunicación entre frontend y backend (CORS)
 * - Configura el uso de JSON en solicitudes
 * - Define la ruta base: /api/facturas
 * - Levanta el servidor en el puerto 3000
 */

const express = require("express");
const cors = require("cors");
const facturasRoutes = require("./routes/facturasRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Registrar rutas para manejo de facturas electrónicas
app.use("/api/facturas", facturasRoutes);

// Inicializar servidor
app.listen(3000, () => {
  console.log("Servidor backend escuchando en http://localhost:3000");
});
