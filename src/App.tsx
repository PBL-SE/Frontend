import { useState } from "react";
import axios from "axios";

// Define the structure for the response data
interface Paper {
  arxiv_id: string;
  title: string;
  abstract: string;
  year: number;
  journal: string | null;
  difficulty_level: number;
  pdf_link: string;
}

interface ApiResponse {
  message: string;
  results: Paper[];
}

const App = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("Deep Learning Papers Needed");
  const [difficulty, setDifficulty] = useState<string>("1");

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        "https://server-git-main-siddhant-vishnus-projects.vercel.app/api/papers/fetch-by-query-and-tag", {
          query, // Ensure query is a valid string
          difficulty_level: difficulty, // Ensure difficulty_level is a valid number or string
        }
      );
      setPapers(response.data.results);
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Deep Learning Papers</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border-2 border-gray-300 p-2 rounded-md"
          placeholder="Search Query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="number"
          className="border-2 border-gray-300 p-2 rounded-md ml-2"
          placeholder="Difficulty Level"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
          onClick={fetchPapers}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <div
              key={paper.arxiv_id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold mb-2">{paper.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{paper.abstract}</p>
              <div className="text-sm text-gray-400 mb-2">
                <span>Year: {paper.year}</span> |{" "}
                <span>Difficulty: {paper.difficulty_level}</span>
              </div>
              {paper.journal && (
                <p className="text-sm text-gray-500 mb-2">Journal: {paper.journal}</p>
              )}
              <a
                href={paper.pdf_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
