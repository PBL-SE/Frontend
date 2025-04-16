import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import github from "../assets/github.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import background from "../assets/background.png";

const backendURL = import.meta.env.VITE_BACKEND_URL || '';

type Props = {
  onLoginSuccess: () => void;
};

const AuthHandler = ({ onLoginSuccess }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    const isNew = searchParams.get('isNew') === 'true';

    if (token) {
      document.cookie = `token=${token}; path=/; max-age=604800`;
      onLoginSuccess();
      if (isNew) {
        alert('✅ Authentication successful: Welcome, new user!');
        navigate('/onboarding', { replace: true });
      } else {
        alert('✅ Authentication successful: Welcome back!');
        navigate('/home', { replace: true });
      }
    }
  }, [searchParams, navigate, onLoginSuccess]);

  useEffect(() => {
    import("tsparticles").then(({ tsParticles }) => {
      tsParticles.load("tsparticles", {
        particles: {
          number: { value: 80 },
          color: { value: ["#693b93", "#ffffff", "#a68bd1"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.3, max: 0.7 }, random: true },
          size: { value: { min: 1, max: 4 }, random: true },
          move: {
            enable: true,
            speed: { min: 0.5, max: 1.5 },
            direction: "none",
            random: true,
            outModes: { default: "out" },
          },
          links: {
            enable: true,
            distance: 120,
            color: "#693b93",
            opacity: 0.3,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 3 },
          },
        },
        background: { color: "#2c1250" },
      });
    });
  }, []);

  const handleLogin = (provider: string) => {
    window.location.href = `${backendURL}/api/auth/${provider}`;
  };

  return (
    <div className="relative min-h-[100vh] text-white overflow-hidden font-sans">
      {/* Particle Background */}
      <div
        id="tsparticles"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      ></div>
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-8 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            SARASWATI AI
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoginOpen(true)}
            className="bg-[#693b93] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#7b4ca5] transition-colors"
          >
            Get Started
          </motion.button>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Revolutionize Your Research
          </h2>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-8 text-gray-200">
            SARASWATI AI is your intelligent companion for discovering, summarizing, and analyzing academic papers with unparalleled ease.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(105, 59, 147, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoginOpen(true)}
            className="bg-[#693b93] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#7b4ca5] transition-colors"
          >
            Start Exploring Now
          </motion.button>
        </motion.section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Choose SARASWATI AI?
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Discovery",
                desc: "Uncover relevant papers tailored to your research interests.",
              },
              {
                title: "Instant Summaries",
                desc: "Get concise, accurate summaries of complex papers in seconds.",
              },
              {
                title: "Deep Insights",
                desc: "Extract trends and key findings with advanced AI analysis.",
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
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#3a1b6b] py-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            What Researchers Say
          </motion.h3>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                quote: "SARASWATI AI has transformed how I approach literature reviews. It's like having a research assistant that never sleeps!",
                author: "Dr. Emily Chen, Professor",
              },
              {
                quote: "The summaries are spot-on, saving me hours of reading. It's a game-changer for my PhD work.",
                author: "James Patel, PhD Candidate",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#2c1250] p-6 rounded-xl"
              >
                <p className="text-gray-200 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-sm font-semibold">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Elevate Your Research?
          </h3>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(105, 59, 147, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoginOpen(true)}
            className="bg-[#693b93] text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-[#7b4ca5] transition-colors"
          >
            Join SARASWATI AI Today
          </motion.button>
        </motion.section>

        {/* Footer */}
        <footer className="bg-[#2c1250] py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 SARASWATI AI. All rights reserved.</p>
        </footer>

        {/* Login Popup */}
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-[#2c1250] border-4 border-[#693b93] rounded-2xl p-8 w-[90%] max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center mb-8">Sign In to SARASWATI AI</h2>
              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleLogin("google")}
                  className="w-full bg-white text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <FcGoogle className="h-6 w-6" />
                  Sign in with Google
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleLogin("github")}
                  className="w-full bg-white text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <img src={github} className="h-6 w-6" alt="GitHub" />
                  Sign in with GitHub
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleLogin("facebook")}
                  className="w-full bg-white text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <img src={facebook} className="h-6 w-6" alt="Facebook" />
                  Sign in with Facebook
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleLogin("twitter")}
                  className="w-full bg-white text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <img src={twitter} className="h-6 w-6" alt="Twitter" />
                  Sign in with Twitter
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsLoginOpen(false)}
                className="mt-6 w-full text-gray-300 font-semibold hover:text-white transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AuthHandler;