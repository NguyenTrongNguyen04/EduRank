import React from 'react';
import { Link } from 'react-router-dom';
import { countdownEvents } from '../data/countdownEvents';
import CountdownTimer from '../components/CountdownTimer';
import { motion } from 'framer-motion';

const CountdownEventList: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Đếm ngược sự kiện quan trọng</h2>
      <div className="grid gap-8 max-w-2xl mx-auto">
        {countdownEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.6, type: 'spring', stiffness: 80 }}
            whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(80,80,200,0.10)' }}
            className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-xl transition"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-800 mb-1">{event.name}</h3>
              <p className="text-slate-600 mb-2">{event.shortDescription}</p>
              <CountdownTimer end={event.start} animatePulse />
            </div>
            <Link
              to={`/countdown-event/${event.slug}`}
              className="mt-4 md:mt-0 md:ml-8 inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
            >
              Xem chi tiết
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownEventList; 