# Demo App Frontend - Interfaz para OpenAI API

Frontend de la aplicación demo-app que consume una API backend para interactuar con OpenAI de forma segura.

## 📋 Descripción

Interfaz de usuario React que se comunica con un backend Express para generar respuestas usando OpenAI. Esta arquitectura separa las responsabilidades y mejora la seguridad al no exponer las API keys en el frontend.

### ✨ Características

- 🎨 **UI Moderna**: Interfaz con gradientes y animaciones CSS
- ⚡ **React 19**: Última versión de React con hooks
- 🔄 **Estados de Carga**: Feedback visual durante las peticiones
- 🛡️ **Manejo de Errores**: Gestión robusta de errores de red
- 📱 **Responsive**: Diseño adaptado para móviles y desktop
- 🎯 **Separación de Responsabilidades**: Frontend enfocado solo en UI

## 🚀 Configuración Inicial

### Pre-requisitos

- Node.js (versión 18 o superior)
- **Backend corriendo**: Este frontend requiere que el backend `demo-app-backend` esté ejecutándose

### Instalación

1. **Asegúrate de que el backend esté corriendo**

   ```bash
   # En el directorio demo-app-backend
   npm run dev
   ```

2. **Instala las dependencias del frontend**

   ```bash
   # En el directorio demo-app-frontend
   npm install
   ```

3. **(Opcional) Configura la URL del backend**

   Crea un archivo `.env` si el backend corre en una URL diferente:

   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Ejecuta la aplicación frontend**
   ```bash
   npm run dev
   ```

## 🔗 Comunicación con Backend

El frontend se comunica con el backend a través de:

- **URL por defecto**: `http://localhost:3001/api`
- **Endpoint principal**: `/api/ai/generate`
- **Health check**: `/api/health`

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la aplicación construida
- `npm run lint` - Ejecuta el linter para revisar el código

## 📁 Estructura del Proyecto

```
demo-app-frontend/
├── src/
│   ├── services/
│   │   └── apiService.js    # Servicio para comunicación con backend
│   ├── App.jsx              # Componente principal de React
│   ├── main.jsx             # Punto de entrada de React
│   └── index.css            # Estilos globales y UI moderna
├── index.html               # Plantilla HTML
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── eslint.config.js         # Configuración de ESLint
```

## 🔧 Tecnologías Utilizadas

- **React 19.1.1**: Biblioteca de interfaz de usuario
- **Vite 7.1.2**: Herramienta de construcción y servidor de desarrollo
- **ESLint**: Linter para mantener calidad del código
- **CSS3**: Estilos modernos con gradientes y animaciones

## ⚠️ Notas Importantes para Estudiantes

1. **Arquitectura Segura**: Este frontend NO maneja directamente las API keys de OpenAI. Toda la comunicación con OpenAI se hace a través del backend.

2. **Separación de Responsabilidades**:

   - **Frontend**: Solo UI, estados de React y comunicación con backend
   - **Backend**: Lógica de negocio, API keys y comunicación con OpenAI

3. **Desarrollo Local**: Ambos servidores (frontend y backend) deben estar corriendo para que funcione correctamente.

4. **Variables de Entorno**: Solo se usan para configurar la URL del backend, no hay API keys expuestas.

## 🚀 Cómo Empezar

### Inicio Rápido

1. **Terminal 1 - Backend**:

   ```bash
   cd demo-app-backend
   cp .env.example .env
   # Editar .env con tu OPENAI_API_KEY
   npm install
   npm run dev
   ```

2. **Terminal 2 - Frontend**:

   ```bash
   cd demo-app-frontend
   npm install
   npm run dev
   ```

3. **Abrir en el navegador**: `http://localhost:5173`

### Flujo de Desarrollo

1. El frontend se carga y automáticamente hace una petición al backend
2. El backend recibe la petición y llama a OpenAI API
3. La respuesta se devuelve al frontend y se muestra en la UI

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de Vite](https://vitejs.dev/guide/)
- [Hooks de React](https://react.dev/reference/react)
- [Backend README](../demo-app-backend/README.md) - Documentación del backend
