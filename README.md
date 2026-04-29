# Vue desde cero — curso interactivo

Aplicación educativa en **español** para aprender **Vue 3** (Composition API, `<script setup>`), **Vue Router**, **Pinia**, `fetch` y buenas prácticas. Incluye lecciones con demos en vivo y una sección de **ejercicios prácticos** con pistas y soluciones.

## Requisitos

- Node.js 18+ recomendado
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue (Vercel)

Proyecto preparado para **Vite**: salida en `dist` y reglas SPA en `vercel.json` para que Vue Router funcione al recargar cualquier ruta.

1. Importa el repositorio en [Vercel](https://vercel.com).
2. Framework: Vite (o “Other” con `npm run build` y carpeta `dist`).
3. No hace falta configuración extra si Vercel detecta el `vercel.json`.

## Licencia

MIT — úsalo y adáptalo libremente para enseñar o practicar.
