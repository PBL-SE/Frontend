import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import NavBar from "./components/NavBar";

// Define the structure for the response data
const App = () => {
  return (
    <Router>
      
      <Routes>
        
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Auth/>} />

      </Routes>
    </Router>
  );
};

export default App;
