# AGENTS.md

Ecommerce de la Mueblería Hermanos Jota. Monorepo con stack MERN (MongoDB, Express, React, Node), todo en JavaScript (sin TypeScript).

## Estructura

- `client/`: frontend con React 19 + Vite (ESM, JSX).
- `api/`: backend con Express 5 (CommonJS). Rutas en `api/src/routes/`, entrada en `api/server.js`.
- Raíz: tooling compartido (ESLint, Prettier, lint-staged, commitlint, Husky). Cada paquete tiene su propio `package.json`.

> MongoDB todavía no está integrado en `api/`. Al agregarlo, documentar acá la conexión y las variables de entorno.

## Documentación (`docs/`)

Leer el archivo que corresponda antes de trabajar en el tema; no hace falta leerlos todos.

- `docs/consigna.md`: enunciado del trabajo (objetivos, requisitos técnicos de backend y frontend, entregables). Consultarlo para saber qué hay que construir o si algo cumple lo pedido.
- `docs/estructura-carpetas.md`: estructura del monorepo y convenciones de dónde va cada archivo y cómo se nombra. Consultarlo antes de crear archivos, componentes o rutas nuevas.
- `docs/manual-marca.md`: manual de marca (voz, paleta, tipografía, logo). Consultarlo al escribir textos de la interfaz o tocar estilos y diseño visual.

## Comandos

Instalar dependencias en la raíz, en `api/` y en `client/` (`npm install` en cada una). El install de la raíz activa los hooks de Husky.

| Dónde     | Comando                                   | Qué hace                                     |
| --------- | ----------------------------------------- | -------------------------------------------- |
| raíz      | `npm run lint`                            | ESLint sobre todo el repo                    |
| raíz      | `npm run format` / `npm run format:check` | Prettier (escribir / verificar)              |
| raíz      | `npm run build`                           | Build del frontend                           |
| `client/` | `npm run dev`                             | Servidor de desarrollo de Vite               |
| `api/`    | `npm run dev`                             | API con nodemon (`npm run prod` sin nodemon) |

La API usa `api/.env` (ver `api/.env.example`). Nunca commitear `.env`.

## Convenciones

- Código en JavaScript. `client/` usa ESM; `api/` usa CommonJS (`require`).
- Prettier: sin punto y coma, comillas simples, `trailingComma: all`. No discutir estilo: correr `npm run format`.
- ESLint con una única config en la raíz (`eslint.config.js`), con bloques separados para `client/` y `api/`.
- Nombres de archivos del backend con sufijo por rol, por ejemplo `health.routes.js`.
- Texto de la interfaz y documentación en español.

## Git

- Commits siguen [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`…). Commitlint lo valida en el hook `commit-msg`.
- `pre-commit`: lint-staged ejecuta ESLint y Prettier sobre los archivos en stage.
- `pre-push`: `npm run build` (build del frontend). No saltarse los hooks con `--no-verify`.

## Antes de dar una tarea por terminada

1. `npm run lint` y `npm run format:check` sin errores.
2. `npm run build` pasa si se tocó `client/`.
3. Si se tocó la API, probarla (hay requests de ejemplo en `api/requests/`).
