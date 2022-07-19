import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScheduleCreate from "./Components/ScheduleCreate/ScheduleCreate.js";
import ScheduleView from "./Components/ScheduleView/ScheduleView";
import Home from "./Components/Home/Home";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/createschedule" element={<ScheduleCreate />} />
          <Route path="/viewschedule" element={<ScheduleView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
