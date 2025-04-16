import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('Received userId:', userId);
        
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID not found' });
        }

        const user = await userModel.findById(userId);
        console.log('Found user:', user);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const userData = {
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            }
        };
        console.log('Sending user data:', userData);
        
        res.status(200).json(userData);

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}