import React, { useState } from 'react';

const SubmitPost = ({ onSubmit }) => {
    const [post, setPost] = useState({ title: '', content: '' });

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(post);
        setPost({ title: '', content: '' }); // Reset form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={post.title} onChange={handleChange} placeholder="Post Title" required />
            <textarea name="content" value={post.content} onChange={handleChange} placeholder="Post Content" required />
            <button type="submit">Submit Post</button>
        </form>
    );
};

export default SubmitPost;