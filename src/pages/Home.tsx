import { useState } from "react";
import { motion } from "framer-motion";
import background from "../assets/background.png";
import FindPaper from "../assets/FindPaper.png";
import WritePaper from "../assets/WritePaper.png";
import NavBar from "../components/NavBar";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [user] = useState<{ name: string } | null>(null);

  return (
    <div className="relative min-h-screen bg-[#2c1250] text-white">
      <NavBar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center pt-24"
        style={{ backgroundImage: `url(${background})` }}
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl font-bold leading-tight"
        >
          {user ? (
            <>
              Welcome, <span className="text-[#852FFF]">{user.name}</span>!
            </>
          ) : (
            <>
              Your <span className="text-[#852FFF]">AI Research Assistant</span>
              <br />
              Find, Summarize & Analyze Papers Effortlessly!
            </>
          )}
        </motion.h1>
        {!user && (
          <>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(133, 47, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 h-12 w-52 bg-[#693b93] border-2 border-[#852FFF] rounded-lg font-semibold text-lg transition-colors hover:bg-[#7b4ca5]"
              onClick={() => (window.location.href = `${backendURL}/auth/google`)}
            >
              Get Started
            </motion.button>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-8 mt-12"
            >
              <motion.img
                src={FindPaper}
                alt="Find Paper"
                className="w-40 sm:w-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={WritePaper}
                alt="Write Paper"
                className="w-40 sm:w-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </>
        )}
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
        >
          Why SARASWATI AI?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              title: "Discover Papers",
              desc: "Find relevant research papers tailored to your interests with AI-driven search.",
            },
            {
              title: "Summarize Instantly",
              desc: "Get concise summaries of complex papers in seconds, saving you time.",
            },
            {
              title: "Analyze Insights",
              desc: "Extract key trends and insights from academic literature effortlessly.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#3a1b6b] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#270C4A] py-8 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg mb-4">SARASWATI AI - Empowering Research with Intelligence</p>
          <div className="flex justify-center gap-6">
            <a href="/about" className="text-gray-300 hover:text-[#852FFF] transition-colors">About</a>
            <a href="/contact" className="text-gray-300 hover:text-[#852FFF] transition-colors">Contact</a>
            <a href="/privacy" className="text-gray-300 hover:text-[#852FFF] transition-colors">Privacy Policy</a>
          </div>
          <p className="text-gray-500 mt-4">© 2025 SARASWATI AI. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Home;