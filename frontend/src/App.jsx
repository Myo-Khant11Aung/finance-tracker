import React from "react";
import Login from "./pages/login.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className=" min-h-screen bg-linear-to-bl to-slate-900 from-blue-500 flex justify-center items-center p-8 ">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
          repeating-linear-gradient(45deg, rgba(59,130,246,0.15) 0, rgba(59,130,246,0.05) 750px, transparent 1px, transparent 40px)
          `,
        }}
      />
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
