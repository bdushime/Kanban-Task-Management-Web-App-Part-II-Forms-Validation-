# Kanban Task Management Web App - Forms & CRUD Lab

A professional Kanban application continuation, focusing on Reactive Forms, Data Persistence, and CRUD operations.

## 🚀 Key Features Implemented

- **Reactive Forms:** Utilized `FormBuilder` and `FormGroup` for robust task management.
- **Dynamic FormArrays:** Allowed users to dynamically add and remove subtasks.
- **Custom Validation:** Implemented a unique title validator to prevent duplicate tasks.
- **LocalStorage Persistence:** Full CRUD operations (Create, Read, Update) saved to the browser.
- **Contextual Routing:** Used route parameters (`:taskId`) to switch between "Add" and "Edit" modes.

---

## 📚 Advanced Form Concepts (Task 10 Discussion)

### 1. Reactive Forms vs Template-Driven
We chose **Reactive Forms** for this project because they are more scalable and predictable. Unlike template-driven forms, Reactive Forms are defined in TypeScript, making it easier to write unit tests for validation logic and manage complex data structures like nested arrays.

### 2. Dynamic Form Controls (FormArray)
For the subtasks feature, we utilized `FormArray`. This is a powerful Angular feature that allows us to manage a variable number of form controls. It enables the "Add New Subtask" functionality, where the UI can grow or shrink based on user input while keeping the data model synchronized.

### 3. Custom & Asynchronous Validation
We implemented a **Synchronous Custom Validator** to prevent duplicate task titles. In a real-world app connected to a database, we would use an **Asynchronous Validator** to check the title uniqueness against a server API, ensuring data integrity across the entire application.

---

## 🏁 Getting Started
1. Clone the repository
2. Run `npm install`
3. Run `ng serve`
4. Navigate to `http://localhost:4200/`
