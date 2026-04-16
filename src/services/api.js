import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'https://api.example.com', // Placeholder URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock Data Generators
const mockMembers = Array.from({ length: 25 }, (_, i) => ({
    id: `M-${1000 + i}`,
    name: i % 2 === 0 ? `Member ${i + 1}` : `สมาชิกคนที่ ${i + 1}`,
    type: i % 3 === 0 ? 'สามัญ' : 'สมทบ',
    status: i % 5 === 0 ? 'Inactive' : 'Active',
    joinDate: new Date(2023, i % 12, (i * 3) % 28 + 1).toISOString().split('T')[0],
    balance: (Math.random() * 100000).toFixed(2),
}));

// Mock Adapter using Inteceptors
api.interceptors.request.use(async (config) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    console.log(`[Mock API] Request: ${config.method.toUpperCase()} ${config.url}`);

    if (config.url === '/members') {
        // Return mock members
        return {
            ...config,
            adapter: () => Promise.resolve({
                data: mockMembers,
                status: 200,
                statusText: 'OK',
                headers: {},
                config: config,
                request: {}
            })
        };
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const getMembers = () => api.get('/members').then(res => res.data);

export const getStats = async () => {
    // Mock stats
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
        totalMembers: 1250,
        totalDeposits: 15430000,
        totalLoans: 8500000,
        activeLoans: 145
    }
}

export default api;
