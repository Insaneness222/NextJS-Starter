# Battlefield Deployment Simulator

## Overview

A research Proof of Concept (PoC) web application for optimal unmanned platform positioning using weighted scoring models. This 2D battlefield simulator demonstrates automated position selection for Artillery, Tank, and UGV (Unmanned Ground Vehicle) deployment. The application features terrain generation, obstacle editing, configurable weight parameters, and simulation visualization with scoring breakdowns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter (lightweight client-side routing) with three main routes: Overview (/), PoC (/poc), and Demo (/demo)
- **State Management**: Zustand for global state (battlefield state, theme, language preferences)
- **UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS styling
- **Rendering**: HTML Canvas for the 2D battlefield visualization
- **Internationalization**: Custom i18n implementation with English/Korean language support using Zustand for state persistence

### Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Pattern**: RESTful endpoints prefixed with /api (currently minimal backend usage - primarily client-side application)
- **Static Serving**: Production builds served from dist/public directory
- **Development**: Vite dev server with HMR integration through Express middleware

### Data Storage
- **Database Schema**: PostgreSQL with Drizzle ORM (schema defined but minimal usage - app is primarily client-side)
- **Client Storage**: LocalStorage via Zustand persist middleware for theme and language preferences
- **In-Memory Storage**: MemStorage class for user data (development/demo purposes)

### Core Simulation Logic
- **Grid System**: 50x30 cell grid with elevation and obstacle data
- **Scoring Algorithm**: Multi-factor weighted scoring (visibility, exposure, cover, elevation, mobility, separation)
- **Raycasting**: Bresenham line algorithm for line-of-sight calculations
- **Terrain Presets**: Open Field, Dense Obstacles, Mixed, Ridge/Valley configurations

### Key Design Decisions
1. **Client-Side First**: Simulation runs entirely in browser for immediate feedback and no server round-trips
2. **Modular Scoring**: Weights are fully configurable per platform type (artillery, tank, UGV) allowing experimentation
3. **Canvas Rendering**: Chosen over DOM-based rendering for performance with large grid and real-time updates
4. **Bilingual Support**: Full EN/KO translation system for research presentation purposes

## External Dependencies

### UI Framework
- **Radix UI**: Full suite of accessible, unstyled primitives (dialog, select, accordion, tabs, etc.)
- **Tailwind CSS**: Utility-first CSS with custom tactical/professional theme colors
- **Lucide React**: Icon library for consistent iconography

### State & Data
- **Zustand**: Lightweight state management with persistence middleware
- **TanStack React Query**: Data fetching (minimal usage in current implementation)
- **Drizzle ORM**: Type-safe database toolkit with Zod integration for schema validation

### Build & Development
- **Vite**: Frontend build tool with React plugin and HMR
- **esbuild**: Server-side bundling for production builds
- **TypeScript**: Full type coverage across client and server

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **connect-pg-simple**: Session storage for Express (if sessions are enabled)

### Fonts
- **Google Fonts**: Inter (UI text), JetBrains Mono (data/metrics), DM Sans, Fira Code, Geist Mono