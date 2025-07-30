import { generateToken } from '../utils/token.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = [
      {
        _id: "owner_id_123",
        email: "zainab123@gmail.com",
        password: "admin123", 
        name: "Zainab Owner",
        role: "owner"
      },
      {
        _id: "user_id_456",
        email: "user@example.com",
        password: "user123",
        name: "Sample User",
        role: "user"
      }
    ];

    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({ _id: user._id, role: user.role });

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
