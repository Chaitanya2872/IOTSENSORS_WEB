# 🚀 Quick Start Guide - IoT Sensors Dashboard

This guide will help you get the IoT Sensors Dashboard up and running in minutes.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)

## 🛠️ Installation Steps

### 1. Set Up Your Project Structure

Create your project directory and navigate to it:

```bash
mkdir iot-sensors-dashboard
cd iot-sensors-dashboard
```

### 2. Copy All Provided Files

Place all the provided `.tsx`, `.ts`, `.json`, and configuration files in the following structure:

```
iot-sensors-dashboard/
├── src/
│   ├── components/
│   │   ├── IoTDashboard.tsx
│   │   ├── CafeteriaScreen.tsx
│   │   ├── IAQScreen.tsx
│   │   ├── SmartRestroomScreen.tsx
│   │   └── EnergyMonitoringScreen.tsx
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js (to be created)
├── postcss.config.js (to be created)
└── README.md
```

### 3. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

This will install:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Chart.js & react-chartjs-2
- All dev dependencies

### 4. Set Up Tailwind CSS

Create `tailwind.config.js`:

```bash
npx tailwindcss init -p
```

Then update the `tailwind.config.js` file:

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

The `postcss.config.js` file should be automatically created. If not, create it:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. Start the Development Server

```bash
npm run dev
```

Your dashboard should now be running at `http://localhost:3000`

## 🎯 Verify Installation

After starting the dev server, you should see:

1. **Dashboard Header**: "IOTIQ Edge Platform" with "IoT & Sensors Monitoring Dashboard"
2. **Four Tabs**: Cafeteria 🍽️ | IAQ Monitoring 🌡️ | Smart Restroom 🚻 | Energy ⚡
3. **Default Screen**: Cafeteria screen with three food counter cards
4. **Live Data**: Numbers should update automatically

## 📱 Testing Each Screen

### Test Cafeteria Screen
1. Click on the "Cafeteria" tab (should be selected by default)
2. Verify you see three food counters: Two Good, Uttar Dakshin, Tandoor Corner
3. Check that queue numbers change every 5 seconds
4. Look for the customer flow chart at the bottom

### Test IAQ Screen
1. Click on the "IAQ Monitoring" tab
2. Select different floors (Floor 1-5 buttons)
3. Verify sensor cards display temperature, humidity, CO₂, PM2.5, etc.
4. Check that the historical trends chart appears at the bottom

### Test Smart Restroom Screen
1. Click on the "Smart Restroom" tab
2. Toggle between "Grid" and "List" view modes
3. Filter by different floors
4. Verify restroom cards show occupancy, usage count, and odor levels
5. Check that cleaning alerts appear for restrooms with high usage

### Test Energy Monitoring Screen
1. Click on the "Energy" tab
2. Switch between "Overview", "Floor Analysis", and "Equipment" views
3. Select different time ranges (Today, Week, Month)
4. Verify energy consumption charts display correctly
5. Check floor selection for equipment breakdown pie chart

## 🐛 Troubleshooting

### Issue: Tailwind styles not applying

**Solution:**
1. Make sure `index.css` includes the Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
2. Verify `tailwind.config.js` has the correct content paths
3. Restart the dev server

### Issue: Charts not displaying

**Solution:**
1. Verify Chart.js is installed: `npm list chart.js`
2. Check browser console for errors
3. Ensure react-chartjs-2 version is compatible with chart.js

### Issue: TypeScript errors

**Solution:**
1. Make sure `tsconfig.json` is properly configured
2. Run `npm install` again to ensure all type definitions are installed
3. Check that all import paths are correct

### Issue: Module not found errors

**Solution:**
1. Verify all files are in the correct directories
2. Check import paths in each component
3. Ensure file extensions are correct (.tsx for components)

### Issue: Port 3000 already in use

**Solution:**
1. Edit `vite.config.ts` and change the port:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Change to any available port
    open: true
  }
})
```

## 🎨 Customization

### Change Color Scheme

Edit the gradient colors in `index.css`:

```css
.bg-gradient-primary {
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

### Adjust Update Intervals

In each screen component, find the `useEffect` with `setInterval` and modify the timeout:

```typescript
const interval = setInterval(() => {
  // Update logic
}, 5000); // Change this value (milliseconds)
```

### Modify Thresholds

Update threshold values in the respective screen components:

```typescript
// Example from IAQScreen.tsx
const thresholds = {
  co2: { good: 800, moderate: 1200 },  // Modify these values
  pm25: { good: 100, moderate: 150 },
  // ...
};
```

## 📦 Building for Production

When ready to deploy:

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔗 Next Steps

1. **Connect Real APIs**: Replace mock data with actual API calls
2. **Add Authentication**: Implement user login and authorization
3. **Set Up Real-time Updates**: Use WebSocket or Server-Sent Events
4. **Configure Alerts**: Set up email/SMS notifications
5. **Deploy**: Deploy to your hosting provider (Vercel, Netlify, etc.)

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console for errors (F12)
2. Review the README.md for detailed documentation
3. Read through ENHANCEMENTS.md for feature details
4. Verify all dependencies are installed correctly
5. Ensure Node.js version is v16 or higher

## ✅ Success Checklist

- [ ] All dependencies installed successfully
- [ ] Dev server starts without errors
- [ ] All four screens are accessible via tabs
- [ ] Charts are rendering correctly
- [ ] Data updates are visible (simulated)
- [ ] No console errors in browser
- [ ] Responsive design works on mobile view
- [ ] All interactive elements function properly

Congratulations! Your IoT Sensors Dashboard is now ready for development! 🎉
