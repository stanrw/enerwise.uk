import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const db = process.env.DATABASE_URL ? drizzle({
  client: new Pool({ connectionString: process.env.DATABASE_URL }),
}) : null;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { address, smartMeterNumber } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'Address required' });
    }

    // Professional assessment calculations
    const baseUsage = smartMeterNumber ? 4200 : 4000; // kWh/year
    const roofArea = 120 + Math.random() * 80; // 120-200 sqm
    const orientation = Math.random() > 0.3 ? 'South' : 'South-West';
    const shading = Math.random() > 0.7 ? 'Partial' : 'Minimal';
    
    // Solar calculations
    const panelCount = Math.floor(roofArea / 2.2); // ~2.2 sqm per panel
    const systemSize = panelCount * 0.4; // 400W panels
    const annualGeneration = systemSize * (orientation === 'South' ? 950 : 850);
    const solarSavings = Math.round(annualGeneration * 0.30); // 30p/kWh average
    const solarPayback = Math.round((systemSize * 1200) / solarSavings);

    // Battery calculations
    const batterySize = Math.min(10, systemSize * 0.8); // kWh
    const batterySavings = Math.round(batterySize * 365 * 0.25); // Daily cycling
    const batteryPayback = Math.round((batterySize * 800) / batterySavings);

    // Heat pump assessment
    const propertyType = Math.random() > 0.6 ? 'Detached' : 'Semi-detached';
    const heatPumpSuitable = Math.random() > 0.3; // 70% suitable
    const heatPumpSavings = heatPumpSuitable ? Math.round(baseUsage * 0.4) : 0;
    const heatPumpPayback = heatPumpSuitable ? Math.round(12000 / heatPumpSavings) : null;

    // EV charger
    const evChargerSavings = 400;
    const evChargerCost
