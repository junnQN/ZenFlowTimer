# Zen Timer - Meditation & Breathing App

## Overview

Zen Timer is a hyper-minimalist meditation and breathing exercise application built with React, Express, and TypeScript. The app provides a distraction-free timer experience for various meditation practices including countdown timers and guided breathing exercises (box breathing, 4-7-8 breathing, and cyclic sighing). The design philosophy emphasizes radical simplicity, generous spacing, and purposeful interactions aligned with Apple Human Interface Guidelines and Zen minimalism principles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with HMR support
- **TanStack Query v5** for server state management and API data fetching
- **Single-page application (SPA)** with client-side routing handled via component state

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives (new-york style variant)
- **Tailwind CSS** for utility-first styling with custom design tokens
- **CSS Variables** for theming with light/dark mode support
- Custom design system following strict spacing primitives (2, 4, 8, 12, 16 units)

**State Management Approach**
- Local component state for timer session management (useState hooks)
- Custom `useTimer` hook encapsulates timer logic with phase tracking for breathing exercises
- User preferences stored via API with QueryClient caching
- No global state library - component composition and prop drilling for data flow

**Key Design Decisions**
- Inter font family (weights 200-600) for clean typography hierarchy
- Tabular numerals for timer display consistency
- Generous spacing (64px vertical rhythm) for calm user experience
- Minimal animations - timer transitions only, no decorative effects

### Backend Architecture

**Server Framework**
- **Express.js** REST API server with TypeScript
- **Node.js** runtime with ESM module system
- Development mode with tsx runtime, production builds via esbuild

**API Design**
- RESTful endpoints for user preferences (`/api/preferences`)
- JSON request/response format
- Simple error handling with HTTP status codes
- Request logging middleware for API calls only

**Data Layer**
- **In-memory storage** (MemStorage class) for current implementation
- Abstracted IStorage interface allows future database integration
- User preferences schema validation using Zod

**Database Strategy**
- **Drizzle ORM** configured for PostgreSQL (via @neondatabase/serverless driver)
- Schema defined in shared folder for type sharing between client/server
- Migration system via drizzle-kit (push command)
- **Note**: Database is configured but not actively used - current implementation uses in-memory storage

**Rationale for Storage Abstraction**
- IStorage interface allows swapping memory storage for database without changing route handlers
- Zod schemas provide runtime validation and type inference
- Shared schema types ensure consistency across full stack

### External Dependencies

**Database & ORM**
- **Neon Serverless Postgres** - Configured as the target database platform
- **Drizzle ORM v0.39.1** - Type-safe SQL query builder and schema management
- **Drizzle-Zod v0.7.0** - Schema to Zod validator bridge
- Connection via DATABASE_URL environment variable (required but not actively used)

**UI Component Libraries**
- **Radix UI** - Comprehensive suite of unstyled, accessible component primitives
  - Dialog, Dropdown, Popover, Toast, Tooltip, and 20+ other primitives
  - Provides keyboard navigation, focus management, and ARIA attributes
- **shadcn/ui** - Pre-styled Radix components following new-york design variant
- **Tailwind CSS v3** with PostCSS for processing

**Form & Validation**
- **React Hook Form** - Form state management with minimal re-renders
- **@hookform/resolvers** - Integration layer for Zod validation schemas
- **Zod** - Runtime type validation and TypeScript type inference

**Utilities & Icons**
- **lucide-react** - Icon library (Play, Pause, Timer, Wind, Moon, Zap, etc.)
- **date-fns v3.6.0** - Date manipulation utilities
- **clsx & tailwind-merge** - Conditional className composition
- **class-variance-authority** - Type-safe component variant management
- **cmdk** - Command menu/palette component

**Development Tools**
- **@replit/vite-plugin-runtime-error-modal** - Enhanced error overlay for development
- **@replit/vite-plugin-cartographer** - Replit-specific development tooling
- **nanoid** - Unique ID generation for sessions/components

**Audio Synthesis**
- **Web Audio API** (native browser API) - Sound generation for timer completion and phase transitions
- Custom oscillator implementation for meditation bell tones
- No external audio library dependencies

**Third-Party Services**
- **Google Fonts** - Inter font family loaded via CDN
- No analytics, authentication, or external API integrations currently implemented