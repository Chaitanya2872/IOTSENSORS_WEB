import React from 'react';
import { Line } from 'react-chartjs-2';

const OverviewScreen: React.FC = () => {
  // Summary data from all modules
  const summaryStats = {
    cafeteria: {
      totalQueue: 4,
      avgWait: 5.3,
      countersReady: 2,
      countersTotal: 3,
      servedToday: 847
    },
    iaq: {
      avgTemp: 22.1,
      avgCO2: 856,
      alertZones: 2,
      totalSensors: 10
    },
    restrooms: {
      total: 6,
      available: 4,
      occupied: 2,
      needsCleaning: 2
    },
    energy: {
      totalConsumption: 2098,
      activePower: 59.25,
      avgPowerFactor: 0.90,
      alerts: 1
    }
  };

  const buildingHealthData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'Building Health Score',
        data: [92, 90, 88, 85, 87, 89, 91],
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
        beginAtZero: false,
        min: 80,
        max: 100,
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
        <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time building management system status</p>
      </div>

      {/* Building Health Score */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Building Health Score</h3>
            <p className="text-xs text-gray-500 mt-1">Overall system performance</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600">89%</div>
            <p className="text-xs text-green-600 mt-1">↑ 2% from yesterday</p>
          </div>
        </div>
        <div style={{ height: '120px' }}>
          <Line data={buildingHealthData} options={chartOptions} />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Cafeteria */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Cafeteria</h4>
              <p className="text-sm text-gray-900 font-semibold">{summaryStats.cafeteria.countersReady}/{summaryStats.cafeteria.countersTotal} Ready</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Queue</span>
            <span className="font-medium text-gray-900">{summaryStats.cafeteria.totalQueue} people</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-500">Served</span>
            <span className="font-medium text-gray-900">{summaryStats.cafeteria.servedToday} today</span>
          </div>
        </div>

        {/* Air Quality */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Air Quality</h4>
              <p className="text-sm text-gray-900 font-semibold">{summaryStats.iaq.avgTemp}°C Avg</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">CO₂ Level</span>
            <span className="font-medium text-gray-900">{summaryStats.iaq.avgCO2} ppm</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-500">Alerts</span>
            <span className="font-medium text-yellow-600">{summaryStats.iaq.alertZones} zones</span>
          </div>
        </div>

        {/* Restrooms */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Restrooms</h4>
              <p className="text-sm text-gray-900 font-semibold">{summaryStats.restrooms.available}/{summaryStats.restrooms.total} Available</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Occupied</span>
            <span className="font-medium text-gray-900">{summaryStats.restrooms.occupied}</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-500">Need Cleaning</span>
            <span className="font-medium text-red-600">{summaryStats.restrooms.needsCleaning}</span>
          </div>
        </div>

        {/* Energy */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-medium text-gray-500">Energy</h4>
              <p className="text-sm text-gray-900 font-semibold">{summaryStats.energy.totalConsumption} kWh</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Active Power</span>
            <span className="font-medium text-gray-900">{summaryStats.energy.activePower} kW</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-500">Power Factor</span>
            <span className="font-medium text-green-600">{summaryStats.energy.avgPowerFactor}</span>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">Active Alerts</h3>
          <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs font-medium">
            3 Active
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">High CO₂ in Floor 4 - Zone A</p>
              <p className="text-xs text-gray-600 mt-1">CO₂ level: 1432 ppm (Threshold: 1200 ppm)</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Restroom CL32 Requires Cleaning</p>
              <p className="text-xs text-gray-600 mt-1">Usage: 52 times, Last cleaned: 11:20</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">High Energy Consumption - Floor 4</p>
              <p className="text-xs text-gray-600 mt-1">Current: 68.3 A, Power Factor: 0.85</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Sensors</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">29</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">All systems operational</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Uptime</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">99.8%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">Last 30 days average</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Data Points</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">2.4M</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-2">Collected today</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewScreen;