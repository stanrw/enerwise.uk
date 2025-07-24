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

  const healthStatus = {
    status: 'OK',
    message: 'Enerwise API is running',
    timestamp: new Date().toISOString(),
    services: {
      database: !!process.env.DATABASE_URL,
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      googleSolar: !!process.env.GOOGLE_SOLAR_API_KEY,
      epcApi: !!process.env.EPC_API_KEY,
      osDatahub: !!process.env.OS_DATAHUB_API_KEY
    }
  };

  return res.json(healthStatus);
}
