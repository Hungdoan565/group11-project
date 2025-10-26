const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });

// Middlewares
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://*.vercel.app',
  process.env.FRONTEND_URL // Add your Vercel URL in env
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard domains
        const pattern = new RegExp(allowedOrigin.replace('*', '.*'));
        return pattern.test(origin);
      }
      return origin === allowedOrigin;
    });
    
    if (isAllowed || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require("./routers/auth.js");
const profileRoutes = require("./routers/profile.js");
const uploadRoutes = require("./routers/upload.js");
const userRoutes = require("./routers/users.js");
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", userRoutes);

// DB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn(
    "Warning: MONGODB_URI is not set in environment. Set it in backend/.env"
  );
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
