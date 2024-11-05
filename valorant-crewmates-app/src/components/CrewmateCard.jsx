// src/components/CrewmateCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CrewmateCard = ({ crewmate, onDelete }) => {
    const handleDelete = async () => {
      const { error } = await supabase.from('crewmates').delete().eq('id', crewmate.id);
      if (error) {
        console.error("Delete error:", error);
      } else {
        onDelete(crewmate.id);
      }
    };
  
    return (
        <div className="crewmate-card">
          <h3>{crewmate.name}</h3>
          <p>Role: {crewmate.attribute}</p>
          <Link to={`/crewmate/${crewmate.id}`}>
            <button>View Details</button>
          </Link>
          <Link to={`/edit/${crewmate.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => onDelete(crewmate.id)}>Delete</button>
        </div>
    
    );
  };
  

export default CrewmateCard;
