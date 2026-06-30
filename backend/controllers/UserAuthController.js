const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ 
            $or: [{ email: email }, { username: username }] 
        });
        if (existingUser) {
            return res.status(400).send({ message: "User with this email or username already exists!" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        return res.status(201).send({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Signing Up!" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User Not Found!" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }
        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
        },
            process.env.JWT_KEY
        );
        res.cookie("token", jwtToken, {
            path:"/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly:true,
            secure:true,
            sameSite:"lax"
        });
        return res.status(200).send({ user, jwtToken });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error Logging In!" });
    }
};

exports.logout=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).send({message:"logged out successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Error Logging Out!"})
    }
}

