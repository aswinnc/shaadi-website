const axios = require('axios');

const BASE_URL = 'https://shaadi-website-1.onrender.com';

const runTests = async () => {
    try {
        console.log('Testing Backend Connectivity...');
        const rootRes = await axios.get(BASE_URL);
        console.log('Root Endpoint:', rootRes.data);

        console.log('Testing Registration...');
        const email = `testuser_${Date.now()}@example.com`;
        const password = 'password123';
        const regRes = await axios.post(`${BASE_URL}/users/register`, {
            email,
            password,
            name: 'Test User',
            phone: '1234567890'
        });
        console.log('Registration Success:', regRes.data.message);
        const token = regRes.data.token;

        console.log('Testing Login...');
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            userName: email,
            password: password
        });
        console.log('Login Success:', loginRes.data.message);

        console.log('Testing Get Profile...');
        const userId = loginRes.data.user.id;
        const userRes = await axios.get(`${BASE_URL}/users/${userId}`);
        console.log('Get Profile Success:', userRes.data.email === email ? 'Confirmed' : 'Mismatch');

        console.log('ALL BACKEND TESTS PASSED');
    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
};

// Wait for server to potentially start if running concurrently, but here we assume we'll run it against a running server
// For this script, we can effectively just fail if server isn't up.
runTests();
