// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeFeed from './components/Homefeed';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import Navbar from './components/NavBar';
import EditPost from './components/EditPost';


function App() {

  return (
    <Router>
      <div className="bg-cream min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:postId" element={<PostDetails />} />
            <Route path="/post/:postId/edit" element={<EditPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
