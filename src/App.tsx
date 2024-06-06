import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 page */}
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
