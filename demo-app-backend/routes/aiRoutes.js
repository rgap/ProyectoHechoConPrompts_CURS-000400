import express from "express";
import aiController from "../controllers/aiController.js";

const router = express.Router();

/**
 * Rutas para endpoints de IA
 */

// POST /api/ai/generate - Generar respuesta con OpenAI
router.post("/generate", aiController.generateResponse);

// GET /api/ai/test - Probar conexión con OpenAI
router.get("/test", aiController.testConnection);

export default router;
