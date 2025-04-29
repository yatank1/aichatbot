const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const data = JSON.stringify({
  message: 'hello'
});

console.log('Sending request to server...');

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', res.headers);

  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Response received:');
    try {
      const parsedData = JSON.parse(responseData);
      console.log(JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.log('Raw response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

// Write data to request body
req.write(data);
req.end();

console.log('Request sent.');
