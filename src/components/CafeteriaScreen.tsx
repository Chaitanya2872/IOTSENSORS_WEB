import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CounterData {
  name: string;
  queueLength: number;
  avgWaitTime: number;
  status: 'ready' | 'busy' | 'crowded';
  icon: JSX.Element;
  color: string;
}

const CafeteriaScreen: React.FC = () => {
  const [counters, setCounters] = useState<CounterData[]>([
    { 
      name: 'Two Good', 
      queueLength: 0, 
      avgWaitTime: 0, 
      status: 'ready',
      color: 'from-orange-400 to-red-400',
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z"/>
          <circle cx="12" cy="8" r="1.5"/>
          <circle cx="8" cy="13" r="1"/>
          <circle cx="16" cy="13" r="1"/>
          <path d="M8 15c0 2.21 1.79 4 4 4s4-1.79 4-4H8z"/>
        </svg>
      )
    },
    { 
      name: 'Uttar Dakshin', 
      queueLength: 4, 
      avgWaitTime: 8, 
      status: 'busy',
      color: 'from-amber-400 to-yellow-400',
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 3H6C4.9 3 4 3.9 4 5v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 12H8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"/>
          <path d="M9 8c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm6 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z"/>
        </svg>
      )
    },
    { 
      name: 'Tandoor Corner', 
      queueLength: 0, 
      avgWaitTime: 0, 
      status: 'ready',
      color: 'from-rose-400 to-pink-400',
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.54 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
        </svg>
      )
    }
  ]);

  const [peakHours] = useState({
    today: '12:30 PM - 1:30 PM',
    peakDay: 'Friday',
    totalToday: 847,
    avgWaitTime: 4.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => prev.map(counter => {
        const change = Math.floor(Math.random() * 3) - 1;
        const newQueue = Math.max(0, Math.min(10, counter.queueLength + change));
        let status: 'ready' | 'busy' | 'crowded' = 'ready';
        if (newQueue >= 6) status = 'crowded';
        else if (newQueue >= 3) status = 'busy';
        
        return {
          ...counter,
          queueLength: newQueue,
          avgWaitTime: newQueue * 2,
          status
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-50 border-green-200';
      case 'busy': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'crowded': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'crowded': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'Ready to Serve';
      case 'busy': return 'Moderate Queue';
      case 'crowded': return 'Heavy Traffic';
      default: return 'Unknown';
    }
  };

  const chartData = {
    labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'],
    datasets: [
      {
        label: 'Customer Flow',
        data: [12, 25, 45, 89, 156, 189, 145, 98, 67, 78, 45],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#6b7280', font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { size: 11 } }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Cafeteria Queue Status</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring of food counter queues</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-green-700">All Counters Active</span>
        </div>
      </div>

      {/* Queue Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {counters.map((counter, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-32 bg-gradient-to-br ${counter.color} flex items-center justify-center`}>
              <div className="bg-white bg-opacity-90 rounded-full p-4">
                {counter.icon}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{counter.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`w-2 h-2 rounded-full ${getStatusDot(counter.status)}`}></span>
                    <span className="text-xs text-gray-500 ml-2">Live</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-5xl font-bold text-gray-900 mb-1">
                  {counter.queueLength}
                </div>
                <p className="text-sm text-gray-500">people in queue</p>
              </div>

              <div className={`py-2.5 px-3 rounded-lg text-sm font-medium border ${getStatusColor(counter.status)} text-center`}>
                {getStatusText(counter.status)}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Avg Wait</p>
                  <p className="text-lg font-semibold text-gray-900">{counter.avgWaitTime} min</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <div className="flex items-center mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                    <p className="text-sm font-medium text-gray-900">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Peak Hours</p>
              <p className="text-sm font-semibold text-gray-900">{peakHours.today}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Peak Day</p>
              <p className="text-sm font-semibold text-gray-900">{peakHours.peakDay}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Served Today</p>
              <p className="text-sm font-semibold text-gray-900">{peakHours.totalToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg Wait</p>
              <p className="text-sm font-semibold text-gray-900">{peakHours.avgWaitTime} min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Customer Flow Pattern</h3>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
            <span className="text-xs text-gray-600">Customers</span>
          </div>
        </div>
        <div style={{ height: '280px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Queue</span>
            <span className="text-2xl font-bold text-gray-900">
              {counters.reduce((sum, c) => sum + c.queueLength, 0)}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Counters Ready</span>
            <span className="text-2xl font-bold text-green-600">
              {counters.filter(c => c.status === 'ready').length}/{counters.length}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">System Status</span>
            <span className="text-sm font-semibold text-green-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Optimal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeteriaScreen;