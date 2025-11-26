import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

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
  const [sensors, setSensors] = useState<IAQSensor[]>([
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
        borderColor: 'rgb(17, 24, 39)',
        backgroundColor: 'rgba(17, 24, 39, 0.05)',
        yAxisID: 'y',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Indoor Air Quality</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time environmental monitoring across all floors</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2">
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
      </div>

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

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Historical Trends - Floor {selectedFloor}</h3>
        <div style={{ height: '280px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Active Alerts</h3>
        <div className="space-y-3">
          {sensors
            .filter(s => s.quality === 'poor' || s.quality === 'moderate')
            .map((sensor, index) => (
              <div key={index} className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Floor {sensor.floor} - {sensor.location}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {sensor.co2 > 1200 && 'High CO₂ levels detected. '}
                    {sensor.pm25 > 150 && 'PM2.5 exceeds threshold. '}
                    Action recommended.
                  </p>
                </div>
              </div>
            ))}
          {sensors.filter(s => s.quality === 'poor' || s.quality === 'moderate').length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No active alerts. All zones operating normally.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IAQScreen;