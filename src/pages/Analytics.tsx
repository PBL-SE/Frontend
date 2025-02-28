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
  LineElement,
} from "chart.js";
import background from "../assets/background.png";
import NavBar from "../components/NavBar";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api";

const Analytics = () => {
  const [orgPapers, setOrgPapers] = useState<any>(null);
  const [mostCitedPapers, setMostCitedPapers] = useState<any>(null);
  const [difficultyByCategory, setDifficultyByCategory] = useState<any>(null);
  const [topAuthorsDifficulty, setTopAuthorsDifficulty] = useState<any>(null);
  const [topOrganizationsByCitations, setTopOrganizationsByCitations] = useState<any>(null);
  const [papersPerYear, setPapersPerYear] = useState<any>(null);
  const [topAuthorsByCitations, setTopAuthorsByCitations] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      setLoading(false);
    };

    fetchAllData();
  }, []);

  return (
    <div>
      <NavBar />

      <div
        className="relative w-full min-h-screen flex flex-col items-center text-center text-white bg-cover bg-center py-12 px-4"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="h-10"></div>
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">
          Research Analytics <span className="text-purple-500">Dashboard</span>
        </h1>
        <div className="h-10"></div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-80 text-lg">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl ">
            {orgPapers && (
              <div className=" bg-[#2c1250]  border border-[#693b93] p-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold mb-3">Top Organizations by Paper Count</h2>
                <Bar data={orgPapers} />
              </div>
            )}

            {difficultyByCategory && (
              <div className=" bg-[#2c1250] border border-purple-700 p-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold mb-3">Avg. Difficulty by Category</h2>
                <Bar data={difficultyByCategory} />
              </div>
            )}

            {topAuthorsDifficulty && (
              <div className=" bg-[#2c1250]  border border-purple-700 p-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold mb-3">Top Authors by Difficulty</h2>
                <Bar data={topAuthorsDifficulty} />
              </div>
            )}

            {topOrganizationsByCitations && (
              <div className=" bg-[#2c1250] border border-purple-700 p-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold mb-3">Top Organizations by Citations</h2>
                <Bar data={topOrganizationsByCitations} />
              </div>
            )}

            {papersPerYear && (
              <div className=" bg-[#2c1250] border border-purple-700 p-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold mb-3">Papers Published Per Year</h2>
                <Line data={papersPerYear} />
              </div>
            )}

            {topAuthorsByCitations && (
              <div className=" bg-[#2c1250] border border-purple-700 p-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold mb-3">Top Authors by Citations</h2>
                <Bar data={topAuthorsByCitations} />
              </div>
            )}

            {mostCitedPapers && (
              <div className=" bg-[#2c1250] border border-purple-700 p-4 rounded-xl shadow-lg transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold mb-3">Most Cited Papers</h2>
                <Bar data={mostCitedPapers} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
