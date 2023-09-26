import express from "express"

const router = express.Router()

const usersDB = [
  {
    username: "admin",
    password: "password123",
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = usersDB.find((u) => u.username === username && u.password === password);

  if (user) {
    const authToken = "is-authenticated";
    res.cookie("authToken", authToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1day 
    });
    res.json({ authToken });
  } else {
    res.status(401).json({ errorMessage: "Invalid username or password" });
  }
});


export default router;