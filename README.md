# AI Commerce Assistant - Frontend Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Docker Deployment](#docker-deployment)
- [API Integration](#api-integration)

## Overview

The AI Commerce Assistant frontend is a modern React application that provides an intuitive chat interface for interacting with an AI-powered shopping assistant. Built with React, TypeScript, and Tailwind CSS, it offers a seamless shopping experience through natural language conversations and image-based product searches.

## Features

### Core Features
- 💬 **Real-time Chat Interface**: Conversational UI with typing indicators
- 📸 **Image Upload & Search**: Drag-and-drop or click to upload product images
- 🛍️ **Product Display**: Interactive product cards with detailed information
- 🔄 **WebSocket Support**: Real-time bidirectional communication
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- ✨ **Smooth Animations**: Framer Motion powered interactions

### User Experience
- **Welcome Screen**: Quick action buttons for common queries
- **Message Threading**: Clear conversation flow with timestamps
- **Visual Feedback**: Loading states, typing indicators, and connection status
- **Error Handling**: Graceful error messages with toast notifications
- **Session Management**: Persistent conversations across page reloads

## Tech Stack

### Core Technologies
- **React 18+**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development experience
- **Vite**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions

### Key Libraries
- **Axios**: HTTP client for API communication
- **React Hot Toast**: Toast notifications
- **React Dropzone**: File upload handling
- **Day.js**: Date formatting and manipulation
- **Lucide React**: Modern icon library

## Project Structure

```
ai-commerce-fe/
├── src/
│   ├── assets/              # Static assets (React logo)
│   ├── components/          # React components
│   │   ├── chat/           # Chat-related components
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── InputArea.tsx
│   │   │   ├── Message.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── WelcomeMessage.tsx
│   │   ├── common/         # Reusable components
│   │   │   └── Button.tsx
│   │   └── product/        # Product-related components
│   │       └── ProductCard.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useWebSocket.ts
│   ├── services/           # API service layer
│   │   └── api.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.css            # Global styles with Tailwind
│   ├── App.tsx            # Main App component
│   ├── index.css          # Base styles
│   └── main.tsx           # Application entry point
├── public/                 # Public assets
├── .dockerignore          # Docker ignore patterns
├── .gitignore             # Git ignore patterns
├── docker-compose.dev.yml # Development Docker config
├── docker-compose.yml     # Production Docker config
├── Dockerfile             # Docker build instructions
├── Dockerfile.dev         # Development Dockerfile
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── package-lock.json      # Dependency lock file
├── README.md              # This file
├── tsconfig.app.json      # TypeScript app config
├── tsconfig.json          # TypeScript base config
├── tsconfig.node.json     # TypeScript node config
└── vite.config.ts         # Vite configuration
```

## Component Architecture

### Component Hierarchy
```
App
└── ChatContainer
    ├── Header (Connection Status)
    ├── MessageArea
    │   ├── WelcomeMessage (if no messages)
    │   ├── MessageList
    │   │   └── Message (repeated for each message)
    │   │       └── ProductCard (if products present)
    │   └── TypingIndicator (when bot is typing)
    └── InputArea
        ├── Image Preview
        └── Input Field with Send Button
```

### Key Components

#### ChatContainer
Main container managing chat state, WebSocket connection, and message flow.

#### InputArea
Handles user input with support for text messages and image uploads via drag-and-drop.

#### Message
Displays individual messages with appropriate styling for user/bot distinction.

#### ProductCard
Renders product information with image, details, and action buttons.

#### WelcomeMessage
Initial screen with quick action buttons for common queries.

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Installation
```bash
# Clone the repository
git clone https://github.com/ducquy2200/ai-commerce-fe.git
cd ai-commerce-fe

# Install dependencies
npm install

# Create environment file
cp .env

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_REACT_APP_API_URL=http://localhost:8000

# WebSocket Configuration (optional, defaults to API URL)
VITE_REACT_APP_WS_URL=http://localhost:8000/ws
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # Run TypeScript compiler check

# Docker
docker-compose -f docker-compose.dev.yml up    # Run with hot reload
docker-compose up                               # Run production build
```

## Docker Deployment

### Development with Docker
```bash
# Build and run with hot reload
docker-compose -f docker-compose.dev.yml up

# Access the app at http://localhost:3000
```

### Production Build
```bash
# Build production image
docker build -t ai-commerce-fe .

# Run with docker-compose
docker-compose up

# Access the app at http://localhost:3000
```

### Docker Configuration
The application includes:
- Multi-stage Dockerfile for optimized production builds
- Development Dockerfile with hot reload support
- Docker Compose configurations for both environments
- Nginx configuration for production serving

## API Integration

The frontend communicates with the backend through:

### REST Endpoints
- `POST /chat` - Send messages and receive AI responses
- `POST /upload/image` - Upload images for product search
- `POST /session/create` - Create new chat sessions
- `GET /health` - Check API health status

### WebSocket Connection
- `http://localhost:8000/ws/{session_id}` - Real-time chat communication