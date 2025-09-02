import { useEffect, useState } from "react";
import apiService from "./services/apiService";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parameters = {
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 300,
  };

  const prompt = "practica tu prompt";

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const messages = [
          {
            role: "user",
            content: prompt,
          },
        ];

        const response = await apiService.generateResponse(messages, {
          model: parameters.model,
          temperature: parameters.temperature,
          max_tokens: parameters.max_tokens,
        });

        setMessage(response);
        console.log("Respuesta recibida:", response);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setMessage("Error al llamar al backend");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <>
      <h1>Demo del uso de API de OpenAI</h1>
      <p>Esta es una demostración de cómo usar la API de OpenAI para generar respuestas a preguntas.</p>

      <div className="parameters">
        <h3>Parámetros de la API:</h3>
        <div className="parameter-grid">
          <div className="parameter">
            <span className="param-label">Modelo:</span>
            <span className="param-value">{parameters.model}</span>
          </div>
          <div className="parameter">
            <span className="param-label">Temperatura:</span>
            <span className="param-value">{parameters.temperature}</span>
          </div>
          <div className="parameter">
            <span className="param-label">Max Tokens:</span>
            <span className="param-value">{parameters.max_tokens}</span>
          </div>
        </div>
      </div>
      <div className="response">
        <div className="response-label">Respuesta:</div>
        <div className="response-content">
          {loading && "Cargando respuesta..."}
          {error && <div className="error-message">❌ {error}</div>}
          {!loading && !error && message}
        </div>
      </div>
    </>
  );
}

export default App;
