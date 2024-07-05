const io = require('../server');
const Notification = require('../models/Notification');

const sendNotification = async (userId, type, message) => {
  try {
    const notification = new Notification({ userId, type, message });
    await notification.save();
    
    io.to(userId.toString()).emit('notification', { type, message });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = sendNotification;
