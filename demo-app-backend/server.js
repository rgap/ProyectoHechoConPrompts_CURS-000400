import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

/**
 * Middlewares
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.path}`);
  next();
});

/**
 * Rutas
 */
app.use("/api", routes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Demo App Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      ai_generate: "/api/ai/generate",
      ai_test: "/api/ai/test",
    },
    documentation: "Ver README.md para más información",
  });
});

/**
 * Manejo de errores 404
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint no encontrado",
    path: req.originalUrl,
  });
});

/**
 * Manejo de errores globales
 */
app.use((error, req, res, next) => {
  console.error("Error no manejado:", error);

  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { details: error.message }),
  });
});

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
  console.log("🚀 Demo App Backend iniciado");
  console.log(`📍 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🌐 Frontend permitido desde: ${FRONTEND_URL}`);
  console.log(`🔧 Modo: ${process.env.NODE_ENV || "development"}`);
  console.log("📚 Documentación disponible en: http://localhost:" + PORT);
});
