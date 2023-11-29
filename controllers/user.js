const userCollection = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios');

const home = (req, res) => {
    res.json({
        success : true,
        message : 'working route'
    })
}

const register = async (req, res) => {
    const {fullName, email, password, age, gender, mobile} = req.body
    try {
        const user = await userCollection.findOne({email})
        if(user){
            return res.status(409).json({
                success : false,
                message : 'User Already exists'
            })
        }

        const hashed_password = await bcrypt.hash(password, 10)

        const new_user = await userCollection.create({fullName, email, password : hashed_password, age, gender, mobile})

        const token = jwt.sign({_id : new_user._id}, process.env.JWT_SECRET)

        res.cookie('token', token, {httpOnly : true, maxAge : 15 * 60 * 1000}).status(201).json({
            success : true,
            message : 'Registered Successfully !!'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : error
        })
    }
}


const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userCollection.findOne({email}).select('+password')
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User doesn't exists"
            })
        }

        const password_match = await bcrypt.compare(password, user.password)
        
        if(password_match){
            const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET)
            return res.status(200).cookie("token", token, {httpOnly : true, maxAge : 15 * 60 * 1000}).json({
                success : true,
                message : 'Logged in successfully'
            })
        }

        res.status(500).json({
            success : true,
            message : 'incorrect email or password'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : error
        })
    }

}

const health = (req, res) => {
    const server = 'http://localhost:5000/api/v1';

    axios.get(server)
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'The week list server',
                current_time: new Date(),
                status: "ACTIVE"
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'The week list server',
                current_time: new Date(),
                status: "INACTIVE"
            });
        });
};


const notFound = (req, res) => {
    res.status(404).json({
        success : false,
        message : 'Route Not Found'
    })
}


module.exports = {home, register, login, notFound, health}