const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const userRoutes = require('./routers/users.js');
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});