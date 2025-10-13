const http = require('http');

const data = JSON.stringify({
  workflow: { id: process.env.WORKFLOW_ID || 'wf_68e8c084c5588190a6aaba1c7bdd88a10fd12bed4e864630' },
  chatkit_configuration: { file_upload: { enabled: true } }
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/create-session',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log('Testing session creation...');
console.log('Data:', data);

const req = http.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Response Headers:', res.headers);

  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    try {
      console.log('Response Body:', JSON.parse(body));
    } catch (e) {
      console.log('Raw Response:', body);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
});

req.write(data);
req.end();
