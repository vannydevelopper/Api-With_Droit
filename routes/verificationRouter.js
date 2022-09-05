const express = require("express")

const verificationController = require("../controllers/verificationController")
const requireVerifier = require("../middleware/requireVerifier")

const verificationRouter = express.Router()
verificationRouter.get("/requerant",requireVerifier, verificationController.findVerification)

module.exports = verificationRouter