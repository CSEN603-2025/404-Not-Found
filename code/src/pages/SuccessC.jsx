import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import "../styles/SuccessC.css"; // Optional: Add styles for the success box

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the company dashboard after 4 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard"); // Replace "/dashboard" with your actual dashboard route
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="success-page-container">
      <div className="success-box">
        <h1>Registration Successful!</h1>
        <p>You will be redirected to the company dashboard shortly.</p>
      </div>
    </div>
  );
}