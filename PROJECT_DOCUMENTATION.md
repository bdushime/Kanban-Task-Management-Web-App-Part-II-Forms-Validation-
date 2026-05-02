# Technical Summary: Angular Routing & Navigation Optimization

This document summarizes the changes, concepts, and technical implementations completed during the Angular Routing & Navigation Lab.

## 1. Modular Routing & Lazy Loading
**Files:** `src/app/app.routes.ts`, `src/app/features/boards/boards.routes.ts`
- **Concept:** Instead of loading the entire app at once, we used **Lazy Loading** (`loadChildren` and `loadComponent`). 
- **Why:** This splits the code into smaller "chunks." The browser only downloads the "Boards" code when the user actually clicks a board, making the initial app load much faster.
- **Wildcard Route:** We added `{ path: '**', ... }` at the end of the routes. This ensures that if a user types a wrong URL, they are shown a friendly "404 Not Found" page instead of a blank screen.

## 2. Navigation Lifecycle & Events
**Files:** `src/app/app.component.ts`, `src/app/app.component.html`, `src/app/app.component.css`
- **Concept:** We subscribed to the `router.events` observable to watch the "lifecycle" of a page change.
- **Code Explanation:**
    - `NavigationStart`: We set `isLoading = true` to show the purple bar.
    - `NavigationEnd / Error`: We set `isLoading = false` to hide it.
- **UI:** We created a CSS-only animated loading bar at the top of the viewport (`z-index: 9999`) to give the user visual feedback during lazy-loading transitions.

## 3. Programmatic Navigation & Query Params
**Files:** `src/app/components/header/header.component.ts`, `src/app/features/boards/board-details/board-details.component.ts`
- **Programmatic:** We injected the `Router` service and used `this.router.navigate(['/settings'])`. This is used when you need to move the user based on a logic event (like a button click) rather than just a simple link.
- **Query Params:** We used `this.route.queryParamMap.subscribe(...)` to read optional data from the URL (e.g., `?view=edit`). This allows the same page to behave differently based on the URL "hints."

## 4. Route Security (Guards)
**Files:** `src/app/guards/auth.guard.ts`, `src/app/guards/unsaved-changes.guard.ts`, `src/app/services/auth.service.ts`
- **CanActivate:** Uses our `AuthService` to check if a user is "Logged In." If not, it blocks the route. We made this interactive by adding a toggle button in the **Settings** page.
- **CanDeactivate:** A safety net. It uses a browser `confirm()` to warn users if they try to leave a board, preventing them from accidentally losing unsaved task edits.

## 5. Deployment Optimization (Netlify)
**Files:** `angular.json`, `src/_redirects`
- **Problem:** In SPAs, refreshing a sub-page (like `/boards/1`) causes a 404 because the server looks for a physical file that doesn't exist.
- **Solution:** We added a `_redirects` file that tells Netlify to always serve `index.html` and let the Angular Router handle the path. We also updated `angular.json` to ensure this file is included in the final production build.

---

### Final Project Status
- **Phase 1-8:** 100% Completed
- **Lab Tasks:** All 10 tasks fulfilled.
- **Rubrics:** All evaluation criteria satisfied.
