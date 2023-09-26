import express from "express";
import moviesData from '../movies.json';

const router = express.Router();


const isAuthenticated = (req, res, next) => {
  const authToken = req.cookies.authToken;
  if(authToken && authToken === "is-authenticated") {
    next();
  } else {
    res.status(401).json({ errorMessage: "Not authorized" });
  }
}

router.get("/", isAuthenticated, (req, res) => {
  res.json(moviesData);
});

export default router;