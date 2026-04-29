# Vue desde cero — curso interactivo

Repositorio público: **https://github.com/JcAmela/vue-curso-desde-cero**

Aplicación educativa en **español** para aprender **Vue 3** (Composition API, `<script setup>`), **Vue Router**, **Pinia**, `fetch` y buenas prácticas. Incluye lecciones con demos en vivo y una sección de **ejercicios prácticos** con pistas y soluciones.

## Despliegue en Vercel (recomendado)

1. Entra en [vercel.com](https://vercel.com) e inicia sesión.
2. **Add New → Project** e importa el repo `JcAmela/vue-curso-desde-cero`.
3. Ajustes que Vercel suele detectar sola:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`
4. El archivo `vercel.json` incluye la regla SPA para que rutas como `/practica` funcionen al recargar.
5. Pulsa **Deploy**.

Si prefieres la CLI: `npx vercel login` y luego `npx vercel --prod` en la raíz del proyecto.

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

## Licencia

MIT — úsalo y adáptalo libremente para enseñar o practicar.
