import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const AuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        req.user = user;
        next(); 
    }catch (error) {
        console.log(error.message);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}