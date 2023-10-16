const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { createToken } = require('../helpers/generateJWT');

const login = async (req, res) => {
  const { email, password  } = req.body; 

  try {
    // Verify email validity
    const user = await User.search(email);
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });
    // Verify password validity
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid Password' });
    // Generate JWT
    const token = await createToken(user._id);
    // Send response
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login Successful',
      user: userWithoutPassword,
      token,
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Invalid Credentials'
    })
  }
}

module.exports = {
  login,
}