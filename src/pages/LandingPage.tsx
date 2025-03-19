import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import logo from "../assets/logo.png";         // ✅ Import logo
import animation from "../assets/Animation.json";  // ✅ Import animation

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#110028] text-white">
      
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <Lottie 
          animationData={animation} 
          loop={true}
          className="w-full h-full object-cover opacity-20" 
        />
      </div>

      {/* Logo and Branding */}
      <header className="absolute top-3 left-2 flex items-center px-10 py-4 z-10">
        <img src={logo} alt="Saraswati AI Logo" className="h-10 w-40 mr-4" />
      </header>

      <div className="relative z-10 text-center">
      <h1 className="text-6xl leading-tight tracking-wide mb-8">
          Welcome to Your Own AI Assistant
          <br /> 
          <span className="text-purple-600 font-bold">Saraswati AI</span>
        </h1>

        {/* Signup Button */}
        <div className="relative mt-10"> 
          <button
            className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-purple-600 h-10 w-30 hover:bg-purple-800 rounded-lg transition duration-300"
            onClick={() => navigate("/authHandler")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
