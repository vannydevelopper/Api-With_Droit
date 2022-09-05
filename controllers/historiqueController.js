const historiqueModel = require("../model/historiqueModel")
const Validation = require("../class/Validation")
const moment = require("moment");
const {query} = require("../function/db")

const createHistorique = async (req, res) => {
        try{
                const {	TEMPO_REQUERANT_ID,LONGITUDE, LATITUDE} = req.body
                const validation = new Validation(req.body,
                       
                        {
                            LONGITUDE:
                            {
                                required: "Longitude  est obligatoire",
                                length: "Longitude invalide",
                            },
                            LATITUDE:
                            {
                                required: "Latitude  est obligatoire",
                                length: "Latitude invalide",
                            }
                        }
                    )
                validation.run()
                if (validation.isValidate()){
                        const data = (await historiqueModel.findAllDonnees(TEMPO_REQUERANT_ID))[0]
                        console.log(data)
                        const age = moment().get("year") - moment(data.DATE_NAISSANCE).get("year")
                        const pointEntre = data.PROVENANCE == 2 ? 20 : null
                        const {insertId} = await historiqueModel.createOneHistorique(
                                data.NOM,
                                data.PRENOM,
                                data.EMAIL,
                                data.TELEPHONE,
                                data.PROVINCE_ID_RESIDENCE,
                                data.COMMUNE_ID_RESIDENCE,
                                data.ZONE_ID_RESIDENCE,
                                data.COLLINE_ID_RESIDENCE,
                                data.NATIONALITE_ID,
                                moment().format('YYYY/MM/DD HH:mm:ss'),
                                data.NUMERO_DOCUMENT,
                                data.STRUCTURE_ID,
                                data.DATE_NAISSANCE,
                                age,
                                data.DOCUMENT_ID,
                                data.GENRE_ID,
                                EST_VOYAGEUR=1,
                                data.PROVENANCE_PAYS_ID,
                                data.HOTEL_ID,
                                pointEntre,
                                data.PROVENANCE,
                                REQUERANT_STATUT_ID=3,
                                data.VOL_ID,
                                moment().format('YYYY/MM/DD HH:mm:ss'),
                                data.TEMPO_REQUERANT_ID,
                                data.AUTRE_DESTINATION,
                                data.REQUERANT_LANGUE_CERTIFICAT
                        );

                        const { insertId : idLaboratoire} = await historiqueModel.createOneLaboratoire(
                                data.STRUCTURE_ID,
                                insertId,
                                STATUT = 1
                        )

                        const {insertId : idTranckings} = await historiqueModel.createOneTrancking(
                                insertId,
                                LONGITUDE,
                                LATITUDE,
                                ETAPE = 1,
                                req.userId
                        )

                        await query ("update tempo_requerant SET TRAITE=?, USER_ID= ?, DATE_TRAITEMENT=? WHERE TEMPO_REQUERANT_ID=?",[
                                1, req.userId, moment().format('YYYY/MM/DD HH:mm:ss'), TEMPO_REQUERANT_ID
                            ])
                        res.status(200).json({
                                succes :"true",
                                message:"l'enregistrement est afite avec succes"
                        })

                } 
               
        }
        catch(error){
                console.log(error)
                res.status(500).send("server error")
        }
}

module.exports = {
        createHistorique
}