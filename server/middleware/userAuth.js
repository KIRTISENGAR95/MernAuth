// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//     try {
//         // Get token from cookies
//         const token = req.cookies;

//         if (!token) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Not Authorized. Login Again' 
//             });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (!decoded?.id) {
//             return res.status(401).json({ 
//                 success: false, 
//                 message: 'Invalid token. Login Again' 
//             });
//         }

//         // Initialize req.body if it doesn't exist
//         req.body = req.body || {};
        
//         // Set userId in req.body
//         req.body.userId = decoded.id;
        
//         next();
//     } catch (error) {
//         console.error('Auth Error:', error);
//         return res.status(401).json({ 
//             success: false, 
//             message: 'Authentication failed. Please login again.' 
//         });
//     }
// }

// export default userAuth;


import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
    
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!tokenDecode.id) {
            return res.json({ success: false, message: 'Invalid token. Login again' });
        }

        // Preserve existing request body and add userId
        req.body = {
            ...req.body,
            userId: tokenDecode.id
        };
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.json({ success: false, message: 'Authentication failed. Please login again.' });
    }
}

export default userAuth;