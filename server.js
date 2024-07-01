const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

connectDB();

app.use(bodyParser.json()); 

app.use('/api/auth', require('./routes/auth'));
app.use('/api/friendship', require('./routes/friendship'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

