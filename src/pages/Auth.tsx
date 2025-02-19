import React from "react";
import { FcGoogle } from "react-icons/fc";
import background from "../assets/background.png";
import github from "../assets/github.png";
import facebook from "../assets/facebook.png";

import twitter from "../assets/twitter.png";

const Auth = () => {
  return (
    <div
      className="relative h-full w-full flex  justify-center  min-h-[100vh] text-white items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-row justify-center  items-center border-4 bg-[#2c1250] border-[#693b93] h-[60vh] w-[55vh] rounded-xl">
        <div className="flex justify-center mt-7  text-xl font-bold">
          Sign Up With
        </div>

        <div className="flex flex-col items-center mt-15 gap-y-4">
          <button className="w-[45vh] border-2 bg-white h-[6vh] rounded-xl flex items-center justify-center gap-x-2  transition-transform transform hover:scale-103 cursor-pointer">
            <FcGoogle className="h-[4vh] w-[4vh]" />
            <h1 className="text-black font-bold">Google</h1>
          </button>
          <button className="w-[45vh] border-2 bg-white h-[6vh] rounded-xl flex items-center justify-center gap-x-2 mt-3 transition-transform transform hover:scale-103  cursor-pointer">
            <img src={github} className="  h-[4vh] w-[4vh]"></img>
            <h1 className="text-black font-bold">Git-hub</h1>
          </button>
          <button className="w-[45vh] border-2 bg-white h-[6vh] rounded-xl flex items-center justify-center gap-x-2 mt-3 transition-transform transform hover:scale-103 cursor-pointer">
            <img src={facebook} className="  h-[4vh] w-[4vh]"></img>
            <h1 className="text-black font-bold">Facebook</h1>
          </button>
          <button className="w-[45vh] border-2 bg-white h-[6vh] rounded-xl flex items-center justify-center gap-x-2 mt-3 transition-transform transform hover:scale-103 cursor-pointer">
            <img src={twitter} className="  h-[4vh] w-[4vh]"></img>

            <h1 className="text-black font-bold">Twitter</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
