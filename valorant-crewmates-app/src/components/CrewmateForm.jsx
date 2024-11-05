// src/components/CrewmateForm.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const CrewmateForm = ({ onSave, existingCrewmate }) => {
  const [name, setName] = useState(existingCrewmate?.name || '');
  const [attribute, setAttribute] = useState(existingCrewmate?.attribute || '');
  const [color, setColor] = useState(existingCrewmate?.color || ''); // New attribute
  const [nationality, setNationality] = useState(existingCrewmate?.nationality || ''); // New attribute

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const crewmateData = { name, attribute, color, nationality }; // Include new attributes
    const { data, error } = existingCrewmate
      ? await supabase.from('crewmates').update(crewmateData).eq('id', existingCrewmate.id)
      : await supabase.from('crewmates').insert([crewmateData]);

    if (error) {
      console.error("Error saving crewmate:", error);
    } else {
      console.log("Crewmate saved:", data);
      onSave();
      navigate('/gallery');
    }
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
        <option value="Select from below">Select from below</option>
          <option value="Duelist">Duelist</option>
          <option value="Initiator">Initiator</option>
          <option value="Sentinel">Sentinel</option>
          <option value="Controller">Controller</option>
        </select>
      </label>
      <label>
        Color:
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
      </label>
      <label>
        Nationality:
        <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
      </label>
      <button type="submit">Save Crewmate</button>
    </form>
  );
};

export default CrewmateForm;
