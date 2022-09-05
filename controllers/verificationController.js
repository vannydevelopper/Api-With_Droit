const verificationModel = require("../model/verificationModel")

const findVerification = async (req, res) =>{
        try{
                const {ID_RDV} = req.query
                const VerificationRequant = (await verificationModel.findAllByID(ID_RDV))[0];
                console.log(VerificationRequant)
                if(VerificationRequant!=null){
                        const payement = (await verificationModel.findPayementByID(ID_RDV))[0];
                        res.status(200).json({
                                success: true,
                                VerificationRequant,
                                payement
                        })
                }
                else{
                        res.status(404).json({
                                success: false,
                                message:"le requerant n'existe pas"
                        })
                }
        }
        catch(error){
                console.log(error)
                res.status(500).send("server error")
        }
}

module.exports = {
        findVerification
}