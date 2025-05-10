import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams
import { CompanyRegistrationForm } from './CompanyRegistrationForm';
import { ReviewRegistration } from './ReviewRegistration';
import { RegistrationSuccess } from './RegistrationSuccess';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/RegisterCompany.css';

export default function RegisterCompany() {
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState(null);
  const [searchParams] = useSearchParams(); // Get query parameters

  useEffect(() => {
    // Populate formData with query parameters if available
    const queryData = {
      companyName: searchParams.get('companyName') || '',
      industry: searchParams.get('industry') || '',
      logoUrl: searchParams.get('logoUrl') || '',
      taxid: searchParams.get('taxid') || '',
      email: searchParams.get('email') || '',
    };
    setFormData(queryData);
  }, [searchParams]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep('review');
  };

  const handleEdit = () => {
    setStep('form');
  };

  const handleConfirm = () => {
    toast.success('Registration successful!');
    setStep('success');
  };

  const handleRegisterAnother = () => {
    setFormData(null);
    setStep('form');
  };

  return (
    <main className="register-company-container">
      <ToastContainer />
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