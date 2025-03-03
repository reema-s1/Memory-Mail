// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { format } from 'date-fns';
// import './stylesheet/EditCapsule.css'; // Import the CSS file

// export default function EditCapsule() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState(null);

//   useEffect(() => {
//     // Mock API call to get capsule data
//     const mockCapsule = {
//       id: parseInt(id),
//       title: "Birthday Wishes",
//       message: "Happy 30th birthday! Here's to many more amazing years!",
//       recipientEmail: "friend@example.com",
//       unlockDate: "2024-12-25",
//       imageUrl: "https://placekitten.com/300/200"
//     };

//     setFormData(mockCapsule);
//     setLoading(false);
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // In a real app, this would be an API call
//     console.log('Capsule updated:', formData);
//     navigate('/dashboard');
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setFormData((prev) => ({
//         ...prev,
//         image: files[0]
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="edit-capsule-container">
//       <h1 className="edit-capsule-title">Edit Time Capsule</h1>
//       <form onSubmit={handleSubmit} className="edit-capsule-form">
//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             required
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="message">Message</label>
//           <textarea
//             id="message"
//             name="message"
//             rows={4}
//             required
//             value={formData.message}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="recipientEmail">Recipient Email</label>
//           <input
//             type="email"
//             id="recipientEmail"
//             name="recipientEmail"
//             required
//             value={formData.recipientEmail}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="unlockDate">Unlock Date</label>
//           <input
//             type="date"
//             id="unlockDate"
//             name="unlockDate"
//             required
//             min={format(new Date(), 'yyyy-MM-dd')}
//             value={formData.unlockDate}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Image (optional)</label>
//           {formData.imageUrl && (
//             <div className="current-image">
//               <img src={formData.imageUrl} alt="Current capsule" />
//             </div>
//           )}
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-actions">
//           <button type="button" onClick={() => navigate('/dashboard')} className="cancel-button">
//             Cancel
//           </button>
//           <button type="submit" className="submit-button">
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
