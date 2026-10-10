const mongoose = require("mongoose");

exports.dbConnect = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) {
            console.error("⚠️  MongoDB URI not found! Please set MONGODB_URI in your backend/.env file.");
            return;
        }
        await mongoose.connect(uri);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
}