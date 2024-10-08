import { User } from "../models/user.models";
import { generateToken } from "../utils/features";
import httpStatus from "http-status";
import asyncHandler from "../utils/asyncHandler";
import crypto from "crypto";

export const registerUser = asyncHandler(async (req, res) => {
    const {name, username, password} = req.body;

    if(!name || !username || !password){
        throw new Error("Invalid Inputs");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(httpStatus.FOUND).json({
            success : false,
            message : "User already exist"
        })
    }

    const token = await generateToken(username);

    const user = await User.create({
        name, username, password, token
    })

    if(!user){
        throw new Error("Something went wrong while creating new user");
    }

    res.status(httpStatus.CREATED).json({
        success : true,
        message : "User registered successfully"
    })
})

export const loginUser = asyncHandler( async (req,res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.json({message : "Invalid Inputs"})
    }

    const isUser = await User.findOne({username});
    if(!isUser){
        return res.status(404).json({
            message : "No user found with given username"
        })
    }

    if(isUser.isPasswordCorrect(password)){
        const token = crypto.randomBytes(20).toSting('hex');

        user.token = token;
        await user.save();
        
        return res.status(httpStatus.OK).json({
            token : token
        })
    }
    
})