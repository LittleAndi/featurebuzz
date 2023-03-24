import "./App.css";
import React from "react";
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import IdeaForm from "./components/IdeaForm";
import Ideas from "./components/Ideas";

function App() {
  const socket = io.connect("http://localhost:4000");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/register" element={<Register socket={socket} />} />
          <Route path="/registeridea" element={<IdeaForm socket={socket} />} />
          <Route path="/ideas" element={<Ideas socket={socket} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
