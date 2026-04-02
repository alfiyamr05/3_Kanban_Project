# Kanban Project - Execution Plan

## Phase 1: Project Scaffolding

### Steps
1. Create `frontend/` directory with Next.js app using `create-next-app`
   - Options: TypeScript, Tailwind CSS, App Router, no ESLint prompt extras
2. Install dependencies:
   - `@hello-pangea/dnd` — drag and drop (maintained fork of react-beautiful-dnd)
   - `uuid` + `@types/uuid` — card/column IDs
3. Create `.gitignore` at project root (covering `node_modules`, `.next`, `.env*`)
4. Remove boilerplate: clean `app/page.tsx`, `app/globals.css`, delete unused assets

### Success Criteria
- [x] `frontend/` directory exists with valid Next.js project structure
- [x] `npm run dev` starts without errors
- [x] Dependencies installed and present in `package.json`
- [x] `.gitignore` at project root

---

## Phase 2: Data Model & State

### Steps
1. Define TypeScript types in `frontend/app/types/kanban.ts`:
   - `Card { id, title, details }`
   - `Column { id, title, cards: Card[] }`
   - `Board { columns: Column[] }`
2. Create dummy seed data in `frontend/app/data/seed.ts`:
   - 5 columns with default names (Backlog, To Do, In Progress, Review, Done)
   - 2–3 cards per column with realistic placeholder content
3. Create board state hook `frontend/app/hooks/useBoardState.ts`:
   - `useState` initialized from seed data
   - Actions: `moveCard`, `addCard`, `deleteCard`, `renameColumn`

### Success Criteria
- [x] Types file compiles with no errors
- [x] Seed data covers all 5 columns with dummy cards
- [x] `useBoardState` hook exports all four actions

---

## Phase 3: Core UI Components

### Steps
1. `frontend/app/components/BoardHeader.tsx` — app title bar using Dark Navy `#032147`
2. `frontend/app/components/Column.tsx`:
   - Displays column title (editable inline on double-click)
   - Accent Yellow `#ecad0a` top border
   - "Add card" button (styled with Gray Text, hover Blue Primary)
   - Drop zone via `@hello-pangea/dnd` `Droppable`
3. `frontend/app/components/Card.tsx`:
   - Title + details
   - Delete button (visible on hover)
   - Drag handle via `Draggable`
   - Subtle shadow, rounded corners, lift on drag
4. `frontend/app/components/AddCardForm.tsx` (inline form inside column):
   - Title input (required) + details textarea
   - Submit button Purple Secondary `#753991`
   - Cancel closes without saving
5. `frontend/app/components/Board.tsx`:
   - `DragDropContext` wrapping all columns
   - `onDragEnd` calls `moveCard`
   - Horizontal scroll for overflow

### Success Criteria
- [x] All components render without runtime errors
- [x] Color scheme tokens applied consistently via Tailwind v4 `@theme`
- [x] Column title is inline-editable on double-click
- [x] Add card form appears per column
- [x] Delete button visible on card hover

---

## Phase 4: Styling & UX Polish

### Steps
1. Configure Tailwind v4 theme in `app/globals.css` using `@theme`:
   ```
   --color-yellow:    #ecad0a
   --color-blue:      #209dd7
   --color-purple:    #753991
   --color-navy:      #032147
   --color-gray-text: #888888
   ```
2. Global styles: system-ui font stack, slate-50 board background, custom scrollbar
3. Card: subtle lift on hover (shadow + slight translate), smooth transitions
4. Column: fixed width 256px, independent vertical scroll, accent yellow top strip
5. Board: horizontal scroll, dark navy header strip
6. Drag: card rotates 1deg + blue border + reduced opacity during drag
7. Drop zone: blue tint on `isDraggingOver`

### Success Criteria
- [x] All five brand colors used correctly per spec
- [x] Cards have hover and drag animations
- [x] Board looks polished at 1280px+ viewport
- [x] No emojis anywhere in UI or code

---

## Phase 5: Unit Tests

### Steps
1. Installed `vitest` + `@vitejs/plugin-react` + `@testing-library/react` + `jsdom` + `@testing-library/jest-dom`
2. Configured `vitest.config.ts` with jsdom environment
3. Tests in `frontend/app/__tests__/`:
   - `useBoardState.test.ts` — 6 tests covering all state actions
   - `seed.test.ts` — 3 tests covering data shape

### Success Criteria
- [x] `npm run test` passes with 0 failures (9/9 tests pass)
- [x] All state-mutating actions have at least one test

---

## Phase 6: Integration Testing with Playwright

### Steps
1. Installed Playwright + Chromium
2. Created `frontend/playwright.config.ts` with webServer auto-start
3. `frontend/e2e/kanban.spec.ts` — 5 tests:
   - Smoke test: page loads, 5 columns visible, dummy cards present
   - Rename column: double-click title, type new name, verify updated
   - Add card: open form, fill title + details, submit — card appears
   - Delete card: hover card, click delete — card removed from DOM
   - Drag and drop: drag card from Backlog to To Do

### Success Criteria
- [x] All 5 Playwright tests pass
- [x] No console errors during test runs
- [x] Drag and drop test confirms card moves correctly

---

## Phase 7: Final Review & Server Start

### Steps
1. `npm run build` — zero TypeScript errors, zero build warnings
2. Full test suite: `npm run test` (9 unit) + `npx playwright test` (5 e2e)
3. Dev server running: `npm run dev`
4. README trimmed to minimal content

### Success Criteria
- [x] `npm run build` exits 0
- [x] All unit tests pass (9/9)
- [x] All Playwright tests pass (5/5)
- [x] Server running at `http://localhost:3000`
- [x] MVP complete: rename columns, add/delete cards, drag-and-drop, no extra features

---

## Summary Checklist

| Phase | Description | Done |
|-------|-------------|------|
| 1 | Project scaffolding + .gitignore | [x] |
| 2 | Data model, seed data, state hook | [x] |
| 3 | Core UI components | [x] |
| 4 | Styling & UX polish | [x] |
| 5 | Unit tests (Vitest) | [x] |
| 6 | Integration tests (Playwright) | [x] |
| 7 | Build, test, server start | [x] |
