const express = require('express');
const authenticateToken = require('../middleware/auth');
const Capsule = require('../models/Capsule'); // Assuming Capsule model exists

const router = express.Router();

// Capsule Creation Endpoint
// Capsule Creation Endpoint
router.post('/', authenticateToken, async (req, res) => {
  const { title, message, unlockDate } = req.body; // Include unlockDate in destructuring

  try {
    // Validate that unlockDate is provided
    if (!unlockDate) {
      return res.status(400).json({ message: 'Unlock date is required' });
    }

    // Create a new capsule with the required fields
    const newCapsule = new Capsule({
      title,
      message,
      unlockDate, // Save unlockDate
      userId: req.user.userId, // Use the authenticated user's ID from the token
    });

    await newCapsule.save();

    res.status(201).json({
      message: 'Capsule created successfully',
      newCapsule,
    });
  } catch (error) {
    console.error('Error creating capsule:', error);
    res.status(500).json({ message: 'Failed to create capsule', error });
  }
});


// Fetch Capsules for the Authenticated User
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    // Find the capsule and ensure it belongs to the authenticated user
    const capsule = await Capsule.findOne({ 
      _id: id, 
      userId: userId 
    });

    if (!capsule) {
      return res.status(404).json({ 
        success: false, 
        message: 'Capsule not found or unauthorized' 
      });
    }

    // Check if capsule is unlockable
    const currentDate = new Date();
    const unlockDate = new Date(capsule.unlockDate);

    if (currentDate < unlockDate && capsule.isLocked) {
      return res.status(403).json({ 
        success: false,
        message: 'Capsule is not yet unlockable',
        unlockDate: capsule.unlockDate
      });
    }

    // If capsule is locked and ready to be unlocked, update its status
    if (capsule.isLocked) {
      capsule.isLocked = false;
      capsule.unlockedAt = currentDate;
      await capsule.save();
    }

    res.status(200).json({
      success: true,
      capsule
    });
  } catch (error) {
    console.error('Error fetching capsule details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching capsule', 
      error: error.message 
    });
  }
});


// Add this route to fetch all capsules for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const capsules = await Capsule.find({ 
      userId: userId 
    }).sort({ createdAt: -1 });

    // Check and update lock status for each capsule
    const updatedCapsules = capsules.map(capsule => {
      const currentDate = new Date();
      const unlockDate = new Date(capsule.unlockDate);

      if (currentDate >= unlockDate && capsule.isLocked) {
        capsule.isLocked = false;
        capsule.unlockedAt = currentDate;
      }

      return capsule;
    });

    // Save updated capsules
    await Promise.all(updatedCapsules.map(capsule => capsule.save()));

    res.status(200).json({
      success: true,
      capsules: updatedCapsules
    });
  } catch (error) {
    console.error('Error fetching capsules:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching capsules', 
      error: error.message 
    });
  }
});



// Delete a Capsule by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; // This adds the user ID check

  console.log('Delete request details:', { 
    capsuleId: id, 
    userId: userId 
  }); // Additional logging for debugging

  try {
    const deletedCapsule = await Capsule.findOneAndDelete({ 
      _id: id, 
      userId: userId // This ensures the capsule belongs to the user
    });

    if (!deletedCapsule) {
      console.log('Capsule not found or unauthorized:', { id, userId });
      return res.status(404).json({ 
        success: false, 
        message: 'Capsule not found or you do not have permission to delete' 
      });
    }

    console.log('Capsule deleted successfully:', deletedCapsule._id);

    res.status(200).json({
      success: true,
      message: 'Capsule deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting capsule:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting capsule', 
      error: error.message 
    });
  }
});

module.exports = router;
