import { useState, useEffect } from 'react';
import '../css/admissiom.css';
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiHome } from 'react-icons/fi';

const AdmissionForm = ({ onClose, firstVisit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    courseInterest: 'hotel-management',
    educationLevel: 'high-school'
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\d{10,15}$/)) newErrors.phone = 'Valid phone number is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      localStorage.setItem('admissionSubmitted', 'true');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Add to localStorage that user has seen the modal
  useEffect(() => {
    if (firstVisit) {
      localStorage.setItem('hasSeenAdmissionModal', 'true');
    }
  }, [firstVisit]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="admission-modal">
        <button className="close-btn" onClick={onClose}>
          <FiX size={24} />
        </button>
        
        {!submitted ? (
          <>
            <div className="modal-header">
              <h2>Admission Registration</h2>
              <p>Begin your journey in hotel management today</p>
            </div>
            
            <form onSubmit={handleSubmit} className="admission-form">
              {/* Form fields remain the same as your original */}
              {/* ... */}
            </form>
          </>
        ) : (
          <div className="submission-success">
            <div className="success-icon">✓</div>
            <h2>Application Submitted!</h2>
            <p>Thank you for your interest in INC Hotel Management. Our admissions team will contact you shortly.</p>
            <button onClick={onClose} className="close-success-btn">
              Continue to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionForm;