import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Search, TrendingUp, BarChart3, Users, BookOpen, Award, Bell, HelpCircle } from 'lucide-react';
import SearchForm from './components/SearchForm';
import GradeCard from './components/GradeCard';
import Analytics from './components/Analytics';
import NewsSection from './components/NewsSection';
import Navigation from './components/Navigation';
import { mockStudentData, mockRankingData } from './data/mockData';
import CountdownEventList from './pages/CountdownEventList';
import CountdownEventDetail from './pages/CountdownEventDetail';
import { motion } from 'framer-motion';
import logo from './assets/logo.jpg';

function HomePage() {
  const [searchResults, setSearchResults] = React.useState<any | null>(null);
  const [searchHistory, setSearchHistory] = React.useState<any[]>([]);

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearch = (searchData: any) => {
    const result = mockStudentData.find(student => 
      student.id === searchData.query || 
      student.name.toLowerCase().includes(searchData.query.toLowerCase())
    );
    setSearchResults(result);
    if (result) {
      const newHistory = [result, ...searchHistory.filter(item => item.id !== result.id)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <motion.h2 
          className="text-4xl font-extrabold text-blue-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Tra cứu và Xem xếp hạng điểm thi
        </motion.h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Nhập số báo danh, họ tên hoặc mã tra cứu để xem chi tiết kết quả thi và xếp hạng
        </p>
      </div>
      <SearchForm onSearch={handleSearch} searchHistory={searchHistory} />
      {searchResults && (
        <div className="space-y-6">
          <GradeCard student={searchResults} />
          {/* Removed RankingBoard component */}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.img 
                  src={logo} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
                  whileHover={{ scale: 1.08, rotate: 3 }}
                />
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 80 }}
                >
                  <h1 className="text-xl font-bold text-slate-800">THPTQG ScoreView</h1>
                  <p className="text-sm text-slate-500">Hệ thống tra cứu điểm & xếp hạng</p>
                </motion.div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Navigation */}
        <Navigation />
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<Analytics />} />
            <Route path="/news" element={<NewsSection />} />
            <Route path="/countdown-event" element={<CountdownEventList />} />
            <Route path="/countdown-event/:slug" element={<CountdownEventDetail />} />
          </Routes>
        </main>
        {/* Footer */}
        <footer className="bg-slate-900 text-white mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                  <h3 className="text-lg font-semibold">THPTQG ScoreView</h3>
                </div>
                <p className="text-slate-400">
                  Hệ thống tra cứu điểm và xếp hạng học sinh hiện đại, minh bạch và dễ sử dụng.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Tính năng</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>Tra cứu điểm</li>
                  <li>Phân tích dữ liệu</li>
                  <li>So sánh kết quả</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Hỗ trợ</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>Hướng dẫn sử dụng</li>
                  <li>Câu hỏi thường gặp</li>
                  <li>Phản hồi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Thông tin</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>Về chúng tôi</li>
                  <li>Bảo mật</li>
                  <li className="mt-4 text-slate-300 font-semibold">Tác giả: Nguyễn Trọng Nguyên</li>
                  <li>Facebook: <a href="https://www.facebook.com/NguyenTrongNguyen.Portfolio" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">@NguyenTrongNguyen.Portfolio</a></li>
                  <li>Zalo: 086 575 0804</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>2025 THPTQG ScoreView. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;