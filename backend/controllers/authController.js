const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const { default: mongoose } = require("mongoose")

function getUser(token) {
    return jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
            return null;
        }
        return user;
    });

}

const test = (req,res) => {
    res.json("test is working")
}

const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body
        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'name is requried'
            })
        }
        // Check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'password is required and +6 char long'
            })
        }
        const exit = await User.findOne({email})
        if (exit) {
            return res.json({
                error: 'email already in db'
            })
        }
        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }

}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            res.json({
                error:"email doesn't exist"
            })
        } 
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({
                email:user.email,
                id: user._id,
                name: user.name
            }, process.env.JWT_SECRET, {}, (err,token) => {
                if(err) throw err
                res.cookie('token',token).json(user)
            })
        }
        if(!match){
            res.json({
                error:"Password doesn't match"
            })
        }
    } catch(error) {
        console.log(error)
    }
}

const getProfile = (req,res) => {
    res.json(getUser(req.cookies['token']))
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}