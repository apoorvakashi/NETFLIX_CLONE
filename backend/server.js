// const express = require('express'); //common js
import express from 'express'; //es

import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";


import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoutes } from './middleware/protectRoutes.js';

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movies", protectRoutes, movieRoutes)
app.use("/api/v1/tv", protectRoutes, tvRoutes)
app.use("/api/v1/search", protectRoutes, searchRoutes)




app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
    connectDB();
});