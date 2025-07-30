import { generateToken } from '../utils/token.js';

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = {
      _id: "owner_fake_id",
      name: "Owner",
      email: email,
      role: "owner",
    };

    const token = generateToken({ _id: user._id, role: user.role });

    res.json({
      success: true,
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
