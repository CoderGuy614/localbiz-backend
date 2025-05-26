import axios from 'axios';

// Set the base URL for all API requests
axios.defaults.baseURL = 'https://r5wa3jwp5s.us-east-1.awsapprunner.com';

// Enable credentials for cross-origin requests
axios.defaults.withCredentials = true;

export default axios;
