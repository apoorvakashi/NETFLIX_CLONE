import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        console.log(req.body);
        const {email,password,username} = req.body;
        if (!email || !password || !username){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message:"Invalid email"})
        }
        if (password.length < 6){
            return res.status(400).json({success:false, message:"Password must be at least 6 characters"})
        }
        const existingUserByEmail = await User.findOne({email});
        if (existingUserByEmail){
            return res.status(400).json({success:false, message:"User with this email already exists"})
        }
        const existingUserByUsername = await User.findOne({username});
        if (existingUserByUsername){
            return res.status(400).json({success:false, message:"User with this username already exists"})
        }

        const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const randomIndex = Math.floor(Math.random() * PROFILE_PIC.length);
        const profilePic = PROFILE_PIC[randomIndex];
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email:email,
            password:hashedPassword,
            username:username,
            image:profilePic
        });

        generateTokenAndSetCookie(res, newUser._id);
        await newUser.save();
        res.status(201).json({success:true, user:{...newUser._doc, password:""}});

    } catch (error) {
        console.log("Error in signup controller : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}
export async function login(req, res) {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"Invalid credentials!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success:false, message:"Invalid credentials"})
        }
        console.log("Here")
        generateTokenAndSetCookie(res, user._id);
        res.status(201).json({success:true, user:{...user._doc, password:""}});

    } catch (error) {
        console.log("Error in login controller : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true, message:"Logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}