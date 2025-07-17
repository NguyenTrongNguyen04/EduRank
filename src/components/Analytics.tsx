import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { motion } from 'framer-motion';

const SUBJECTS = [
  { code: 'Toan', name: 'Toán' },
  { code: 'Ly', name: 'Lý' },
  { code: 'Hoa', name: 'Hóa' },
  { code: 'NgoaiNgu', name: 'Ngoại Ngữ' },
];

const KHOI_LIST = [
  { code: 'a', name: 'Khối A' },
  { code: 'a1', name: 'Khối A1' },
  { code: 'b', name: 'Khối B' },
  { code: 'c', name: 'Khối C' },
  { code: 'd', name: 'Khối D' },
];

const Analytics: React.FC = () => {
  const [tab, setTab] = useState<'subject' | 'khoi' | 'province' | 'provinceTopAvg' | 'provinceTopScore'>('subject');
  // State cho phân tích theo môn
  const [subjectData, setSubjectData] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('Toan');
  const [loadingSubject, setLoadingSubject] = useState(true);
  const [errorSubject, setErrorSubject] = useState('');
  // State cho phân tích theo khối
  const [khoiData, setKhoiData] = useState<any[]>([]);
  const [selectedKhoi, setSelectedKhoi] = useState('a');
  const [loadingKhoi, setLoadingKhoi] = useState(true);
  const [errorKhoi, setErrorKhoi] = useState('');
  // State cho phân tích theo tỉnh/thành
  const [provinceData, setProvinceData] = useState<any[]>([]);
  const [loadingProvince, setLoadingProvince] = useState(true);
  const [errorProvince, setErrorProvince] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  // State cho phân tích tỉnh/thành top điểm TB
  const [provinceTopAvgData, setProvinceTopAvgData] = useState<any[]>([]);
  const [loadingProvinceTopAvg, setLoadingProvinceTopAvg] = useState(true);
  const [errorProvinceTopAvg, setErrorProvinceTopAvg] = useState('');
  const [selectedProvinceTopAvg, setSelectedProvinceTopAvg] = useState<string | null>(null);
  // State cho top tỉnh/thành có nhiều điểm 10
  const [provinceTopScoreData, setProvinceTopScoreData] = useState<any[]>([]);
  const [loadingProvinceTopScore, setLoadingProvinceTopScore] = useState(true);
  const [errorProvinceTopScore, setErrorProvinceTopScore] = useState('');

  // Fetch dữ liệu phân tích theo môn
  useEffect(() => {
    setLoadingSubject(true);
    fetch('/api/proxy-report-by-subject')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.model?.scores?.length) {
          setSubjectData(json.data.model.scores);
        } else {
          setErrorSubject('Không có dữ liệu phân tích.');
        }
        setLoadingSubject(false);
      })
      .catch(() => {
        setErrorSubject('Không thể tải dữ liệu từ API. Có thể bị chặn hoặc lỗi mạng.');
        setLoadingSubject(false);
      });
  }, []);

  // Fetch dữ liệu phân tích theo khối
  useEffect(() => {
    setLoadingKhoi(true);
    fetch('/api/proxy-report-by-subject-group')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.model?.items?.length) {
          setKhoiData(json.data.model.items);
        } else {
          setErrorKhoi('Không có dữ liệu phân tích.');
        }
        setLoadingKhoi(false);
      })
      .catch(() => {
        setErrorKhoi('Không thể tải dữ liệu từ API. Có thể bị chặn hoặc lỗi mạng.');
        setLoadingKhoi(false);
      });
  }, []);

  // Fetch dữ liệu phân tích theo tỉnh/thành
  useEffect(() => {
    setLoadingProvince(true);
    fetch('/api/proxy-report-by-province')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.model?.items?.length) {
          setProvinceData(json.data.model.items);
        } else {
          setErrorProvince('Không có dữ liệu phân tích.');
        }
        setLoadingProvince(false);
      })
      .catch(() => {
        setErrorProvince('Không thể tải dữ liệu từ API. Có thể bị chặn hoặc lỗi mạng.');
        setLoadingProvince(false);
      });
  }, []);

  // Fetch dữ liệu phân tích tỉnh/thành top điểm TB
  useEffect(() => {
    setLoadingProvinceTopAvg(true);
    fetch('/api/proxy-report-by-province-top-avg')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.model?.items?.length) {
          setProvinceTopAvgData(json.data.model.items);
        } else {
          setErrorProvinceTopAvg('Không có dữ liệu phân tích.');
        }
        setLoadingProvinceTopAvg(false);
      })
      .catch(() => {
        setErrorProvinceTopAvg('Không thể tải dữ liệu từ API. Có thể bị chặn hoặc lỗi mạng.');
        setLoadingProvinceTopAvg(false);
      });
  }, []);

  // Fetch dữ liệu top tỉnh/thành có nhiều điểm 10
  useEffect(() => {
    setLoadingProvinceTopScore(true);
    fetch('/api/proxy-report-province-by-score-of-subject')
      .then(res => res.json())
      .then(json => {
        if (json?.data?.model?.items?.length) {
          setProvinceTopScoreData(json.data.model.items);
        } else {
          setErrorProvinceTopScore('Không có dữ liệu phân tích.');
        }
        setLoadingProvinceTopScore(false);
      })
      .catch(() => {
        setErrorProvinceTopScore('Không thể tải dữ liệu từ API. Có thể bị chặn hoặc lỗi mạng.');
        setLoadingProvinceTopScore(false);
      });
  }, []);

  // Render UI cho từng tab
  let content = null;
  if (tab === 'subject') {
    if (loadingSubject) content = <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>;
    else if (errorSubject) content = <div className="text-center py-12 text-red-500">{errorSubject}</div>;
    else if (!subjectData.length) content = null;
    else {
      const subject = subjectData.find((s: any) => s.subjectCode === selectedSubject) || subjectData[0];
      content = (
        <>
          <motion.div className="flex flex-wrap gap-4 items-center mb-2">
            <h2 className="text-2xl md:text-3xl font-bold">Phân tích điểm thi theo môn</h2>
            <select
              className="px-4 py-2 rounded-lg border shadow-sm focus:ring focus:ring-indigo-200"
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
            >
              {SUBJECTS.map(s => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-6 rounded-2xl text-center shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-blue-700">{subject.totalStudent.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Tổng thí sinh</div>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl text-center shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-green-700">{subject.gradePointAverage.toFixed(2)}</div>
              <div className="text-sm text-slate-600 mt-1">Điểm trung bình</div>
            </div>
            <div className="bg-yellow-50 p-6 rounded-2xl text-center shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-yellow-700">{subject.totalScoreLessOne.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Dưới 1 điểm</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl text-center shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-purple-700">{subject.totalScoreLessFive.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Dưới 5 điểm</div>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-2">
            <h3 className="font-semibold mb-4 text-lg md:text-xl">Phổ điểm môn {subject.subjectName}</h3>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={subject.scoreRanges} barCategoryGap={2}>
                <XAxis dataKey="score" tick={{ fontSize: 13 }} />
                <YAxis tick={{ fontSize: 13 }} />
                <Tooltip />
                <Bar dataKey="totalStudent" fill="#6366f1" isAnimationActive animationDuration={1200} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </>
      );
    }
  } else if (tab === 'khoi') {
    if (loadingKhoi) content = <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>;
    else if (errorKhoi) content = <div className="text-center py-12 text-red-500">{errorKhoi}</div>;
    else if (!khoiData.length) content = null;
    else {
      const khoi = khoiData.find((k: any) => k.code === selectedKhoi) || khoiData[0];
      content = (
        <>
          <motion.div className="flex flex-wrap gap-4 items-center mb-2">
            <h2 className="text-2xl md:text-3xl font-bold">Phân tích điểm thi theo khối</h2>
            <select
              className="px-4 py-2 rounded-lg border shadow-sm focus:ring focus:ring-indigo-200"
              value={selectedKhoi}
              onChange={e => setSelectedKhoi(e.target.value)}
            >
              {khoiData.map((k: any) => (
                <option key={k.code} value={k.code}>{k.name}</option>
              ))}
            </select>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-6 rounded-2xl text-center shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-blue-700">{khoi.totalStudent.toLocaleString()}</div>
              <div className="text-sm text-slate-600 mt-1">Tổng thí sinh</div>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl text-center shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-green-700">{khoi.avgScore.toFixed(2)}</div>
              <div className="text-sm text-slate-600 mt-1">Điểm trung bình</div>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-2">
            <h3 className="font-semibold mb-4 text-lg md:text-xl">Phổ điểm {khoi.name}</h3>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={khoi.scores} barCategoryGap={2}>
                <XAxis dataKey="score" tick={{ fontSize: 13 }} />
                <YAxis tick={{ fontSize: 13 }} />
                <Tooltip />
                <Bar dataKey="totalStudent" fill="#6366f1" isAnimationActive animationDuration={1200} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </>
      );
    }
  } else if (tab === 'province') {
    if (loadingProvince) content = <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>;
    else if (errorProvince) content = <div className="text-center py-12 text-red-500">{errorProvince}</div>;
    else if (!provinceData.length) content = null;
    else {
      // Sắp xếp theo điểm TB giảm dần
      const sorted = [...provinceData].sort((a, b) => b.gradePointAverage - a.gradePointAverage);
      content = (
        <>
          <motion.div className="flex flex-wrap gap-4 items-center mb-2">
            <h2 className="text-2xl md:text-3xl font-bold">Phân tích theo tỉnh/thành</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {sorted.map((prov, idx) => (
              <motion.div
                key={prov.provincePrefix}
                className={`bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 border border-slate-100 hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <img src={prov.avatar} alt={prov.provinceName} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                <div className="flex-1">
                  <div className="font-bold text-lg text-slate-800">{prov.provinceName}</div>
                  <div className="text-sm text-slate-500">Tổng thí sinh: <span className="font-semibold text-blue-600">{prov.totalStudent.toLocaleString()}</span></div>
                  <div className="text-sm text-slate-500">Điểm TB: <span className="font-semibold text-green-600">{prov.gradePointAverage.toFixed(2)}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      );
    }
  } else if (tab === 'provinceTopAvg') {
    if (loadingProvinceTopAvg) content = <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>;
    else if (errorProvinceTopAvg) content = <div className="text-center py-12 text-red-500">{errorProvinceTopAvg}</div>;
    else if (!provinceTopAvgData.length) content = null;
    else {
      const sorted = [...provinceTopAvgData].sort((a, b) => b.gradePointAverage - a.gradePointAverage);
      const selected = selectedProvinceTopAvg
        ? provinceTopAvgData.find(p => p.provincePrefix === selectedProvinceTopAvg)
        : null;
      content = (
        <>
          <motion.div className="flex flex-wrap gap-4 items-center mb-2">
            <h2 className="text-2xl md:text-3xl font-bold">Phân tích tỉnh/thành có điểm trung bình cao</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {sorted.map((prov, idx) => (
              <motion.div
                key={prov.provincePrefix}
                className={`bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer ${selectedProvinceTopAvg === prov.provincePrefix ? 'ring-2 ring-blue-400' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                onClick={() => setSelectedProvinceTopAvg(prov.provincePrefix)}
              >
                <img src={prov.avatar} alt={prov.provinceName} className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                <div className="flex-1">
                  <div className="font-bold text-lg text-slate-800">{prov.provinceName}</div>
                  <div className="text-sm text-slate-500">Tổng thí sinh: <span className="font-semibold text-blue-600">{prov.totalStudent.toLocaleString()}</span></div>
                  <div className="text-sm text-slate-500">Điểm TB: <span className="font-semibold text-green-600">{prov.gradePointAverage.toFixed(2)}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
          {selected && Array.isArray(selected.byYears) && selected.byYears.length > 0 ? (
            <motion.div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-2">
              <h3 className="font-semibold mb-4 text-lg md:text-xl">Xu hướng điểm trung bình & số thí sinh của {selected.provinceName} qua các năm</h3>
              {(() => {
                const chartData = (selected.byYears || []).map((item: any) => ({
                  ...item,
                  year: String(item.year),
                  gradePointAverage: Number(item.gradePointAverage),
                  totalStudent: Number(item.totalStudent),
                }));
                return (
                  <ResponsiveContainer width="100%" height={340}>
                    <LineChart data={chartData} margin={{ left: 8, right: 8, top: 16, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" tick={{ fontSize: 13 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 13 }} label={{ value: 'Điểm TB', angle: -90, position: 'insideLeft', offset: 10 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 13 }} label={{ value: 'Thí sinh', angle: 90, position: 'insideRight', offset: 10 }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="gradePointAverage" name="Điểm TB" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                      <Line yAxisId="right" type="monotone" dataKey="totalStudent" name="Tổng thí sinh" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                    </LineChart>
                  </ResponsiveContainer>
                );
              })()}
            </motion.div>
          ) : null}
        </>
      );
    }
  } else if (tab === 'provinceTopScore') {
    if (loadingProvinceTopScore) content = <div className="text-center py-12 text-slate-500">Đang tải dữ liệu...</div>;
    else if (errorProvinceTopScore) content = <div className="text-center py-12 text-red-500">{errorProvinceTopScore}</div>;
    else if (!provinceTopScoreData.length) content = null;
    else {
      const sorted = [...provinceTopScoreData].sort((a, b) => b.totalStudent - a.totalStudent);
      content = (
        <>
          <motion.div className="flex flex-wrap gap-4 items-center mb-2">
            <h2 className="text-2xl md:text-3xl font-bold">Top tỉnh/thành có nhiều điểm 10 nhất</h2>
          </motion.div>
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-2">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sorted} layout="vertical" margin={{ left: 24, right: 24, top: 16, bottom: 16 }}>
                <XAxis type="number" dataKey="totalStudent" tick={{ fontSize: 13 }} label={{ value: 'Số thí sinh đạt điểm 10', position: 'insideBottom', offset: -5 }} />
                <YAxis type="category" dataKey="provinceName" tick={{ fontSize: 15 }} width={140} />
                <Tooltip />
                <Bar dataKey="totalStudent" fill="#6366f1" name="Số thí sinh điểm 10" barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      );
    }
  }

  return (
    <div className="space-y-8 px-2 md:px-8 py-4 md:py-8">
      {/* Tab selector */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-200 ${tab === 'subject' ? 'border-blue-600 text-blue-600 bg-white shadow' : 'border-transparent text-slate-600 bg-slate-100 hover:text-blue-600'}`}
          onClick={() => setTab('subject')}
        >
          Phân tích theo môn
        </button>
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-200 ${tab === 'khoi' ? 'border-blue-600 text-blue-600 bg-white shadow' : 'border-transparent text-slate-600 bg-slate-100 hover:text-blue-600'}`}
          onClick={() => setTab('khoi')}
        >
          Phân tích theo khối
        </button>
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-200 ${tab === 'province' ? 'border-blue-600 text-blue-600 bg-white shadow' : 'border-transparent text-slate-600 bg-slate-100 hover:text-blue-600'}`}
          onClick={() => setTab('province')}
        >
          Phân tích theo tỉnh/thành
        </button>
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-200 ${tab === 'provinceTopAvg' ? 'border-blue-600 text-blue-600 bg-white shadow' : 'border-transparent text-slate-600 bg-slate-100 hover:text-blue-600'}`}
          onClick={() => setTab('provinceTopAvg')}
        >
          Phân tích tỉnh/thành có điểm cao
        </button>
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-200 ${tab === 'provinceTopScore' ? 'border-blue-600 text-blue-600 bg-white shadow' : 'border-transparent text-slate-600 bg-slate-100 hover:text-blue-600'}`}
          onClick={() => setTab('provinceTopScore')}
        >
          Top tỉnh/thành có nhiều điểm 10
        </button>
      </div>
      {content}
    </div>
  );
};

export default Analytics;