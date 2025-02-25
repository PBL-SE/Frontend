import { useState } from "react";
import background from "../assets/background.png";
import FindPaper from "../assets/FindPaper.png";
import WritePaper from "../assets/WritePaper.png";
import NavBar from "../components/NavBar";

const backendURL = "http://localhost:3000";

const Home = () => {
  const [user, ] = useState<{ name: string } | null>(null);


  
  
  return (
    <div>
      <NavBar />
      <div
        className="relative min-h-screen flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mt-10">
          {user ? (
            <h1 className="text-5xl text-white font-bold">
              Welcome, <span className="text-[#852FFF]">{user.name}</span>!
            </h1>
          ) : (
            <>
              <h1 className="text-5xl font-bold text-white">
                Your <span className="text-[#852FFF]">AI Research Assistant</span> <br />
                Find, Summarize & Analyze Papers Effortlessly!
              </h1>

              <button
                className="mt-10 px-6 py-3 text-lg font-semibold text-white bg-[#852FFF] rounded-md transition-transform duration-300 transform hover:scale-105"
                onClick={() => (window.location.href = `${backendURL}/api/auth/google`)}
              >
                Get Started
              </button>
            </>
          )}

          <div className="mt-20">
            <h3 className="text-white text-xl font-semibold">EXPLORE AI TO :</h3>
            <div className="flex justify-center gap-10 mt-10">
              <img className="transition-transform duration-300 transform hover:scale-105" src={FindPaper} alt="Find Paper" />
              <img className="transition-transform duration-300 transform hover:scale-105" src={WritePaper} alt="Write Paper" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
