const Validation = require("../class/Validation")
const jwt = require("jsonwebtoken")
const md5 = require("md5");
const moment = require("moment")
const {query} = require("../function/db")

const historiqueStatusModel = require("../model/historiqueStatusModel")

const createHistoByStatus = async (req,res) =>{
        try{
              const {
                TEMPO_REQUERANT_ID,
                TYPE_ECHANTILLON_ID,
                TYPE_TEST_ID,
                RESULTAT_ID,
                CONCLUSION,
                METHODE_ID

              } = req.body  

              const validation = new Validation(req.body)
              validation.run()
              if (validation.isValidate()){
                const requerant = (await historiqueStatusModel.findRequerant(TEMPO_REQUERANT_ID))[0]
                //console.log(requerant)
                const requ_labo = requerant.REQUERANT_ID
                //console.log(requ_labo)
                const requerant_laboratoire = ( await historiqueStatusModel.findAllRequerant_labo(requ_labo))[0]
                //console.log(requerant_laboratoire)
                const {insertId} = await  historiqueStatusModel.createHistoByStatus(
                        moment().format("YYYY/MM/DD HH:mm:ss"),
                        TYPE_ECHANTILLON_ID,
                        TYPE_TEST_ID,
                        RESULTAT_ID,
                        CONCLUSION,
                        METHODE_ID,
                        requ_labo,
                        1,
                        moment().format("YYYY/MM/DD HH:mm:ss"),
                        requerant_laboratoire.REQU_LABO_ID
                )

                await query ("update tempo_requerant SET REQUERANT_STATUT_ID=?, WHERE TEMPO_REQUERANT_ID=?",[
                        5,TEMPO_REQUERANT_ID
                    ])
                res.status(200).json({
                        succes:"true",
                        message:"l'enregistrement est faite avec succees"
                })
              }
        }
        catch(error){
                console.log(error)
                res.status(500).send("server error")
        }
}

const findAllEchantillion = async (req,res) =>{
        try{
                const {METHOD_TEST} =  req.params
                const echantillion = await historiqueStatusModel.findEchantillion(METHOD_TEST)
                res.status(200).json(echantillion)
        }
        catch(error){
                console.log(error)
                res.status(500).send("server error")
        }
}

const findAllTypesTest = async (req, res) => {
        try{
                const {METHOD_TEST} = req.params
                const TypesTest = await historiqueStatusModel.findTypesTest(METHOD_TEST)
                res.status(200).json(TypesTest)
        }
        catch(error){
                console.log(error)
                res.status(500).send("server error")
        }
}

const findAllResultat =  async (req, res) => {
        try{
                const {METHOD_TEST} = req.params
                const resultat = await historiqueStatusModel.findResulat(METHOD_TEST)
                res.status(200).json(resultat)
        }
        catch(error){
                console.log(error)
                res.status(500).send("server error")
        }
}

module.exports = {
        createHistoByStatus,
        findAllEchantillion,
        findAllTypesTest,
        findAllResultat
}