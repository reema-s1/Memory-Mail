import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API calls
import './stylesheet/CapsuleDetails.css';

export default function CapsuleDetailPage() {
  const { id } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const response = await axios.get(`/api/capsules/${id}`);
        setCapsule(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCapsule();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading capsule</div>;
  if (!capsule) return <div>Capsule not found</div>;

  return (
    <div className="capsule-detail-page">
      <div className="capsule-content">
        <h2>Your Timeless Message</h2>
        <p>On {new Date(capsule.createdAt).toLocaleDateString()}, you locked a special message for yourself that you wanted to withstand the test of time.</p>
        <div className="capsule-message">
          <p>"{capsule.contents.find(c => c.type === 'text')?.text}"</p>
        </div>
      </div>
    </div>
  );
}