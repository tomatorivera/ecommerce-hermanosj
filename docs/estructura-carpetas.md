# Estructura de carpetas

El proyecto es un monorepo MERN en JavaScript: el frontend (`client/`) y el backend (`api/`) son paquetes independientes, cada uno con su propio `package.json`. En la raíz van además las herramientas de eslint, prettier y husky compartidas + la documentación.

```text
ecommerce-hermanosj/
├── client/                         # Frontend: React 19 + Vite (ESM, JSX)
│   ├── index.html                  # Punto de entrada de Vite
│   ├── vite.config.js
│   ├── public/
│   │   └── images/                 # Imágenes de productos (se sirven en /images/...)
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                 # Estado global (p. ej. carrito) y vistas
│       ├── assets/                 # Imágenes de la interfaz (logo, banner), se importan
│       ├── components/             # Componentes (Navbar, ProductCard, ...)
│       └── css/                    # Estilos, un archivo por componente
├── api/                            # Backend: Express 5
│   ├── server.js                   # Entrada: middlewares y montaje de rutas
│   ├── .env.example                # Variables de entorno (nunca commitear .env)
│   ├── requests/                   # Requests de ejemplo para probar la API
│   ├── data/                       # Archivos con datos (productos, ...)
│   └── src/
│       ├── routes/                 # Endpoints y su lógica (health.routes.js, ...)
│       └── middlewares/            # Middlewares propios (logger.middleware.js, ...)
├── docs/
│   ├── consigna.md
│   └── estructura-carpetas.md
├── eslint.config.js                # Única config de ESLint (para client/ y api/)
├── .prettierrc                     # Formato compartido
├── .husky/                         # Hooks de git
├── AGENTS.md
└── README.md
```

## Convenciones

### Generales

- Los archivos de **lógica** se nombran como `nombre-archivo.tipo.js`, con minúsculas y guiones (ej.: `health.routes.js`, `logger.middleware.js`).
- Los componentes de React son la excepción: usan `PascalCase` y extensión `.jsx` (ej.: `ProductCard.jsx`).
- Todo el código en JavaScript, sin TypeScript. `client/` usa ESM; `api/` usa CommonJS (`require`).
- Texto de la interfaz y documentación en español.

### Frontend (`client/`)

- Los componentes nuevos van en `client/src/components/`.
- El CSS de cada componente va en `client/src/css/`, en un archivo propio (ej.: `ProductCard.css`).
- Las imágenes de productos van en `client/public/images/`. La API guarda su ruta como `/images/nombre.png` y se usa tal cual en `<img src>`. Las imágenes de la interfaz (logo, banner) van en `client/src/assets/` y se importan desde el componente.
- El estado compartido (como el carrito) vive en `App.jsx` y se pasa a los componentes por props.

### Backend (`api/`)

- Las rutas nuevas van en `api/src/routes/`, cada una en su propio archivo, y se montan en `server.js`.
- Cada route define el endpoint y contiene su lógica: lee los datos y arma la respuesta. No se usan controllers porque los endpoints son chicos.
- Los datos van en `api/data/`, como archivos `.js` con arrays de objetos, y las rutas los importan directamente.
- Los middlewares propios van en `api/src/middlewares/` y se registran en `server.js` antes de las rutas. La excepción son los de manejo de errores (`not-found.middleware.js` y `error.middleware.js`), que se registran después de las rutas.
- Las rutas que necesitan cortar con un error lo lanzan (o lo pasan con `next(error)`) y el manejador centralizado responde en JSON: si el error trae `status` menor a 500 se usa ese código y su mensaje; si no, 500 con un mensaje genérico.
