import React from 'react';
import { Lock, Unlock, Calendar, Users, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CapsuleCard.css';
import defImage from '../assets/timecap.jpg';

const imageArray = [
'https://images.unsplash.com/photo-1525663018617-37753d540108?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1495287924875-c158d2e8aafc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxwdXJwbGV8ZW58MHx8MHx8fDA%3D',
'https://images.unsplash.com/photo-1558350315-8aa00e8e4590?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ4fHxwdXJwbGV8ZW58MHx8MHx8fDA%3D',
'https://images.unsplash.com/photo-1499260320506-8144c5c33ddf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjUxfHxwdXJwbGV8ZW58MHx8MHx8fDA%3D',

];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  return imageArray[randomIndex];
};

export default function CapsuleCard({ capsule, onDelete }) {
  const navigate = useNavigate();

  const isUnlockingSoon =
    capsule.isLocked &&
    new Date(capsule.unlockDate) - new Date() < 7 * 24 * 60 * 60 * 1000; // 7 days in ms

  const imageContent = Array.isArray(capsule.contents)
    ? capsule.contents.find((content) => content.type === 'image')
    : null;

  const recipientsCount = Array.isArray(capsule.recipients) ? capsule.recipients.length : 1;
  // const imageSrc =  defImage;
  const imageSrc = imageContent ? imageContent.url : getRandomImage();

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent card click when delete button is clicked
    if (onDelete) {
      onDelete(capsule._id);
    }
  };

  const handleCapsuleClick = () => {
    // Only navigate if capsule is unlocked
    if (!capsule.isLocked) {
      navigate(`/capsule/${capsule._id}`);
    }
  };

  return (
    <div 
      onClick={handleCapsuleClick} 
      className={`capsule-card ${capsule.isLocked ? 'locked' : 'unlocked'}`}
    >
      {/* Image and Title Section */}
      <div className="capsule-image-section">
        {imageContent || (
          <img
          // src ='https://images.unsplash.com/photo-1495287924875-c158d2e8aafc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxwdXJwbGV8ZW58MHx8MHx8fDA%3D'
          src ={imageSrc}
          alt="Capsule attachment"
            className="capsule-image"
          />
        )}
        <div className="capsule-overlay" />
        <div className="capsule-text">
          <h3 className="capsule-title">{capsule.title}</h3>
          <p className="capsule-description">{capsule.description}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="capsule-details">
        {/* Lock Status */}
        <div className="capsule-lock-status">
          <div className="capsule-lock-info">
            {capsule.isLocked ? (
              <Lock className="capsule-lock-icon" />
            ) : (
              <Unlock className="capsule-unlock-icon" />
            )}
            <span className="capsule-lock-text">
              {capsule.isLocked ? 'Locked' : 'Unlocked'}
            </span>
          </div>
          {isUnlockingSoon && (
            <span className="capsule-unlock-soon">
              Unlocking Soon!
            </span>
          )}
        </div>

        {/* Unlock Date and Recipient Info */}
        <div className="capsule-info">
          <div className="capsule-date">
            <Calendar className="capsule-calendar-icon" />
            <span>{new Date(capsule.unlockDate).toLocaleDateString()}</span>
          </div>
          <div className="capsule-recipients">
            <Users className="capsule-users-icon" />
            <span>{recipientsCount} </span>
          </div>
        </div>

        {/* Actions: Delete */}
        <div className="capsule-actions">
          <button
            onClick={handleDelete}
            className="capsule-delete-button"
          >
            <Trash className="capsule-delete-icon" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}