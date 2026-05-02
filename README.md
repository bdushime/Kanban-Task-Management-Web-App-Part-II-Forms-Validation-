# Kanban Task Management Web App - Angular Routing Lab

A professional Kanban board application built with Angular, focusing on advanced routing, navigation, and state management.

Deployed link:

##  Features

### 1. Advanced Angular Routing
- **Dynamic Route Parameters:** Implemented `:id` parameters to dynamically load board data from a shared service.
- **Wildcard Handling:** A dedicated `**` route catches undefined paths and redirects users to a custom 404 Not Found page.

### 2. Navigation & UX
- **Declarative Navigation:** Uses `routerLink` for seamless SPA navigation without browser refreshes.
- **Active State Tracking:** Utilizes `routerLinkActive` to provide visual feedback on the current active board.
- **Programmatic Navigation:** Uses the `Router` service to navigate users via TypeScript logic (found in the Settings toggle).
- **Query Parameters:** Supports optional query parameters (e.g., `?view=edit`) for advanced filtering and view modes.

### 3. Security & Navigation Guards
- **CanActivate Guard:** A custom `AuthGuard` protects board routes, ensuring only authenticated users can access private data.
- **CanDeactivate Guard:** An `UnsavedChangesGuard` prevents data loss by warning users before they navigate away from a board with pending changes.

### 4. Reactive State Management
- **Centralized Service:** A `BoardService` acts as the single source of truth, managing application state and providing data to components via Dependency Injection.

##  Tech Stack
- **Framework:** Angular 19 (Standalone Components)
- **Styling:** Vanilla CSS (CSS Variables for Dark/Light Mode)
- **Routing:** Angular Router (Lazy Loading, Functional Guards)
- **State Management:** RxJS & Services

##  Getting Started
1. Clone the repository
2. Run `npm install`
3. Run `ng serve` to start the development server
4. Navigate to `http://localhost:4200/`
