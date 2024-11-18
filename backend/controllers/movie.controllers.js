import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({success:true, content:randomMovie});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error in getTrendingMovie"});
        
    }
}

export async function getMovieTrailers(req, res) {
    try {
        const {id} = req.params;
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US'.replace('movie_id', id));
        res.json({success:true, content:data.results});
        
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false, message: "Internal Server Error in getMovieTrailers"});
    }
}

export async function getMovieDetails(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/movie_id?language=en-US'.replace('movie_id', id));
        res.json({success:true, content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false, message:"Internal Server Error in getMovieDetails"})
    }
}

export async function getSimilarMovies(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1'.replace('movie_id', id));
        res.json({success:true, similar:data.results});
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error in getSimilarMovies"})
    }
}

export async function getMoviesByCategory(req, res) {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/category?language=en-US&page=1'.replace('category', category));
        res.json({success:true, content:data.results});
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error in getMoviesByCategory"})
        
    }
}
