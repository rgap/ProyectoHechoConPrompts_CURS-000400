import openaiService from "../services/openaiService.js";

/**
 * Controlador para endpoints relacionados con IA
 */
class AIController {
  /**
   * Genera una respuesta usando OpenAI
   * POST /api/ai/generate
   */
  async generateResponse(req, res) {
    try {
      const { messages, options = {} } = req.body;

      // Validar que se proporcionen mensajes
      if (!messages) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere el campo "messages"',
        });
      }

      // Validar formato de mensajes
      if (!openaiService.validateMessages(messages)) {
        return res.status(400).json({
          success: false,
          error: 'Formato de mensajes inválido. Cada mensaje debe tener "role" y "content"',
        });
      }

      // Validar opciones
      const validatedOptions = aiController.validateOptions(options);

      // Generar respuesta
      const response = await openaiService.getResponse(messages, validatedOptions);

      res.json({
        success: true,
        data: {
          response,
          parameters: {
            model: validatedOptions.model,
            temperature: validatedOptions.temperature,
            max_tokens: validatedOptions.max_tokens,
          },
        },
      });
    } catch (error) {
      console.error("Error en generateResponse:", error);

      res.status(500).json({
        success: false,
        error: error.message || "Error interno del servidor",
      });
    }
  }

  /**
   * Endpoint simple para probar la conexión
   * GET /api/ai/test
   */
  async testConnection(req, res) {
    try {
      const testMessages = [
        {
          role: "user",
          content: 'Responde solo con "Conexión exitosa"',
        },
      ];

      const response = await openaiService.getResponse(testMessages, {
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 10,
      });

      res.json({
        success: true,
        message: "Conexión con OpenAI API exitosa",
        data: { response },
      });
    } catch (error) {
      console.error("Error en testConnection:", error);

      res.status(500).json({
        success: false,
        error: error.message || "Error al conectar con OpenAI API",
      });
    }
  }

  /**
   * Valida y sanitiza las opciones de la API
   * @param {Object} options - Opciones a validar
   * @returns {Object} - Opciones validadas
   */
  validateOptions(options) {
    const validatedOptions = {
      model: "gpt-4o-mini",
      temperature: 1,
      max_tokens: 300,
    };

    // Validar modelo
    if (options.model && typeof options.model === "string") {
      const validModels = ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"];
      if (validModels.includes(options.model)) {
        validatedOptions.model = options.model;
      }
    }

    // Validar temperatura (0-2)
    if (typeof options.temperature === "number" && options.temperature >= 0 && options.temperature <= 2) {
      validatedOptions.temperature = options.temperature;
    }

    // Validar max_tokens (1-4096)
    if (typeof options.max_tokens === "number" && options.max_tokens >= 1 && options.max_tokens <= 4096) {
      validatedOptions.max_tokens = options.max_tokens;
    }

    return validatedOptions;
  }
}

const aiController = new AIController();
export default aiController;
