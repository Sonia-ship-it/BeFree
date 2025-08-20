const bcrypt=require('bcrypt')
const {User} = require('../models/userSchema')
const Joi = require('joi')
const route=require('express').Router()
route.post('/', async(req,res) => {
    try{
    const {error} = validate(req.body)
    if (error)
        res.status(400).send({message: error.details[0].message})
    const user= await User.findOne({name: req.body.name})
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
        name: Joi.string().required().label("Name"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data)
}

module.exports=route