const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (
    !url ||
    (!url.startsWith('https://www.marxists.org/') &&
      !url.startsWith('http://www.marxists.org/'))
  ) {
    return res.status(400).json({ error: 'Only marxists.org URLs are allowed.' });
  }
  try {
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; lia-restoration/1.0)' },
    });
    if (!upstream.ok) {
      return res
        .status(upstream.status)
        .json({ error: `Upstream returned ${upstream.status}` });
    }
    const html = await upstream.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`lia-restoration running at http://localhost:${PORT}`);
});
