import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicTacToe from "./components/TicTacToe";
import ParkingGarage from "./components/ParkingGarage";
import BinaryTree from "./components/BinaryTree";
import SortingVisualizer from "./components/SortingVisualizer";
import TowersOfHanoi from "./components/TowersOfHanoi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/garage" element={<ParkingGarage />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/binary-tree" element={<BinaryTree/>} />
          <Route path="/sorting-visualizer" element={<SortingVisualizer/>}/>
          <Route path="/towers-of-hanoi" element={<TowersOfHanoi/>}/>

        </Routes>
    </Router>
  );
}

export default App;
