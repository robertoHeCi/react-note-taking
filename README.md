# React Notes App 📝
> A modern note-taking application built with Vite, React, TypeScript, and Tailwind CSS.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

## 📖 Table of Contents
- [👀 Overview](#overview)
- [✅ Features](#features)
- [💻 Technical Details](#technical-details)
- [🛠️ Proposed Improvements](#proposed-improvements)
- [🚀 Deployment](#deployment)
- [🧪 Testing](#testing)
- [🏃 Getting Started](#getting-started)

## 👀 Overview
A versatile note-taking application that allows users to create, manage, and organize different types of notes in an intuitive interface. 
Built with modern web technologies and designed for both desktop and mobile use.

### Folder Structure
The project follows a straightforward folder structure designed to enhance maintainability and scalability while keeping things simple given the project's size. Below is an overview of the key directories and files:
```
├── public/                # Static files like images and icons
├── src/                   # Source files for the application
│   ├── components/        # Presentational components
│   │   ├── Common/        # Shared components across the application
│   │   └── Notes/         # Note-related components
│   ├── hooks/             # Custom React hooks
│   ├── layout/            # Layout components
│   ├── models/            # TypeScript type declarations using namespaces for Notes and User types
│   ├── pages/             # Page components
│   ├── services/          # API service calls
│   ├── utils/             # Utility functions
|   ├── test/              # Mock Service Worker (MSW) files for API request handling Automated and test setup configuration file
│   └── App.tsx            # Main application component
│   └── main.tsx           # App entry point
├── .env                   # Environment variables
├── .eslintrc.js           # ESLint configuration
├── package.json           # Project metadata and dependencies
├── pnpm-lock.yaml         # Lockfile for pnpm dependencies
├── tsconfig.json          # TypeScript configuration file that references other tsconfig files (app and specs)
├── tailwind.config.js     # Configuration file for Tailwind CSS, defining theme and styles
├── vite.config.ts         # Vite configuration file for building and serving the application
└── vitest.config.ts       # Configuration file for Vitest, setting up the testing environment
└── README.md              # Project documentation
```

This structure helps in organizing the codebase logically, making it easier for developers to navigate and maintain the project. Each folder and file serves a specific purpose, ensuring that related files are grouped together, which enhances collaboration and reduces complexity.

## ✅ Features
### Core Features
- Multiple note types support (Plain text, Todo lists)
- @mention functionality in text notes (desktop only due to mobile keyboard event handling limitations)
- Automatic sorting by last updated
- Responsive design for all devices
- Dark/light mode support

### Tech Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest, React Testing Library and MSW to intercept requests

### Code analysis
- **Husky**: Integrated to manage Git hooks easily, allowing for automated checks before commits and pushes. This ensures that code quality is maintained by running scripts for linting and testing, preventing bad code from being committed to the repository.
  
- **ESLint**: Utilized for static code analysis to identify and fix code quality issues and potential errors. ESLint helps enforce coding standards and best practices, making the codebase more consistent and easier to maintain.

## 💻 Technical Details

### API Structure
Notes are stored using the following API format:
```json
{
  "id": 1,
  "body": "..."
}
```

### Note Types
The application supports various note types, each with a specific structure to facilitate data management and retrieval. Below is an overview of the structure used for the **text type** and **todo type** notes.

#### Text Type Structure
For text type notes, we utilize the following JSON structure:

```json
{
  "config": {
    "type": "text",
    "updated_at": "2024-11-15T19:00:40.530Z"
  },
  "content": "Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sit amet faucibus tellus. AFJADKFJ <span class=\"capitalize bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300\" contenteditable=\"false\">sarah oliver</span>"
}
```

**Explanation of the Structure:**
- **config**: This object contains metadata about the note.
  - **type**: Specifies the type of the note, which in this case is `"text"`.
  - **updated_at**: A timestamp indicating when the note was last updated, formatted in ISO 8601.

- **content**: This field holds the actual content of the note. It can include plain text as well as HTML elements, allowing for rich formatting options. For example, the content can include mentions or other styled elements, enhancing the user experience.

#### Todo Type Structure
For todo type notes, we utilize the following JSON structure:

```json
{
  "config": {
    "type": "todo",
    "updated_at": "2024-11-15T19:00:40.530Z"
  },
  "content": "[{\"title\":\"Task 1\",\"completed\":true},{\"title\":\"Task 2\",\"completed\":false}]"
}
```

**Explanation of the Structure:**
- **config**: Similar to text notes, this object contains metadata about the todo note.
  - **type**: Specifies the type of the note, which in this case is `"todo"`.
  - **updated_at**: A timestamp indicating when the note was last updated, formatted in ISO 8601.

- **content**: This field holds an array of tasks, where each task is represented as an object with a `title` and a `completed` status. This structure allows for easy management of todo items, enabling users to track their progress on various tasks.

This structured approach allows for easy parsing and manipulation of note data, ensuring that users can create, edit, and display their notes effectively within the application.


## 🛠️ Proposed improvements
- [ ] Image and audio notes support
- [ ] Rich text editor for text notes
- [ ] Note covers
- [ ] Note categories/folders
- [ ] Pin important notes
- [ ] Note sharing capabilities
- [ ] Collaborative editing
- [ ] Export/import functionality
- [ ] Search functionality
- [ ] Implement E2e testing (Cypress | Playright)
- [ ] Improve testing

## 🚀 Deployment

The application is live and deployed on Vercel:
[https://react-note-taking-lovat.vercel.app/](https://react-note-taking-lovat.vercel.app/)

### Environment Variables for Deployment
When deploying to Vercel, make sure to configure the following environment variables in your Vercel project settings:
```env
VITE_API_URL=your_api_url
VITE_SESSION_ID=your_api_key
```

### Deployment Configuration
The project is automatically deployed using Vercel's GitHub integration:
- Production Branch: `main`
- Build Command: `pnpm build`
- Output Directory: `dist`

## 🧪 Testing

### Test Setup
- **Framework**: Vitest
- **Testing Libraries**: 
  - `@testing-library/react` for component testing
  - `@testing-library/jest-dom` for DOM assertions
  - `msw` for API mocking

### Test Coverage
- ✅ Unit Tests
  - Utility functions
  - Custom hooks
  - API integration
- ✅ Integration Tests
  - Note operations (create, edit)
  - Data persistence
  - Error handling

## 🏃 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm


### Mock Service Worker (MSW) Setup
The application uses Mock Service Worker (MSW) to intercept network requests during development and testing. This allows you to mock API responses without needing a live server. 

- **Execution**: MSW will run in the development environment.
- **HTTP URL Requirement**: Ensure that you have a valid HTTP URL configured in your `.env` file (e.g., `VITE_API_URL=http://localhost:3000`) to mock the server effectively.


### Environment Setup
1. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

2. Configure your environment variables:
```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_SESSION_ID=your_api_key
```

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd react-note-taking
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

### Available Commands

#### Development
```bash
pnpm run dev
```
Starts the development server using Vite. The app will be available at `http://localhost:5173` with hot-reload enabled.

#### Build
```bash
pnpm run build
```
Creates a production build by:
- Running TypeScript compilation (`tsc -b`)
- Building the application with Vite

#### Testing
```bash
pnpm run test
```
Runs the test suite using Vitest in run mode.

#### Linting
```bash
pnpm run lint
```
Runs ESLint to check for code style issues and potential errors.

#### Preview
```bash
pnpm run preview
```
Serves the production build locally for preview before deployment.

