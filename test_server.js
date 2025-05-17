const http = require('http');

// Test that the server is running on port 8000
const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'GET'
};

console.log('Testing connection to http://localhost:8000...');

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response received successfully');
    console.log(`Response length: ${data.length} bytes`);
    console.log('Server is running correctly on port 8000');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  console.error('Make sure the server is running with: npm start');
});

req.end();