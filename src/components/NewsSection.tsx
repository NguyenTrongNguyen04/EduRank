import React, { useState } from 'react';
import { Bell, Calendar, ExternalLink, HelpCircle, Play, FileText } from 'lucide-react';

const NewsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('news');

  const news = [
    {
      id: 1,
      title: 'Công bố điểm thi THPT Quốc gia 2024',
      content: 'Bộ Giáo dục và Đào tạo chính thức công bố kết quả thi THPT Quốc gia 2024. Thí sinh có thể tra cứu điểm thi từ 14h00 ngày hôm nay.',
      date: '2024-01-15',
      category: 'Thông báo',
      urgent: true,
    },
    {
      id: 2,
      title: 'Hướng dẫn phúc khảo bài thi',
      content: 'Thí sinh có thể nộp đơn phúc khảo bài thi từ ngày 16/01 đến 20/01/2024. Lệ phí phúc khảo là 25.000 VND/môn.',
      date: '2024-01-14',
      category: 'Hướng dẫn',
      urgent: false,
    },
    {
      id: 3,
      title: 'Lịch xét tuyển đại học 2024',
      content: 'Các trường đại học bắt đầu nhận hồ sơ xét tuyển từ ngày 18/01/2024. Thí sinh cần chuẩn bị đầy đủ hồ sơ theo quy định.',
      date: '2024-01-13',
      category: 'Xét tuyển',
      urgent: false,
    },
  ];

  const faqs = [
    {
      question: 'Làm thế nào để tra cứu điểm thi?',
      answer: 'Bạn có thể nhập số báo danh, họ tên hoặc mã tra cứu vào ô tìm kiếm ở trang chủ. Hệ thống sẽ hiển thị kết quả chi tiết bao gồm điểm từng môn và xếp hạng.',
    },
    {
      question: 'Xếp hạng được tính như thế nào?',
      answer: 'Xếp hạng được tính dựa trên tổng điểm các môn thi và so sánh với các thí sinh khác trong cùng phạm vi (lớp, trường, huyện, tỉnh, quốc gia).',
    },
    {
      question: 'Tôi có thể so sánh điểm với bạn bè không?',
      answer: 'Có, bạn có thể sử dụng tính năng so sánh nhóm bằng cách nhập danh sách số báo danh của các thí sinh muốn so sánh.',
    },
    {
      question: 'Dữ liệu có được cập nhật thường xuyên không?',
      answer: 'Dữ liệu điểm thi và xếp hạng được cập nhật theo thời gian thực. Các thống kê và phân tích được làm mới mỗi 15 phút.',
    },
  ];

  const guides = [
    {
      title: 'Cách tra cứu điểm thi',
      description: 'Hướng dẫn chi tiết cách sử dụng hệ thống tra cứu',
      type: 'video',
      duration: '3:24',
    },
    {
      title: 'Hiểu về bảng xếp hạng',
      description: 'Giải thích cách đọc và hiểu bảng xếp hạng',
      type: 'article',
      readTime: '5 phút',
    },
    {
      title: 'Phân tích dữ liệu điểm thi',
      description: 'Cách sử dụng các biểu đồ và thống kê',
      type: 'guide',
      readTime: '8 phút',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="flex border-b border-slate-200">
          {[
            { id: 'news', label: 'Tin tức', icon: Bell },
            { id: 'faq', label: 'Câu hỏi', icon: HelpCircle },
            { id: 'guide', label: 'Hướng dẫn', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="p-6">
            <div className="space-y-4">
              {news.map(item => (
                <div key={item.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.urgent 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {item.category}
                        </span>
                        {item.urgent && (
                          <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                            Khẩn cấp
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-3">{item.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                          <ExternalLink className="w-4 h-4" />
                          <span>Xem chi tiết</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="p-6">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guide Tab */}
        {activeTab === 'guide' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.map((guide, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center space-x-2 mb-3">
                    {guide.type === 'video' && <Play className="w-5 h-5 text-blue-600" />}
                    {guide.type === 'article' && <FileText className="w-5 h-5 text-green-600" />}
                    {guide.type === 'guide' && <HelpCircle className="w-5 h-5 text-purple-600" />}
                    <span className="text-sm text-slate-500">
                      {guide.type === 'video' ? guide.duration : guide.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{guide.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{guide.description}</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Xem hướng dẫn →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;