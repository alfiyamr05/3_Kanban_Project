# Kanban Project

A minimal Kanban board web application built with Next.js, React, and Tailwind CSS.

## Features

- **Drag and Drop**: Seamlessly move cards between columns using `@hello-pangea/dnd`.
- **Column Management**: Double-click to rename columns.
- **Card Management**: Add new cards with titles and details, or delete cards by hovering over them.
- **Responsive Design**: Polished UI with custom scrollbars and drag-and-drop animations.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **Drag & Drop**: `@hello-pangea/dnd`
- **Testing**:
  - Unit Tests: Vitest + React Testing Library
  - E2E Tests: Playwright

## Getting Started

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

**Unit Tests (Vitest)**
```bash
cd frontend
npm run test
```

**End-to-End Tests (Playwright)**
```bash
cd frontend
npx playwright test
```
