# 🍡 MichiMochi — Plataforma Web, Mobile y Backend API

Bienvenido al repositorio central de **MichiMochi**, una solución de comercio electrónico multiplataforma diseñada para la venta y distribución de postres artesanales japoneses (mochis) en Colombia.

El proyecto está estructurado en un monorepo modular que reúne el backend de servicios y los clientes web y móvil.

---

## 🏛️ Estructura del Proyecto

```
MichiMochi/
├── backend/       # 🚀 API REST Centralizada (Node.js + Express + TypeScript + Firebase)
├── web/           # 🌐 Aplicación Web Desktop (React 19 + Vite + Zustand)
├── expo/          # 📱 Aplicación Móvil (React Native + Expo SDK 57 + Expo Router)
└── README.md      # 📖 Documentación general del repositorio
```

---

## 📦 Descripción de los Módulos

### 1. 🚀 Backend Dedicado (`/backend`)
API REST construida con **Node.js**, **Express** y **TypeScript** bajo arquitectura por capas:
* **Autenticación y Seguridad:** JWT con Bearer Token, integración con Firebase Identity Toolkit REST API y sincronización de perfiles en Cloud Firestore.
* **Validación de Datos:** Esquemas estrictos con **Zod** para payloads de entrada.
* **Documentación Interactiva & Cliente REST:** Documentación OpenAPI 3.1 servida con **Scalar API Reference** en [`http://localhost:5000/docs`](http://localhost:5000/docs).
* **Testing:** Pruebas unitarias e integración automatizadas con **Jest** y **Supertest**.

### 2. 🌐 Aplicación Web Desktop (`/web`)
Aplicación SPA moderna para escritorio desarrollada en **React 19** y empaquetada con **Vite**:
* **Diseño e Interfaz:** Basado en especificaciones y componentes de Figma (`Node ID: 1:408` Login, `1:1092` Registro, Dashboard y Carrito).
* **Gestión de Estado:** Zustand para estado global y sincronización de sesión con el backend.
* **Integración API:** Servicios HTTP desacoplados para Login, Registro y Google OAuth.

### 3. 📱 Aplicación Móvil (`/expo`)
Aplicación nativa para iOS y Android desarrollada con **React Native** y **Expo (SDK 57)**:
* **Navegación:** Expo Router con tipado estricto de rutas.
* **Persistencia Segura:** `Expo SecureStore` para tokens JWT sensibles y `MMKV/Zustand` para estado de interfaz.
* **Capacidades Nativas:** Geolocalización, cálculo de cobertura y comunicación directa.

---

## 🚀 Guía de Instalación y Ejecución Local

### Prerrequisitos
* **Node.js** v20+ o v22+
* **npm** v10+
* **Git**

---

### 1. Ejecutar el Backend API
```bash
cd backend
npm install
npm run dev
```
* Servidor escuchando en: `http://localhost:5000`
* Documentación interactiva (Scalar): `http://localhost:5000/docs`
* Especificación OpenAPI JSON: `http://localhost:5000/docs/openapi.json`
* Ejecución de pruebas: `npm test`

---

### 2. Ejecutar la Aplicación Web Desktop
```bash
cd web
npm install
npm run dev
```
* Aplicación disponible en: `http://localhost:5173`
* Build de producción: `npm run build`

---

### 3. Ejecutar la Aplicación Mobile (Expo)
```bash
cd expo
npm install
npx expo start
```
* Abre la app en emulador Android (`a`), iOS simulator (`i`) o mediante Expo Go escaneando el código QR.

---

## 🌿 Flujo de Ramas y Versionamiento (Git Flow)

Este repositorio sigue una convención estricta de ramas y commits semánticos (*Conventional Commits*):

* **`main`**: Rama de producción con código estable y probado.
* **`develop`**: Rama de integración continua donde convergen las funcionalidades aprobadas.
* **`feature/*`**: Ramas de desarrollo para funcionalidades aisladas (ej. `feature/auth-backend`).

---

## 👥 Equipo y Créditos
* **Proyecto:** MichiMochi Dessert Co.
* **Desarrollo:** ADSO — Centro de Electricidad, Electrónica y Telecomunicaciones (CEET) 2026.
