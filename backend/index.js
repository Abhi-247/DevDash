require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const UserAuthRouter = require("./routes/UserAuthRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const OutreachRouter = require("./routes/OutreachRouter");
const { dbConnect } = require("./lib/dbConnect");

const app = express();

// Tell the backend to allow requests from your frontend React app
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://dev-dash-abhi.vercel.app",
    "https://dev-dash-kappa.vercel.app",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS policy"));
    },
    credentials: true
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cookieParser());

// Connect to MongoDB
dbConnect();

app.use("/user", UserAuthRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/outreach", OutreachRouter);

app.listen(4000, () => {
    console.log("Server Successfully Running at port 4000")
})