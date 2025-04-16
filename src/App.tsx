// src/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { User } from './types';
import Home from './pages/Home';
import About from './pages/About';
import Analytics from './pages/Analytics';
import Services from './pages/Services';
import Onboarding from './pages/Onboarding';
import AuthHandler from './pages/AuthHandler';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';
import History from './pages/History';
import Chatbot from './pages/Chatbot';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;





const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include', // Important for sending cookies
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser({
          id: data.user_id,
          username: data.username,
          email: data.email,
          provider: data.provider,
          isNew: data.isNew || false
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout') setUser(null);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <AuthHandler onLoginSuccess={fetchUser} />} />
        <Route path="/onboarding" element={user?.isNew ? <Onboarding user={user} onComplete={fetchUser} /> : <Navigate to="/home" />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
          <Route path="/home" element={<Home user={user!} />} />
          <Route path="/services" element={<Services user={user!} />} />
          <Route path="/analytics" element={<Analytics user={user!} />} />
          <Route path="/about" element={<About user={user!} />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile user={user!} />} />
          <Route path="/history" element={<History user={user!} />} />
          <Route path="/chatbot" element={<Chatbot user={user!} />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;