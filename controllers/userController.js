import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from "../models/userModel.js";
import mongoose from 'mongoose';
// import { generateCookie } from '../utils/features.js';

//Creating the user
const userRegister = async (req,res) =>{
    const {name,email,password} = req.body

    //Check if the user exists already or not
    let user = await UserModel.findOne({email})
    if(user) return res.status(404).json({
        success : false,
        message : "User already exists..."
    })
   
    //If user does not exist then we need to register the user with hash password.
    const hashPassword = await bcrypt.hash(password , 10)
    user = await UserModel.create({
        name,
        email,
        password:hashPassword
    })

    //token
    // const token = jwt.sign({user}, '!@#$%^&*()')
    const token = jwt.sign({_id:user._id}, '!@#$%^&*()')
    console.log(token);

    res.status(201).cookie("token" , token,{
        httpOnly: true,
        maxAge: 10*60*1000
    }).json({
        success: true,
        message : "User Register successfully"
    })
}


const userLogin = async (req,res) =>{
    const {email,password} = req.body

    //Check user exists or not
    let user = await UserModel.findOne({email})

    //if user does not exists then
    if(!user) return res.status(400).json({
        success : false,
        message : "User Not exists..."
    })

    //if user exist with email then we will verify the password compare(loginpassword , hasPassword)
    const isMatch = await bcrypt.compare(password , user.password)

    //if password does not match then
    if(!isMatch) return res.status(400).json({
        success : false,
        message : "Invalid Credentials..."
    })
    
    //If password matche then

    //token
    // const token = jwt.sign({user}, '!@#$%^&*()')
    const token = jwt.sign({_id:user._id}, '!@#$%^&*()')
    console.log(token);

    res.status(201).cookie("token" , token,{
        httpOnly: true,
        maxAge: 10*60*1000
    }).json({
        success: true,
        message : `Welcome ${user.name}`
    })
}


export {userRegister , userLogin}