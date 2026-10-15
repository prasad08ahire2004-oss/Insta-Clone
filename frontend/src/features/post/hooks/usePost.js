import { useState } from 'react';
import { createPost, getFeed } from '../services/post.api';

export function usePost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleCreatePost(formData) {
        setLoading(true);
        setError('');

        try {
            const data = await createPost(formData);

            setPosts((prevPosts) => [data.post, ...prevPosts]);

            return data;
        } catch (error) {
            setError(
                error.response?.data?.message || 'Failed to create post'
            );

            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function handleGetFeed() {
        setLoading(true);
        setError('');

        try {
            const data = await getFeed();

            setPosts(data.posts);

            return data.posts;
        } catch (error) {
            setError(
                error.response?.data?.message || 'Failed to fetch feed'
            );

            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        posts,
        loading,
        error,
        handleCreatePost,
        handleGetFeed
    };
}