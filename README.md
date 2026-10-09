# Kanban Board

A React-based Kanban board for managing tasks across different stages of work. The app lets users create, edit, delete, and drag tasks between columns such as Backlog, Todo, In Progress, and Complete.

## Features

- Create tasks with title, description, and priority
- Move cards between workflow columns using drag and drop
- Edit existing tasks
- Delete tasks from the board
- Prioritize tasks as Low, Medium, or High
- Persistent task data using localStorage
- Responsive layout built with Material UI

## Tech Stack

- React
- JavaScript
- Material UI (MUI)
- Formik
- Local Storage for persistence

## Project Structure

```bash
Kanban-Board/
├── public/
├── src/
│   ├── Components/
│   │   ├── Boards/
│   │   ├── Cards/
│   │   └── TaskForm/
│   ├── App.js
│   ├── App.css
│   ├── headers.json
│   ├── index.js
│   └── index.css
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

```bash
git clone https://github.com/Jigi-kiri/Kanban-Board.git
cd Kanban-Board
npm install
```

### Run the app

```bash
npm start
```

This starts the app in development mode and opens it in your browser at:

```text
http://localhost:3000
```

## Available Scripts

In the project directory, you can run:

- `npm start` — runs the app in development mode
- `npm test` — launches the test runner
- `npm run build` — builds the app for production
- `npm run eject` — exposes the project configuration (not usually needed)

## Workflow Columns

The default board includes:

- BACKLOG
- TODO
- IN PROGRESS
- COMPLETE

## Notes

This project uses browser localStorage to save board state, so tasks remain available after page refresh.

## Author

Jigi-kiri
