import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from "chart.js";
import background from "../assets/background.png";
import NavBar from "../components/NavBar";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + '/api';; 

const Analytics = () => {
  const [orgPapers, setOrgPapers] = useState<any>(null);
  const [mostCitedPapers, setMostCitedPapers] = useState<any>(null);
  const [difficultyByCategory, setDifficultyByCategory] = useState<any>(null);
  const [topAuthorsDifficulty, setTopAuthorsDifficulty] = useState<any>(null);
  const [topOrganizationsByCitations, setTopOrganizationsByCitations] = useState<any>(null);
  const [papersPerYear, setPapersPerYear] = useState<any>(null);
  const [topAuthorsByCitations, setTopAuthorsByCitations] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);  // New loading state

  // Function to fetch data from API
  const fetchData = async (endpoint: string, setState: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      setState(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    // Fetch all data and set loading state
    const fetchAllData = async () => {
      await Promise.all([
        fetchData("/analytics/top-organization", setOrgPapers),
        fetchData("/analytics/most-cited-papers", setMostCitedPapers),
        fetchData("/analytics/avg-difficulty-by-category", setDifficultyByCategory),
        fetchData("/analytics/top-authors-by-difficulty", setTopAuthorsDifficulty),
        fetchData("/analytics/top-organizations-by-citations", setTopOrganizationsByCitations),
        fetchData("/analytics/papers-per-year", setPapersPerYear),
        fetchData("/analytics/top-authors-by-citations", setTopAuthorsByCitations),
      ]);
      setLoading(false); // Set loading to false after data is fetched
    };
    
    fetchAllData();
  }, []);

  return (
    <div>
      <NavBar /> 

      <div
        className="relative h-full w-full flex justify-center bg-cover bg-center min-h-[110vh]"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="text-center pt-10">
          <h1 className="text-5xl mt-20 font-[Paytone_One] text-white">
            Research Analytics <span className="text-[#6e16e8]">Dashboard</span>
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-[80vh]">
              <div className="text-white text-xl">Loading...</div>
            </div>
          ) : (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Top Organizations by Paper Count */}
              {orgPapers && (
                <div className="bg-[#2c1250] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-xl font-semibold text-white mb-4">Top Organizations by Paper Count</h2>
                  <Bar data={orgPapers} />
                </div>
              )}

              {/* Average Difficulty by Category */}
              {difficultyByCategory && (
                <div className="bg-[#2c1250] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-xl font-semibold text-white mb-4">Avg. Difficulty by Category</h2>
                  <Bar data={difficultyByCategory} />
                </div>
              )}

              {/* Top Authors by Average Difficulty */}
              {topAuthorsDifficulty && (
                <div className="bg-[#2c1250] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-xl font-semibold text-white mb-4">Top Authors by Difficulty</h2>
                  <Bar data={topAuthorsDifficulty} />
                </div>
              )}

              {/* Top Organizations by Citations */}
              {topOrganizationsByCitations && (
                <div className="bg-[#2c1250] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-xl font-semibold text-white mb-4">Top Organizations by Citations</h2>
                  <Bar data={topOrganizationsByCitations} />
                </div>
              )}

              {/* Papers Published Per Year */}
              {papersPerYear && (
                <div className="bg-[#2c1250] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-xl font-semibold text-white mb-4">Papers Published Per Year</h2>
                  <Line data={papersPerYear} />
                </div>
              )}

              {/* Top Authors by Citations */}
              {topAuthorsByCitations && (
                <div className="bg-[#2c1250] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-xl font-semibold text-white mb-4">Top Authors by Citations</h2>
                  <Bar data={topAuthorsByCitations} />
                </div>
              )}

              {/* Most Cited Papers */}
              {mostCitedPapers && (
                <div className="bg-[#2c1250] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                  <h2 className="text-xl font-semibold text-white mb-4">Most Cited Papers</h2>
                  <Bar data={mostCitedPapers} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
