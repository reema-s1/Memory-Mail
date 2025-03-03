import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './stylesheet/Settings.css'; // Import the CSS file

export default function Settings() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email || '',
    notifications: true,
    emailUpdates: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log('Settings updated:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h1 className="settings-header">Account Settings</h1>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-section">
            <h2 className="section-title">Profile Information</h2>
            <div className="field-group">
              {/* <div className="form-field">
                <label htmlFor="name" className="field-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="field-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div> */}
              <div className="form-field">
                <label htmlFor="email" className="field-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="field-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Notifications</h2>
            <div className="checkbox-group">
              <div className="checkbox-field">
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  className="checkbox-input"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                <label htmlFor="notifications" className="checkbox-label">
                  Push Notifications
                </label>
                <p className="checkbox-description">
                  Receive notifications when your time capsules are unlocked.
                </p>
              </div>
              <div className="checkbox-field">
                <input
                  id="emailUpdates"
                  name="emailUpdates"
                  type="checkbox"
                  className="checkbox-input"
                  checked={formData.emailUpdates}
                  onChange={handleChange}
                />
                <label htmlFor="emailUpdates" className="checkbox-label">
                  Email Updates
                </label>
                <p className="checkbox-description">
                  Receive email notifications about your time capsules.
                </p>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
