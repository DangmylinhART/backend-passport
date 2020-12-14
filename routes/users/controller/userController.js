// const { genSalt } = require("bcryptjs");
const User = require("../model/User")
const bcrypt = require('bcryptjs')
const dbErrorHelper = require('../../lib/dbErrorHelper/dbErrorHelper')

module.exports = {
    signUp: async (req, res) => {
        console.log('req.body', req.body)
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
            res.status(500).json({
                message: message
            })
        }
    },

    login: () => {
        console.log('this is login function')
    }
}