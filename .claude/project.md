# Sponseasy - Project Documentation

## Project Overview

Sponseasy is a proposal management system dedicated to sponsorship proposals. It allows sponsorship seekers to build professional sponsorship decks with a live builder interface and publish them as interactive websites.

### Core Value Proposition

- **Live Proposal Builder**: Users answer questions in a form on the left side while previewing the generated website on the right side
- **Customization**: Full design customization available in the settings section
- **Multi-Format Publishing**: Each proposal can be published as a live website or exported as a PDF
- **Lead Generation**: Built-in contact forms on each proposal to capture sponsor inquiries
- **Simple CRM**: Dashboard to track proposal views and manage incoming leads

## Architecture

### Hosting Infrastructure

- **Main Application**: Hosted on Heroku at `app.sponseasy.com`
- **Proposals**: Hosted on AWS with custom subdomain structure
  - Each user gets a subdomain: `organisation.sponseasy.com`
  - Each proposal is accessible at: `organisation.sponseasy.com/proposal_name`

### Code Structure

The application is split into two main sections:

#### 1. App Folder
Contains all web application builder code:
- Authentication and login
- Form builder
- Dashboard
- User management
- CRM functionality

#### 2. Template Folder
Used to render the JSON generated from forms:
- Single template React application
- All design changes and customizations handled in this one app
- Customizations through colors, elements, and font sizes
- Runs on a different port from the main app

Both React applications can be started using NPM on different ports.

### Technology Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **State Management**: MobX (handles all business logic including form builder and premium access)
- **Styling**: CSS Modules

## Key Features

### 1. Form Builder System

Allows admins to create forms for different project categories:
- Podcasts
- Festivals
- Athletes
- Custom categories

**Capabilities**:
- Forms can be created and edited from the admin panel
- Design system with many elements corresponding to deck builder inputs
- Element library available for reuse

### 2. Template Systems

#### Design Templates
Template system for proposal designs (currently not heavily used).

#### Pre-filled Templates
Allows users to start with pre-filled proposal templates instead of starting from scratch.

### 3. Dashboard & CRM

Users can:
- Track views for each proposal deck
- View received inquiries from potential sponsors
- Duplicate proposals
- Create and organize proposals in folders
- Manage leads through a simple CRM interface

### 4. Lead Capture System

Each web proposal includes a contact form that:
- Sends inquiry information via email to the user
- Stores inquiries in the dashboard
- Enables lead tracking and follow-up

### 5. Admin Panel

Existing admin interface for:
- User management
- Proposal management
- Form builder configuration
- Template management

## External Services

### File & Asset Management
- **Filestack**: File upload handling

### Security & Infrastructure
- **Zero SSL**: SSL certificate management

### Marketing
- **Webflow**: Marketing pages hosting

### Email Services
- **Mailjet**: Transactional email system

## Build & Deployment

### CI/CD Pipeline

- **Build System**: CircleCI
- **Branches**:
  - `staging`: Staging environment
  - `production`: Production environment
- **Deployment**: Automatic deployment on push to GitHub

### Running Locally

Both React applications (App and Template) can be started using npm on different ports.

## Premium Features & Monetization

### Payment Processing
- **Stripe**: Payment processing integration
- Premium account currently required for full access

### Feature Flags

Premium accounts have access to:
- Extended color palette for templates
- Additional customization options
- Other premium features governed by account feature flags

MobX models contain logic for premium account restrictions.

## Customization Guide

### Changing Template Design

Templates are generated from JSON provided by the form builder and split into dynamic elements.

**Process**:
1. Navigate to template React app
2. Find relevant element components (all are React components)
3. Edit component styling and behavior
4. Register new elements in: `src/template/elements/list.tsx`

**Note**: There is only one template, and all customization is governed by element JSON files. Check each element for possible settings.

### Changing Pricing

Requires editing both frontend and backend:
1. Update Stripe pricing configuration
2. Modify premium logic in MobX models
3. Update feature flag checks throughout the application

## Element Registration

