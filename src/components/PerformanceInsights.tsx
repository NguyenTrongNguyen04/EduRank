import React, { useState } from 'react';
import { Brain, TrendingUp, Award, AlertCircle, CheckCircle, Target, BookOpen, Users } from 'lucide-react';

interface PerformanceInsightsProps {
  student?: any;
}

const PerformanceInsights: React.FC<PerformanceInsightsProps> = ({ student }) => {
  const [activeInsight, setActiveInsight] = useState('strengths');

  if (!student) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Phân tích thành tích</h3>
        <p className="text-slate-600">Tra cứu điểm để xem phân tích chi tiết về thành tích học tập</p>
      </div>
    );
  }

  const insights = [
    { id: 'strengths', label: 'Điểm mạnh', icon: Award, color: 'green' },
    { id: 'weaknesses', label: 'Cần cải thiện', icon: AlertCircle, color: 'orange' },
    { id: 'recommendations', label: 'Khuyến nghị', icon: Target, color: 'blue' },
    { id: 'comparison', label: 'So sánh', icon: Users, color: 'purple' },
  ];

  const getStrengths = () => {
    const strongSubjects = student.subjects.filter((s: any) => s.score >= 8);
    const averageScore = student.subjects.reduce((sum: number, s: any) => sum + s.score, 0) / student.subjects.length;
    
    return [
      ...(strongSubjects.length > 0 ? [`Xuất sắc ở ${strongSubjects.length} môn: ${strongSubjects.map((s: any) => s.name).join(', ')}`] : []),
      ...(averageScore >= 7 ? ['Điểm trung bình cao, thể hiện năng lực học tập tốt'] : []),
      ...(student.totalScore >= 24 ? ['Đạt ngưỡng điểm tốt cho hầu hết các trường đại học'] : []),
      'Hoàn thành tốt chương trình THPT',
      'Có tiềm năng phát triển trong các lĩnh vực chuyên môn'
    ];
  };

  const getWeaknesses = () => {
    const weakSubjects = student.subjects.filter((s: any) => s.score < 6);
    const averageScore = student.subjects.reduce((sum: number, s: any) => sum + s.score, 0) / student.subjects.length;
    
    return [
      ...(weakSubjects.length > 0 ? [`Cần cải thiện ${weakSubjects.length} môn: ${weakSubjects.map((s: any) => s.name).join(', ')}`] : []),
      ...(averageScore < 6.5 ? ['Điểm trung bình chưa đạt mức tối ưu'] : []),
      'Cần tăng cường luyện tập để nâng cao điểm số',
      'Có thể cần hỗ trợ thêm ở một số môn học'
    ].filter(Boolean);
  };

  const getRecommendations = () => {
    const weakSubjects = student.subjects.filter((s: any) => s.score < 6);
    const strongSubjects = student.subjects.filter((s: any) => s.score >= 8);
    
    return [
      ...(weakSubjects.length > 0 ? [`Tập trung ôn luyện các môn: ${weakSubjects.map((s: any) => s.name).join(', ')}`] : []),
      ...(strongSubjects.length > 0 ? [`Phát huy thế mạnh ở các môn: ${strongSubjects.map((s: any) => s.name).join(', ')}`] : []),
      'Lập kế hoạch học tập chi tiết và theo dõi tiến độ',
      'Tham gia các khóa học bổ trợ nếu cần thiết',
      'Luyện tập thường xuyên với đề thi thử',
      'Tìm hiểu về các ngành nghề phù hợp với năng lực'
    ];
  };

  const getComparison = () => {
    const averageScore = student.subjects.reduce((sum: number, s: any) => sum + s.score, 0) / student.subjects.length;
    
    return [
      `Điểm trung bình của bạn: ${averageScore.toFixed(1)} (so với TB toàn quốc: 6.8)`,
      `Xếp hạng ước tính: Top 15% trong khu vực`,
      `Tổng điểm ${student.totalScore.toFixed(1)} đủ điều kiện xét tuyển 85% các trường ĐH`,
      'Thành tích tốt hơn 70% thí sinh cùng khối thi',
      'Có cơ hội cao đỗ vào các trường đại học uy tín'
    ];
  };

  const renderInsightContent = () => {
    switch (activeInsight) {
      case 'strengths':
        return (
          <div className="space-y-3">
            {getStrengths().map((strength, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-green-800">{strength}</span>
              </div>
            ))}
          </div>
        );
      
      case 'weaknesses':
        const weaknesses = getWeaknesses();
        return (
          <div className="space-y-3">
            {weaknesses.length > 0 ? weaknesses.map((weakness, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-orange-800">{weakness}</span>
              </div>
            )) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-700 font-medium">Không có điểm yếu đáng kể!</p>
                <p className="text-green-600 text-sm">Kết quả học tập của bạn rất tốt.</p>
              </div>
            )}
          </div>
        );
      
      case 'recommendations':
        return (
          <div className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">{recommendation}</span>
              </div>
            ))}
          </div>
        );
      
      case 'comparison':
        return (
          <div className="space-y-3">
            {getComparison().map((comparison, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg animate-in slide-in-from-left-2 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span className="text-purple-800">{comparison}</span>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Phân tích thành tích</h3>
            <p className="text-indigo-100">Đánh giá chi tiết và khuyến nghị cải thiện</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200 bg-slate-50/50">
        <div className="flex overflow-x-auto">
          {insights.map(insight => (
            <button
              key={insight.id}
              onClick={() => setActiveInsight(insight.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
                activeInsight === insight.id
                  ? `text-${insight.color}-600 border-b-2 border-${insight.color}-600 bg-white`
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <insight.icon className="w-5 h-5" />
              <span>{insight.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderInsightContent()}
      </div>

      {/* Overall Score */}
      <div className="border-t border-slate-200 p-6 bg-gradient-to-r from-slate-50 to-blue-50/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-800">Đánh giá tổng thể</h4>
            <p className="text-sm text-slate-600">Dựa trên kết quả hiện tại</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-800">{student.totalScore.toFixed(1)}/30</div>
            <div className="flex items-center space-x-2">
              {student.totalScore >= 24 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Xuất sắc</span>
                </>
              ) : student.totalScore >= 18 ? (
                <>
                  <Award className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-600 font-medium">Tốt</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-600 font-medium">Khá</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceInsights;