import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CapsuleCard from '../components/CapsuleCard';
import Timer from '../components/Timer';
import './stylesheet/Dashboard.css';

export default function Dashboard() {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [nextCapsule, setNextCapsule] = useState(null);


  // Fetch capsules
  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/capsules', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to fetch capsules');
        }

        const result = await response.json();
        setCapsules(result.capsules);

        // Find the closest capsule
        findNextCapsule(result.capsules);
      } catch (err) {
        setError(err.message || 'Error fetching capsules');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []); 

  // Find the next capsule to unlock
  const findNextCapsule = (capsules) => {
    const now = Date.now();
    const upcomingCapsules = capsules.filter((capsule) => new Date(capsule.unlockDate).getTime() > now);

    if (upcomingCapsules.length > 0) {
      const nextCapsule = upcomingCapsules.reduce((closest, capsule) => {
        const unlockTime = new Date(capsule.unlockDate).getTime();
        const closestUnlockTime = new Date(closest.unlockDate).getTime();
        return unlockTime < closestUnlockTime ? capsule : closest;
      });
      setNextCapsule(nextCapsule);
    } else {
      setNextCapsule(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`http://localhost:5000/api/capsules/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Failed to delete capsule');
      }

      // Remove the deleted capsule from the state and find the new closest capsule
      const updatedCapsules = capsules.filter(capsule => capsule._id !== id);
      setCapsules(updatedCapsules);
      findNextCapsule(updatedCapsules);
    } catch (err) {
      setError(err.message || 'Error deleting capsule');
      console.error(err);
    }
  };


  const handleCapsuleClick = (id) => {
    navigate(`/capsule/${id}`); // Navigates to CapsuleDetails without opening a new tab
  };
  


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 className="title">Your Time Capsules</h1>
        <Link to="/create" className="create-button">
          Create New Capsule
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {nextCapsule ? (
        <div className="next-capsule-timer">
          <h2>Next Capsule to Unlock: {nextCapsule.title}</h2>
          <Timer unlockDate={nextCapsule.unlockDate} />
        </div>
      ) : (
        <div className="no-next-capsule">
          <h3>All capsules are unlocked or no capsules available.</h3>
        </div>
      )}

      {capsules.length === 0 ? (
        <div className="no-capsules">
          <h3 className="message">No time capsules yet</h3>
          <p className="description">Create your first time capsule to get started!</p>
        </div>
      ) : (
        <div className="capsules-grid">
          {capsules.map((capsule) => (
            <CapsuleCard 
              key={capsule._id} 
              capsule={capsule} 
              onClick={() => console.log('Clicked capsule:', capsule._id)}
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
