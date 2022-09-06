const userModel = require("../model/userModel")
const Validation = require("../class/Validation")
const jwt = require("jsonwebtoken")
const generateToken = require("../function/generateToken");
const md5 = require("md5");

const login = async (req, res) => {
        try {
                const { USERNAME, USER_PASSWORD } = req.body
                //console.log(md5(12345678))
                const validation = new Validation(
                        req.body,
                        {
                                USERNAME: "required",
                                USER_PASSWORD: {
                                        required: true
                                }
                        },
                        {
                                USER_PASSWORD: {
                                        required: "Mot de passe est obligatoire",
                                }
                        }
                );
                validation.run();
                if (!validation.isValidate()) {
                        return res.status(422).json({ errors: validation.getErrors() });
                }

                const user = (await userModel.findById("USERNAME", USERNAME))[0]
                if (user) {
                        if (user.USER_PASSWORD == md5(USER_PASSWORD)) {
                                if (user.USER_PROFILE_ID == 28) {

                                        // var tokenData = { user: user.USER_ID };
                                        // res.status(200).json({
                                        //         success: true,
                                        //         message: "vous avez été connecté avec succès",
                                        //         TOKEN: generateToken(tokenData, 3600 * 24 * 365 * 3),
                                        //         ...user,
                                        // });

                                        const token = jwt.sign({ user: user.USER_ID }, 'fffffcccckkkkpppp', {
                                                expiresIn: 3600 * 24 * 365 * 3
                                        })
                                        res.status(200).json({
                                                success: true,
                                                message: "vous avez été connecté avec succès",
                                                token,
                                                user
                                        });
                                } else {
                                        const errors = {
                                                password: "Mot de passe  incorrect",

                                        };
                                        res.status(404).json({ errors });
                                }

                        } else {
                                const errors = {
                                        password: "Mot de passe  incorrect",

                                };
                                res.status(404).json({ errors });
                        }
                } else {
                        const errors = {
                                main: "Utilisateur n'existe pas ",
                        };
                        res.status(404).json({ errors });
                }

        }
        catch (error) {
                console.log(error)
                res.status(500).send("srver error!")
        }
}
module.exports = {
        login
}