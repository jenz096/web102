// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Valorant Crewmates!</h1>
      <p>
        This app allows you to create, view, and manage your own Valorant-inspired crewmates.
        Each crewmate can have unique attributes that match different roles from the Valorant universe.
      </p>
      <p>
        Get started by creating a new crewmate or explore the character gallery to see your saved crewmates.
      </p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/create" style={{ marginRight: '10px', textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Create New Crewmate
          </button>
        </Link>
        <Link to="/gallery" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            View Gallery
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
