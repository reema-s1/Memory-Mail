import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import './stylesheet/CreateCapsule.css'; // Import the CSS file

export default function CreateCapsule() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    unlockDate: format(new Date().setMonth(new Date().getMonth() + 1), 'yyyy-MM-dd'),
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    try {
      // Log the current token
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('Token not found in localStorage');
        return; // Prevent further execution
      }

      console.log('Token retrieved from localStorage:', token);

      // Ensure the token is valid
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const response = await fetch('http://localhost:5000/api/capsules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Use the retrieved token here
        },
        body: JSON.stringify(formData),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error(errorData.message || 'Failed to create capsule');
      }

      const result = await response.json();
      console.log('Capsule created:', result);

      navigate('/dashboard'); // Redirect after success
    } catch (err) {
      console.error('Error in handleSubmit:', err.message);
      setError(err.message); // Display error if API call fails
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <div className="create-capsule-container">
      <h1 className="create-capsule-heading">Create New Time Capsule</h1>

      <form onSubmit={handleSubmit} className="create-capsule-form">
        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="form-input"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="form-textarea"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unlockDate" className="form-label">Unlock Date</label>
          <input
            type="date"
            id="unlockDate"
            name="unlockDate"
            required
            min={format(new Date(), 'yyyy-MM-dd')}
            className="form-input"
            value={formData.unlockDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="form-button-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="form-button-submit"
          >
            Create Capsule
          </button>
        </div>
      </form>
    </div>
  );
}
