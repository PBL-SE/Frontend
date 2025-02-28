import React from "react";
import background from "../assets/background.png";
import NavBar from "../components/NavBar";

const About = () => {
  return (
    <div>
      <NavBar />

      <div
        className="relative flex flex-col items-center min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-12"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="h-8"></div>
        <div className="text-center pt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About <span className="text-purple-600">AI Research Assistant</span>
          </h1>
          <div className="h-10"></div>

          <div className="mt-8 text-lg text-white max-w-3xl mx-auto space-y-6">
            <p>
              Welcome to the AI Research Assistant platform, your go-to tool for exploring, summarizing, and analyzing research papers across various scientific fields.
            </p>
            <div className="h-5"></div>
            <p>
              Our platform leverages advanced machine learning models and natural language processing techniques to provide insights into the latest research, helping researchers and academics stay up-to-date with the evolving landscape of scientific discovery.
            </p>
            <div className="h-5"></div>

            <h2 className="text-2xl font-semibold text-purple-400 mt-6 ">Features:</h2>
            <div className="h-5"></div>
            <ul className="list-disc list-inside space-y-2 text-white">
              <li>Explore a wide range of research papers from various disciplines.</li>
              <li>Summarize research abstracts and identify key insights quickly.</li>
              <li>Analyze paper difficulty, citation count, and related metrics.</li>
              <li>Get personalized recommendations based on your research interests.</li>
              <li>Visualize research trends and author contributions in an intuitive dashboard.</li>
            </ul>
            <div className="h-5"></div>

            <h2 className="text-2xl font-semibold text-purple-400 mt-6">Our Mission:</h2>
            <div className="h-5"></div>
            <p>
              Our mission is to democratize access to cutting-edge research tools and make research discovery as efficient and effective as possible.
            </p>
            <div className="h-5"></div>

            <h2 className="text-2xl font-semibold text-purple-400 mt-6">Why Choose Us?</h2>
            <p>
              Whether you're a student, researcher, or academic professional, AI Research Assistant helps you manage your research process, offering tools that save you time, improve your workflow, and enhance your research productivity.
            </p>

            <h3 className="text-xl font-medium text-center text-gray-300 mt-8">
              Thank you for choosing AI Research Assistant. Let's make research discovery easier together!
            </h3>
            <div className="h-15"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
