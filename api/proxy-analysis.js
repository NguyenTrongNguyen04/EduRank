export default async function handler(req, res) {
  // Cấu hình CORS cho domain Vercel của bạn
  res.setHeader('Access-Control-Allow-Origin', 'https://edu-rank.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Xử lý preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Gọi API ngoài (thay URL bên dưới bằng API thật của bạn)
  const response = await fetch('https://api-ngoai.com/analysis');
  const data = await response.json();

  res.status(200).json(data);
} 