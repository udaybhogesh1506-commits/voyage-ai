import {
  useEffect,
  useState,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import OpeningAnimation from "./components/OpeningAnimation";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import TripDetails from "./pages/TripDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
  const [showOpening, setShowOpening] =
    useState(true);

  const [isClosing, setIsClosing] =
    useState(false);

  useEffect(() => {
    const closeTimer =
      window.setTimeout(() => {
        setIsClosing(true);
      }, 2600);

    const removeTimer =
      window.setTimeout(() => {
        setShowOpening(false);
      }, 3200);

    return () => {
      window.clearTimeout(
        closeTimer
      );

      window.clearTimeout(
        removeTimer
      );
    };
  }, []);

  return (
    <>
      {showOpening && (
        <OpeningAnimation
          isClosing={isClosing}
        />
      )}

      <div
        className={
          showOpening
            ? "app-content-loading"
            : "app-content-visible"
        }
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/my-trips"
              element={<Dashboard />}
            />

            <Route
              path="/trip-planner"
              element={<TripPlanner />}
            />

            <Route
              path="/trip/:id"
              element={<TripDetails />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/admin"
              element={
                <AdminDashboard />
              }
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;