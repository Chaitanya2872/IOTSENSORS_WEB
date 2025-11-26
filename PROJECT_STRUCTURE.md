# 📁 Project Structure - IoT Sensors Dashboard

This document provides an overview of all files in the IoT Sensors Dashboard project and their purposes.

## 📋 Complete File List

### Core Application Files

#### `src/IoTDashboard.tsx`
**Purpose**: Main dashboard component with tab navigation  
**Features**:
- Tab switching between 4 screens
- Header with project branding
- Last updated timestamp
- Responsive tab navigation

#### `src/CafeteriaScreen.tsx`
**Purpose**: Cafeteria people counting and queue monitoring  
**Features**:
- Real-time queue status for 3 food counters
- Average wait time calculations
- Peak hours analytics
- Customer flow visualization
- Status indicators (Ready/Busy/Crowded)

#### `src/IAQScreen.tsx`
**Purpose**: Indoor Air Quality monitoring across 5 floors  
**Features**:
- 10 IAQ sensors (2 per floor)
- Tracks 10 environmental parameters
- Floor-wise filtering
- Air quality index with alerts
- Historical trend charts

#### `src/SmartRestroomScreen.tsx`
**Purpose**: Smart restroom monitoring and maintenance  
**Features**:
- 42 washroom support
- Occupancy tracking
- Odor level monitoring (NH₃, H₂S)
- Usage count and cleaning alerts
- Grid and list view modes
- Battery monitoring

#### `src/EnergyMonitoringScreen.tsx`
**Purpose**: Energy consumption monitoring and optimization  
**Features**:
- Smart meter data from 5 floors
- Voltage, Current, Power Factor tracking
- Equipment-level breakdown (HVAC, Lighting, Servers, Appliances)
- Consumption trends and analytics
- Energy optimization recommendations

#### `src/types.ts`
**Purpose**: TypeScript type definitions  
**Contents**:
- Interface definitions for all data structures
- Type aliases for common types
- Ensures type safety across components

#### `src/App.tsx`
**Purpose**: Root application component  
**Contents**:
- Imports and renders IoTDashboard
- Application entry point for React

#### `src/main.tsx`
**Purpose**: Application bootstrap file  
**Contents**:
- React DOM initialization
- Root component mounting
- Strict mode wrapper

#### `src/index.css`
**Purpose**: Global styles and Tailwind directives  
**Contents**:
- Tailwind CSS imports
- Custom animations
- Gradient utilities
- Scrollbar styling
- Responsive utilities

---

### Configuration Files

#### `package.json`
**Purpose**: Project dependencies and scripts  
**Key Dependencies**:
- react & react-dom: ^18.2.0
- chart.js: ^4.4.0
- react-chartjs-2: ^5.2.0
- typescript: ^5.2.2
- tailwindcss: ^3.4.3

**Scripts**:
- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build
- `lint`: Run ESLint

#### `tsconfig.json`
**Purpose**: TypeScript compiler configuration  
**Settings**:
- Target: ES2020
- JSX: react-jsx
- Strict mode enabled
- Module resolution: bundler

#### `tsconfig.node.json`
**Purpose**: TypeScript config for Node.js files (Vite config)  
**Settings**:
- Composite project
- Module: ESNext
- Skip lib check

#### `vite.config.ts`
**Purpose**: Vite build tool configuration  
**Settings**:
- React plugin integration
- Dev server port: 3000
- Auto-open browser

#### `tailwind.config.js`
**Purpose**: Tailwind CSS configuration  
**Contents**:
- Content paths for CSS purging
- Extended color palette
- Custom animations
- Theme extensions

#### `postcss.config.js`
**Purpose**: PostCSS configuration for Tailwind  
**Plugins**:
- tailwindcss
- autoprefixer

#### `index.html`
**Purpose**: HTML entry point  
**Contents**:
- Root div element
- Script tag for main.tsx
- Meta tags and title

---

### Documentation Files

#### `README.md`
**Purpose**: Comprehensive project documentation  
**Sections**:
- Project overview and features
- Setup instructions
- Required dependencies
- File structure
- Usage examples
- Configuration details
- Dashboard features
- Integration points
- Performance optimization tips

#### `ENHANCEMENTS.md`
**Purpose**: Detailed feature documentation  
**Sections**:
- Complete feature list for all 4 screens
- Implementation details
- UI/UX enhancements
- Technical architecture
- Data flow
- Future enhancement opportunities
- Compliance and standards
- Success metrics

#### `QUICKSTART.md`
**Purpose**: Quick setup guide  
**Sections**:
- Prerequisites
- Step-by-step installation
- Verification steps
- Testing each screen
- Troubleshooting guide
- Customization options
- Building for production
- Success checklist

#### `PROJECT_STRUCTURE.md` (this file)
**Purpose**: File organization documentation  
**Sections**:
- Complete file list
- File purposes and contents
- Directory structure
- Dependencies overview

---

## 📂 Recommended Directory Structure

When you set up the project, organize files like this:

