import axios from 'axios';

export const loginASUser = async (userName: String, password: String) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            userName: userName,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error: any) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        return { error: true, message: error.response ? error.response.data.message : error.message };
    }
};
