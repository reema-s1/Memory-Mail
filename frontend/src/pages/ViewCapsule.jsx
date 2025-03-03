import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './stylesheet/ViewCapsule.css'; // Import the CSS file if needed

export default function ViewCapsule() {
  const navigate = useNavigate();
  const { id } = useParams(); // Getting the capsule ID from the URL
  const [loading, setLoading] = useState(true);
  const [capsule, setCapsule] = useState(null);

  useEffect(() => {
    // Fetch capsule data from the backend (MERN API)
    const fetchCapsuleData = async () => {
      try {
        const response = await fetch(`/api/capsules/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCapsule(data.capsule); // Assuming response contains capsule data
        } else {
          console.error('Capsule not found or unauthorized');
        }
      } catch (err) {
        console.error('Error fetching capsule data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsuleData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!capsule) {
    return <div>Capsule not found or unauthorized access.</div>;
  }

  return (
    <div className="view-capsule-container">
      <h1 className="view-capsule-title">View Time Capsule</h1>
      <div className="capsule-details">
        <div className="capsule-field">
          <strong>Title:</strong> {capsule.title}
        </div>
        <div className="capsule-field">
          <strong>Message:</strong> {capsule.message}
        </div>
        <div className="capsule-field">
          <strong>Unlock Date:</strong> {new Date(capsule.unlockDate).toLocaleDateString()}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="back-button"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
