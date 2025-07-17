import React, { useState } from 'react';
import { Calculator, Plus, Minus, RotateCcw, Target, TrendingUp } from 'lucide-react';

const GradeCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState([
    { name: 'Toán', score: 0, weight: 1, required: true },
    { name: 'Văn', score: 0, weight: 1, required: true },
    { name: 'Tiếng Anh', score: 0, weight: 1, required: true },
  ]);
  const [targetScore, setTargetScore] = useState(24);

  const addSubject = () => {
    const newSubject = {
      name: `Môn ${subjects.length + 1}`,
      score: 0,
      weight: 1,
      required: false
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (index: number) => {
    if (!subjects[index].required) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const updateSubject = (index: number, field: string, value: any) => {
    const updated = subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    );
    setSubjects(updated);
  };

  const resetCalculator = () => {
    setSubjects(subjects.map(subject => ({ ...subject, score: 0 })));
    setTargetScore(24);
  };

  const totalScore = subjects.reduce((sum, subject) => sum + (subject.score * subject.weight), 0);
  const totalWeight = subjects.reduce((sum, subject) => sum + subject.weight, 0);
  const averageScore = totalWeight > 0 ? totalScore / totalWeight : 0;
  const remainingToTarget = Math.max(0, targetScore - totalScore);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6.5) return 'text-blue-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-600';
    if (percentage >= 65) return 'from-blue-500 to-blue-600';
    if (percentage >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Máy tính điểm</h3>
              <p className="text-green-100">Tính toán và dự đoán kết quả</p>
            </div>
          </div>
          <button
            onClick={resetCalculator}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Target Score Setting */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-800">Mục tiêu điểm số</span>
            </div>
            <input
              type="number"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-20 px-3 py-1 border border-slate-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="30"
              step="0.1"
            />
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${getProgressColor((totalScore / targetScore) * 100)}`}
              style={{ width: `${Math.min((totalScore / targetScore) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-slate-600">Hiện tại: {totalScore.toFixed(1)}</span>
            <span className="text-slate-600">Còn lại: {remainingToTarget.toFixed(1)}</span>
          </div>
        </div>

        {/* Subjects */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800">Điểm các môn</h4>
            <button
              onClick={addSubject}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm môn</span>
            </button>
          </div>

          {subjects.map((subject, index) => (
            <div 
              key={index}
              className="group bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubject(index, 'name', e.target.value)}
                    className="w-full font-medium text-slate-800 bg-transparent border-none outline-none"
                    disabled={subject.required}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">Điểm:</span>
                  <input
                    type="number"
                    value={subject.score}
                    onChange={(e) => updateSubject(index, 'score', Number(e.target.value))}
                    className="w-16 px-2 py-1 border border-slate-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="10"
                    step="0.1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">Hệ số:</span>
                  <input
                    type="number"
                    value={subject.weight}
                    onChange={(e) => updateSubject(index, 'weight', Number(e.target.value))}
                    className="w-12 px-2 py-1 border border-slate-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="3"
                  />
                </div>

                <div className={`text-lg font-bold ${getScoreColor(subject.score)}`}>
                  {(subject.score * subject.weight).toFixed(1)}
                </div>

                {!subject.required && (
                  <button
                    onClick={() => removeSubject(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Progress bar for each subject */}
              <div className="mt-2 w-full bg-slate-200 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${getProgressColor((subject.score / 10) * 100)}`}
                  style={{ width: `${(subject.score / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{totalScore.toFixed(1)}</div>
            <div className="text-sm text-blue-600">Tổng điểm</div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-700">{averageScore.toFixed(1)}</div>
            <div className="text-sm text-green-600">Điểm TB</div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {((totalScore / targetScore) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-purple-600">Hoàn thành</div>
          </div>
        </div>

        {/* Recommendations */}
        {remainingToTarget > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
            <h4 className="font-semibold text-orange-800 mb-2">💡 Gợi ý cải thiện</h4>
            <p className="text-orange-700 text-sm">
              Bạn cần thêm {remainingToTarget.toFixed(1)} điểm để đạt mục tiêu. 
              Hãy tập trung vào các môn có điểm thấp nhất để tối ưu hóa kết quả.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeCalculator;