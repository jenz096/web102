import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the post details to populate the form
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url || ''); // Set a default value if image_url is null
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  // Handle form submission to update the post
  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        image_url: imageUrl,
      })
      .eq('id', postId);

    if (error) {
      console.error('Error updating post:', error);
    } else {
      // Redirect to the post details page after updating
      navigate(`/post/${postId}`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdatePost}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Post Title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Post Content"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Image URL"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Post
          </button>
          <button
            type="button"
            onClick={() => navigate(`/post/${postId}`)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
