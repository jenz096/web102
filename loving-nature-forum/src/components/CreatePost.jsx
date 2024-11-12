// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Insert the post without checking for authentication or including user_id
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, image_url: imageUrl,upvotes:0 }]) // No user_id included
      .select();
  
    if (error) {
      console.error("Error inserting data:", error);
      return;
    }
  
    if (data && data.length > 0) {
      navigate(`/post/${data[0].id}`);
    } else {
      console.error("No data returned from insert operation.");
    }
  };
  

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-cream">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-forestGreen mb-4 text-center">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-earthBrown rounded-lg focus:outline-none"
            required
          />
          <textarea
            placeholder="Content (Optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-earthBrown rounded-lg focus:outline-none"
            rows="4"
          />
          <input
            type="text"
            placeholder="Image URL (Optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-earthBrown rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-natureGreen text-cream font-semibold py-2 px-4 rounded-lg hover:bg-forestGreen transition-colors"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
