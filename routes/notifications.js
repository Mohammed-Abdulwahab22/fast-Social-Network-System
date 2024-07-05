const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.put('/:id/read', async (req, res) => {
  try {
    const notificationId = req.params.id;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ error: 'Error marking notification as read' });
  }
});

module.exports = router;
