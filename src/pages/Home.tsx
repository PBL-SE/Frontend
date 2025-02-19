
import background from '../assets/background.png';
import FindPaper from '../assets/FindPaper.png';
import WritePaper from '../assets/WritePaper.png'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';



const Home = () => {

  const navigate = useNavigate(); 


  return (
    <div>

      <NavBar/>
    <div
      className="relative h-full w-full flex  justify-center min-h-[110vh]"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="text-center pt-10">
        <h1 className="text-5xl mt-20 font-[Paytone_One] text-white ">
          Your <span className='text-[#6e16e8]'>AI Research Assistant</span> Find , Summarize
        </h1>
        <h1 className="text-5xl mt-10 font-[Paytone_One] text-white ">
          And Analyze Paper Effortlessly!
        </h1>
        <button className=' cursor-pointer h-[50px] w-[200px] text-white bg-[#2c1250] mt-20 border-2 border-[#693b93] rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110' onClick={() => navigate("/services")}>
          Get Started
        </button>

        <div className='mt-20'>
          <h3 className='text-white text-xl '>EXPLORE AI TO : </h3>
          <div className='flex justify-center gap-10 mt-10'>
          <div>
             <img className='transition-transform duration-300 ease-in-out transform hover:scale-107' src={FindPaper}></img>
          </div>
          <div>
            <img className='transition-transform duration-300 ease-in-out transform hover:scale-107' src={WritePaper}></img>

          </div>

          </div>
          
         
        </div>





      </div>


     
      
      
      

      

      


    </div>
    </div>
  );
}

export default Home;
