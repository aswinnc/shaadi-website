const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Don't allow password update via this route normally, but if needed:
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // Don't allow updating email to an existing one
        if (updates.email && updates.email !== user.email) {
            const existing = await User.findOne({ where: { email: updates.email } });
            if (existing) {
                return res.status(409).json({ message: 'Email already currently used by another account' });
            }
        }

        await user.update(updates);

        // Return updated user (excluding password)
        const updatedUser = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        // Re-issue token might be good practice if critical info changed, but for now just return success
        // Or just return the same structure frontend expects
        const jwt = require('jsonwebtoken');
        const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_shaadi';
        const token = jwt.sign({ id: updatedUser.id, email: updatedUser.email }, JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({
            message: 'Profile updated successfully',
            token,
            user: updatedUser
        });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.requestReset = async (req, res) => {
    // Mock implementation
    res.status(200).json({ message: 'OTP sent to email (Mock)' });
};

exports.resetPassword = async (req, res) => {
    // Mock implementation
    res.status(200).json({ message: 'Password reset successfully (Mock)' });
};
