const express = require("express")

const historiqueStatusController = require("../controllers/historiqueStatusController")

const historiqueStatusRouter = express.Router()
historiqueStatusRouter.post("/",historiqueStatusController.createHistoByStatus)
historiqueStatusRouter.get("/Echantillion/:METHOD_TEST",historiqueStatusController.findAllEchantillion)
historiqueStatusRouter.get("/TypesTest/:METHOD_TEST",historiqueStatusController.findAllTypesTest)
historiqueStatusRouter.get("/Resultat/:METHOD_TEST",historiqueStatusController.findAllResultat)

module.exports = historiqueStatusRouter