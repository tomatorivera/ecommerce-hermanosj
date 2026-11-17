# Ecommerce Mueblería Hermanos Jota

## Introducción

Este repositorio corresponde al proyecto fullstack del ecommerce para la Mueblería Hermanos Jota, con React, CSS, Express y MongoDB.

En este repositorio se encuentra la versión correspondiente a la entrega de los Sprints 5 y 6 del trayecto FullStack del ITBA.

## Integrantes

Este trabajo es del grupo 5: "Los Simuladores", de la comisión 2 del turno mañana, conformado por:

- [Tomas](https://www.github.com/tomatorivera)
- [Stefania](https://www.github.com/sny22)
- [Gaston](https://www.github.com/Raimondi-Gaston)
- [Karen](https://www.github.com/knsc1603)
- [Emiliano](https://www.github.com/RamirezJoseEmiliano)

## Instalación y ejecución

Requisitos: Node.js 20.19 o superior (o 22.12 o superior) y npm, que es lo que pide Vite, y una base de datos MongoDB (por ejemplo, un cluster de MongoDB Atlas).

1. Clonar el repositorio e instalar las dependencias en la raíz, en `api/` y en `client/`:

   ```bash
   npm install
   npm install --prefix api
   npm install --prefix client
   ```

   El install de la raíz activa los hooks de Husky.

2. Crear `api/.env` a partir de `api/.env.example` y definir el puerto de la API (el frontend la espera en el 3000) y la URI de conexión a MongoDB:

   ```bash
   PORT=3000
   MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>/<base>
   ```

3. Cargar los productos iniciales de `api/data/productos.js` en la base:

   ```bash
   cd api && npm run seed
   ```

4. Levantar los dos servidores, cada uno en su terminal:

   ```bash
   cd api && npm run dev      # API en http://localhost:3000 (con --watch; npm run prod sin recarga)
   cd client && npm run dev   # Frontend en http://localhost:5173
   ```

En `api/requests/` hay requests de ejemplo para probar cada endpoint.

## Arquitectura

Monorepo con dos paquetes independientes, cada uno con su propio `package.json`:

- `client/`: frontend en React 19 con React Router. Pide los datos a la API con `fetch`; la URL base está en `client/src/constants.js`.
- `api/`: backend en Express 5 con MongoDB (Mongoose). Es la carpeta que la consigna llama `/backend`.
- Raíz: herramientas compartidas (ESLint, Prettier, Husky, lint-staged, commitlint) y documentación en `docs/`.

Endpoints de la API:

| Método | Ruta                 | Descripción                                                     |
| ------ | -------------------- | --------------------------------------------------------------- |
| GET    | `/api/ping`          | Chequeo de que la API está levantada                            |
| GET    | `/api/productos`     | Listado completo de productos                                   |
| GET    | `/api/productos/:id` | Un producto por id, o 404 si no existe                          |
| POST   | `/api/productos`     | Crea un producto                                                |
| PUT    | `/api/productos/:id` | Edita un producto                                               |
| DELETE | `/api/productos/:id` | Elimina un producto                                             |
| POST   | `/api/contacto`      | Recibe el formulario de contacto (201, o 400 si falta un campo) |

Rutas del frontend:

| Ruta                           | Vista                                  |
| ------------------------------ | -------------------------------------- |
| `/`                            | Inicio                                 |
| `/productos`                   | Catálogo                               |
| `/productos/:id`               | Detalle de un producto                 |
| `/contacto`                    | Contacto                               |
| `/admin/crear-producto`        | Alta de producto                       |
| `/admin/editar-producto/:id`   | Edición de producto                    |
| `/admin/eliminar-producto/:id` | Confirmación para eliminar un producto |

Las rutas inexistentes responden 404 en JSON y cualquier error no controlado pasa por un manejador centralizado que responde en JSON. Un middleware propio registra el método y la URL de cada petición.

El detalle de carpetas y convenciones está en `docs/estructura-carpetas.md`.

## Decisiones tomadas

- **Vite en lugar de create-react-app:** la consigna menciona create-react-app, pero hoy está discontinuado y React ya no lo recomienda. Usamos Vite, que es la alternativa recomendada, arranca más rápido y no cambia nada del código de React que pide la consigna.
- **`api/` en lugar de `/backend`:** es solo el nombre de la carpeta; contiene el backend completo en Express.
- **Navegación con React Router:** `App.jsx` define las rutas con `Routes` y cada vista es una page en `client/src/pages/`.
- **Estado compartido en `App.jsx`:** el carrito vive en `App` y llega a los componentes por props, por ejemplo el contador del `Navbar`.
- **Estilos compartidos en `global.css`:** los tokens de color y los componentes que se repiten (`.card`, `.form`, `.btn`, `.alert`) viven en `client/src/css/global.css`; cada archivo de `css/` solo tiene lo propio de su componente.
- **Lógica en las routes, sin controllers:** los endpoints son chicos, así que cada route lee los datos y arma la respuesta. Los productos se guardan en MongoDB con un modelo de Mongoose (`api/src/models/`); `api/data/productos.js` solo aporta los datos iniciales del seed.

## Cómo trabajamos

- Una rama por issue y Pull Request contra `dev`.
- Commits con [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`…). Los hooks de Husky validan el mensaje, corren lint y Prettier antes de cada commit y el build antes de cada push.

## Documentación (`docs/`)

Leer el archivo que corresponda antes de trabajar en el tema; no hace falta leerlos todos.

- `docs/consigna-parte-1.md` y `docs/consigna-parte-2.md`: enunciados del trabajo (Sprints 3 y 4, y Sprints 5 y 6: objetivos, requisitos técnicos de backend y frontend, entregables). Consultarlos para saber qué hay que construir o si algo cumple lo pedido.
- `docs/estructura-carpetas.md`: estructura del monorepo y convenciones de dónde va cada archivo y cómo se nombra. Consultarlo antes de crear archivos, componentes o rutas nuevas.
- `docs/manual-marca.md`: manual de marca (voz, paleta, tipografía, logo). Consultarlo al escribir textos de la interfaz o tocar estilos y diseño visual.
