export const mockStudentData = [
  {
    id: '1016799',
    name: 'Thí sinh cao điểm nhất',
    school: 'THPT Chuyên Chu Văn An',
    subjects: [
      { name: 'Toán', score: 10 },
      { name: 'Ngữ Văn', score: 9.25 },
      { name: 'Ngoại Ngữ', score: 9.75 },
      { name: 'Vật lí', score: 10 },
      { name: 'Địa lý', score: 0 },
      { name: 'Lịch sử', score: 0 },
      { name: 'GDCD', score: 0 },
    ],
    totalScore: 39.0,
    graduationStatus: 'passed',
  },
  {
    id: '22001002',
    name: 'Trần Thị Bình',
    school: 'THPT Lê Quý Đôn',
    class: '12B2',
    subjects: [
      { name: 'Toán', score: 7.8 },
      { name: 'Văn', score: 8.2 },
      { name: 'Tiếng Anh', score: 7.5 },
      { name: 'Vật lý', score: 7.9 },
      { name: 'Hóa học', score: 8.1 },
      { name: 'Sinh học', score: 7.6 },
    ],
    totalScore: 47.1,
    graduationStatus: 'passed',
  },
  {
    id: '22001003',
    name: 'Lê Văn Cường',
    school: 'THPT Nguyễn Huệ',
    class: '12C1',
    subjects: [
      { name: 'Toán', score: 8.9 },
      { name: 'Văn', score: 7.8 },
      { name: 'Tiếng Anh', score: 8.3 },
      { name: 'Vật lý', score: 8.5 },
      { name: 'Hóa học', score: 8.2 },
      { name: 'Sinh học', score: 8.0 },
    ],
    totalScore: 49.7,
    graduationStatus: 'passed',
  },
];

export const mockRankingData = Array.from({ length: 1000 }, (_, i) => ({
  id: `22${String(i + 1).padStart(6, '0')}`,
  name: `Học sinh ${i + 1}`,
  school: `THPT ${['Chu Văn An', 'Lê Quý Đôn', 'Nguyễn Huệ', 'Trần Phú', 'Lê Hồng Phong'][i % 5]}`,
  totalScore: Math.max(0, 10 - (i * 0.01) + Math.random() * 2 - 1),
  rank: i + 1,
}));