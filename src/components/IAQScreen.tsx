import React, { useState } from 'react';
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

interface IAQSensor {
  floor: number;
  location: string;
  temperature: number;
  humidity: number;
  co2: number;
  pm25: number;
  pm10: number;
  tvoc: number;
  illuminance: number;
  pressure: number;
  ozone: number;
  occupied: boolean;
  quality: 'excellent' | 'good' | 'moderate' | 'poor' | 'unhealthy';
  lastUpdate: string;
}

const IAQScreen: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [sensors] = useState<IAQSensor[]>([
    {
      floor: 1,
      location: 'Zone A',
      temperature: 21.4,
      humidity: 50.5,
      co2: 711,
      pm25: 101,
      pm10: 108,
      tvoc: 245,
      illuminance: 320,
      pressure: 1013.2,
      ozone: 0.02,
      occupied: true,
      quality: 'good',
      lastUpdate: '15:05:10'
    },
    {
      floor: 1,
      location: 'Zone B',
      temperature: 22.1,
      humidity: 48.2,
      co2: 845,
      pm25: 78,
      pm10: 85,
      tvoc: 198,
      illuminance: 405,
      pressure: 1013.5,
      ozone: 0.01,
      occupied: true,
      quality: 'good',
      lastUpdate: '15:05:08'
    },
    {
      floor: 2,
      location: 'Zone A',
      temperature: 23.5,
      humidity: 55.8,
      co2: 1205,
      pm25: 145,
      pm10: 156,
      tvoc: 412,
      illuminance: 280,
      pressure: 1012.8,
      ozone: 0.03,
      occupied: true,
      quality: 'moderate',
      lastUpdate: '15:05:12'
    },
    {
      floor: 2,
      location: 'Zone B',
      temperature: 21.8,
      humidity: 52.1,
      co2: 698,
      pm25: 65,
      pm10: 72,
      tvoc: 156,
      illuminance: 450,
      pressure: 1013.1,
      ozone: 0.015,
      occupied: false,
      quality: 'excellent',
      lastUpdate: '15:05:11'
    },
    {
      floor: 3,
      location: 'Zone A',
      temperature: 22.3,
      humidity: 49.5,
      co2: 789,
      pm25: 88,
      pm10: 95,
      tvoc: 223,
      illuminance: 365,
      pressure: 1013.0,
      ozone: 0.02,
      occupied: true,
      quality: 'good',
      lastUpdate: '15:05:09'
    },
    {
      floor: 3,
      location: 'Zone B',
      temperature: 20.9,
      humidity: 51.2,
      co2: 654,
      pm25: 72,
      pm10: 79,
      tvoc: 189,
      illuminance: 390,
      pressure: 1013.3,
      ozone: 0.018,
      occupied: false,
      quality: 'excellent',
      lastUpdate: '15:05:07'
    },
    {
      floor: 4,
      location: 'Zone A',
      temperature: 24.2,
      humidity: 58.3,
      co2: 1432,
      pm25: 178,
      pm10: 189,
      tvoc: 498,
      illuminance: 245,
      pressure: 1012.5,
      ozone: 0.04,
      occupied: true,
      quality: 'poor',
      lastUpdate: '15:05:13'
    },
    {
      floor: 4,
      location: 'Zone B',
      temperature: 22.7,
      humidity: 53.6,
      co2: 923,
      pm25: 112,
      pm10: 121,
      tvoc: 312,
      illuminance: 335,
      pressure: 1012.9,
      ozone: 0.025,
      occupied: true,
      quality: 'moderate',
      lastUpdate: '15:05:14'
    },
    {
      floor: 5,
      location: 'Zone A',
      temperature: 21.6,
      humidity: 49.8,
      co2: 723,
      pm25: 81,
      pm10: 88,
      tvoc: 201,
      illuminance: 410,
      pressure: 1013.4,
      ozone: 0.019,
      occupied: true,
      quality: 'good',
      lastUpdate: '15:05:06'
    },
    {
      floor: 5,
      location: 'Zone B',
      temperature: 20.5,
      humidity: 47.2,
      co2: 612,
      pm25: 58,
      pm10: 64,
      tvoc: 145,
      illuminance: 425,
      pressure: 1013.6,
      ozone: 0.016,
      occupied: false,
      quality: 'excellent',
      lastUpdate: '15:05:05'
    }
  ]);

  const floorSensors = sensors.filter(s => s.floor === selectedFloor);

  const getQualityBadge = (quality: string) => {
    const colors = {
      excellent: 'bg-green-50 text-green-700 border-green-200',
      good: 'bg-blue-50 text-blue-700 border-blue-200',
      moderate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      poor: 'bg-orange-50 text-orange-700 border-orange-200',
      unhealthy: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[quality as keyof typeof colors] || colors.good;
  };

  const getParameterStatus = (param: string, value: number) => {
    const thresholds: Record<string, { good: number; moderate: number }> = {
      co2: { good: 800, moderate: 1200 },
      pm25: { good: 100, moderate: 150 },
      pm10: { good: 100, moderate: 150 },
      tvoc: { good: 250, moderate: 400 }
    };

    const threshold = thresholds[param];
    if (!threshold) return 'good';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.moderate) return 'moderate';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const floorStats = {
    avgTemp: (floorSensors.reduce((sum, s) => sum + s.temperature, 0) / floorSensors.length).toFixed(1),
    avgHumidity: (floorSensors.reduce((sum, s) => sum + s.humidity, 0) / floorSensors.length).toFixed(1),
    avgCO2: Math.round(floorSensors.reduce((sum, s) => sum + s.co2, 0) / floorSensors.length),
    occupiedZones: floorSensors.filter(s => s.occupied).length
  };

  const chartData = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [
      {
        label: 'CO₂ (ppm)',
        data: [650, 720, 890, 1050, 950, 811],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        yAxisID: 'y',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true
      },
      {
        label: 'PM2.5 (μg/m³)',
        data: [65, 78, 95, 112, 98, 89],
        borderColor: 'rgb(107, 114, 128)',
        backgroundColor: 'rgba(107, 114, 128, 0.05)',
        yAxisID: 'y1',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: { font: { size: 11 }, color: '#6b7280' }
      },
      title: { display: false }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: '#6b7280', font: { size: 11 } }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { color: '#6b7280', font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { size: 11 } }
      }
    }
  };

  // Alerts data
  const alerts = sensors.filter(s => s.quality === 'poor' || s.quality === 'moderate');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header with Download */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Indoor Air Quality</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time environmental monitoring across all floors</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Download Report</span>
          </button>
        </div>

        {/* Floor Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedFloor === floor
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Floor {floor}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Avg Temperature</p>
            <p className="text-2xl font-semibold text-gray-900">{floorStats.avgTemp}°C</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Avg Humidity</p>
            <p className="text-2xl font-semibold text-gray-900">{floorStats.avgHumidity}%</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Avg CO₂</p>
            <p className="text-2xl font-semibold text-gray-900">{floorStats.avgCO2} ppm</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Occupied Zones</p>
            <p className="text-2xl font-semibold text-gray-900">{floorStats.occupiedZones}/{floorSensors.length}</p>
          </div>
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {floorSensors.map((sensor, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium text-gray-900">Floor {sensor.floor} - {sensor.location}</h3>
                  <p className="text-xs text-gray-500 mt-1">Updated {sensor.lastUpdate}</p>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getQualityBadge(sensor.quality)}`}>
                  {sensor.quality.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Temperature</p>
                  <p className="text-lg font-semibold text-gray-900">{sensor.temperature}°C</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Humidity</p>
                  <p className="text-lg font-semibold text-gray-900">{sensor.humidity}%</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">CO₂</span>
                  <span className={`text-sm font-medium ${getStatusColor(getParameterStatus('co2', sensor.co2))}`}>
                    {sensor.co2} ppm
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">PM2.5</span>
                  <span className={`text-sm font-medium ${getStatusColor(getParameterStatus('pm25', sensor.pm25))}`}>
                    {sensor.pm25} μg/m³
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">PM10</span>
                  <span className={`text-sm font-medium ${getStatusColor(getParameterStatus('pm10', sensor.pm10))}`}>
                    {sensor.pm10} μg/m³
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">TVOC</span>
                  <span className={`text-sm font-medium ${getStatusColor(getParameterStatus('tvoc', sensor.tvoc))}`}>
                    {sensor.tvoc} ppb
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Light</p>
                  <p className="text-xs font-medium text-gray-900">{sensor.illuminance} lux</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Pressure</p>
                  <p className="text-xs font-medium text-gray-900">{sensor.pressure} hPa</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Ozone</p>
                  <p className="text-xs font-medium text-gray-900">{sensor.ozone} ppm</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Historical Trends Chart with Live Indicator */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Historical Trends - Floor {selectedFloor}</h3>
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
                <p className="text-xs text-gray-500">All zones operating normally</p>
              </div>
            ) : (
              alerts.map((sensor, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  sensor.quality === 'poor' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="text-sm font-medium text-gray-900">Floor {sensor.floor} - {sensor.location}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {sensor.co2 > 1200 && 'High CO₂ levels detected. '}
                    {sensor.pm25 > 150 && 'PM2.5 exceeds threshold. '}
                    Action recommended.
                  </p>
                  <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">CO₂:</span>
                      <span className="font-medium">{sensor.co2} ppm</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">PM2.5:</span>
                      <span className="font-medium">{sensor.pm25} μg/m³</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-900 mb-3">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Total Sensors</span>
                <span className="font-medium text-gray-900">{sensors.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Alert Zones</span>
                <span className="font-medium text-red-600">{alerts.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Avg Temp</span>
                <span className="font-medium text-gray-900">
                  {(sensors.reduce((sum, s) => sum + s.temperature, 0) / sensors.length).toFixed(1)}°C
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IAQScreen;