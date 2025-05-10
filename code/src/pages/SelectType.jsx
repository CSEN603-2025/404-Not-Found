import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { GraduationCap, Building, School } from 'lucide-react';
import '../styles/SelectType.css';

export default function SelectType() {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    localStorage.setItem('userType', type);
    if (type === 'company') {
      navigate('/login');
    } else if (type === 'student') {
      navigate('/login'); // Redirect to login for students
    } else if (type === 'scad') {
      navigate('/login'); // Redirect to login for SCAD
    }
  };

  return (
    <main className="select-type-container">
      <div className="select-type-content">
        <div className="button-row">
          <Button
            onClick={() => handleSelect('student')}
            aria-label="Student Button"
          >
            <GraduationCap className="icon" />
            Student
          </Button>
          <Button
            onClick={() => handleSelect('company')}
            aria-label="Company Button"
          >
            <Building className="icon" />
            Company
          </Button>
          <Button
            onClick={() => handleSelect('scad')}
            aria-label="SCAD Button"
          >
            <School className="icon" />
            SCAD
          </Button>
        </div>
      </div>
    </main>
  );
}