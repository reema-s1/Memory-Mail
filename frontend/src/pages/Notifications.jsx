import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './stylesheet/Notifications.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Process capsules to generate notifications
        const notifications = generateNotifications(result.capsules);
        setNotifications(notifications);
      } catch (err) {
        setError(err.message || 'Error fetching capsules');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  const generateNotifications = (capsules) => {
    const now = new Date();
    const notifications = [];

    // Example deleted capsules tracking
    const deletedCapsules = JSON.parse(localStorage.getItem('deletedCapsules') || '[]');

    // Notifications for capsules
    capsules.forEach((capsule) => {
      if (capsule.unlockDate && new Date(capsule.unlockDate) > now) {
        const daysUntilUnlock = Math.ceil(
          (new Date(capsule.unlockDate) - now) / (1000 * 60 * 60 * 24)
        );

        if (daysUntilUnlock <= 7) {
          notifications.push({
            id: capsule._id,
            title: `Capsule Unlocks Soon`,
            message: `Your capsule "${capsule.title}" will unlock in ${daysUntilUnlock} days.`,
            date: capsule.unlockDate,
            read: false,
          });
        }
      } else if (capsule.unlockDate && new Date(capsule.unlockDate) <= now) {
        notifications.push({
          id: capsule._id,
          title: `Capsule Unlocked`,
          message: `Your capsule "${capsule.title}" is now unlocked!`,
          date: capsule.unlockDate,
          read: false,
        });
      }
    });

    // Notifications for deleted capsules
    deletedCapsules.forEach((deleted) => {
      notifications.push({
        id: deleted.id,
        title: `Capsule Deleted`,
        message: `Your capsule "${deleted.title}" was deleted.`,
        date: deleted.date,
        read: false,
      });
    });

    return notifications;
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('deletedCapsules'); // Clear deleted capsules record
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={() =>
                setNotifications(notifications.map((n) => ({ ...n, read: true })))
              }
              className="mark-all-button"
            >
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={deleteAllNotifications}
              className="delete-all-button"
            >
              Delete All Notifications
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {notifications.length === 0 ? (
        <div className="empty-notifications">
          <div className="bell-icon" />
          <h3>No notifications</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <p className="notification-date">
                  {format(new Date(notification.date), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="mark-read-button"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
