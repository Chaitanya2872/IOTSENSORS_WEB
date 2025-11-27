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
  image: string;
}

const CafeteriaScreen: React.FC = () => {
  const [counters, setCounters] = useState<CounterData[]>([
    { 
      name: 'Two Good', 
      queueLength: 0, 
      avgWaitTime: 0, 
      status: 'ready',
      color: 'from-orange-400 to-red-400',
      image: 'https://i.postimg.cc/QdWXyT0L/TWO-GOOD.png',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z"/>
        </svg>
      )
    },
    { 
      name: 'Uttar Dakshin', 
      queueLength: 4, 
      avgWaitTime: 8, 
      status: 'busy',
      color: 'from-amber-400 to-yellow-400',
      image: 'https://i.postimg.cc/DyRhLznZ/UTTAR-DAKSHIN.png',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 3H6C4.9 3 4 3.9 4 5v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 12H8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"/>
        </svg>
      )
    },
    { 
      name: 'Tandoor Corner', 
      queueLength: 0, 
      avgWaitTime: 0, 
      status: 'ready',
      color: 'from-rose-400 to-pink-400',
      image: 'https://i.postimg.cc/QCy3687Q/TANDOOR.png',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.54 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
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

  // Alerts data
  const alerts = counters
    .filter(c => c.status === 'crowded' || c.status === 'busy')
    .map(c => ({
      counter: c.name,
      queue: c.queueLength,
      wait: c.avgWaitTime,
      severity: c.status === 'crowded' ? 'high' : 'medium'
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content - Left Side */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header with Download */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Cafeteria Queue Status</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time monitoring of food counter queues</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Download Report</span>
          </button>
        </div>

        {/* Compact Counter Cards - Image Right, Count Left */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {counters.map((counter, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                {/* Left Side - Name and Count */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">{counter.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {counter.queueLength}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">people in queue</p>
                  <p className="text-xs text-gray-600">Wait: {counter.avgWaitTime} min</p>
                </div>
                {/* Right Side - Food Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={counter.image} 
                    alt={counter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Status Badge */}
              <div className={`mt-3 py-1.5 px-2 rounded-md text-xs font-medium border ${getStatusColor(counter.status)} text-center`}>
                {counter.status === 'ready' ? 'Ready' : counter.status === 'busy' ? 'Busy' : 'Crowded'}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Peak Hours</p>
            <p className="text-sm font-semibold text-gray-900">{peakHours.today}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Peak Day</p>
            <p className="text-sm font-semibold text-gray-900">{peakHours.peakDay}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Served Today</p>
            <p className="text-sm font-semibold text-gray-900">{peakHours.totalToday}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Avg Wait</p>
            <p className="text-sm font-semibold text-gray-900">{peakHours.avgWaitTime} min</p>
          </div>
        </div>

        {/* Traffic Chart with Live Indicator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Customer Flow Pattern</h3>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-green-700">Live Data</span>
            </div>
          </div>
          <div style={{ height: '280px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Right Side - Alerts Panel */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Active Alerts</h3>
            <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-medium">
              {alerts.length}
            </span>
          </div>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-gray-500">All counters operating normally</p>
              </div>
            ) : (
              alerts.map((alert, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-sm font-medium text-gray-900">{alert.counter}</p>
                  <p className="text-xs text-gray-600 mt-1">Queue: {alert.queue} people</p>
                  <p className="text-xs text-gray-600">Wait: {alert.wait} min</p>
                </div>
              ))
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-900 mb-3">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Total Queue</span>
                <span className="font-medium text-gray-900">{counters.reduce((sum, c) => sum + c.queueLength, 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Ready Counters</span>
                <span className="font-medium text-green-600">{counters.filter(c => c.status === 'ready').length}/{counters.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeteriaScreen;