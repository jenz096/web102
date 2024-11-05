import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Valorant Crewmates</h2>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/create">Create New Crewmate</Link></li>
        <li><Link to="/gallery">Character Gallery</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
