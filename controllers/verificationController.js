const verificationModel = require("../model/verificationModel")

const findVerification = async (req, res) => {
        try {
                const { ID_RDV } = req.query
                const VerificationRequant = (await verificationModel.findAllByID(ID_RDV))[0];

                const userAll = (await verificationModel.findByUser("USER_ID", req.userId))[0]
                if(userAll && userAll.GESTION_RENDEZ_VOUS==1){
                        return res.status(200).json({
                                success:"true",
                                message:"l'agent a l'acces",
                                VerificationRequant
                        })
                }
                if (VerificationRequant) {
                        const traite = (await verificationModel.findBiIdTraite("TEMPO_REQUERANT_ID", ID_RDV))[0]
                        if (traite.TRAITE == 1) {
                                const requerantStatus = (await verificationModel.findByStatus("TEMPO_REQUERANT_ID", ID_RDV))[0]
                                if (requerantStatus && requerantStatus.REQUERANT_STATUT_ID == 3) {
                                        return res.status(200).json({
                                                success: true,
                                                message:"requerantStatus1",
                                                VerificationRequant
                                        })
                                }

                                const requerantStatut_id = (await verificationModel.findAllByGenere("TEMPO_REQUERANT_ID", ID_RDV))[0]
                                if(requerantStatut_id && requerantStatut_id.REQUERANT_STATUT_ID != 3 && requerantStatut_id.EST_GENERE == 0){
                                        return res.status(200).json({
                                                success : true,
                                                message : "requerant status 5",
                                                VerificationRequant,
                                        })

                                }else{
                                        return res.status(200).json
                                        ({
                                            success: true,
                                            message: "Le requerant n'a pas de droit a  la validation",
                
                                        })
                                }
                        }else{
                                const payement = (await verificationModel.findPayementByID(ID_RDV))[0];
                                if(payement){
                                        return res.status(200).json({
                                                success:true,
                                                message:"le requerant a paye en ligne",
                                                VerificationRequant,
                                                payement
                                        })
                                }
                                else{
                                        return res.status(200).json({
                                                success:"true",
                                                message:"le requerant a paye par banque",
                                                VerificationRequant
                                        })
                                }
                        }

                }
                else {
                        res.status(404).json({
                                success: false,
                                message: "le requerant n'existe pas"
                        })
                }
        }
        catch (error) {
                console.log(error)
                res.status(500).send("server error")
        }
}

module.exports = {
        findVerification
}