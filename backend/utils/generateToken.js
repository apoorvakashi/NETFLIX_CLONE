import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/envVars.js";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {
        expiresIn: "15d"
    });

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in millliseconds
        httpOnly: true, //prevents XSS attacks, make it not accessible ny JS
        sameSite: "strict", //prevents CSRF attacks
        secure: ENV_VARS.NODE_ENV !== "development",
});

    return token;
};