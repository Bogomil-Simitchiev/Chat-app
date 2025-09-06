import { Router } from 'express';
import User from '../../models/User.js';

const router = Router();

router.post('/add-friend', async (req, res) => {
    try {
        const { senderNickname, recipientNickname } = req.body;

        if (senderNickname === recipientNickname) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself." });
        }
        const sender = await User.findOne({ nickname: senderNickname }).collation({ locale: 'en', strength: 2 });
        const recipient = await User.findOne({ nickname: recipientNickname }).collation({ locale: 'en', strength: 2 });

        if (!sender || !recipient) {
            return res.status(404).json({ message: "User not found." });
        }

        if (sender.friends.includes(recipient._id) || recipient.friends.includes(sender._id)) {
            return res.status(400).json({ message: "You are already friends." });
        }

        if (recipient.requests.includes(sender._id)) {
            return res.status(400).json({ message: "Friend request already sent." });
        }
        
        recipient.requests.push(sender._id);
        await recipient.save();

        res.json({ message: `Friend request sent to ${recipientNickname}.` });
    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ message: "Server error." });
    }
});

router.get('/requests/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('requests', 'nickname email');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ requests: user.requests });
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// Additional routes for accepting/declining requests and removing friends can be added here

export default router;
