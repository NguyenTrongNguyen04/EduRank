import React from 'react';
import { Download, Share2, Bookmark, Printer as Print, Mail, MessageSquare, ExternalLink, Star } from 'lucide-react';

interface QuickActionsProps {
  student?: any;
}

const QuickActions: React.FC<QuickActionsProps> = ({ student }) => {
  const handleDownloadReport = () => {
    // Simulate download
    const element = document.createElement('a');
    const file = new Blob(['Báo cáo kết quả học tập'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `bao-cao-${student?.id || 'hoc-sinh'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share && student) {
      try {
        await navigator.share({
          title: `Kết quả học tập của ${student.name}`,
          text: `Tổng điểm: ${student.totalScore.toFixed(1)}/30`,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép link vào clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép link vào clipboard!');
    }
  };

  const handleSaveBookmark = () => {
    if (student) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const newBookmark = {
        id: student.id,
        name: student.name,
        totalScore: student.totalScore,
        timestamp: new Date().toISOString()
      };
      
      const updatedBookmarks = [newBookmark, ...bookmarks.filter((b: any) => b.id !== student.id)].slice(0, 10);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      alert('Đã lưu vào danh sách yêu thích!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    if (student) {
      const subject = encodeURIComponent(`Kết quả học tập - ${student.name}`);
      const body = encodeURIComponent(`
Kết quả học tập của ${student.name}:
- Số báo danh: ${student.id}
- Tổng điểm: ${student.totalScore.toFixed(1)}/30
- Trường: ${student.school}

Chi tiết điểm các môn:
${student.subjects.map((s: any) => `- ${s.name}: ${s.score.toFixed(1)}`).join('\n')}

Xem chi tiết tại: ${window.location.href}
      `);
      window.open(`mailto:?subject=${subject}&body=${body}`);
    }
  };

  const handleFeedback = () => {
    // Open feedback form or modal
    alert('Tính năng phản hồi sẽ được triển khai sớm!');
  };

  const handleViewUniversities = () => {
    // Navigate to university suggestions
    alert('Chuyển đến trang gợi ý trường đại học...');
  };

  const actions = [
    {
      id: 'download',
      label: 'Tải báo cáo',
      icon: Download,
      color: 'blue',
      onClick: handleDownloadReport,
      description: 'Tải file PDF báo cáo chi tiết'
    },
    {
      id: 'share',
      label: 'Chia sẻ',
      icon: Share2,
      color: 'green',
      onClick: handleShare,
      description: 'Chia sẻ kết quả với bạn bè'
    },
    {
      id: 'bookmark',
      label: 'Lưu yêu thích',
      icon: Bookmark,
      color: 'purple',
      onClick: handleSaveBookmark,
      description: 'Lưu vào danh sách yêu thích'
    },
    {
      id: 'print',
      label: 'In kết quả',
      icon: Print,
      color: 'slate',
      onClick: handlePrint,
      description: 'In báo cáo kết quả'
    },
    {
      id: 'email',
      label: 'Gửi email',
      icon: Mail,
      color: 'red',
      onClick: handleSendEmail,
      description: 'Gửi kết quả qua email'
    },
    {
      id: 'feedback',
      label: 'Phản hồi',
      icon: MessageSquare,
      color: 'orange',
      onClick: handleFeedback,
      description: 'Gửi phản hồi về hệ thống'
    },
    {
      id: 'universities',
      label: 'Gợi ý ĐH',
      icon: ExternalLink,
      color: 'indigo',
      onClick: handleViewUniversities,
      description: 'Xem gợi ý trường đại học'
    },
    {
      id: 'rate',
      label: 'Đánh giá',
      icon: Star,
      color: 'yellow',
      onClick: () => alert('Cảm ơn bạn đã sử dụng THPTQG ScoreView!'),
      description: 'Đánh giá hệ thống'
    }
  ];

  if (!student) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Thao tác nhanh</h3>
        <p className="text-slate-600">Tra cứu điểm để sử dụng các tính năng tiện ích</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Thao tác nhanh</h3>
            <p className="text-slate-300">Các tính năng tiện ích cho kết quả</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`group relative overflow-hidden bg-gradient-to-br from-${action.color}-50 to-${action.color}-100 hover:from-${action.color}-100 hover:to-${action.color}-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-in fade-in-50 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
              title={action.description}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 bg-${action.color}-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-medium text-${action.color}-700 group-hover:text-${action.color}-800 transition-colors`}>
                  {action.label}
                </span>
              </div>
              
              {/* Hover effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${action.color}-200/50 to-${action.color}-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-800">{student.totalScore.toFixed(1)}</div>
              <div className="text-sm text-slate-500">Tổng điểm</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">
                {student.subjects.filter((s: any) => s.score >= 7).length}
              </div>
              <div className="text-sm text-slate-500">Môn giỏi</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">
                {((student.subjects.reduce((sum: number, s: any) => sum + s.score, 0) / student.subjects.length / 10) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-slate-500">Hiệu suất</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;