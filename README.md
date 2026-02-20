# 🚆 AI-Powered Rail Complaint Intelligence System
### Indian Railways · Ministry of Railways, Government of India

A production-quality, frontend-only React application for AI-powered complaint categorization and pattern detection.

---

## ✨ Features

- **7 Pages**: Landing → Login → Signup → Dashboard → Complaints → Input → Output
- **AI Mock Pipeline**: Auto-categorization, severity detection, cluster matching
- **Interactive Dashboard**: 6 stat cards with animated counters + 4 recharts visualizations
- **Advanced Filters**: Category, severity, date, and free-text search
- **Animated Train**: SVG train with CSS keyframe animation on the landing page
- **Black & White Theme**: Strict enterprise aesthetic with red/yellow/green severity colors
- **Responsive**: Works on mobile, tablet, and desktop
- **Collapsible Sidebar**: Icon-only mode for compact navigation

---

## 📁 Folder Structure

```
rail-complaint-system/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          ← Top navigation bar
│   │   ├── Footer.jsx          ← Footer with branding
│   │   ├── Sidebar.jsx         ← Collapsible sidebar nav
│   │   ├── Toast.jsx           ← Notification toasts
│   │   ├── StatCard.jsx        ← Animated stat cards
│   │   ├── ComplaintCard.jsx   ← Individual complaint cards
│   │   ├── ChartTooltip.jsx    ← Custom Recharts tooltip
│   │   └── TrainAnimation.jsx  ← SVG animated train
│   ├── pages/
│   │   ├── LandingPage.jsx     ← Hero with train animation
│   │   ├── LoginPage.jsx       ← Authentication
│   │   ├── SignupPage.jsx      ← Registration
│   │   ├── DashboardPage.jsx   ← Main analytics dashboard
│   │   ├── ComplaintsPage.jsx  ← Filterable complaint list
│   │   ├── InputPage.jsx       ← Submit new complaint
│   │   └── OutputPage.jsx      ← AI analysis results
│   ├── data/
│   │   ├── complaints.js       ← Mock complaint records (15 entries)
│   │   └── chartData.js        ← Mock chart data + stats
│   ├── utils/
│   │   └── helpers.js          ← Utility functions
│   ├── App.jsx                 ← Root router
│   ├── index.js                ← Entry point
│   └── index.css               ← Global styles + Tailwind
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# 1. Navigate to the project folder
cd rail-complaint-system

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Tailwind CSS | Styling |
| Recharts | Charts (Pie, Line, Bar, Scatter) |
| CSS Animations | Train animation, card reveals |
| Mock JSON data | No backend required |

---

## 📊 Mock Data

- **15 complaint records** across 7 categories and 3 severities
- **Chart data** for Pie, Line, Bar, and Scatter plots
- **Cluster groupings** (C1–C7) for similarity matching

---

## 🎨 Design Decisions

- **Strict Black & White** — Professional government analytics aesthetic
- **IBM Plex Mono** — Monospaced font for data-dense UI
- **Playfair Display** — Serif font for headings
- **Red / Yellow / Green** — Only for severity indicators
- **CSS Grid overlays** — Subtle texture without distracting from data

---

## 📝 Notes

- No backend or real API calls — all data is mocked
- Login accepts any credentials (demo mode available)
- The train animation loops infinitely on the landing page
- Sidebar collapses to icon-only mode on smaller screens
