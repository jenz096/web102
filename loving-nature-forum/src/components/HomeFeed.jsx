import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const HomeFeed = () => {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState('created_at');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortType, searchTerm]);

  const fetchPosts = async () => {
    let query = supabase
      .from('posts')
      .select('*')
      .order(sortType, { ascending: false }); // Always descending order

    const { data, error } = await query;

    if (error) {
      console.error(error);
    } else {
      // Filter posts by search term in the title
      const filteredPosts = data.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPosts(filteredPosts);
    }
  };

  const handleSortChange = (newSortType) => {
    setSortType(newSortType); // Set sortType directly to 'created_at' or 'upvotes'
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-forestGreen">NatureHub</h1>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-forestGreen"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => handleSortChange('created_at')}
            className={`px-4 py-2 rounded-lg ${sortType === 'created_at' ? 'bg-forestGreen text-cream' : 'bg-earthBrown text-cream'}`}
          >
            Newest
          </button>
          <button
            onClick={() => handleSortChange('upvotes')}
            className={`px-4 py-2 rounded-lg ${sortType === 'upvotes' ? 'bg-forestGreen text-cream' : 'bg-earthBrown text-cream'}`}
          >
            Most Popular
          </button>
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {posts.map(post => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-500">Posted {new Date(post.created_at).toLocaleString()}</p>
              <h2 className="text-xl font-semibold text-earthBrown">{post.title}</h2>
              <p className="text-forestGreen">{post.upvotes} upvotes</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
