import React, { useEffect } from 'react';
import { usePost } from '../hooks/usePost';
import { useNavigate } from 'react-router-dom';
import '../style/Feed.scss';

const Feed = () => {

    const navigate = useNavigate();
    const { posts, loading, error, handleGetFeed } = usePost();

    useEffect(() => {
        handleGetFeed().catch((error) => {
            console.error('Error fetching feed:', error);
        });
    }, []);

    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    return (
        <div className="feed">
            <div className="feed-header">
                <h2>Feed</h2>

                <button
                className="create-post-btn"
                onClick={() => navigate('/create-post')}
                >
                    + Create Post
                </button>
            </div>

            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post) => (
                    <article className="post-card" key={post._id}>
                        <div className="post-header">
                            {post.user?.profileImage && (
                                <img
                                    src={post.user.profileImage}
                                    alt={`${post.user.username}'s profile`}
                                    className="profile-image"
                                />
                            )}

                            <span>
                                {post.user?.username || 'Unknown user'}
                            </span>
                        </div>

                        <img
                            src={post.imgUrl}
                            alt={post.caption || 'Post image'}
                            className="post-image"
                        />

                        <p className="post-caption">
                            {post.caption}
                        </p>

                        <button type="button" disabled>
                            ♡ Like
                        </button>
                    </article>
                ))
            )}
        </div>
    );
};

export default Feed;