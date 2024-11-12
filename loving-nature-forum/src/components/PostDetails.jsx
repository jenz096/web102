import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);

  // Fetch post and comments
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
        setPost(data);
        setUpvotes(data.upvotes);
      }
      setLoading(false);
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  // Handle upvoting
  const handleUpvote = async () => {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: upvotes + 1 })
      .eq('id', postId)
      .select();

    if (error) {
      console.error('Error updating upvotes:', error);
    } else if (data && data.length > 0) {
      setUpvotes(data[0].upvotes);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('comments')
      .insert([{ text: comment, post_id: postId }])
      .select();

    if (error) {
      console.error('Error adding comment:', error);
    } else if (data && data.length > 0) {
      setComments([...comments, data[0]]);
      setComment('');
    }
  };

  // Redirect to the edit page
  const handleEditClick = () => {
    navigate(`/post/${postId}/edit`);
  };

  // Handle post deletion
  const handleDelete = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error);
    } else {
      navigate('/');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">Posted on {new Date(post.created_at).toLocaleString()}</p>
      <p className="mb-4">{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="Post" className="mb-4 rounded" />}

      <div className="flex items-center mb-4">
        <button onClick={handleUpvote} className="flex items-center cursor-pointer">
          👍
        </button>
        <span className="ml-2">{upvotes} upvotes</span>
      </div>

      <button onClick={handleEditClick} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
        Edit
      </button>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete
      </button>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <p key={comment.id} className="text-gray-700 mt-2">
              - {comment.text}
            </p>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="flex items-center">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="border rounded w-full p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostDetails;