Elements can be registered in the template system:
- **Registry Location**: `https://github.com/Sponseasy/sponseasy-client/blob/master/src/template/elements/list.tsx`
- Each element has configurable settings in its JSON definition
- Elements are dynamically generated based on form builder JSON output

## Migration to Modern Stack

### New Technology Stack (Current Project)

The application is being rebuilt with a modern, industry-standard stack:

**Core Framework**
- **Next.js 15**: React framework with App Router for server-side rendering and optimal performance
- **TypeScript**: Type-safe development with improved developer experience
- **Vercel**: Serverless deployment platform with automatic CI/CD

**UI & Styling**
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality, accessible React components built on Radix UI
- **CSS Variables**: Design token system for consistent theming

**State Management & Data Fetching**
- Server Components for data fetching
- React Server Actions for mutations
- Client-side state management (TBD: Zustand or Jotai to replace MobX)

**Development Experience**
- Hot Module Replacement (HMR) for instant feedback
- TypeScript strict mode for type safety
- ESLint + Prettier for code quality
- Modern build tooling with Turbopack

### Migration Strategy

**Phase 1: Foundation**
- Set up Next.js project structure with App Router
- Implement design system with shadcn/ui and Tailwind
- Configure TypeScript and development tooling
- Set up Vercel deployment pipeline

**Phase 2: Core Features**
- Migrate authentication system
- Rebuild form builder with modern React patterns
- Implement proposal template engine
- Create dashboard and CRM interface

**Phase 3: Advanced Features**
- Implement real-time preview system
- Add PDF export functionality
- Migrate premium features and Stripe integration
- Build admin panel

**Phase 4: Data & Services**
- Database migration (consider Vercel Postgres or Neon)
- Update external service integrations
- Implement new email system (Resend vs Mailjet)
- File upload modernization (UploadThing vs Filestack)

### Architecture Improvements

**Unified Application**
- Single Next.js application replacing separate App and Template React apps
- Server-side rendering for better SEO and performance
- API Routes for backend functionality
- Edge functions for global performance

**Modern Hosting**
- Vercel for automatic deployments and previews
- Edge network for global CDN
- Serverless functions for backend logic
- Built-in analytics and monitoring

**Component Architecture**
- Server Components for static content and data fetching
- Client Components for interactive features
- Shared component library with shadcn/ui
- Design token system with CSS variables

**Key Benefits**
- Improved performance with App Router and Server Components
- Better developer experience with modern tooling
- Simplified deployment with Vercel
- Enhanced UI consistency with shadcn/ui
- Type safety throughout the application
- Reduced bundle size and faster page loads

## Current State & Technical Debt

### Legacy Codebase (Old System)
- Application is several years old
- No code updates made in years
- Technology stack may be outdated
- Uses separate React apps (App + Template)
- Deployed on Heroku + AWS

### Testing
- Unit tests were designed but never fully implemented
- Tests may not work in current state
- Testing infrastructure needs modernization
- Plan to implement comprehensive testing in new stack

## Future Considerations

### Potential Operations

1. **Pricing Updates**:
   - Update Stripe configuration
   - Modify frontend and backend pricing logic
   - Adjust premium feature flags

2. **Template Design Changes**:
   - Edit template React components
   - Modify element JSON configurations
   - Register new elements in element list

3. **Modernization Needs**:
   - Update dependencies and framework versions
   - Implement comprehensive testing
   - Refactor legacy code patterns
   - Review and update external service integrations

## Development Workflow

1. Make changes in appropriate branch (staging/production)
2. Push to GitHub
3. CircleCI automatically builds and deploys
4. Verify deployment on respective environment

## Data Flow

1. User creates proposal using form builder (App)
2. Form builder generates JSON representation
3. Template system renders JSON as live website
4. Website published to AWS subdomain
5. Sponsor visits proposal and submits inquiry via form
6. Inquiry sent via email (Mailjet) and stored in dashboard
7. User tracks views and manages leads in CRM

## Key Repositories

- **Main Repository**: `https://github.com/Sponseasy/sponseasy-client`
- **Element List**: `src/template/elements/list.tsx`
