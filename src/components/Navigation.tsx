import React from 'react';
import { Search, TrendingUp, BarChart3, Bell, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { id: 'search', label: 'Tra cứu', icon: Search, path: '/' },
    { id: 'analytics', label: 'Phân tích', icon: BarChart3, path: '/analysis' },
    { id: 'news', label: 'Tin tức', icon: Bell, path: '/news' },
    { id: 'countdown', label: 'Đếm ngược sự kiện', icon: Clock, path: '/countdown-event' },
  ];

  return (
    <motion.nav
      className="bg-white border-b border-slate-200"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-0">
        <div className="flex justify-center space-x-8">
          {navItems.map(({ id, label, icon: Icon, path }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`relative flex flex-col md:flex-row items-center md:space-x-2 space-x-0 px-4 py-4 border-b-2 font-medium transition-colors w-full md:w-auto md:justify-center focus:outline-none group ${
                location.pathname === path
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-blue-700 hover:border-blue-300'
              }`}
            >
              <Icon className="w-6 h-6 md:w-5 md:h-5 mb-1 md:mb-0 group-hover:text-blue-600 transition-colors" />
              <span className="text-xs md:text-base md:inline-block md:ml-1 group-hover:text-blue-700 transition-colors">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;