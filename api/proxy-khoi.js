export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://edu-rank.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { khoi, sbd } = req.query;
  const response = await fetch(`https://api.xephangdiemthi.edu.vn/api/v1/khoi/khoi=${khoi}/sbd=${sbd}`);
  const data = await response.json();
  res.status(200).json(data);
} 