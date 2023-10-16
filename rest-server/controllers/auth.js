const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { createToken } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

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
    const jwtToken = await createToken(user._id);
    // Send response
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login Successful',
      user: userWithoutPassword,
      token: jwtToken,
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Invalid Credentials'
    })
  }
}

const googleSignIn = async (req, res) => {
  try {
    // Get token
    const { token } = req.body;
    // Verify token
    const googleUser = await googleVerify(token);
    // // Verify if user exists
    let user =  await User.search(googleUser.email);
    if (!user) {
      // Create user
      user = new User(
        googleUser.given_name,
        googleUser.email,
        'XXXXXX',
        true,
        true,
        'USER',
      );
      await user.save();
    }
    // Generate JWT
    const jwtToken = await createToken(user._id);
    
    // Send response
    res.json({
      user,
      token: jwtToken
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Invalid Token'
    })
  }
}

module.exports = {
  login,
  googleSignIn
}