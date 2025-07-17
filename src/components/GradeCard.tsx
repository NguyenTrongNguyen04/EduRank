import React, { useState, useEffect } from 'react';
import { Award, TrendingUp, Star, CheckCircle, Target, BookOpen, Trophy, Users, BarChart3, ExternalLink } from 'lucide-react';

interface GradeCardProps {
  student: any;
}

const GradeCard: React.FC<GradeCardProps> = ({ student }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getGradeColor = (score: number) => {
    if (score >= 9) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 7) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 5) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getGradeBadge = (score: number) => {
    if (score >= 9) return { label: 'Xuất sắc', icon: Trophy };
    if (score >= 7) return { label: 'Giỏi', icon: Award };
    if (score >= 5) return { label: 'Khá', icon: Star };
    return { label: 'Trung bình', icon: Target };
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 9) return { level: 'Xuất sắc', percentage: 95, color: 'emerald' };
    if (score >= 7) return { level: 'Giỏi', percentage: 80, color: 'blue' };
    if (score >= 5) return { level: 'Khá', percentage: 65, color: 'amber' };
    return { level: 'Trung bình', percentage: 45, color: 'red' };
  };

  const averageScore = student.totalScore / student.subjects.length;
  const performance = getPerformanceLevel(averageScore);

  // Mock university suggestions based on score
  const universitySuggestions = [
    { name: 'ĐH Bách Khoa Hà Nội', threshold: 28.5, probability: 85 },
    { name: 'ĐH Kinh tế Quốc dân', threshold: 26.0, probability: 92 },
    { name: 'ĐH Ngoại thương', threshold: 25.5, probability: 95 },
    { name: 'Đại học Bách khoa Thành phố Hồ Chí Minh', threshold: 24.0, probability: 98 },
  ].filter(uni => student.totalScore >= uni.threshold);

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { id: 'subjects', label: 'Chi tiết môn', icon: BookOpen },
    { id: 'ranking', label: 'Xếp hạng', icon: TrendingUp },
  ];

  return (
    <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Main Grade Card */}
      <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-200">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{student.name}</h3>
              <div className="flex items-center space-x-4 text-blue-100">
                <span>SBD: {student.id}</span>
              </div>
              <div className="text-blue-100">{student.school}</div>
            </div>
            <div className="text-right space-y-2">
              <div className="text-4xl font-bold">{student.totalScore.toFixed(1)}</div>
              <div className="text-blue-100">Tổng điểm</div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-green-300 font-semibold">Đạt tốt nghiệp</span>
              </div>
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Mức độ thành tích</span>
              <span className="font-semibold">{performance.level}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${performance.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="relative border-b border-slate-200 bg-slate-50/50">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Điểm TB', value: (student.totalScore / student.subjects.length).toFixed(2), icon: Award, color: 'blue' },
                  { label: 'Xếp hạng', value: '#1', icon: TrendingUp, color: 'green' },
                  { label: 'Môn giỏi', value: `${student.subjects.filter((s: any) => s.score >= 7).length}/${student.subjects.length}`, icon: Trophy, color: 'orange' },
                ].map((stat, index) => (
                  <div key={index} className="group relative overflow-hidden bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subject Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.subjects.filter((subject: any) => [
                  'Toán', 'Ngữ Văn', 'Ngoại Ngữ', 'Vật lí'
                ].includes(subject.name)).map((subject: any, index: number) => {
                  const badge = getGradeBadge(subject.score);
                  return (
                    <div 
                      key={subject.name} 
                      className="group relative overflow-hidden bg-slate-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getGradeColor(subject.score)}`}>
                            <badge.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{subject.name}</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${getGradeColor(subject.score)}`}>
                              {badge.label}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">{subject.score.toFixed(1)}</div>
                          <div className="w-16 bg-slate-200 rounded-full h-1 mt-1">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${(subject.score / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              {student.subjects.filter((subject: any) => [
                'Toán', 'Ngữ Văn', 'Ngoại Ngữ', 'Vật lí'
              ].includes(subject.name)).map((subject: any, index: number) => {
                const badge = getGradeBadge(subject.score);
                return (
                  <div 
                    key={subject.name}
                    className="group relative overflow-hidden bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getGradeColor(subject.score)} group-hover:scale-110 transition-transform duration-300`}>
                          <badge.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-800">{subject.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.score)}`}>{badge.label}</span>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-slate-800">{subject.score.toFixed(1)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'ranking' && (
            <div className="space-y-6 animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { scope: 'Lớp', rank: 1, total: 45 },
                  { scope: 'Trường', rank: 1, total: 1200 },
                  { scope: 'Huyện', rank: 1, total: 5600 },
                  { scope: 'Tỉnh', rank: 1, total: 24000 },
                  { scope: 'Quốc gia', rank: 1, total: 1147269 },
                ].map((ranking, index) => (
                  <div key={ranking.scope} className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-slate-800">Xếp hạng {ranking.scope}</h4>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-500">{ranking.total.toLocaleString()} thí sinh</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-800">#1</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeCard;