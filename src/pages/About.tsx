import background from '../assets/background.png';
import NavBar from '../components/NavBar';

const About = () => {
  return (
    <div>
<NavBar/>
   
    <div
      className="relative h-full w-full flex justify-center"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="text-center pt-10">
        <h1 className="text-5xl mt-20 font-[Paytone_One] text-white">
          About <span className="text-[#6e16e8]">AI Research Assistant</span>
        </h1>

        <div className="mt-10 text-white text-xl px-6 sm:px-12 md:px-24">
          <p className="mb-6">
            Welcome to the AI Research Assistant platform, your go-to tool for exploring, summarizing, and analyzing research papers across various scientific fields.
          </p>
          <p className="mb-6">
            Our platform leverages advanced machine learning models and natural language processing techniques to provide insights into the latest research, helping researchers and academics stay up-to-date with the evolving landscape of scientific discovery.
          </p>

          <h2 className="text-3xl mt-10 font-semibold text-[#6e16e8]">Features:</h2>
          <ul className="pl-8 mt-4 text-lg">
            <li className="mb-2">Explore a wide range of research papers from various disciplines.</li>
            <li className="mb-2">Summarize research abstracts and identify key insights quickly.</li>
            <li className="mb-2">Analyze paper difficulty, citation count, and related metrics.</li>
            <li className="mb-2">Get personalized recommendations based on your research interests.</li>
            <li className="mb-2">Visualize research trends and author contributions in an intuitive dashboard.</li>
          </ul>

          <h2 className="text-3xl mt-10 font-semibold text-[#6e16e8]">Our Mission:</h2>
          <p className="mt-4 mb-6">
            Our mission is to democratize access to cutting-edge research tools and make research discovery as efficient and effective as possible.
          </p>

          <h2 className="text-3xl mt-10 font-semibold text-[#6e16e8]">Why Choose Us?</h2>
          <p className="mt-4 mb-6">
            Whether you're a student, researcher, or academic professional, AI Research Assistant helps you manage your research process, offering tools that save you time, improve your workflow, and enhance your research productivity.
          </p>

          <h3 className="text-lg mt-10">
            Thank you for choosing AI Research Assistant. Let's make research discovery easier together!
          </h3>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
