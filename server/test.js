const axios = require('axios');

async function testServer() {
  try {
    console.log('Testing server health endpoint...');
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('Health response:', healthResponse.data);

    console.log('\nTesting chat endpoint...');
    const chatResponse = await axios.post('http://localhost:5000/api/chat', {
      message: 'hello'
    });
    console.log('Chat response:', chatResponse.data);
  } catch (error) {
    console.error('Error testing server:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testServer();
