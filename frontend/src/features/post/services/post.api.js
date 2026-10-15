import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/posts',
    withCredentials: true
});

// Create a post
export async function createPost(formData) {
    const response = await api.post('/', formData);
    return response.data;
}

// Fetch feed posts
export async function getFeed() {
    const response = await api.get('/feed');
    return response.data;
}