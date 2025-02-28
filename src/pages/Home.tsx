import { useState } from "react";
import background from "../assets/background.png";
import FindPaper from "../assets/FindPaper.png";
import WritePaper from "../assets/WritePaper.png";
import NavBar from "../components/NavBar";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [user] = useState<{ name: string } | null>(null);

  return (
    <div>
      <NavBar />
      
      <div
        className="relative min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center pt-32"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="h-10"></div>
        <div className="pt-10 space-y-12">
          {user ? (
            <h1 className="text-5xl font-bold text-white">
              Welcome, <span className="text-purple-600">{user.name}</span>!
            </h1>
          ) : (
            <>
              <h1 className="text-5xl font-bold text-white leading-snug">
                Your <span className="text-purple-600">AI Research Assistant</span> <br />
                Find, Summarize & Analyze Papers Effortlessly!
              </h1>
              <div className="h-15"></div>

              <button
                className="cursor-pointer h-12 w-52 text-white  bg-[#2c1250] border-2  border-[#693b93]  rounded-lg font-medium text-lg 
                transition-transform duration-300 ease-in-out hover:scale-110 mt-16"
                onClick={() => (window.location.href = `${backendURL}/auth/google`)}
              >
                Get Started
              </button>
              <div className="h-5 "></div>
            </>
          )}
          <div className="h-10"></div>

          <div className="text-xl font-semibold text-white mt-16">
            EXPLORE AI TO:
          </div>
          <div className="h-10"></div>

          <div className="flex justify-center gap-25 mt-6">
            <img 
              src={FindPaper} 
              alt="Find Paper" 
              className="transition-transform duration-300 ease-in-out hover:scale-105" 
            />
            <img 
              src={WritePaper} 
              alt="Write Paper" 
              className="transition-transform duration-300 ease-in-out hover:scale-105" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
