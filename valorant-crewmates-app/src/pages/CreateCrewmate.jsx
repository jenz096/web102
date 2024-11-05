import { useNavigate } from 'react-router-dom';
import CrewmateForm from '../components/CrewmateForm';

const CreateCrewmate = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Redirect to gallery after saving
    navigate('/gallery');
  };

  return (
    <div>
      <h2>Create New Crewmate</h2>
      <CrewmateForm onSave={handleSave} />
    </div>
  );
};

export default CreateCrewmate;
