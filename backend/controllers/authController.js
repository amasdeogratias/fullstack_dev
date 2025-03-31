const HttpError = require("../models/errorModel");
const { models } = require("../models");
const User = models.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

//POST METHOD
//REGISTER
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return next(new HttpError("Fill all fields", 422));
        }

        //change email to lowercase
        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({ where: { email: newEmail } });
        if(emailExists){
            return next(new HttpError("User with this email exists, create new one", 422));
        }

        if((password.trim()).length < 6){
            return next(new HttpError('Password must be atleast 6 characters and more. ', 422));
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({name, email: newEmail, password: hashedPass});
        res.status(201).json(newUser);
    } catch (error) {
        return next(new HttpError(error))
    } 
}

//POST METHOD
//LOGIN
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if(!email || !password){
            return next(new HttpError("Fill in all fields. ", 422)); //validation
        }

        const newEmail = email.toLowerCase();

        const user = await User.findOne({where:{email: newEmail}});
        if(!user){
            return next(new HttpError("Invalid email.", 422)); 
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass){
            return next(new HttpError("Invalid password.", 422));
        }

        //generate token
        const { id, name } = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(200).json({id, name, token});

    } catch (error) {
        return next(new HttpError(error))
    }  
}

//GET METHOD
//LOGIN
const getUser = (req, res, next) => {
    try {
        res.json("register")
    } catch (error) {
        return next(new HttpError(error))
    }  
}



module.exports = { login, register, getUser }