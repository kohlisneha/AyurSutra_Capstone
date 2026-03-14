import React, { useState, useEffect, useCallback } from 'react';
import { apiGetPosts, apiCreatePost, apiToggleLike } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Send, User, RefreshCw } from 'lucide-react';

const Community = () => {
  const { currentUser, userData } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [postingLoading, setPostingLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await apiGetPosts();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();

    // Poll for new posts every 15 seconds
    const interval = setInterval(fetchPosts, 15000);
    return () => clearInterval(interval);
  }, [fetchPosts]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim() || !currentUser || postingLoading) return;

    setPostingLoading(true);
    try {
      await apiCreatePost(newPostContent);
      setNewPostContent('');
      await fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setPostingLoading(false);
  };

  const handleLike = async (postId) => {
    if (!currentUser) return;

    try {
      const data = await apiToggleLike(postId);
      // Update the post in local state
      setPosts(prev => prev.map(p =>
        (p._id === postId || p.id === postId) ? { ...p, likes: data.post.likes } : p
      ));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <div className="container page" style={{ maxWidth: '800px' }}>
      <header className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Ayurveda Community</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Connect with others, ask questions, and share your wellness journey.
        </p>
      </header>

      {/* Create Post Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        {currentUser ? (
          <form onSubmit={handleCreatePost}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
              }}>
                <User size={20} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts, ask a question..."
                  className="input-field"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  required
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn btn-primary" disabled={!newPostContent.trim() || postingLoading}>
                    {postingLoading ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />} Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center" style={{ padding: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Please log in to join the discussion.</p>
            <Link to="/login" className="btn btn-primary">Log In</Link>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      {loading ? (
        <div className="text-center" style={{ padding: '3rem 0', color: 'var(--text-secondary)' }}>
          Loading community posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center card" style={{ padding: '3rem 0', color: 'var(--text-secondary)' }}>
          No posts yet. Be the first to start a discussion!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map(post => {
            const userId = currentUser?._id;
            const isLikedByMe = userId ? post.likes.includes(userId) : false;
            
            return (
              <div key={post._id || post.id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-dark)',
                  }}>
                    {post.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{post.authorName}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
                
                <p style={{ margin: '0 0 1.5rem 0', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{post.content}</p>
                
                <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <button 
                    onClick={() => handleLike(post._id || post.id)}
                    style={{ 
                      background: 'none', border: 'none', cursor: currentUser ? 'pointer' : 'default',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: isLikedByMe ? 'var(--error-color)' : 'var(--text-secondary)',
                      transition: 'color 0.2s',
                      fontFamily: 'inherit', fontSize: '0.9rem'
                    }}
                  >
                    <Heart size={20} fill={isLikedByMe ? 'currentColor' : 'none'} />
                    {post.likes.length}
                  </button>
                  
                  <button style={{ 
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: 'var(--text-secondary)',
                      fontFamily: 'inherit', fontSize: '0.9rem'
                    }}
                  >
                    <MessageSquare size={20} />
                    {post.commentCount || 0}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Community;
