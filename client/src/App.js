import "./App.css";
import React from "react";
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <Route path="/" element={<Ideas socket={socket} />} />
          <Route path="/login" element={<Login socket={socket} />} />
          <Route path="/register" element={<Register socket={socket} />} />
          <Route path="/createidea" element={<IdeaForm socket={socket} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
