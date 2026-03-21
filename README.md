# 👗 Creaciones Normita - App Cliente

Esta es la aplicación cliente (Frontend) para el catálogo digital de **Creaciones Normita**, enfocada en la exhibición y cotización de vestidos exclusivos diseñados en El Salvador.

## 🚀 Sobre el Proyecto

La aplicación es un catálogo interactivo que consume una API REST para mostrar productos actualizados. Está construida con tecnologías modernas para ofrecer una experiencia de usuario rápida, elegante y responsive.

### ✨ Características Principales
- **Catálogo Dinámico:** Navegación fluida por la colección de vestidos.
- **Paginación Inteligente:** Carga de productos por secciones para optimizar el rendimiento.
- **Sistema de Cotización:** Modal integrado para que los usuarios soliciten información sobre productos específicos.
- **Integración con WhatsApp:** Acceso directo para atención al cliente.
- **Diseño Premium:** Interfaz estética utilizando Tailwind CSS v4, con efectos de desenfoque (backdrop-blur) y animaciones suaves.

## 🛠️ Tecnologías Utilizadas
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (para iconos)

## 📦 Instalación

Para instalar y configurar el proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio** (opcional):
   ```bash
   git clone <url-del-repositorio>
   cd "Primera Piedra"
   ```

2. **Instalar dependencias:**
   Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego ejecuta:
   ```bash
   npm install
   ```

3. **Configurar la API:**
   Esta aplicación requiere que el servidor backend esté corriendo en:
   `http://localhost:8082/api/productos`

## 💻 Uso

### Modo Desarrollo
Para iniciar el servidor de desarrollo con Hot Module Replacement (HMR):
```bash
npm run dev
```

### Construcción para Producción
Para generar el bundle optimizado para despliegue:
```bash
npm run build
```

---
*Desarrollado para el proyecto Primera Piedra.*
