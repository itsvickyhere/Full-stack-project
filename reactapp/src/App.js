// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components / Pages
import Header from './components/Header';
import Home from './components/Home';
import CausesList from './components/CausesList';
import CauseDetails from './components/CauseDetails';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ManageUsers from './components/ManageUsers';
import ManageCauses from './components/ManageCauses';
import ManageNGOs from './components/ManageNGOs';

// ---------------- Layout ----------------
function Layout({ children }) {
  const location = useLocation();
  const hideHeaderOn = ['/login', '/signup'];
  const isLoggedIn = !!localStorage.getItem('user');

  return (
    <div className="App">
      {!hideHeaderOn.includes(location.pathname) && isLoggedIn && <Header />}
      <main>{children}</main>
    </div>
  );
}

// ---------------- RequireAuth ----------------
function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" replace />;
}

// ---------------- App ----------------
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/causes" element={<RequireAuth><CausesList /></RequireAuth>} />
          <Route path="/cause/:id" element={<RequireAuth><CauseDetails /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/manage-users" element={<RequireAuth><ManageUsers /></RequireAuth>} />
          <Route path="/manage-causes" element={<RequireAuth><ManageCauses /></RequireAuth>} />
          <Route path="/manage-ngos" element={<RequireAuth><ManageNGOs /></RequireAuth>} />

          {/* Catch-all: redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}
