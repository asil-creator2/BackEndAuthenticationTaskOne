const userModel = require('../models/user.schema.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
exports.register = async (req, res) => {
    try{
        let newUser = new userModel(req.body)
        const hashedPassword = await bcrypt.hash(req.body.password , 10)
        newUser.password = hashedPassword
        let user = await newUser.save()
        return res.json({message : 'User Added successfully' , status : 200 , user : {phone : user.phone}})
    } catch(error){
        console.log(`Error : ${error}`)
    }
}

exports.login = async (req,res) => {
    try{
        let user = await userModel.findOne({phone : req.body.phone})
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({message : "Invalid Phone or Password"})
        }

        const token = jwt.sign({ _id : user._id , phone : user.phone , name : user.name , email : user.email }, "secret")
        return res.json({message : 'User Logged In successfully' , status : 200 ,name:user.name , token : token })

    } catch(error){
        console.log(`Error : ${error}`) 
    }
}