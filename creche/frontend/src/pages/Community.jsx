import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/navbar';
import SignInContext from '../context/sigincontext/signinContext';

const CATEGORY_COLORS = {
    stray: 'bg-orange-100 text-orange-700',
    adoption: 'bg-green-100 text-green-700',
    story: 'bg-blue-100 text-blue-700',
};

const CATEGORY_LABELS = {
    stray: '🐾 Stray Sighting',
    adoption: '🏠 Adoption',
    story: '📖 Pet Story',
};

const Community = () => {
    const { User } = useContext(SignInContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePost, setActivePost] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [filter, setFilter] = useState('all');

    const fetchPosts = () => {
        fetch('http://localhost:3000/posts')
            .then(r => r.json())
            .then(data => { setPosts(data); setLoading(false); })
            .catch(() => setLoading(false));
    };

    useEffect(() => { fetchPosts(); }, []);

    const handleComment = (postId) => {
        if (!commentText.trim()) return;
        if (!User.userName) { alert('Please log in to comment'); return; }
        setSubmittingComment(true);
        fetch(`http://localhost:3000/posts/${postId}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${User.token}`,
            },
            body: JSON.stringify({ commentText, postedBy: User.userName }),
        })
            .then(r => r.json())
            .then(newComment => {
                setPosts(prev => prev.map(p =>
                    p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
                ));
                if (activePost?.id === postId) {
                    setActivePost(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
                }
                setCommentText('');
                setSubmittingComment(false);
            })
            .catch(() => setSubmittingComment(false));
    };

    const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.category === filter);

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-orange-50">
            <Nav />

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white py-10 px-6 text-center">
                <h1 className="text-4xl font-bold mb-2">🐾 Community</h1>
                <p className="text-lg opacity-90">Report strays, share stories, find homes for pets</p>
                {User.userName ? (
                    <Link to="/createpost">
                        <button className="mt-4 bg-white text-orange-500 font-semibold px-6 py-2 rounded-full shadow hover:shadow-md transition">
                            + Create Post
                        </button>
                    </Link>
                ) : (
                    <Link to="/signin">
                        <button className="mt-4 bg-white text-orange-500 font-semibold px-6 py-2 rounded-full shadow">
                            Sign in to post
                        </button>
                    </Link>
                )}
            </div>

            {/* Filter bar */}
            <div className="flex gap-2 justify-center flex-wrap px-4 py-4 bg-white shadow-sm">
                {['all', 'stray', 'adoption', 'story'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                            filter === cat
                                ? 'bg-orange-500 text-white border-orange-500'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                        }`}
                    >
                        {cat === 'all' ? '📋 All' : CATEGORY_LABELS[cat]}
                    </button>
                ))}
            </div>

            {/* Posts grid */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center text-gray-400 py-20 text-xl">Loading posts...</div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <div className="text-5xl mb-4">🐾</div>
                        <p className="text-xl">No posts yet. Be the first to share!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map((post, index) => (
                            <div key={`${post.id}-${index}`} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
                                {post.imageUrl && (
                                    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                                )}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>
                                            {CATEGORY_LABELS[post.category] || post.category}
                                        </span>
                                        <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-800 mb-1">{post.title}</h2>
                                    <p className="text-gray-600 text-sm mb-2">{post.description}</p>
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                                        {post.location && <span>📍 {post.location}</span>}
                                        {post.healthStatus && <span>❤️ {post.healthStatus}</span>}
                                        <span>👤 {post.postedBy}</span>
                                    </div>
                                    <button
                                        onClick={() => setActivePost(post)}
                                        className="text-sm text-orange-500 font-medium hover:underline"
                                    >
                                        💬 {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''} · View & Comment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Comment modal */}
            {activePost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-bold text-gray-800">{activePost.title}</h3>
                            <button onClick={() => { setActivePost(null); setCommentText(''); }}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
                        </div>

                        {activePost.imageUrl && (
                            <img src={activePost.imageUrl} alt={activePost.title} className="w-full h-44 object-cover" />
                        )}

                        <div className="p-4 border-b">
                            <p className="text-gray-600 text-sm">{activePost.description}</p>
                            <div className="flex gap-3 mt-2 text-xs text-gray-500 flex-wrap">
                                {activePost.location && <span>📍 {activePost.location}</span>}
                                {activePost.healthStatus && <span>❤️ Health: {activePost.healthStatus}</span>}
                                <span>👤 {activePost.postedBy}</span>
                            </div>
                        </div>

                        {/* Comments list */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            <p className="text-sm font-semibold text-gray-500 mb-2">Comments ({activePost.comments.length})</p>
                            {activePost.comments.length === 0 ? (
                                <p className="text-gray-400 text-sm text-center py-4">No comments yet. Start the conversation!</p>
                            ) : (
                                activePost.comments.map((c, index) => (
                                    <div key={`${c.id}-${index}`} className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-semibold text-orange-600">{c.postedBy}</span>
                                            <span className="text-xs text-gray-400">{formatDate(c.createdAt)}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{c.commentText}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add comment */}
                        <div className="p-4 border-t">
                            {User.userName ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={e => setCommentText(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleComment(activePost.id)}
                                        placeholder="Write a comment..."
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    />
                                    <button
                                        onClick={() => handleComment(activePost.id)}
                                        disabled={submittingComment || !commentText.trim()}
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                                    >
                                        Post
                                    </button>
                                </div>
                            ) : (
                                <p className="text-center text-sm text-gray-500">
                                    <Link to="/signin" className="text-orange-500 underline">Sign in</Link> to comment
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;