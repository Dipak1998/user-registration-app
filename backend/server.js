const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
