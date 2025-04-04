import './App.css';
import RecommendationPage from './pages/RecommendationPage';
import SimilarityMatrix from './pages/SimilarityMatrix';

function App() {
  return (
    <>
      <RecommendationPage />
      <SimilarityMatrix />
    </>
  );
}

export default App;

// Create a file:
// /src/services/api.ts

// import axios from 'axios';
// const API_BASE_URL = 'http://localhost:5000/api/similar'; // adjust port if needed

// export const fetchTitles = async (): Promise<string[]> => {
//   const res = await axios.get(`${API_BASE_URL}/titles`);
//   return res.data;
// };

// export const fetchRecommendations = async (title: string, top: number = 5) => {
//   const res = await axios.get(`${API_BASE_URL}/recommend`, {
//     params: { title, top }
//   });
//   return res.data;
// };

// ✅ Step 3: Create the Recommendation Component
// /src/components/Recommendation.tsx
// import { useEffect, useState } from 'react';
// import { fetchTitles, fetchRecommendations } from '../services/api';

// const Recommendation = () => {
//   const [titles, setTitles] = useState<string[]>([]);
//   const [selectedTitle, setSelectedTitle] = useState('');
//   const [recommendations, setRecommendations] = useState<{ title: string; score: number }[]>([]);

//   // Load available titles on mount
//   useEffect(() => {
//     fetchTitles().then(setTitles).catch(console.error);
//   }, []);

//   const handleRecommend = () => {
//     if (!selectedTitle) return;
//     fetchRecommendations(selectedTitle, 5)
//       .then(setRecommendations)
//       .catch(console.error);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow-md">
//       <h1 className="text-xl font-bold mb-4">🎬 Find Similar Netflix Titles</h1>

//       <select
//         className="w-full p-2 border rounded mb-4"
//         value={selectedTitle}
//         onChange={(e) => setSelectedTitle(e.target.value)}
//       >
//         <option value="">-- Select a Title --</option>
//         {titles.map((title) => (
//           <option key={title} value={title}>
//             {title}
//           </option>
//         ))}
//       </select>

//       <button
//         onClick={handleRecommend}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Show Recommendations
//       </button>

//       {recommendations.length > 0 && (
//         <div className="mt-6">
//           <h2 className="font-semibold mb-2">Top Recommendations:</h2>
//           <ul className="list-disc list-inside">
//             {recommendations.map((rec, index) => (
//               <li key={index}>
//                 {rec.title} — <span className="text-sm text-gray-500">Score: {rec.score.toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Recommendation;

// In your App.tsx:

// import Recommendation from './components/Recommendation';

// function App() {
//   return (
//     <div className="App">
//       <Recommendation />
//     </div>
//   );
// }

// export default App;

// ✅ Step 5: CORS Fix on Backend

// If you haven’t yet, make sure your backend allows requests from your frontend:

// In Program.cs (backend):

// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(policy =>
//         policy.WithOrigins("http://localhost:5173") // 👈 Vite dev server
//               .AllowAnyHeader()
//               .AllowAnyMethod());
// });

// app.UseCors();
