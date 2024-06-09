import "./App.css";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import Task from "./pages/task";
import { healthCheck } from "./api";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true); // Set initial loading state to true

  useEffect(() => {
    const activeServer = async () => {
      try {
        await healthCheck();
      } catch (error) {
        alert("Server is down. Please try again later.");
      } finally {
        setIsLoading(false); // Set loading to false once the healthCheck is completed
      }
    };

    activeServer();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Private chat route: Can only be accessed by authenticated users */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />

        {/* Public login route: Accessible by everyone */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Public register route: Accessible by everyone */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {/* 404 page */}
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
