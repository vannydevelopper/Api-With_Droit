const express = require("express")

const historiqueController = require("../controllers/historiqueController")

const historiqueRouter = express.Router()
historiqueRouter.post("/", historiqueController.createHistorique)

module.exports=historiqueRouter