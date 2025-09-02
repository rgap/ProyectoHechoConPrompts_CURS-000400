# Demo App Backend - API con OpenAI

Backend API para la aplicación demo-app que proporciona endpoints para interactuar con la API de OpenAI de forma segura.

## 📋 Descripción

Este backend maneja todas las llamadas a la API de OpenAI de forma segura, evitando exponer las claves API en el frontend. Proporciona una API REST limpia y bien estructurada para que el frontend pueda consumir.

### ✨ Características

- 🔐 **Seguridad**: API keys protegidas en el servidor
- 🚀 **Express.js**: Framework web rápido y minimalista
- 🌐 **CORS**: Configurado para permitir requests del frontend
- 🔍 **Validación**: Validación completa de parámetros de entrada
- 📝 **Logging**: Sistema de logs para debugging
- ⚡ **Hot Reload**: Desarrollo con nodemon
- 🛡️ **Manejo de Errores**: Manejo robusto de errores

## 🏗️ Arquitectura

```
demo-app-backend/
├── config/
│   └── openai.js          # Configuración cliente OpenAI
├── controllers/
│   └── aiController.js    # Controladores de endpoints IA
├── routes/
│   ├── aiRoutes.js        # Rutas específicas de IA
│   └── index.js           # Configuración principal de rutas
├── services/
│   └── openaiService.js   # Lógica de negocio OpenAI
├── server.js              # Servidor principal
├── package.json           # Dependencias y scripts
└── .env.example           # Ejemplo de variables de entorno
```

## 🚀 Instalación y Configuración

### Pre-requisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Una API key de OpenAI

### Pasos de instalación

1. **Clonar o navegar al directorio del backend**

   ```bash
   cd demo-app-backend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   ```

   Editar `.env` y configurar:

   ```env
   OPENAI_API_KEY=tu_clave_api_aqui
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Iniciar el servidor**

   ```bash
   # Desarrollo (con hot reload)
   npm run dev

   # Producción
   npm start
   ```

## 📚 API Endpoints

### Base URL

```
http://localhost:3001/api
```

### Endpoints Disponibles

#### 🏥 Health Check

```http
GET /api/health
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Demo App Backend está funcionando correctamente",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

#### 🤖 Generar Respuesta con IA

```http
POST /api/ai/generate
```

**Body:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Tu pregunta aquí"
    }
  ],
  "options": {
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "max_tokens": 300
  }
}
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "response": "Respuesta generada por IA",
    "parameters": {
      "model": "gpt-4o-mini",
      "temperature": 0.7,
      "max_tokens": 300
    }
  }
}
```

#### 🧪 Probar Conexión OpenAI

```http
GET /api/ai/test
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Conexión con OpenAI API exitosa",
  "data": {
    "response": "Conexión exitosa"
  }
}
```

## ⚙️ Configuración

### Variables de Entorno

| Variable         | Descripción                | Valor por defecto       |
| ---------------- | -------------------------- | ----------------------- |
| `OPENAI_API_KEY` | Clave API de OpenAI        | **Requerida**           |
| `PORT`           | Puerto del servidor        | `3001`                  |
| `NODE_ENV`       | Entorno de ejecución       | `development`           |
| `FRONTEND_URL`   | URL del frontend para CORS | `http://localhost:5173` |

### Modelos Soportados

- `gpt-4o-mini` (por defecto)
- `gpt-4o`
- `gpt-4-turbo`
- `gpt-3.5-turbo`

### Parámetros de IA

- **Temperature**: 0.0 - 2.0 (creatividad de respuesta)
- **Max Tokens**: 1 - 4096 (longitud máxima de respuesta)

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Producción
npm start

# Ejecutar tests (cuando estén disponibles)
npm test
```

## 🔒 Seguridad

### Mejores Prácticas Implementadas

1. **API Keys Protegidas**: Las claves nunca se exponen al frontend
2. **CORS Configurado**: Solo permite requests de dominios autorizados
3. **Validación de Entrada**: Todos los parámetros son validados
4. **Manejo de Errores**: Errores manejados sin exponer información sensible
5. **Rate Limiting**: (Recomendado implementar en producción)

### Para Producción

Antes de desplegar en producción, considera:

1. Implementar rate limiting
2. Usar HTTPS
3. Configurar un proxy reverso (nginx)
4. Implementar autenticación si es necesario
5. Configurar logs más robustos
6. Usar un gestor de procesos (PM2)

## 🐛 Debugging

### Logs del Sistema

El servidor incluye logging automático:

- Requests HTTP con timestamp
- Errores de OpenAI API
- Estados de conexión

### Problemas Comunes

1. **Error 401 - Invalid API Key**

   - Verificar que `OPENAI_API_KEY` esté correctamente configurada
   - Verificar que la clave tenga créditos disponibles

2. **Error de CORS**

   - Verificar que `FRONTEND_URL` coincida con la URL del frontend
   - Verificar que el frontend esté corriendo en el puerto correcto

3. **Error de Conexión**
   - Verificar que el servidor esté corriendo en el puerto correcto
   - Verificar firewall y configuración de red

## 📈 Monitoreo

### Endpoints de Salud

- `/api/health` - Estado general del servidor
- `/api/ai/test` - Estado de conexión con OpenAI

### Métricas Recomendadas

Para producción, considera monitorear:

- Latencia de respuesta
- Número de requests por minuto
- Errores de API
- Uso de tokens de OpenAI
- Memoria y CPU del servidor

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature
3. Hacer commit de los cambios
4. Crear un Pull Request

## 📄 Licencia

Este proyecto es para propósitos educativos.

## 📞 Soporte

Para problemas o preguntas:

1. Revisar la documentación
2. Verificar los logs del servidor
3. Consultar la documentación de OpenAI API
