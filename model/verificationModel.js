const {query} = require("../function/db")

const findAllByID = async (value)=>{
        try{
                var sqlQuery = `SELECT tempo.NOM, tempo.PRENOM, tempo.DATE_NAISSANCE, tempo.TELEPHONE, tempo.EMAIL, doc.DOCUMENT_DESCR FROM tempo_requerant tempo LEFT JOIN  vl_voyageur_documents doc ON doc.DOCUMENT_ID=tempo.DOCUMENT_ID`;
                        sqlQuery += ` WHERE tempo.TEMPO_REQUERANT_ID = ? `
                return query(sqlQuery, [value])
        }
        catch(error){
                throw error
        }
}

const findPayementByID = async (ID_RDV) =>{
        try{
                var sqlQuery = `SELECT NUMERO, EMAIL_PAYE, MONTANT, DATE_INSERT_PAYEMENT, COMPTE_SIBLE, CARTE_TYPE, DEVISE, MONTANT_SANS_COMMISSION, COMMISSION FROM rdv_payement LEFT JOIN tempo_requerant ON tempo_requerant.RDV_ID=rdv_payement.RDV_ID WHERE 1`;
                        sqlQuery += ` AND TEMPO_REQUERANT_ID = ? `
                return query(sqlQuery, [ID_RDV])
        }
        catch(error){
                throw error
        }
}



module.exports={
        findAllByID,
        findPayementByID
}