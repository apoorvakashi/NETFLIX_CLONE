import express from 'express';
import { searchPerson, searchMovie, searchTv, getSearchHistory, removefromSearchHistory } from '../controllers/search.controllers.js';

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getSearchHistory);

router.delete("/history/:id", removefromSearchHistory);



export default router;