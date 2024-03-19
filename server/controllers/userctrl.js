const Users = require('../models/user');
const bcrypt = require('bcrypt');

const userctrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if the email is already registered
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ msg: "Email already registered" });
            }

            // Validate password length
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters" });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create a new user object with the hashed password
            const newUser = new Users({
                name, email, passwordHash
            });

            // Save the new user to MongoDB
            await newUser.save();

            // Respond with success message
            return res.json({ msg: "Registration successful" });
        } catch (err) {
            // If an error occurs, respond with a server error message
            return res.status(500).json({ msg: "Failed to register user", error: err.message });
        }
    }
};

module.exports = userctrl;
