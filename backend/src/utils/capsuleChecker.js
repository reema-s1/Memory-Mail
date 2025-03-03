const Capsule = require('../models/Capsule');

const checkCapsules = async () => {
  const now = new Date();
  
  try {
    // Find all locked capsules with openDate in the past
    await Capsule.updateMany(
      {
        isLocked: true,
        openDate: { $lte: now }
      },
      {
        $set: { isLocked: false }
      }
    );
  } catch (error) {
    console.error('Error checking capsules:', error);
    throw error;
  }
};

module.exports = { checkCapsules };