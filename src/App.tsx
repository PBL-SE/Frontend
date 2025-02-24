// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Services from "./pages/Services";
import Onboarding from "./pages/Onboarding";
import AuthHandler from "./pages/AuthHandler";
import ProtectedLayout from "./components/ProtectedLayout";
import OnboardingLayout from "./components/OnboardingLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthHandler />} />
        {/* ✅ Onboarding Protected Route */}
        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
        
        {/* Protected Routes (Require Authentication) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
