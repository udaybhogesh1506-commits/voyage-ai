import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import TripDetails from "./pages/TripDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";


function App() {

  return (

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
          path="/trip-planner" 
          element={<TripPlanner />} 
        />


        {/* Trip Details Page */}
        <Route
          path="/trip/:id"
          element={<TripDetails />}
        />


        <Route 
          path="/profile" 
          element={<Profile />} 
        />


        <Route 
          path="*" 
          element={<NotFound />} 
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;