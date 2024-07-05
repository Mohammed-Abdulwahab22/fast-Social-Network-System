const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(bodyParser.json()); 

app.use('/api/auth', require('./routes/auth'));
app.use('/api/friendship', require('./routes/friendship'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/notifications', require('./routes/notifications'));



io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      socket.join(userId);
      console.log(`User ${userId} connected`);
    }
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = io;
