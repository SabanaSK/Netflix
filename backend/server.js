import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/users";
import moviesRoutes from "./routes/movies";

const app = express();
const port = 3000;
const logger = (req, res, next) => {
  console.log(`${req.method}  ${req.url}`, req.body);
  next();
};

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(logger);
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
