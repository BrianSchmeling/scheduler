import "./App.css";
import { Routes, Route } from "react-router-dom";
import ScheduleCreate from "./Components/ScheduleCreate";

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
