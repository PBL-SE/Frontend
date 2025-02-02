import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Services from "./pages/Services";
import NavBar from "./components/NavBar";

// Define the structure for the response data
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
