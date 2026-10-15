import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePost'
import '../style/CreatePost.scss'

const CreatePost = () => {

    const navigate = useNavigate();

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const { handleCreatePost, loading, error } = usePost();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('image', image);

        try {
            await handleCreatePost(formData);
            setCaption('');
            setImage(null);
            e.target.reset();
            navigate('/feed');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="create-post">
            <h2>Create a Post</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="caption">Caption</label>
                    <textarea
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a caption..."
                    />
                </div>

                <div>
                    <label htmlFor="image">Choose Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0] || null)}
                    />
                </div>

                {error && <p role="alert">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;