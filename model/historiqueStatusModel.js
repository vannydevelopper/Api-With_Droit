const {query} = require("../function/db")

const findEchantillion = (METHOD_TEST) => {
        try{
                var sqlQuery = `SELECT * FROM labo_type_echantillon WHERE 1 AND METHODE_TEST_ID= ?`;
                return query(sqlQuery, [METHOD_TEST])
        }
        catch(error){
                throw error
        }
}

const findTypesTest = (METHOD_TEST) => {
        try{
                var sqlQuery = `SELECT TYPE_TEST_ID, DESCRIPTION, METHODE_TEST_ID FROM labo_type_tests WHERE 1 AND METHODE_TEST_ID = ?`;
                return query(sqlQuery, [METHOD_TEST])
        }
        catch(error){
                throw error
        }
}

const findResulat = (METHOD_TEST) => {
        try{
                var sqlQuery = `SELECT * FROM labo_resultat WHERE 1 AND METHODE_TEST_ID=?`;
                return query(sqlQuery, [METHOD_TEST])
        }
        catch(error){
                console.log(error)
                throw error
        }
}

const findRequerant = (TEMPO_REQUERANT_ID) => {
        try{
                var sqlQuery = `SELECT REQUERANT_ID FROM requerant WHERE TEMPO_REQUERANT_ID=?`;
                return query(sqlQuery, [TEMPO_REQUERANT_ID])
        }
        catch(error){
                console.log(error)
                resizeBy.status(500).send("server error")
        }
}

const findAllRequerant_labo = (requ_labo) => {
        try{
                var sqlQuery = `SELECT REQU_LABO_ID FROM requerant_laboratoire WHERE REQUERANT_ID=?`;
                return query(sqlQuery, [requ_labo])
        }
        catch(error){
                throw error
        }
}

const createHistoByStatus = (DATE_PRELEVEMENT, TYPE_ECHANTILLON_ID, TYPE_TEST_ID, 
                                RESULTAT_ID, CONCLUSION, METHODE_ID, REQUERANT_ID, NUMERO_LABO,
                                DATE_CONCLUSION,REQU_LABO_ID) => {
        try{
                var sqlQuery = "INSERT INTO labo_resultat_test(DATE_PRELEVEMENT, TYPE_ECHANTILLON_ID, TYPE_TEST_ID,RESULTAT_ID, CONCLUSION, METHODE_ID, REQUERANT_ID, NUMERO_LABO,DATE_CONCLUSION,REQU_LABO_ID)";
                        sqlQuery += "VALUES(?,?,?,?,?,?,?,?,?,?)"
                        return query(sqlQuery,[
                                DATE_PRELEVEMENT,
                                TYPE_ECHANTILLON_ID,TYPE_TEST_ID,
                                RESULTAT_ID,CONCLUSION, METHODE_ID,
                                REQUERANT_ID,NUMERO_LABO, DATE_CONCLUSION, REQU_LABO_ID
                        ])
        }        
        catch(error){
                throw error
        }     

}

module.exports = {
        findEchantillion,
        findTypesTest,
        findResulat,
        findRequerant,
        findAllRequerant_labo,
        createHistoByStatus
}