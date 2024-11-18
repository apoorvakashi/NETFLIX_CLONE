import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/envVars.js";
import { User } from "../models/user.model.js";

export const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        if(!token){
            return res.status(401).json({success:false, message:"Unauthorized : No token found"});
        }
        const decodedToken = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({success:false, message:"Unauthorized : Invalid token"});
        }
        const user = await User.findById(decodedToken.userId).select("-password");
        if (!user) {
            return res.status(401).json({success:false, message:"Unauthorized : User not found"});
        }
        req.user = user;
        next();
            
    } catch (error) {
        console.log("Error in protectRoutes middleware : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
    

    
    
}