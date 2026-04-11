# 3G: Evolución Móvil Interactiva

Una presentación interactiva sobre la evolución de las redes móviles 3G, cubriendo las tecnologías IMT-2000, WCDMA/UMTS, TDMA-EDGE e IS-136HS.

## Descripción

Este proyecto es una aplicación web interactiva desarrollada con Next.js que presenta de manera educativa la evolución de las comunicaciones móviles de tercera generación (3G). Incluye secciones sobre:

- **IMT-2000**: Estándares internacionales para redes móviles de tercera generación
- **WCDMA/UMTS**: Wideband Code Division Multiple Access / Universal Mobile Telecommunications System
- **EDGE**: Enhanced Data rates for GSM Evolution
- **Servicios 3G**: Aplicaciones y servicios disponibles en redes 3G
- **Quiz interactivo**: Para evaluar el conocimiento adquirido

## Tecnologías Utilizadas

- **Next.js 16**: Framework de React para aplicaciones web
- **TypeScript**: Tipado estático para JavaScript
- **Tailwind CSS**: Framework de estilos utilitarios
- **Radix UI**: Componentes de interfaz de usuario accesibles
- **Lucide React**: Iconos modernos

## Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/StebanJrb/Comunicaciones-Moviles---3G.git
   cd Comunicaciones-Moviles---3G
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   pnpm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

- `app/`: Páginas y layout de Next.js
- `components/`: Componentes React reutilizables
  - `hero-section.tsx`: Sección principal con diagrama de red
  - `timeline-section.tsx`: Línea de tiempo de evolución 3G
  - `imt2000-section.tsx`: Detalles sobre IMT-2000
  - `umts-section.tsx`: Información sobre UMTS/WCDMA
  - `edge-section.tsx`: Tecnología EDGE
  - `services-section.tsx`: Servicios disponibles
  - `quiz-section.tsx`: Cuestionario interactivo
- `ui/`: Componentes de interfaz de usuario (shadcn/ui)

## Contexto Educativo

Este proyecto forma parte del curso de **Comunicaciones Móviles** en la **Universidad Piloto de Colombia**, proporcionando una herramienta interactiva para el aprendizaje de las tecnologías de redes móviles 3G.

## Licencia

Este proyecto es de uso educativo y está destinado para fines académicos.
