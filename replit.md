# Health Inspector Application

## Overview

A full-stack web application for searching and viewing restaurant and hotel health inspection data. The system provides transparent access to health inspection records, allowing users to search establishments, view inspection details, violations, and safety information. Built with a modern React frontend and Express.js backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite for development and build tooling
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Server**: Express.js with TypeScript, serving both API endpoints and static files
- **Database Layer**: Drizzle ORM with PostgreSQL, providing type-safe database operations
- **Storage Abstraction**: Interface-based storage layer with in-memory implementation for development
- **API Design**: RESTful endpoints for establishment search, details, and suggestions

### Data Model
- **Establishments**: Core entity with business details, location, and license information
- **Inspections**: Time-stamped inspection records linked to establishments with scores and grades
- **Violations**: Detailed violation records categorized by severity (critical, major, minor)
- **Certifications**: Business certifications with validity periods
- **Safety Features**: Additional safety-related information per establishment

### Search and Discovery
- **Full-text Search**: Fuse.js integration for fuzzy search capabilities across establishment names and details
- **Auto-suggestions**: Real-time search suggestions based on establishment names, types, and addresses
- **Filtering**: Multi-criteria filtering by business type (restaurant/hotel), grade (A/B/C), and location
- **Pagination**: Offset-based pagination for large result sets

### Development Features
- **Hot Reload**: Vite development server with HMR for rapid development
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Code Quality**: ESLint and Prettier configuration for consistent code style
- **Build Process**: Separate build processes for client (Vite) and server (ESBuild)

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle Kit**: Database migration and schema management tool

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Replit Integration**: Specialized plugins for Replit development environment
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

### Search and Data Processing
- **Fuse.js**: Fuzzy search library for intelligent text matching
- **Date-fns**: Date manipulation and formatting utilities
- **Zod**: Runtime type validation and schema definition

### Build and Deployment
- **Vite**: Modern build tool for frontend assets with optimized production builds
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **TSX**: TypeScript execution engine for development server