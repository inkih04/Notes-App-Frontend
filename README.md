# 📝 Notes App Frontend

Una aplicación web moderna y colaborativa para la gestión de notas y notebooks, construida con React y Vite. Permite crear, editar y compartir notebooks de forma colaborativa en tiempo real.

## ✨ Características

- 📚 **Gestión de Notebooks**: Crea y organiza tus notebooks de forma intuitiva
- 📝 **Editor de Notas**: Edita tus notas con una interfaz limpia y moderna
- 👥 **Colaboración en Tiempo Real**: Comparte notebooks y trabaja simultáneamente con otros usuarios
- 📱 **Diseño Responsive**: Optimizado tanto para escritorio como para dispositivos móviles
- 🔐 **Autenticación con Google**: Inicio de sesión seguro y sencillo
- 🎨 **Interfaz Moderna**: Diseño atractivo y funcional

## 🛠️ Tecnologías

- **React** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción rápida y moderna
- **Google OAuth** - Autenticación segura
- **CSS Responsive** - Diseño adaptable a todos los dispositivos

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/inkih04/Notes-App-Frontend.git
   cd Notes-App-Frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```env
   VITE_GOOGLE_CLIENT_ID=
   VITE_API_URL=
   ```

4. **Ejecuta la aplicación en modo desarrollo**
   ```bash
   ./run-dev.sh
   ```
   
   O alternativamente:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173`

## 📱 Uso

### Funcionalidades Principales

1. **Inicio de Sesión**
   - Utiliza tu cuenta de Google para acceder a la aplicación

2. **Gestión de Notebooks**
   - Crea nuevos notebooks
   - Visualiza todos tus notebooks existentes
   - Organiza tus notas por categorías

3. **Editor de Notas**
   - Crea y edita notas dentro de tus notebooks
   - Guarda automáticamente tus cambios
   - Interfaz intuitiva y responsive

4. **Colaboración**
   - Comparte notebooks con otros usuarios
   - Trabaja de forma simultánea en el mismo notebook
   - Sincronización en tiempo real

## 🏗️ Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas principales de la aplicación
├── hooks/         # Hooks personalizados
├── services/      # Servicios para comunicación con la API
├── styles/        # Archivos de estilos
└── utils/         # Utilidades y helpers
```

## 🤝 Colaboración


## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 💻 **Escritorio**: Experiencia completa con todas las funcionalidades
- 📱 **Móvil**: Interfaz adaptada para pantallas táctiles
- 📊 **Tablet**: Diseño híbrido que aprovecha el espacio disponible

## 🌐 Demo y Enlaces

### 🚀 Aplicación en Vivo
- **Demo**: [Notes App en Vercel](https://notes-app-frontend-yv8o-git-feat-deploy-vics-projects-668ba45c.vercel.app/)

### 🔗 Enlaces Adicionales
- **Frontend**: [GitHub Repository](https://github.com/inkih04/Notes-App-Frontend)
- **Backend**: [API en Render](https://notes-app-backend-37a9.onrender.com)

### ⚠️ Nota sobre Rendimiento

La aplicación está desplegada utilizando las **tier gratuitas** de Vercel (frontend) y Render (backend), por lo que:

- 🐌 **Primer acceso**: Puede tardar hasta **1 minuto** en cargar cuando no ha habido actividad reciente
- ⏱️ **Rendimiento**: La velocidad puede ser menor a la óptima debido a las limitaciones de los planes gratuitos
- 😴 **Hibernación**: El backend en Render entra en modo de hibernación después de períodos de inactividad

Para una experiencia óptima, recomendamos ejecutar la aplicación localmente siguiendo las instrucciones de instalación.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🙋‍♂️ Soporte

Si tienes alguna pregunta o encuentras algún problema, no dudes en abrir un issue en el repositorio de GitHub.

---

**Desarrollado con ❤️ usando React y Vite**