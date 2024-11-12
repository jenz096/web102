// src/pages/CrewmateInfo.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useParams, Link } from 'react-router-dom';

const CrewInfo = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching crewmate:", error);
      } else {
        setCrewmate(data);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <p>Loading crewmate details...</p>;

  return (
    <div className="crewmate-info">
      <h1>Crewmate: {crewmate.name}</h1>
      <h2>Stats:</h2>
      <p>Attribute: {crewmate.attribute}</p>
      <p>Color: {crewmate.color}</p> {/* New attribute */}
      <p>Nationality: {crewmate.nationality}</p> {/* New attribute */}

      <Link to={`/edit/${crewmate.id}`}>
        <button>Wanna edit this Crewmate?</button>
      </Link>
    </div>
  );
};

export default CrewInfo;
