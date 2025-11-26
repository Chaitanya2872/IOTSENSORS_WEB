import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
  humidity: number;
  temperature: number;
  nh3: number;
  h2s: number;
  battery: number;
  cleaningRequired: boolean;
  status: 'excellent' | 'good' | 'needs-attention' | 'cleaning-required';
}

const SmartRestroomScreen: React.FC = () => {
  const [restrooms, setRestrooms] = useState<RestroomData[]>([
    {
      id: 'SL27',
      location: 'South Wing',
      floor: 2,
      gender: 'male',
      occupied: false,
      usageCount: 23,
      lastCleaned: '14:30',
      odorLevel: 2.1,
      humidity: 44,
      temperature: 24.1,
      nh3: 0.06,
      h2s: 0.009,
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
      humidity: 52,
      temperature: 23.8,
      nh3: 0.12,
      h2s: 0.015,
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
      humidity: 68,
      temperature: 25.2,
      nh3: 0.24,
      h2s: 0.032,
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
      humidity: 41,
      temperature: 23.5,
      nh3: 0.04,
      h2s: 0.006,
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
      humidity: 48,
      temperature: 24.0,
      nh3: 0.09,
      h2s: 0.011,
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
      humidity: 58,
      temperature: 24.8,
      nh3: 0.18,
      h2s: 0.025,
      battery: 58,
      cleaningRequired: true,
      status: 'cleaning-required'
    }
  ]);

  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredRestrooms = selectedFloor === 'all' 
    ? restrooms 
    : restrooms.filter(r => r.floor === selectedFloor);

  const getStatusBadge = (status: string) => {
    const colors = {
      'excellent': 'bg-green-50 text-green-700 border-green-200',
      'good': 'bg-blue-50 text-blue-700 border-blue-200',
      'needs-attention': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'cleaning-required': 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.good;
  };

  const getStatusText = (status: string) => {
    const texts = {
      'excellent': 'Excellent',
      'good': 'Good',
      'needs-attention': 'Needs Attention',
      'cleaning-required': 'Cleaning Required'
    };
    return texts[status as keyof typeof texts] || 'Unknown';
  };

  const stats = {
    total: restrooms.length,
    occupied: restrooms.filter(r => r.occupied).length,
    available: restrooms.filter(r => !r.occupied).length,
    needsCleaning: restrooms.filter(r => r.cleaningRequired).length,
    totalUsage: restrooms.reduce((sum, r) => sum + r.usageCount, 0),
    avgOdorLevel: (restrooms.reduce((sum, r) => sum + r.odorLevel, 0) / restrooms.length).toFixed(1)
  };

  const usageChartData = {
    labels: restrooms.map(r => r.id),
    datasets: [
      {
        label: 'Usage Count',
        data: restrooms.map(r => r.usageCount),
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        borderColor: 'rgb(17, 24, 39)',
        borderWidth: 1
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
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Smart Restrooms</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time occupancy and maintenance monitoring</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Usage</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.totalUsage}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Avg Odor</p>
          <p className="text-2xl font-semibold text-gray-900">{stats.avgOdorLevel}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedFloor('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedFloor === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              All Floors
            </button>
            {[1, 2, 3, 4, 5].map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedFloor === floor
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Floor {floor}
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestrooms.map((restroom) => (
            <div key={restroom.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium text-gray-900">{restroom.id}</h3>
                  <p className="text-xs text-gray-500 mt-1">{restroom.location} - Floor {restroom.floor}</p>
                </div>
                {restroom.occupied ? (
                  <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-medium">
                    OCCUPIED
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-xs font-medium">
                    AVAILABLE
                  </span>
                )}
              </div>

              <div className="mb-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusBadge(restroom.status)}`}>
                  {getStatusText(restroom.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Usage</p>
                  <p className="text-lg font-semibold text-gray-900">{restroom.usageCount}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Last Cleaned</p>
                  <p className="text-lg font-semibold text-gray-900">{restroom.lastCleaned}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Odor Level</span>
                  <span className="text-sm font-medium text-gray-900">{restroom.odorLevel}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Humidity</span>
                  <span className="text-sm font-medium text-gray-900">{restroom.humidity}%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Temperature</span>
                  <span className="text-sm font-medium text-gray-900">{restroom.temperature}°C</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-600">Battery</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        restroom.battery > 60 ? 'bg-green-500' :
                        restroom.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${restroom.battery}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-900">{restroom.battery}%</span>
                </div>
              </div>

              {restroom.cleaningRequired && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs font-medium text-red-700">Cleaning Required</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Odor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Cleaned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRestrooms.map((restroom) => (
                <tr key={restroom.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{restroom.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{restroom.location} - Floor {restroom.floor}</td>
                  <td className="px-6 py-4">
                    {restroom.occupied ? (
                      <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-medium">
                        OCCUPIED
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium">
                        AVAILABLE
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{restroom.usageCount}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{restroom.odorLevel}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{restroom.lastCleaned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Usage Statistics</h3>
        <div style={{ height: '280px' }}>
          <Bar data={usageChartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Cleaning Alerts</h3>
        <div className="space-y-3">
          {restrooms.filter(r => r.cleaningRequired).map((restroom) => (
            <div key={restroom.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{restroom.id} - {restroom.location}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Usage: {restroom.usageCount} | Odor: {restroom.odorLevel} | Last cleaned: {restroom.lastCleaned}
                </p>
              </div>
              <button className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                Dispatch
              </button>
            </div>
          ))}
          {restrooms.filter(r => r.cleaningRequired).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No cleaning alerts. All restrooms are well-maintained.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartRestroomScreen;