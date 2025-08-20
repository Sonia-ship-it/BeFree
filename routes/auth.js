const bcrypt=require('bcrypt')
const {User, validate} = require('../models/userSchema')
const Joi = require('joi')
const route=require('express').Router()
route.post('/', async(req,res) => {
    try{
    const {error} = validate(req.body)
    if (error)
        res.status(400).send({message: error.details[0].message})
    const user= await User.findOne({email: req.body.email})
    if(!user) 
        res.status(401).send({message: "Invalid Email or Password"})
    const validPassword=bcrypt.compare(req.body.password,user.password)
    if(!validPassword)
          res.status(401).send({message: "Invalid Email or Password"})
    const token = user.generateAuthToken();
    res.status(200).send({data: token, message: "Logged in successfully"})
    } catch(error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})
const validate=(data) => {
    const schema=Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data)
}

module.exports.route