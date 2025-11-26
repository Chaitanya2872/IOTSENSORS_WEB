# IoT Sensors Dashboard - BMS Enablement

A comprehensive React TypeScript dashboard for monitoring IoT sensors across multiple categories: Cafeteria People Counting, Indoor Air Quality (IAQ), Smart Restrooms, and Energy Monitoring.

## 📋 Features

### 1. Cafeteria Screen
- Real-time queue monitoring for multiple food counters
- Average wait time calculation
- Peak hours and traffic day analytics
- Customer flow pattern visualization
- Color-coded status indicators (Ready/Busy/Crowded)

### 2. Indoor Air Quality (IAQ) Screen
- Monitor 10 IAQ sensors across 5 floors (2 per floor)
- Track CO₂, PM2.5, PM10, TVOC, Temperature, Humidity, Illuminance, Pressure, Ozone
- Floor-wise overview and statistics
- Real-time occupancy detection (PIR sensor)
- Historical trend charts
- Automated alerts for poor air quality zones

### 3. Smart Restroom Screen
- Track 42 washrooms across all floors
- Real-time occupancy status (Occupied/Vacant)
- Odor level monitoring (NH₃, H₂S sensors)
- Usage count and cleaning frequency tracking
- Automated cleaning alerts (>50 usages threshold)
- Battery status monitoring
- Correlation analysis between usage and odor levels

### 4. Energy Monitoring Screen
- Smart meter integration for floor and equipment-level monitoring
- Track Voltage, Current, Power Factor, kWh consumption
- Load profiling and analysis
- Equipment-level breakdown (HVAC, Lighting, Servers, Appliances)
- High consumption zone alerts
- Energy optimization recommendations
- Historical consumption trends

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install required dependencies:

```bash
npm install
```

### Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "chart.js": "^4.4.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### Tailwind CSS Setup

1. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configure `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Add Tailwind directives to your CSS file (e.g., `src/index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📁 File Structure

```
src/
├── components/
│   ├── IoTDashboard.tsx        # Main dashboard with tab navigation
│   ├── CafeteriaScreen.tsx     # Cafeteria monitoring screen
│   ├── IAQScreen.tsx           # Indoor Air Quality screen
│   ├── SmartRestroomScreen.tsx # Smart Restroom screen
│   └── EnergyMonitoringScreen.tsx # Energy monitoring screen
├── types.ts                     # TypeScript type definitions
└── App.tsx                      # Root component
```

## 🎯 Usage

### Import and Use the Dashboard

```tsx
import React from 'react';
import IoTDashboard from './components/IoTDashboard';

function App() {
  return (
    <div className="App">
      <IoTDashboard />
    </div>
  );
}

export default App;
```

## 🔧 Configuration

### Data Flow
1. **Device Layer**: IoT sensors (People Counting, IAQ, Restroom, Energy)
2. **Network Layer**: LoRaWAN communication
3. **Edge Layer**: Data normalization and MQTT broker
4. **Cloud Layer**: Data ingestion, analytics, and storage
5. **Application Layer**: Dashboard visualization, alerts, reports

### API Integration Points
- Sensor data ingestion endpoints
- Real-time WebSocket connections for live updates
- Historical data retrieval APIs
- Alert management system

## 📊 Dashboard Features

### Real-time Monitoring
- Live data updates every 5 seconds (simulated)
- Color-coded status indicators
- Interactive charts and visualizations

### Analytics
- Historical trend analysis
- Floor-wise comparisons
- Equipment-level breakdowns
- Peak usage patterns

### Alerts & Notifications
- Threshold-based alerts
- Color-coded warning levels
- Automated cleaning schedules
- Energy optimization recommendations

## 🎨 UI Components

### Status Colors
- **Green**: Excellent/Normal/Ready
- **Blue**: Good
- **Yellow**: Moderate/Needs Attention
- **Orange**: Warning/Busy
- **Red**: Critical/Cleaning Required/Crowded

### Charts
- Line charts for trends
- Bar charts for comparisons
- Doughnut/Pie charts for distributions
- Multi-axis charts for correlations

## 🔐 Security Considerations

- Implement proper authentication
- Use HTTPS for all API communications
- Sanitize all sensor data inputs
- Implement rate limiting
- Use environment variables for sensitive configuration

## 📈 Performance Optimization

- Lazy loading for chart components
- Debounced real-time updates
- Memoized calculations
- Virtual scrolling for large datasets

## 🚦 Enhancements Implemented

1. **Unified Dashboard**: Single interface for all sensor categories
2. **Floor-level Navigation**: Easy floor selection for IAQ and restrooms
3. **Real-time Updates**: Live data simulation with status changes
4. **Visual Indicators**: Color gradients and badges for quick status recognition
5. **Detailed Metrics**: Comprehensive sensor data display
6. **Historical Charts**: Trend analysis with Chart.js
7. **Alert System**: Automated alerts based on thresholds
8. **Equipment Breakdown**: Detailed energy consumption by equipment type
9. **Correlation Analysis**: Usage vs. environmental parameters
10. **Responsive Design**: Mobile-friendly Tailwind CSS layout

## 📝 Notes

- All data shown is simulated for demonstration purposes
- Replace mock data with actual API calls in production
- Configure thresholds based on actual building requirements
- Customize alert mechanisms based on facility management needs

## 🤝 Integration with IOTIQ Edge Platform

This dashboard is designed to integrate with the IOTIQ Edge platform through:
- RESTful API endpoints
- MQTT broker for real-time data
- WebSocket connections for live updates
- Export capabilities for facility management platforms

## 📞 Support

For technical support or questions about implementation, please refer to the BMS enablement documentation or contact the IOTIQ Edge support team.

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Platform**: IOTIQ Edge for BMS Client
