import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // Import using ESM syntax

// POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, country } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password || !country) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2. Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    const user = new User({ name, email, password: hashedPassword, country });
    await user.save();

    // 5. Respond to the client
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Signup failed', message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 3. Create JWT payload
    const payload = { userId: user._id };

    // 4. Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    // 5. Send token and basic user info
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
};
