# Previo
## Archivo .env.local
Crear el archivo ".env.local" con el contenido:

```bash
NEXT_PUBLIC_BACKEND_URL = http://localhost:8080
NEXT_PUBLIC_MINIO_URL = http://localhost:9000
```
## Estructura de Archivos

```bash

SYNTAXFLAVOR_FRONTEND_WEB
├── .next
├── node_modules
├── public
│   └── favicon.ico
├── src
│   ├── components
│   ├── pages
│   ├── service
│   └── styles
├── .env.local        <----------
├── .eslintrc.json
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Previous installations

```bash
# npm update next webpack
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy to Docker locally

To deploy the project in a docker container, run the following commands:

Ensure that after the build you have a `out/` directory with an `index.html` file.

```bash
pnpm build
docker build -t syntaxflavor_frontend_web .
docker run -p 3000:80 syntaxflavor_frontend_web
```