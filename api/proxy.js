export default async function handler(req, res) {
  // URL se 'url' parameter nikalna
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('URL parameter is required');
  }

  try {
    // Target URL par request bhejna (Fetch API)
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });

    // Response ko text me convert karna
    const html = await response.text();

    // CORS headers set karna taaki aapka website isko access kar sake
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    return res.status(200).send(html);
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).send('Error fetching URL');
  }
}
