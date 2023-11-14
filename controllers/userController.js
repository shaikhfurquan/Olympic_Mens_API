import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from "../models/userModel.js";
import generateCookie from '../utils/feature.js';


//user Registration Controller
const userRegister = async (req, res) => {
    const { name, email, password } = req.body

    //Check if the user exists already or not
    let user = await UserModel.findOne({ email })
    if (user) return res.status(404).json({
        success: false,
        message: "User already exists..."
    })

    //If user does not exist then we need to register the user with hash password.
    const hashPassword = await bcrypt.hash(password, 10)
    user = await UserModel.create({
        name,
        email,
        password: hashPassword
    })
    generateCookie(user, res, 201, "User Register successfully...")
}

//User Login Controller
const userLogin = async (req, res) => {
    const { email, password } = req.body

    //Check user exists or not
    let user = await UserModel.findOne({ email })

    //if user does not exists then
    if (!user) return res.status(400).json({
        success: false,
        message: "User Not exists..."
    })

    //if user exist with email then we will verify the password compare(loginpassword , hasPassword)
    const isMatch = await bcrypt.compare(password, user.password)

    //if password does not match then
    if (!isMatch) return res.status(400).json({
        success: false,
        message: "Invalid Credentials..."
    })

    //If password matche then
    generateCookie(user, res, 201, `Welcome ${user.name}`)
}

//User Logout Controller
const userLogout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged-Out successfully..."
    })
}

//My Profile
const getMyProfile = (req,res) =>{
    res.status(200).json({
        success: true,
        user:req.user

    })
}

//Get  user by Id
const getUserById = async (req, res) =>{
    const id = req.params.id
    const user = await UserModel.findById(id)

    if(!user) return res.status(404).json({
        success: false,
        message : "Invalid ID"
    })

    res.send({
        success: true,
        message: "This is the user",
        user
    })

}

export { userRegister, userLogin, userLogout , getMyProfile , getUserById}