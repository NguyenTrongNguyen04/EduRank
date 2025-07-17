import React, { useState, useRef, useEffect } from 'react';
import { Search, History, X, Filter, Users, Sparkles, Zap, TrendingUp } from 'lucide-react';

interface SearchFormProps {
  onSearch: (data: { query: string; type: string }) => void;
  searchHistory: any[];
}

const SUBJECTS = [
  { key: 'toan', label: 'Toán' },
  { key: 'ngu_van', label: 'Ngữ Văn' },
  { key: 'ngoai_ngu', label: 'Ngoại Ngữ' },
  { key: 'vat_li', label: 'Vật lí' },
  { key: 'hoa_hoc', label: 'Hoá học' },
  { key: 'sinh_hoc', label: 'Sinh học' },
  { key: 'lich_su', label: 'Lịch sử' },
  { key: 'dia_li', label: 'Địa lý' },
  { key: 'gdcd', label: 'GDCD' },
];

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, searchHistory }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [scoreData, setScoreData] = useState<any>(null);
  const [scoreError, setScoreError] = useState<string | null>(null);
  const KHOI_LIST = ['A', 'A1', 'B', 'C', 'D', 'D7'];
  const [khoiRank, setKhoiRank] = useState<any>(null);

  // Mock suggestions based on input
  useEffect(() => {
    if (query.length > 0) {
      const mockSuggestions = [
        '22001001 - Nguyễn Văn An',
        '22001002 - Trần Thị Bình', 
        '22001003 - Lê Văn Cường',
        '22001004 - Phạm Thị Dung',
        '22001005 - Hoàng Văn Em'
      ].filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3);
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchKhoiRanking = async (sbd: string) => {
    for (const khoi of KHOI_LIST) {
      try {
        const res = await fetch(`https://api.xephangdiemthi.edu.vn/api/v1/khoi/khoi=${khoi}/sbd=${sbd}`);
        if (!res.ok) continue;
        const json = await res.json();
        if (json.data) {
          return { khoi, ...json.data };
        }
      } catch (e) {
        continue;
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      setScoreData(null);
      setScoreError(null);
      setKhoiRank(null);
      try {
        // Nếu là số báo danh, gọi API
        if (searchType === 'id' && /^\d+$/.test(query.trim())) {
          const res = await fetch(`https://api.xephangdiemthi.edu.vn/api/v1/score/sbd=${query.trim()}`);
          const json = await res.json();
          if (json.valid && json.data) {
            setScoreData(json.data);
            // Gọi tiếp API xếp hạng khối
            const khoiData = await fetchKhoiRanking(query.trim());
            if (khoiData) setKhoiRank(khoiData);
          } else {
            setScoreError('Không tìm thấy dữ liệu cho SBD này.');
          }
        } else {
          setScoreError('Vui lòng nhập đúng số báo danh.');
        }
      } catch (err) {
        setScoreError('Có lỗi khi tra cứu.');
      }
      setIsSearching(false);
    }
  };

  const handleHistoryClick = (student: any) => {
    setQuery(student.id);
    onSearch({ query: student.id, type: 'id' });
    setShowHistory(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const id = suggestion.split(' - ')[0];
    setQuery(id);
    setSuggestions([]);
    onSearch({ query: id, type: 'id' });
  };

  const quickSearchOptions = [
    // { label: 'Điểm cao nhất', icon: TrendingUp, query: '22001001' },
    { label: 'Thí sinh cao điểm nhất', icon: Users, query: '1016799' },
    // { label: 'Kết quả tốt', icon: Sparkles, query: '22001003' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Search Section */}
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl animate-pulse pointer-events-none"></div>
        
        <form onSubmit={handleSubmit} className="relative space-y-6">
          {/* Main Search Bar */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Search Input Container */}
              <div className="flex items-center p-6">
                <div className="flex-1 flex items-center space-x-4">
                  <div className="relative">
                    {isSearching ? (
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Search className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
                    )}
                  </div>
                  
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Nhập số báo danh, họ tên hoặc mã tra cứu..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setShowHistory(true)}
                      className="w-full text-lg outline-none text-slate-800 placeholder-slate-400 bg-transparent font-medium"
                      disabled={isSearching}
                    />
                    
                    {/* Live Suggestions */}
                    {suggestions.length > 0 && !showHistory && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-b-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-slate-700">{suggestion}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Controls */}
                <div className="flex items-center space-x-4">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm font-medium"
                    disabled={isSearching}
                  >
                    <option value="id">Số báo danh</option>
                  </select>
                  {/* Đã xóa nút filter */}
                  <button
                    type="submit"
                    disabled={isSearching || !query.trim()}
                    className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>{isSearching ? 'Đang tìm...' : 'Tra cứu'}</span>
                      {!isSearching && <Zap className="w-4 h-4" />}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvanced && (
                <div className="border-t border-slate-200 p-6 bg-slate-50/50 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Trường</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option value="">Tất cả trường</option>
                        <option value="chuyen-hn">THPT Chuyên Hà Nội</option>
                        <option value="le-quy-don">THPT Lê Quý Đôn</option>
                        <option value="nguyen-hue">THPT Nguyễn Huệ</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Khu vực</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        <option value="">Tất cả khu vực</option>
                        <option value="hanoi">Hà Nội</option>
                        <option value="hcm">TP. Hồ Chí Minh</option>
                        <option value="danang">Đà Nẵng</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Điểm từ</label>
                      <div className="flex space-x-2">
                        <input 
                          type="number" 
                          placeholder="0" 
                          min="0" 
                          max="10" 
                          step="0.1"
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="flex items-center text-slate-500">đến</span>
                        <input 
                          type="number" 
                          placeholder="10" 
                          min="0" 
                          max="10" 
                          step="0.1"
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Search Options */}
          <div className="flex flex-wrap justify-center gap-4">
            {quickSearchOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setQuery(option.query);
                  onSearch({ query: option.query, type: 'id' });
                }}
                className="group flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
                disabled={isSearching}
              >
                <option.icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{option.label}</span>
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Hiển thị bảng điểm nếu có dữ liệu */}
      {scoreData && (
        <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex items-center justify-between">
              <div className="text-lg font-bold">Bảng điểm thí sinh</div>
              <div className="font-mono text-base">SBD: <span className="font-bold">{scoreData.sbd}</span></div>
            </div>
            <table className="w-full text-left">
              <tbody>
                {SUBJECTS.map(sub => (
                  <tr key={sub.key} className="border-b last:border-b-0 border-slate-100 hover:bg-blue-50/30 transition-all duration-200">
                    <td className="px-6 py-4 font-medium text-slate-700 w-1/3">{sub.label}</td>
                    <td className="px-6 py-4 text-slate-900 text-lg font-semibold">
                      {scoreData[sub.key] !== null && scoreData[sub.key] !== undefined ? scoreData[sub.key] : <span className="text-slate-400 italic">--</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {scoreError && (
        <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up">
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 text-center font-medium">{scoreError}</div>
        </div>
      )}

      {/* Hiển thị bảng xếp hạng khối nếu có dữ liệu */}
      {khoiRank && (
        <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex items-center justify-between">
              <div className="text-lg font-bold">Bảng xếp hạng theo khối</div>
              <div className="font-mono text-base">Khối: <span className="font-bold">{khoiRank.ten_khoi}</span></div>
            </div>
            <table className="w-full text-left">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-700 w-1/2">Tổng điểm</td>
                  <td className="px-6 py-4 text-slate-900 text-lg font-semibold">{khoiRank.tong_diem}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-700">Xếp hạng toàn quốc</td>
                  <td className="px-6 py-4 text-slate-900 text-lg font-semibold">{khoiRank.xep_hang_toan_quoc.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-700">Xếp hạng tỉnh</td>
                  <td className="px-6 py-4 text-slate-900 text-lg font-semibold">{khoiRank.xep_hang_tinh.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-700">Xếp hạng miền</td>
                  <td className="px-6 py-4 text-slate-900 text-lg font-semibold">{khoiRank.xep_hang_mien.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Search Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Tổng thí sinh', value: '1.147.269', icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Tổng số điểm 10', value: '15.331', icon: TrendingUp, color: 'from-green-500 to-green-600' },
          { label: 'Tỉnh thành có điểm trung bình cao nhất', value: 'Nghệ An', icon: Sparkles, color: 'from-purple-500 to-purple-600' },
        ].map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            </div>
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;