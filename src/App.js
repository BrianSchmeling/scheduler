import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ScheduleCreate from "./Components/ScheduleCreate/ScheduleCreate.js";
import ScheduleView from "./Components/ScheduleView/ScheduleView";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/createschedule" element={<ScheduleCreate />} />
          <Route path="/viewschedule" element={<ScheduleView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
