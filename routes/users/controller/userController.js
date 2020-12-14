const jwt = require('jsonwebtoken')
const User = require("../model/User")
const bcrypt = require('bcryptjs')
const dbErrorHelper = require('../../lib/dbErrorHelper/dbErrorHelper')

module.exports = {
    signUp: async (req, res) => {

        try {
            let createUser = new User({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            })

            let genSalt = await bcrypt.genSalt(12);
            let hashedPassword = await bcrypt.hash(createUser.password, genSalt)

            createUser.password = hashedPassword

            await createUser.save();
            console.log('createUser', createUser)
            res.json({
                message: "User Created"
            })
        }
        catch (e) {
            console.log('e', e)
            const { message, statusCode } = dbErrorHelper(e)
            res.status(statusCode).json({
                message: message
            })
        }
    },

    login: async (req, res) => {
        console.log(req.body)
        try {
            let foundUser = await User
                .findOne({ email: req.body.email })
                .select("-__v")



            if (foundUser === null) {
                throw {
                    message: "User not found, please sign up",
                    code: 404,
                }
            }
            let comparedPassword = await bcrypt.compare(req.body.password, foundUser.password)


            if (!comparedPassword) {
                throw {
                    message: "Check your email and password",
                    code: 401
                } 
            }

            let jwtToken = jwt.sign(
                { email: foundUser.email, userName: foundUser.username },
                process.env.JWT_USER_SECRET,
                { expiresIn: "7d" }
            )
            res.json({ jwtToken })
        } catch (e) {
            const { message, statusCode } = dbErrorHelper(e)
            res.status(statusCode).json({
                message: message
            })
        }

    }
}