import jwt from "jsonwebtoken";
import  _config  from "../config/config.js";
import Admin from "../models/admin.models.js"

// for access token 

export const  generate_access_token = (user_id)=>{
    return jwt.sign({sub : user_id.toString() }, _config.access_token , {expiresIn : "15min"}) ;
}

// for refresh token 

export const generate_refresh_token = (user_id)=>{
    return jwt.sign({sub : user_id.toString()} , _config.refresh_token , {expiresIn : "7d"})
}


export const verify_token = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization required" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, _config.access_token);
        req.userId = decoded.sub;

        // Check if admin
        const admin = await Admin.findById(decoded.sub);
        if (admin) {
            req.role = "admin";
            req.adminId = decoded.sub;
            return next();
        }

        // Check if user
        const user = await User.findById(decoded.sub);
        if (user) {
            req.role = "user";
            return next();
        }

        return res.status(403).json({ message: "User not found" });

    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

// Admin-only guard
export const require_admin = (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};

// refresh handler 
export const refresh_handler = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
    }

    try {
        const decoded = jwt.verify(refreshToken, _config.refresh_token);
        const userId = decoded.sub;
        const userType = decoded.type || decoded.role; // depends on your token payload

        let account;

        // Check Admin first, then User
        account = await Admin.findById(userId);
        
        if (!account) {
            account = await User.findById(userId);
        }

        if (!account || account.refresh_token !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Issue new tokens
        const new_access_token = generate_access_token(account._id, account.role || 'user');
        const new_refresh_token = generate_refresh_token(account._id, account.role || 'user');

        account.refresh_token = new_refresh_token;
        await account.save();

        res.cookie("refreshToken", new_refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ 
            access_token: new_access_token,
            role: account.role || 'user'  // optional: send role for frontend routing
        });

    } catch (err) {
        return res.status(401).json({ message: "Invalid refresh token or expired" });
    }
};