export default async function handler(req, res) {
  const segments = req.query.path ?? [];
  const apiPath = Array.isArray(segments) ? segments.join('/') : segments;
  const url = `https://api.heyreach.io/api/public/${apiPath}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers['x-api-key'] ? { 'X-API-KEY': req.headers['x-api-key'] } : {}),
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
