# 📘 Documentación del Proyecto: Emotion Recognizer

**Emotion Recognizer** es una aplicación web educativa construida con React diseñada para el reconocimiento y aprendizaje de emociones mediante juegos interactivos.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura modular basada en características, separando la lógica de negocio (Controllers/Models) de la interfaz de usuario (Views).

### Estructura de Directorios

```
src/
├── components/      # Componentes UI reutilizables (Botones, Modales, Tarjetas)
├── controllers/     # Lógica de estado y contexto (AppContext)
├── models/          # Definiciones de datos y ayudas (types.ts, emotionModel.ts)
├── views/           # Pantallas principales de la aplicación
├── styles/          # Estilos globales y variables
└── assets/          # Imágenes, sonidos e iconos
```

---

## 🛠️ Tecnologías Principales

*   **React (v18):** Librería principal para la construcción de interfaces.
*   **Vite:** Entorno de desarrollo y empaquetador (Build tool).
*   **TypeScript:** Superset de JavaScript para tipado estático, mejorando la mantenibilidad.
*   **CSS Modules:** Metodología de estilos para encapsulamiento y modularidad.
*   **React Router DOM:** Manejo de navegación y rutas de la SPA.

---

## 🧩 Componentes Clave

### 1. Sistema de Juego (`views/`)
*   **GameSelectView:** Pantalla de selección de modo de juego.
*   **DifficultySelectView:** Configuración de dificultad (Fácil, Medio, Difícil).
*   **MatchingGameView (Emparejar):** Lógica del juego de memoria. Maneja el estado de las cartas, turnos y coincidencias.
*   **RecognitionGameView (Reconocer):** Lógica del juego de identificación. Presenta un estímulo visual y opciones de respuesta múltiples.
*   **GameCompletedView:** Pantalla de resumen final. Calcula estrellas y muestra insignias ganadas.

### 2. Gestión de Estado (`controllers/AppContext.tsx`)
Utiliza `React Context API` para manejar el estado global de la aplicación:
*   **Ajustes de Usuario:** Tema (Claro/Oscuro), Sonido, Animaciones, Modo Daltonismo.
*   **Progreso:** Insignias desbloqueadas y estadísticas acumuladas.

### 3. Accesibilidad (`ConfigView` & CSS)
El proyecto implementa un sistema robusto de temas mediante **Variables CSS**:
*   `data-theme='dark'`: Redefine variables de color para el modo oscuro.
*   `data-color-blind`: Ajusta paletas de colores (`--success-color`, `--error-color`) para mejorar la visibilidad según el tipo de daltonismo seleccionado.

---

## 🔄 Flujos Principales

1.  **Inicio:** El usuario aterriza en `MainMenuView`.
2.  **Configuración:** Puede acceder a `ConfigView` para personalizar la experiencia.
3.  **Selección:** Elige juego en `GameSelectView` -> Dificultad en `DifficultySelectView`.
4.  **Juego:**
    *   En **Emparejar**, se generan pares de cartas barajadas.
    *   En **Reconocer**, se presentan rondas de preguntas con distractores aleatorios.
5.  **Finalización:** Al terminar, `GameCompletedView` recibe estadísticas vía `location.state`, calcula la puntuación (estrellas) y otorga insignias si corresponde.
6.  **Navegación:** Botones consistentes para "Repetir", "Volver al Menú" o "Siguiente Nivel".

---

## 🎨 Guía de Estilos

Se utilizan variables globales definidas en `index.css` para mantener la consistencia:
*   `--primary-color`: Color principal de acción.
*   `--secondary-color`: Fondos secundarios y contenedores.
*   `--card-background`: Fondo de tarjetas/modales (crítico para modo oscuro).
*   `--text-color`: Color de texto principal (adaptable).

---

## 🚀 Despliegue y Scripts

*   `npm run dev`: Servidor de desarrollo local.
*   `npm run build`: Genera los archivos estáticos optimizados en `dist/`.
*   `npm run preview`: Vista previa local de la build de producción.
