import React, { useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface EnergyMeter {
  id: string;
  location: string;
  floor: number;
  voltage: number;
  current: number;
  powerFactor: number;
  kwh: number;
  power: number;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
}

interface FloorEnergy {
  floor: number;
  consumption: number;
  equipment: {
    hvac: number;
    lighting: number;
    servers: number;
    appliances: number;
  };
}

const EnergyMonitoringScreen: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const [meters] = useState<EnergyMeter[]>([
    { id: 'EM-F1-001', location: 'Main Panel', floor: 1, voltage: 230.5, current: 45.2, powerFactor: 0.92, kwh: 342.5, power: 10.42, status: 'normal', timestamp: '15:05:00' },
    { id: 'EM-F2-001', location: 'Main Panel', floor: 2, voltage: 231.2, current: 52.8, powerFactor: 0.89, kwh: 456.8, power: 12.21, status: 'normal', timestamp: '15:05:02' },
    { id: 'EM-F3-001', location: 'Main Panel', floor: 3, voltage: 229.8, current: 48.5, powerFactor: 0.91, kwh: 398.2, power: 11.15, status: 'normal', timestamp: '15:05:01' },
    { id: 'EM-F4-001', location: 'Main Panel', floor: 4, voltage: 232.1, current: 68.3, powerFactor: 0.85, kwh: 612.4, power: 15.85, status: 'warning', timestamp: '15:05:03' },
    { id: 'EM-F5-001', location: 'Main Panel', floor: 5, voltage: 230.8, current: 41.7, powerFactor: 0.93, kwh: 287.9, power: 9.62, status: 'normal', timestamp: '15:04:59' }
  ]);

  const [floorEnergy] = useState<FloorEnergy[]>([
    { floor: 1, consumption: 342.5, equipment: { hvac: 145.2, lighting: 78.5, servers: 89.3, appliances: 29.5 } },
    { floor: 2, consumption: 456.8, equipment: { hvac: 198.4, lighting: 92.1, servers: 125.6, appliances: 40.7 } },
    { floor: 3, consumption: 398.2, equipment: { hvac: 168.5, lighting: 85.3, servers: 105.8, appliances: 38.6 } },
    { floor: 4, consumption: 612.4, equipment: { hvac: 265.8, lighting: 115.2, servers: 178.9, appliances: 52.5 } },
    { floor: 5, consumption: 287.9, equipment: { hvac: 122.3, lighting: 68.4, servers: 71.2, appliances: 26.0 } }
  ]);

  const totalConsumption = meters.reduce((sum, m) => sum + m.kwh, 0);
  const avgPowerFactor = meters.reduce((sum, m) => sum + m.powerFactor, 0) / meters.length;
  const activePower = meters.reduce((sum, m) => sum + m.power, 0);
  const highConsumptionZones = meters.filter(m => m.status === 'warning' || m.status === 'critical').length;

  const getStatusBadge = (status: string) => {
    const colors = {
      normal: 'bg-green-50 text-green-700 border-green-200',
      warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      critical: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.normal;
  };

  const consumptionTrendData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'Power (kW)',
        data: [35, 28, 42, 58, 65, 52, 38],
        borderColor: 'rgb(17, 24, 39)',
        backgroundColor: 'rgba(17, 24, 39, 0.05)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };

  const floorConsumptionData = {
    labels: floorEnergy.map(f => `Floor ${f.floor}`),
    datasets: [
      {
        label: 'Energy (kWh)',
        data: floorEnergy.map(f => f.consumption),
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        borderColor: 'rgb(17, 24, 39)',
        borderWidth: 1
      }
    ]
  };

  const selectedFloorData = floorEnergy.find(f => f.floor === selectedFloor);
  const equipmentBreakdownData = {
    labels: ['HVAC', 'Lighting', 'Servers', 'Appliances'],
    datasets: [
      {
        data: selectedFloorData ? [
          selectedFloorData.equipment.hvac,
          selectedFloorData.equipment.lighting,
          selectedFloorData.equipment.servers,
          selectedFloorData.equipment.appliances
        ] : [],
        backgroundColor: [
          'rgba(17, 24, 39, 0.9)',
          'rgba(75, 85, 99, 0.8)',
          'rgba(107, 114, 128, 0.7)',
          'rgba(156, 163, 175, 0.6)'
        ],
        borderWidth: 0
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { font: { size: 11 }, color: '#6b7280' }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Energy Monitoring</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time power consumption and efficiency analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Consumption</p>
          <p className="text-2xl font-semibold text-gray-900">{totalConsumption.toFixed(1)} kWh</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Avg Power Factor</p>
          <p className="text-2xl font-semibold text-gray-900">{avgPowerFactor.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Active Power</p>
          <p className="text-2xl font-semibold text-gray-900">{activePower.toFixed(1)} kW</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">High Usage Zones</p>
          <p className="text-2xl font-semibold text-orange-600">{highConsumptionZones}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as 'today' | 'week' | 'month')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                timeRange === range
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Power Consumption Trend</h3>
        <div style={{ height: '280px' }}>
          <Line data={consumptionTrendData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Floor-wise Consumption</h3>
        <div style={{ height: '280px' }}>
          <Bar data={floorConsumptionData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {meters.map((meter) => (
          <div key={meter.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-medium text-gray-900">{meter.id}</h3>
                <p className="text-xs text-gray-500 mt-1">Floor {meter.floor} - {meter.location}</p>
                <p className="text-xs text-gray-400 mt-0.5">Updated {meter.timestamp}</p>
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusBadge(meter.status)}`}>
                {meter.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Voltage</p>
                <p className="text-lg font-semibold text-gray-900">{meter.voltage} V</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Current</p>
                <p className="text-lg font-semibold text-gray-900">{meter.current} A</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Power Factor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        meter.powerFactor >= 0.9 ? 'bg-green-500' :
                        meter.powerFactor >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${meter.powerFactor * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{meter.powerFactor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Consumption</span>
                <span className="text-base font-semibold text-gray-900">{meter.kwh} kWh</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Active Power</span>
                <span className="text-base font-semibold text-gray-900">{meter.power} kW</span>
              </div>
            </div>

            {meter.status === 'warning' && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs font-medium text-yellow-700">High consumption detected</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Equipment Breakdown</h3>
          <div className="mb-4 flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedFloor === floor
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Floor {floor}
              </button>
            ))}
          </div>
          <div style={{ height: '280px' }}>
            <Doughnut data={equipmentBreakdownData} options={doughnutOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Floor {selectedFloor} Details</h3>
          {selectedFloorData && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">HVAC Systems</p>
                  <p className="text-xs text-gray-500 mt-0.5">Heating, Ventilation & AC</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{selectedFloorData.equipment.hvac}</p>
                  <p className="text-xs text-gray-500">kWh</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Lighting</p>
                  <p className="text-xs text-gray-500 mt-0.5">All floor lighting</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{selectedFloorData.equipment.lighting}</p>
                  <p className="text-xs text-gray-500">kWh</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Servers & IT</p>
                  <p className="text-xs text-gray-500 mt-0.5">Computing equipment</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{selectedFloorData.equipment.servers}</p>
                  <p className="text-xs text-gray-500">kWh</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Appliances</p>
                  <p className="text-xs text-gray-500 mt-0.5">Other equipment</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{selectedFloorData.equipment.appliances}</p>
                  <p className="text-xs text-gray-500">kWh</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Total Floor Consumption</p>
                  <p className="text-2xl font-semibold">{selectedFloorData.consumption} kWh</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Optimization Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-1">Improve Power Factor</p>
            <p className="text-xs text-blue-700">Floor 4 has a power factor of 0.85. Consider capacitor banks.</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900 mb-1">Optimize HVAC Schedule</p>
            <p className="text-xs text-green-700">HVAC consumes 42%. Adjust based on occupancy patterns.</p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-900 mb-1">LED Upgrade</p>
            <p className="text-xs text-yellow-700">Lighting is 18%. LED upgrade could reduce by 40%.</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-1">Server Optimization</p>
            <p className="text-xs text-purple-700">Server loads are 30% higher. Consider virtualization.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitoringScreen;