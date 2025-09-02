/**
 * Servicio para comunicarse con el backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

class ApiService {
  /**
   * Realiza una petición HTTP al backend
   * @param {string} endpoint - Endpoint a llamar
   * @param {Object} options - Opciones de la petición
   * @returns {Promise<Object>} - Respuesta del servidor
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🔄 Llamando a: ${url}`);

      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Respuesta recibida del backend");

      return data;
    } catch (error) {
      console.error("❌ Error en petición API:", error);
      throw error;
    }
  }

  /**
   * Genera una respuesta usando OpenAI a través del backend
   * @param {Array} messages - Mensajes para el chat
   * @param {Object} options - Opciones para la generación
   * @returns {Promise<string>} - Respuesta generada
   */
  async generateResponse(messages, options = {}) {
    try {
      const response = await this.request("/ai/generate", {
        method: "POST",
        body: JSON.stringify({
          messages,
          options,
        }),
      });

      if (!response.success) {
        throw new Error(response.error || "Error en la generación de respuesta");
      }

      return response.data.response;
    } catch (error) {
      console.error("Error en generateResponse:", error);
      throw new Error(`Error al generar respuesta: ${error.message}`);
    }
  }

  /**
   * Prueba la conexión con el backend
   * @returns {Promise<Object>} - Estado de la conexión
   */
  async testConnection() {
    try {
      const response = await this.request("/health");
      return response;
    } catch (error) {
      console.error("Error al probar conexión:", error);
      throw error;
    }
  }

  /**
   * Prueba la conexión con OpenAI a través del backend
   * @returns {Promise<Object>} - Estado de la conexión con OpenAI
   */
  async testOpenAIConnection() {
    try {
      const response = await this.request("/ai/test");
      return response;
    } catch (error) {
      console.error("Error al probar conexión OpenAI:", error);
      throw error;
    }
  }
}

export default new ApiService();
