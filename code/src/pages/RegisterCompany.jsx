import { useState } from 'react';
import { CompanyRegistrationForm } from './CompanyRegistrationForm';
import { ReviewRegistration } from './ReviewRegistration';
import { RegistrationSuccess } from './RegistrationSuccess';
import '../styles/RegisterCompany.css';

export default function RegisterCompany() {
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep('review');
  };

  const handleEdit = () => {
    setStep('form');
  };

  const handleConfirm = () => {
    console.log('Simulating registration with data:', formData);
    setStep('success');
  };

  const handleRegisterAnother = () => {
    setFormData(null);
    setStep('form');
  };

  return (
    <main className="register-company-container">
      <div className="register-company-content">
        {step === 'form' && (
          <CompanyRegistrationForm
            onSubmit={handleFormSubmit}
            defaultValues={formData}
          />
        )}
        {step === 'review' && formData && (
          <ReviewRegistration
            data={formData}
            onEdit={handleEdit}
            onConfirm={handleConfirm}
          />
        )}
        {step === 'success' && formData && (
          <RegistrationSuccess
            companyName={formData.companyName}
            onRegisterAnother={handleRegisterAnother}
          />
        )}
      </div>
    </main>
  );
}