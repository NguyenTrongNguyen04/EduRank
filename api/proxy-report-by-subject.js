export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://edu-rank.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const url = 'https://vietnamnet.vn/newsapi-edu/EducationStudentScore/ReportBySubject?ComponentId=COMPONENT002297&PageId=95be1729ac2745ba9e873ef1f8f66254&type=2&year=2025';
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
} 