import { parse } from "dotenv";
import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
   

    const {query} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].profile_path,
                    title : data.results[0].name,
                    type : "person",
                    createdAt : new Date(),
                }
                
            }
        });
        res.status(200).json({success:true, content:data.results});
    } catch (error) {
        console.log("Error in searchPerson controller : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export async function searchMovie(req, res) {
    const {query} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory : {
                    id : data.results[0].id,
                    image : data.results[0].poster_path,
                    title : data.results[0].title,
                    type : "movie",
                    createdAt : new Date(),
                }
                
            }
        });
        res.status(200).json({success:true, content:data.results});

    } catch (error) {
        console.log("Error in searchMovie controller : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export async function searchTv(req, res) {
    const {query} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory : {
                id : data.results[0].id,
                image : data.results[0].poster_path,
                title : data.results[0].name,
                type : "tv",
                createdAt : new Date(),
                }
                
            }
        });
        res.status(200).json({success:true, content:data.results});

    } catch (error) {
        console.log("Error in searchMovie controller : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({success:true, content: req.user.searchHistory});
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}

export async function removefromSearchHistory(req, res) {
    let {id} = req.params;
    id = parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {
                searchHistory : {
                    id : id
                }
            }
        })
        res.status(200).json({success:true, message: "Item removed from search history"});
    } catch (error) {
        console.log("Error in removefromSearchHistory controller : " + error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}
