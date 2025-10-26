const User = require("../models/User");

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    // Ensure id field exists on lean docs similar to toJSON transform
    const normalized = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar || "",
      coverPhoto: u.coverPhoto || "",
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));
    res.json(normalized);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email, and Password are required" });
    }
    const user = await User.create({ name, email, password, role: role || 'user' });
    res
      .status(201)
      .json({ 
        id: user._id.toString(), 
        name: user.name, 
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        coverPhoto: user.coverPhoto || "",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, avatar, coverPhoto } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (coverPhoto !== undefined) updateData.coverPhoto = coverPhoto;
    
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ 
      id: user._id.toString(), 
      name: user.name, 
      email: user.email,
      role: user.role,
      avatar: user.avatar || "",
      coverPhoto: user.coverPhoto || "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: err.message });
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
};

// GET /users/me - Get current user info with role
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || "",
      coverPhoto: user.coverPhoto || "",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info", error: err.message });
  }
};
