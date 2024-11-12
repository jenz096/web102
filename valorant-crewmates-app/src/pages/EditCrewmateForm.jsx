// src/pages/EditCrewmateForm.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

const EditCrewmateForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase.from('crewmates').select('*').eq('id', id).single();
      setName(data.name);
      setAttribute(data.attribute);
    };
    fetchCrewmate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('crewmates').update({ name, attribute }).eq('id', id);
    navigate('/gallery');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Attribute:
        <select value={attribute} onChange={(e) => setAttribute(e.target.value)} required>
        <option value="">Select an attribute</option>
          <option value="Duelist">Duelist</option>
          <option value="Initiator">Initiator</option>
          <option value="Sentinel">Sentinel</option>
          <option value="Controller">Controller</option>
        </select>
      </label>
      <button type="submit">Save Crewmate</button>
    </form>
  );
};

export default EditCrewmateForm;
