import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

const Subscription = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99/mo",
      features: [
        "10 paper searches per month",
        "Basic paper summaries",
        "Standard search filters",
        "Email support",
      ],
      path: "/subscribe/basic",
      color: "#693b93",
    },
    {
      name: "Pro",
      price: "$19.99/mo",
      features: [
        "Unlimited paper searches",
        "Advanced paper summaries",
        "Basic paper analysis",
        "Chatbot research assistant",
        "Priority email support",
      ],
      path: "/subscribe/pro",
      color: "#852FFF",
      highlighted: true,
    },
    {
      name: "Premium",
      price: "$39.99/mo",
      features: [
        "Unlimited paper searches",
        "Advanced summaries & deep analysis",
        "Exclusive research tools",
        "Chatbot with priority responses",
        "24/7 priority support",
      ],
      path: "/subscribe/premium",
      color: "#a68bd1",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#2c1250] text-white">
      <NavBar />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center"
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Unlock the Power of <span className="text-[#852FFF]">SARASWATI AI</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
        >
          Choose a plan to supercharge your research with AI-driven paper discovery, summarization, and analysis.
        </motion.p>
      </motion.section>

      {/* Subscription Plans */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-[#3a1b6b] p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col ${
                plan.highlighted ? "border-4 border-[#852FFF] relative" : ""
              }`}
              whileHover={{ scale: 1.03 }}
            >
              {plan.highlighted && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#852FFF] text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="flex-1 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 mb-3 text-gray-300">
                    <svg className="w-5 h-5 text-[#852FFF]" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${plan.color}` }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#693b93] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#7b4ca5] transition-colors"
                onClick={() => window.location.href = plan.path}
              >
                Choose Plan
              </motion.button>
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

export default Subscription;