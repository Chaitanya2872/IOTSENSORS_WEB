import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RestroomData {
  id: string;
  location: string;
  floor: number;
  gender: 'male' | 'female' | 'unisex';
  occupied: boolean;
  usageCount: number;
  lastCleaned: string;
  odorLevel: number;
  battery: number;
  cleaningRequired: boolean;
  status: 'excellent' | 'good' | 'needs-attention' | 'cleaning-required';
}

const SmartRestroomScreen: React.FC = () => {
  const [restrooms] = useState<RestroomData[]>([
    {
      id: 'SL27',
      location: 'South Wing',
      floor: 2,
      gender: 'male',
      occupied: false,
      usageCount: 23,
      lastCleaned: '14:30',
      odorLevel: 2.1,
      battery: 66,
      cleaningRequired: false,
      status: 'good'
    },
    {
      id: 'NL15',
      location: 'North Wing',
      floor: 1,
      gender: 'female',
      occupied: true,
      usageCount: 31,
      lastCleaned: '13:45',
      odorLevel: 3.5,
      battery: 78,
      cleaningRequired: false,
      status: 'needs-attention'
    },
    {
      id: 'CL32',
      location: 'Central Area',
      floor: 3,
      gender: 'unisex',
      occupied: false,
      usageCount: 52,
      lastCleaned: '11:20',
      odorLevel: 5.8,
      battery: 45,
      cleaningRequired: true,
      status: 'cleaning-required'
    },
    {
      id: 'EL18',
      location: 'East Wing',
      floor: 1,
      gender: 'male',
      occupied: false,
      usageCount: 18,
      lastCleaned: '15:00',
      odorLevel: 1.2,
      battery: 82,
      cleaningRequired: false,
      status: 'excellent'
    },
    {
      id: 'WL24',
      location: 'West Wing',
      floor: 2,
      gender: 'female',
      occupied: true,
      usageCount: 28,
      lastCleaned: '14:15',
      odorLevel: 2.8,
      battery: 71,
      cleaningRequired: false,
      status: 'good'
    },
    {
      id: 'SL44',
      location: 'South Wing',
      floor: 4,
      gender: 'male',
      occupied: false,
      usageCount: 45,
      lastCleaned: '12:30',
      odorLevel: 4.2,
      battery: 58,
      cleaningRequired: true,
      status: 'cleaning-required'
    }
  ]);

  const [recentActivities] = useState([
    { time: '15:05', action: 'SL27 - Sensor reading normal', type: 'info' },
    { time: '14:50', action: 'NL15 - Occupied status changed', type: 'info' },
    { time: '14:30', action: 'SL27 cleaned by Staff A', type: 'success' },
    { time: '14:15', action: 'WL24 cleaned by Staff B', type: 'success' },
    { time: '13:45', action: 'NL15 cleaned by Staff C', type: 'success' },
    { time: '13:20', action: 'CL32 - High odor detected', type: 'warning' },
    { time: '12:55', action: 'SL44 - Cleaning required alert', type: 'warning' },
    { time: '12:30', action: 'SL44 cleaned by Staff D', type: 'success' }
  ]);

  const usageChartData = {
    labels: restrooms.map(r => r.id),
    datasets: [
      {
        label: 'Usage Count',
        data: restrooms.map(r => r.usageCount),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      }
    ]
  };

  const usageTrendData = {
    labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM'],
    datasets: [
      {
        label: 'Total Usage',
        data: [15, 28, 45, 38, 32],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
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

  const getStatusBadge = (status: string) => {
    const colors = {
      'excellent': 'bg-green-50 text-green-700 border-green-200',
      'good': 'bg-blue-50 text-blue-700 border-blue-200',
      'needs-attention': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'cleaning-required': 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.good;
  };

  const alerts = restrooms.filter(r => r.cleaningRequired || r.status === 'needs-attention');

  const stats = {
    total: restrooms.length,
    available: restrooms.filter(r => !r.occupied).length,
    occupied: restrooms.filter(r => r.occupied).length,
    needsCleaning: restrooms.filter(r => r.cleaningRequired).length
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header with Download */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Smart Restrooms</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time occupancy and maintenance monitoring</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Download Report</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Available</p>
            <p className="text-2xl font-semibold text-green-600">{stats.available}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Occupied</p>
            <p className="text-2xl font-semibold text-orange-600">{stats.occupied}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Need Cleaning</p>
            <p className="text-2xl font-semibold text-red-600">{stats.needsCleaning}</p>
          </div>
        </div>

        {/* Restroom Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restrooms.map((restroom) => (
            <div key={restroom.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{restroom.id}</h3>
                  <p className="text-xs text-gray-500">{restroom.location} - Floor {restroom.floor}</p>
                </div>
                {restroom.occupied ? (
                  <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-medium">
                    OCCUPIED
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium">
                    AVAILABLE
                  </span>
                )}
              </div>

              <div className={`mb-2 px-2 py-1 rounded text-xs font-medium border inline-block ${getStatusBadge(restroom.status)}`}>
                {restroom.status.replace('-', ' ').toUpperCase()}
              </div>

              <div className="space-y-2 mt-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Usage</span>
                  <span className="font-medium text-gray-900">{restroom.usageCount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Odor Level</span>
                  <span className="font-medium text-gray-900">{restroom.odorLevel}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Last Cleaned</span>
                  <span className="font-medium text-gray-900">{restroom.lastCleaned}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Battery</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          restroom.battery > 60 ? 'bg-green-500' :
                          restroom.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${restroom.battery}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900">{restroom.battery}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Trend Chart with Live Indicator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Usage Trends</h3>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-green-700">Live Data</span>
            </div>
          </div>
          <div style={{ height: '240px' }}>
            <Line data={usageTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Usage Statistics Bar Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Usage Statistics</h3>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-green-700">Live Data</span>
            </div>
          </div>
          <div style={{ height: '240px' }}>
            <Bar data={usageChartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-500 w-12 flex-shrink-0">{activity.time}</span>
                <div className="flex items-center space-x-2 flex-1">
                  {activity.type === 'success' && (
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {activity.type === 'warning' && (
                    <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  {activity.type === 'info' && (
                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="text-sm text-gray-700">{activity.action}</span>
                </div>
              </div>
            ))}
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
                <p className="text-xs text-gray-500">All restrooms operating normally</p>
              </div>
            ) : (
              alerts.map((restroom, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${
                  restroom.cleaningRequired ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-sm font-medium text-gray-900">{restroom.id} - {restroom.location}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {restroom.cleaningRequired ? 'Cleaning required' : 'Needs attention'}
                  </p>
                  <p className="text-xs text-gray-600">Usage: {restroom.usageCount}</p>
                  <p className="text-xs text-gray-600">Odor: {restroom.odorLevel}</p>
                </div>
              ))
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-900 mb-3">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Total Usage</span>
                <span className="font-medium text-gray-900">{restrooms.reduce((sum, r) => sum + r.usageCount, 0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Avg Odor Level</span>
                <span className="font-medium text-gray-900">{(restrooms.reduce((sum, r) => sum + r.odorLevel, 0) / restrooms.length).toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRestroomScreen;