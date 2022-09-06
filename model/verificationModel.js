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

const findBiIdTraite = async (column, value) => {
        try{
                const sqlQuery = `SELECT tempo.TRAITE FROM tempo_requerant tempo WHERE ${column} = ?`
                        return query(sqlQuery, [value])
        }
        catch(error){
                throw error
        }
}

const findByStatus = (column, value) => {
        try{
                const sqlQuery = `SELECT REQUERANT_STATUT_ID FROM requerant WHERE ${column} = ?`;
                        return query(sqlQuery, [value])
        }
        catch(error){
                throw error
        }
}

const findAllByGenere = (column, value) => {
        try{
                const sqlQuery = `SELECT REQUERANT_STATUT_ID,EST_GENERE FROM requerant WHERE ${column} = ?`;
                        return query(sqlQuery, [value])
        }
        catch(error){
                throw error
        }
}

const findByUser = (column, value) => {
        try{
                const sqlQuery = `SELECT us.USER_FNAME, us.USER_LNAME, us.USER_EMAIL , us.TEL, us.USER_PROFILE_ID, us_p.GESTION_RENDEZ_VOUS FROM users us LEFT JOIN users_profile us_p ON us_p.USER_PROFILE_ID=us.USER_PROFILE_ID WHERE ${column} = ? AND(us.USER_PROFILE_ID)`;
                        return query(sqlQuery, [value])
        }
        catch(error){
                throw error
        }
}



module.exports={
        findAllByID,
        findPayementByID,
        findBiIdTraite,
        findByStatus,
        findAllByGenere,
        findByUser
}