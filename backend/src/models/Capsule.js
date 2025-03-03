const mongoose = require('mongoose');

const capsuleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  unlockDate: {
    type: Date,
    required: true
  },
  isLocked: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  unlockedAt: {
    type: Date,
    default: null
  }
}, {
  methods: {
    // Method to check if capsule is unlockable
    isUnlockable() {
      return this.isLocked && new Date() >= this.unlockDate;
    },

    // Method to unlock the capsule
    unlock() {
      if (this.isUnlockable()) {
        this.isLocked = false;
        this.unlockedAt = new Date();
        return true;
      }
      return false;
    }
  }
});

module.exports = mongoose.model('Capsule', capsuleSchema);