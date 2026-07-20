# VectorShift Frontend Technical Assessment

## Overview

A lightweight workflow builder UI built with React and React Flow. It lets users create a visual pipeline of nodes, configure node fields, and submit the workflow to a FastAPI backend for validation.

## Features Implemented

- Shared BaseNode abstraction for consistent node rendering
- Multiple custom node types for inputs, outputs, text, AI, logic, and integrations
- Responsive workspace UI with a desktop sidebar and a mobile-friendly bottom-sheet node picker
- Node and edge deletion support
- Zustand-based shared state for nodes, edges, and field updates
- Backend integration for parsing the workflow payload and checking DAG validity

## Project Structure

- frontend/: React app, workflow UI, custom node components, Zustand store
- backend/: FastAPI service with the /pipelines/parse endpoint

## Installation

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

## Technologies

- React
- React Flow
- Zustand
- FastAPI
- Python

## Notes

- The frontend sends the current workflow graph to the backend when the submit action is used.
- The backend endpoint /pipelines/parse returns the number of nodes, number of edges, and whether the graph forms a DAG.
- Node field edits are kept in sync with the shared store so the submitted payload reflects the latest UI values.
- The mobile experience uses a compact bottom-sheet style for the node picker to keep the canvas usable on smaller screens.