```
iot-sensors-dashboard/
│
├── src/
│   ├── components/           # (Optional: move .tsx files here)
│   │   ├── IoTDashboard.tsx
│   │   ├── CafeteriaScreen.tsx
│   │   ├── IAQScreen.tsx
│   │   ├── SmartRestroomScreen.tsx
│   │   └── EnergyMonitoringScreen.tsx
│   │
│   ├── types.ts              # Type definitions
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── public/                   # Static assets (optional)
│   └── vite.svg
│
├── dist/                     # Build output (generated)
│
├── node_modules/             # Dependencies (generated)
│
├── index.html                # HTML entry point
├── package.json              # Project dependencies
├── package-lock.json         # Lock file (generated)
├── tsconfig.json             # TypeScript config
├── tsconfig.node.json        # Node TS config
├── vite.config.ts            # Vite config
├── tailwind.config.js        # Tailwind config
├── postcss.config.js         # PostCSS config
│
├── README.md                 # Main documentation
├── ENHANCEMENTS.md           # Feature details
├── QUICKSTART.md             # Quick start guide
└── PROJECT_STRUCTURE.md      # This file
```

---

## 🔧 File Dependencies

### Component Dependencies

```
IoTDashboard.tsx
├── CafeteriaScreen.tsx
│   ├── Chart.js (Line chart)
│   └── types.ts (CounterData, PeakHours)
├── IAQScreen.tsx
│   ├── Chart.js (Line chart)
│   └── types.ts (IAQSensor, FloorStats)
├── SmartRestroomScreen.tsx
│   ├── Chart.js (Bar charts)
│   └── types.ts (RestroomData, RestroomStats)
└── EnergyMonitoringScreen.tsx
    ├── Chart.js (Line, Bar, Doughnut)
    └── types.ts (EnergyMeter, FloorEnergy)
```

### Configuration Dependencies

```
main.tsx
└── App.tsx
    └── IoTDashboard.tsx
        └── All Screen Components

index.css
└── Imported by main.tsx
    └── Includes Tailwind directives

vite.config.ts
└── Used by Vite build tool

tsconfig.json & tsconfig.node.json
└── Used by TypeScript compiler

tailwind.config.js & postcss.config.js
└── Used by Tailwind CSS processor
```

---

## 📦 Key Dependencies Overview

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | Core React library |
| react-dom | ^18.2.0 | React DOM renderer |
| chart.js | ^4.4.0 | Chart visualization library |
| react-chartjs-2 | ^5.2.0 | React wrapper for Chart.js |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.2.2 | TypeScript compiler |
| @vitejs/plugin-react | ^4.2.1 | Vite React plugin |
| vite | ^5.2.0 | Build tool and dev server |
| tailwindcss | ^3.4.3 | Utility-first CSS framework |
| autoprefixer | ^10.4.19 | PostCSS autoprefixer |
| postcss | ^8.4.38 | CSS transformation tool |
| eslint | ^8.57.0 | JavaScript linter |

---

## 🎯 File Categories

### **Essential Files** (Cannot run without these)
- ✅ package.json
- ✅ src/main.tsx
- ✅ src/App.tsx
- ✅ src/IoTDashboard.tsx
- ✅ All 4 screen components
- ✅ src/types.ts
- ✅ src/index.css
- ✅ index.html
- ✅ vite.config.ts
- ✅ tsconfig.json

### **Configuration Files** (Needed for proper setup)
- ✅ tailwind.config.js
- ✅ postcss.config.js
- ✅ tsconfig.node.json

### **Documentation Files** (Helpful but not required to run)
- 📄 README.md
- 📄 ENHANCEMENTS.md
- 📄 QUICKSTART.md
- 📄 PROJECT_STRUCTURE.md

---

## 🚀 Getting Started

1. **Copy all files** to your project directory
2. **Install dependencies**: `npm install`
3. **Start dev server**: `npm run dev`
4. **Access dashboard**: http://localhost:3000

---

## 📝 Notes

- All `.tsx` files use TypeScript with React
- Components use functional components with Hooks
- Chart.js is registered in each component that uses it
- Tailwind CSS classes are used throughout for styling
- All data is currently simulated (mock data)
- Real-time updates are simulated with `setInterval`

---

## 🔄 Update Workflow

When making changes:

1. **Component Logic**: Edit .tsx files in src/
2. **Styling**: Modify index.css or Tailwind classes
3. **Types**: Update types.ts for new interfaces
4. **Configuration**: Adjust config files as needed
5. **Documentation**: Keep docs in sync with changes

---

## 📊 File Statistics

- **Total Files**: 20
- **TypeScript Files**: 7 (.tsx and .ts)
- **Configuration Files**: 6
- **Documentation Files**: 4
- **CSS Files**: 1
- **HTML Files**: 1
- **JSON Files**: 1

---

## ✅ Completeness Checklist

- [x] All 4 screen components created
- [x] Main dashboard with navigation
- [x] Type definitions
- [x] Configuration files
- [x] Documentation files
- [x] Package dependencies listed
- [x] Tailwind CSS setup
- [x] Chart.js integration
- [x] Responsive design
- [x] Real-time simulation

---

This project structure provides everything needed to run a fully functional IoT Sensors Dashboard for BMS monitoring!
