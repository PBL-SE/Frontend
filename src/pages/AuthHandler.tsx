import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../api/auth";
import background from "../assets/background.png";
import github from "../assets/github.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import { FcGoogle } from "react-icons/fc";

const backendURL = import.meta.env.VITE_BACKEND_URL + "/api";

const AuthHandler = () => {
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const session = await checkSession();
        if (session.existing) {
          navigate("/home", { replace: true }); // Redirect if authenticated
          return;
        }
      } catch (error) {
        console.error("Error verifying session:", error);
      }
      setCheckingSession(false); // Show login if not authenticated
    };

    verifySession();
  }, [navigate]);

  if (checkingSession) return <div>Loading...</div>; // Prevent flicker

  const handleLogin = (provider) => {
    window.location.href = `${backendURL}/auth/${provider}`;
  };

  return (
    <div
      className="relative h-full w-full flex justify-center min-h-[100vh] text-white items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-row justify-center items-center border-4 bg-[#2c1250] border-[#693b93] h-[60vh] w-[55vh] rounded-xl">
        <div className="h-5"></div>
        <div className="flex justify-center  text-xl font-bold">Sign Up With</div>
        <div className="h-15"></div>
          
        
        
       
        <div className="flex flex-col items-center  gap-y-7">
          <button
            onClick={() => handleLogin("google")}
            className="w-[45vh] border-2 bg-white  h-[6vh] rounded-xl flex items-center justify-center gap-x-4 transition-transform transform hover:scale-103 cursor-pointer"
          >
            <FcGoogle className="h-[4vh] w-[4vh]" />
            <h1 className="text-black font-bold">Google</h1>
          </button>
          <button
            onClick={() => handleLogin("github")}
            className="w-[45vh] border-2 bg-white h-[6vh] rounded-xl flex items-center justify-center gap-x-4 mt-3 transition-transform transform hover:scale-103 cursor-pointer"
          >
            <img src={github} className="h-[4vh] w-[4vh]" />
            <h1 className="text-black font-bold">GitHub</h1>
          </button>
          <button
            onClick={() => handleLogin("facebook")}
            className="w-[45vh] border-2 bg-white h-[6vh] rounded-xl flex items-center justify-center gap-x-4 mt-3 transition-transform transform hover:scale-103 cursor-pointer"
          >
            <img src={facebook} className="h-[4vh] w-[4vh]" />
            <h1 className="text-black font-bold">Facebook</h1>
          </button>
          <button
            onClick={() => handleLogin("twitter")}
            className="w-[45vh] border-2 bg-white h-[6vh] rounded-xl flex items-center justify-center gap-x-4 mt-3 transition-transform transform hover:scale-103 cursor-pointer"
          >
            <img src={twitter} className="h-[4vh] w-[4vh]" />
            <h1 className="text-black font-bold">Twitter</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthHandler;