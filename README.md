# Bodega App - Sistema de Auditoría de Inventario 📦

Una aplicación móvil nativa desarrollada en React Native y Expo para la gestión y auditoría de inventarios. Permite escanear productos, reportar incidencias con notas de voz y registrar la ubicación GPS exacta de cada movimiento.

---

## 🚀 Características Principales

*   **Escáner de Códigos de Barras:** Integración nativa con la cámara del dispositivo para identificar SKUs rápidamente.
*   **Auditoría Inteligente:** Dos flujos de trabajo claros: *Stock Exacto* e *Incidencia*.
*   **Notas de Voz:** Grabación de audio para justificar discrepancias en el inventario utilizando `expo-audio`.
*   **Rastreo Satelital:** Etiquetado geográfico automático (GPS) de cada registro y visualización en un mapa interactivo.
*   **Gestión de Estado:** Manejo eficiente de la bitácora y catálogo utilizando Redux Toolkit.
*   **Arquitectura Modular:** Separación estricta de componentes visuales, pantallas y lógica de estado.

## 🛠️ Tecnologías Utilizadas

*   [React Native](https://reactnative.dev/) & [Expo Router](https://docs.expo.dev/router/introduction/)
*   **Estado:** Redux Toolkit
*   **Hardware:** `expo-camera`, `expo-audio`, `expo-location`
*   **Mapas:** `react-native-maps` (Integración nativa con Google Maps)
*   **Lenguaje:** TypeScript

## ⚙️ Guía de Instalación y Ejecución

Debido a la profunda integración de módulos nativos de hardware (Cámara, Micrófono y Mapas de Google), **esta aplicación no es compatible con la aplicación de prueba Expo Go**. Debe compilarse directamente usando las librerías nativas de Android.

### 1. Requisitos Previos
*   Node.js (v18+)
*   Android Studio (con emulador o dispositivo Android físico configurado para depuración por USB)
*   Git

### 2. Clonar el repositorio
```bash
git clone <https://github.com/RodriCalix/auditoria-dpslab2.git>
cd bodega-app
```

### 3. Instalar dependencias
Debido a requerimientos específicos del entorno de React 19, es obligatorio instalar las dependencias usando la bandera *legacy*:
```bash
npm install --legacy-peer-deps
```

### 4. Compilar y Ejecutar
Asegúrate de tener un emulador ejecutándose o tu teléfono físico conectado. Luego corre el siguiente comando para ensamblar el APK e instalarlo:
```bash
npx expo run:android
```

## 👨‍💻 Autores
Proyecto académico desarrollado para la facultad de Ingeniería en Ciencias de la Computación de la Universidad Don Bosco (UDB).

*   **Rodrigo Josué Calixto López CL230353**
*   **Luis Felipe Cuadra Cruz CC230464**
