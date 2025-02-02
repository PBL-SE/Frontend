import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string>('home');

  // Update active state based on the current URL path
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/') {
      setActive('home');
    } else if (currentPath === '/services') {
      setActive('services');
    } else if (currentPath === '/analytics') {
      setActive('analytics');
    } else if (currentPath === '/about') {
      setActive('about');
    }
  }, [location.pathname]); // This hook will re-run whenever the location changes

  const handleClick = (section: string) => {
    setActive(section);
    navigate(`/${section}`);
  };

  return (
    <div className="bg-[#270C4A] w-full h-[68px] flex items-center px-6 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <img src={logo} className="logo h-[201hug] w-[40hug]" alt="Logo" />

        <div className="flex items-center justify-between gap-20">
          <ul className="flex items-center gap-15">
            <h3
              className={`cursor-pointer text-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${active === 'home' ? 'text-[#852FFF]' : ''}`}
              onClick={() => handleClick('home')}
            >
              Home
            </h3>
            <h3
              className={`cursor-pointer text-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${active === 'services' ? 'text-[#852FFF]' : ''}`}
              onClick={() => handleClick('services')}
            >
              Services
            </h3>
            <h3
              className={`cursor-pointer text-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${active === 'analytics' ? 'text-[#852FFF]' : ''}`}
              onClick={() => handleClick('analytics')}
            >
              Analytics
            </h3>
            <h3
              className={`cursor-pointer text-lg transition-transform duration-300 ease-in-out transform hover:scale-110 ${active === 'about' ? 'text-[#852FFF]' : ''}`}
              onClick={() => handleClick('about')}
            >
              About
            </h3>
          </ul>
          
          <button className="cursor-pointer px-4 py-2 flex items-center justify-center ml-10 rounded h-[35px] w-[95px] text-white bg-[#852FFF] transition-transform duration-300 ease-in-out transform hover:scale-110">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
