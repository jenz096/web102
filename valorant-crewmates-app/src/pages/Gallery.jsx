// src/pages/Gallery.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import CrewmateCard from '../components/CrewmateCard';

const Gallery = () => {
  const [crewmates, setCrewmates] = useState([]);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase.from('crewmates').select('*');
    if (error) {
      console.error('Error fetching crewmates:', error);
    } else {
      setCrewmates(data);
    }
  };

  useEffect(() => {
    fetchCrewmates();
  }, []);
  
  const handleDelete = async (id) => {
    // Delete from Supabase
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting crewmate:', error);
    } else {
      // Update the state to remove the crewmate from the UI
      setCrewmates((prev) => prev.filter((crewmate) => crewmate.id !== id));
    }
  };


  return (
    <div>
      <h2>Crewmate Gallery</h2>
      <div className="gallery-container">
        {crewmates.length > 0 ? (
          crewmates.map((crewmate) => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} onDelete={handleDelete} />
          ))
        ) : (
          <p>No crewmates found</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
