import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import TopNav from './components/TopNav';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/anime/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
