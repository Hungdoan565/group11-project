const express = require('express');
const app = express();

const userRoutes = require('./routers/users.js');
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});