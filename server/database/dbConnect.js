const mongoose = require('mongoose');

// Connect to MongoDB

module.exports = mongoose.connect(process.env.DASTABASE_URL)
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.error('Connection error:', err));
