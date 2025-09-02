import dotenv from "dotenv";
import OpenAI from "openai";

// Cargar variables de entorno
dotenv.config();

// Configuración del cliente OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validar que la API key esté configurada
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Error: OPENAI_API_KEY no está configurada en las variables de entorno");
  process.exit(1);
}

export default client;
