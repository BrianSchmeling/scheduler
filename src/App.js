import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScheduleCreate from "./Components/ScheduleCreate/ScheduleCreate.js";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<ScheduleCreate />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
