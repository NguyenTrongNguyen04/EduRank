import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { countdownEvents } from '../data/countdownEvents';
import CountdownTimer from '../components/CountdownTimer';
import { Clock } from 'lucide-react';

const CountdownEventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = countdownEvents.find(e => e.slug === slug);

  if (!event) {
    return <div className="text-center text-red-500">Không tìm thấy sự kiện.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6 mt-6">
      <Link to="/countdown-event" className="text-blue-500 hover:underline flex items-center mb-2">
        <Clock className="w-5 h-5 mr-2 text-blue-500" />
        Quay lại danh sách sự kiện
      </Link>
      <div className="flex items-center space-x-3 mb-2">
        <Clock className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-extrabold text-blue-800">{event.name}</h2>
      </div>
      <CountdownTimer end={event.start} />
      <div className="prose max-w-none text-slate-800 whitespace-pre-line">{event.content}</div>
    </div>
  );
};

export default CountdownEventDetail; 