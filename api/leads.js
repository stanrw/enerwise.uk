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
    const { 
      firstName,
      lastName,
      email,
      address,
      systems,
      budget,
      timeline,
      contactPreference 
    } = req.body;
    
    if (!firstName || !email || !address || !systems) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const leadData = {
      firstName,
      lastName,
      email,
      address,
      systems: Array.isArray(systems) ? systems : [systems],
      budget: budget || 'not_specified',
      timeline: timeline || 'flexible',
      contactPreference: contactPreference || 'email',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Simple response for quote request
    return res.json({
      success: true,
      leadId: 'lead_' + Date.now(),
      message: 'Quote request received. Our MCS-certified installers will be in touch within 24 hours.',
      redirectUrl: '/customer/confirmation'
    });

  } catch (error) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ error: 'Failed to submit quote request' });
  }
}
