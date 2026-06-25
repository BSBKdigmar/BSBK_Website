const https = require('https');
const query = '*[_type == "blog"] | order(publishedDate desc)[0] { title, "slug": slug.current, excerpt, category, publishedDate, thumbnail{ asset->{ url } } }';
const url = 'https://k39n2cfi.api.sanity.io/v2021-06-07/data/query/production?query=' + encodeURIComponent(query);
console.log('URL:', url);
https.get(url, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('status', res.statusCode, res.statusMessage);
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch (err) {
      console.error('parse error', err);
      console.error(data);
    }
  });
}).on('error', err => console.error('request error', err));
