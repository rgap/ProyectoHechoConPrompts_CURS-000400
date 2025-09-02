import express from "express";
import aiRoutes from "./aiRoutes.js";

const router = express.Router();

/**
 * Configuración principal de rutas
 */

// Ruta de salud del servidor
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Demo App Backend está funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Rutas de IA
router.use("/ai", aiRoutes);

export default router;
