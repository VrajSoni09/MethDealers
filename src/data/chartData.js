export const PIE_DATA = [
  { name: "Delay", value: 28, color: "#ffffff" },
  { name: "Cleanliness", value: 22, color: "#aaaaaa" },
  { name: "Staff Behavior", value: 18, color: "#777777" },
  { name: "Food Quality", value: 12, color: "#555555" },
  { name: "Safety", value: 11, color: "#333333" },
  { name: "Technical", value: 9, color: "#222222" },
];

export const LINE_DATA = [
  { month: "Aug", complaints: 120, resolved: 98 },
  { month: "Sep", complaints: 145, resolved: 119 },
  { month: "Oct", complaints: 132, resolved: 121 },
  { month: "Nov", complaints: 178, resolved: 142 },
  { month: "Dec", complaints: 201, resolved: 156 },
  { month: "Jan", complaints: 165, resolved: 148 },
];

export const BAR_DATA = [
  { category: "Delay", High: 45, Medium: 32, Low: 23 },
  { category: "Cleanliness", High: 28, Medium: 41, Low: 31 },
  { category: "Staff", High: 52, Medium: 28, Low: 20 },
  { category: "Food", High: 61, Medium: 24, Low: 15 },
  { category: "Safety", High: 70, Medium: 18, Low: 12 },
  { category: "Tech", High: 22, Medium: 45, Low: 33 },
];

export const SCATTER_DATA = [
  { x: 10, y: 30, z: 400, cluster: "Delay" },
  { x: 20, y: 50, z: 300, cluster: "Delay" },
  { x: 15, y: 40, z: 350, cluster: "Delay" },
  { x: 25, y: 35, z: 310, cluster: "Delay" },
  { x: 60, y: 20, z: 500, cluster: "Safety" },
  { x: 70, y: 30, z: 450, cluster: "Safety" },
  { x: 65, y: 25, z: 480, cluster: "Safety" },
  { x: 40, y: 70, z: 320, cluster: "Cleanliness" },
  { x: 50, y: 80, z: 280, cluster: "Cleanliness" },
  { x: 45, y: 75, z: 300, cluster: "Cleanliness" },
  { x: 80, y: 60, z: 200, cluster: "Food" },
  { x: 85, y: 65, z: 230, cluster: "Food" },
  { x: 30, y: 55, z: 260, cluster: "Staff" },
  { x: 35, y: 60, z: 240, cluster: "Staff" },
];

export const ZONE_DATA = [
  { zone: "Northern", complaints: 4210 },
  { zone: "Western", complaints: 3890 },
  { zone: "Eastern", complaints: 3540 },
  { zone: "Southern", complaints: 4120 },
  { zone: "Central", complaints: 2980 },
  { zone: "NE Frontier", complaints: 1890 },
];

export const STATS = {
  totalComplaints: 24187,
  highSeverity: 5834,
  mediumSeverity: 10293,
  lowSeverity: 8060,
  modelAccuracy: "94.7%",
  f1Score: "0.923",
  avgResolution: "4.2 days",
  zonesActive: 18,
};
