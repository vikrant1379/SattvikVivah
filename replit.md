# Overview

SattvikVivah is a spiritual matrimony platform designed to help spiritually-minded individuals find compatible life partners based on dharmic values, spiritual practices, and shared philosophical beliefs. The application focuses on deep spiritual compatibility rather than superficial attributes, catering to those seeking partners for their Grihastha (householder) journey with aligned spiritual aspirations.

The platform combines traditional Indian spiritual concepts with modern web technologies to create a comprehensive matchmaking experience that includes profile creation, spiritual filtering, interest management, daily inspiration, and community features like Sattvik Connect.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client is built using React with TypeScript and follows a modern component-based architecture. The UI leverages shadcn/ui components for consistent design patterns and Tailwind CSS for styling with custom spiritual color themes (sage green, lotus pink, warm beige, earth brown). The application uses Wouter for lightweight client-side routing and TanStack Query for efficient server state management and caching.

## Backend Architecture  
The server follows a RESTful API design using Express.js with TypeScript. It implements a layered architecture with dedicated route handlers, storage abstraction through the IStorage interface, and comprehensive error handling middleware. The API includes endpoints for user management, spiritual profile operations, interest/matching functionality, and inspirational content delivery.

## Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations and schema management. The current implementation includes an in-memory storage adapter (MemStorage) for development, with the database schema designed to support complex spiritual matching criteria including arrays for spiritual practices, sacred texts, and detailed profile attributes.

## Database Schema Design
The schema includes three main entities:
- **Users table**: Core authentication and basic profile metadata
- **Spiritual profiles table**: Comprehensive spiritual and personal information including practices, lineage, dietary preferences, and life goals
- **Additional tables**: For interests, inspirational quotes, and potential future features like messaging or compatibility scoring

## State Management
The frontend uses a combination of TanStack Query for server state, React Context (SpiritualContextProvider) for application-wide spiritual search and filtering state, and local component state for UI interactions. Form state is managed through React Hook Form with Zod validation schemas shared between client and server.

## Authentication & Authorization
The system is structured to support session-based authentication with user registration and profile creation workflows, though the current implementation focuses on the core matrimony features rather than complex auth flows.

# External Dependencies

## Database & ORM
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database operations and migrations
- **Neon Database**: Serverless PostgreSQL provider integration

## UI & Styling
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework with custom spiritual theme
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Custom typography (Inter, Crimson Text, Noto Serif Devanagari)

## Form & Validation
- **React Hook Form**: Performant form state management
- **Zod**: Schema validation shared between client and server
- **@hookform/resolvers**: Integration between React Hook Form and Zod

## Development & Build Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundling for production builds

## API & State Management  
- **TanStack React Query**: Server state management, caching, and synchronization
- **Wouter**: Lightweight client-side routing
- **date-fns**: Date manipulation and formatting utilities