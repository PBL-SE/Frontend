import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../api/auth";

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

  const handleLogin = (provider: string) => {
    window.location.href = `${backendURL}/auth/${provider}`;
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#1a0b2e]">
      <div className="bg-[#2c1250] border border-[#693b93] shadow-lg rounded-lg p-8 w-[320px] flex flex-col items-center">
        <h1 className="text-white text-2xl font-bold mb-6">Sign In With</h1>
        <div className="flex flex-col w-full gap-4">
          {["Google", "Github", "Facebook", "Twitter"].map((provider) => (
            <button
              key={provider.toLowerCase()}
              onClick={() => handleLogin(provider.toLowerCase())}
              className="w-full h-12 bg-[#693b93] text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:bg-[#7a4bb0]"
            >
              {provider}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthHandler;
