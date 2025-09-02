import client from "../config/openai.js";

/**
 * Servicio para interactuar con la API de OpenAI
 */
class OpenAIService {
  /**
   * Genera una respuesta usando el modelo especificado
   * @param {Array} messages - Array de mensajes para el chat
   * @param {Object} options - Opciones para la generación
   * @returns {Promise<string>} - Respuesta generada
   */
  async getResponse(messages, options = {}) {
    try {
      const { model = "gpt-4o-mini", temperature = 1, max_tokens = 300 } = options;

      console.log("🤖 Llamando a OpenAI API...", {
        model,
        temperature,
        max_tokens,
        messagesCount: messages.length,
      });

      const response = await client.chat.completions.create({
        model,
        messages,
        temperature,
        max_completion_tokens: max_tokens,
      });

      const content = response.choices[0]?.message?.content ?? "";

      console.log("✅ Respuesta recibida de OpenAI API");
      return content;
    } catch (error) {
      console.error("❌ Error en OpenAI API:", error);

      // Manejo específico de errores
      if (error.code === "insufficient_quota") {
        throw new Error("Cuota de API agotada. Verifica tu plan de OpenAI.");
      } else if (error.code === "invalid_api_key") {
        throw new Error("Clave de API inválida. Verifica tu configuración.");
      } else if (error.code === "rate_limit_exceeded") {
        throw new Error("Límite de velocidad excedido. Intenta de nuevo más tarde.");
      }

      throw new Error(`Error al llamar a OpenAI API: ${error.message}`);
    }
  }

  /**
   * Valida que los mensajes tengan el formato correcto
   * @param {Array} messages - Mensajes a validar
   * @returns {boolean} - True si son válidos
   */
  validateMessages(messages) {
    if (!Array.isArray(messages) || messages.length === 0) {
      return false;
    }

    return messages.every(
      msg =>
        msg &&
        typeof msg === "object" &&
        typeof msg.role === "string" &&
        typeof msg.content === "string" &&
        ["system", "user", "assistant"].includes(msg.role)
    );
  }
}

export default new OpenAIService();
