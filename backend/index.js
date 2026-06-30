require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserAuthRouter = require("./routes/UserAuthRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const { dbConnect } = require("./lib/dbConnect");

const app = express();

// Tell the backend to allow requests from your frontend React app
app.use(cors({
    origin: ["http://localhost:5173", "https://dev-dash-kappa.vercel.app"],
    credentials: true // Crucial because your login sets a JWT cookie!
}));

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
dbConnect();

app.use("/user", UserAuthRouter);
app.use("/api/profile", ProfileRouter);

app.listen(4000, () => {
    console.log("Server Successfully Running at port 4000")
})