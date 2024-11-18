import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({success:true, content:randomMovie});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
        
    }
}

export async function getTvTrailers(req, res) {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/tv_id/videos?language=en-US'.replace('tv_id', id));
        res.json({success:true, content:data.results});
        
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

export async function getTvDetails(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/tv_id?language=en-US'.replace('tv_id', id));
        res.json({success:true, content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export async function getSimilarTvs(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/tv_id/similar?language=en-US&page=1'.replace('tv_id', id));
        res.json({success:true, similar:data.results});
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export async function getTvsByCategory(req, res) {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/category?language=en-US&page=1'.replace('category', category));
        res.json({success:true, content:data.results});
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}
