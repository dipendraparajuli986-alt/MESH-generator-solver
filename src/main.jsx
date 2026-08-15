import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { createGrid, getNeighbours } from "./utils/mazeUtils";

const grid = createGrid(5, 5);

console.log("Grid:", grid);

console.log("Center node:", grid[2][2]);

console.log(
    "Neighbours:",
    getNeighbours(grid, 2, 2)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
