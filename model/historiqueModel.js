const { query } = require("../function/db")

const findAllDonnees = async (TEMPO_REQUERANT_ID) => {
        try {
                var sqlQuery = `SELECT NOM,  PRENOM, TELEPHONE, DATE_NAISSANCE, EMAIL, NATIONALITE_ID, PROVINCE_ID_RESIDENCE, COMMUNE_ID_RESIDENCE,AUTRE_DESTINATION, ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE, STRUCTURE_ID, PROVENANCE_PAYS_ID, HOTEL_ID, NUMERO_DOCUMENT, DOCUMENT_ID, GENRE_ID, PROVENANCE, VOL_ID, TEMPO_REQUERANT_ID, AUTRE_HOTEL, REQUERANT_LANGUE_CERTIFICAT FROM tempo_requerant`;
                sqlQuery += ` WHERE TEMPO_REQUERANT_ID = ?`
                return query(sqlQuery, [TEMPO_REQUERANT_ID])
        }
        catch (error) {
                throw error
        }
}

const findByIdCheck = async (TEMPO_REQUERANT_ID) => {
        try {

                // var sqlQuery = `SELECT TEMPO_REQUERANT_ID FROM tempo_requerant  WHERE md5(TEMPO_REQUERANT_ID) = ? `;
                var sqlQuery = `SELECT tempo.NOM,tempo.TEMPO_REQUERANT_ID, tempo.PRENOM, tempo.EMAIL, tempo.TELEPHONE, tempo.PROVINCE_ID_RESIDENCE, tempo.COMMUNE_ID_RESIDENCE, tempo.ZONE_ID_RESIDENCE, tempo.COLLINE_ID_RESIDENCE ,tempo.NATIONALITE_ID, tempo.NUMERO_DOCUMENT, tempo.STRUCTURE_ID, tempo.DATE_NAISSANCE,tempo.DOCUMENT_ID, tempo.GENRE_ID,tempo.PROVENANCE_PAYS_ID,tempo.HOTEL_ID,tempo.PROVENANCE, tempo.VOL_ID,tempo.STRUCTURE_ID,tempo.AUTRE_DESTINATION,tempo.REQUERANT_LANGUE_CERTIFICAT, str.DISTRICT_ID  FROM tempo_requerant tempo LEFT JOIN structures str ON str.STRUCTURE_ID=tempo.STRUCTURE_ID WHERE TEMPO_REQUERANT_ID = ? `;
                return query(sqlQuery, [TEMPO_REQUERANT_ID]);
        }
        catch (error) {
                throw error
        }

}

const createOneHistorique = async (REQUERANT_NOM, REQUERANT_PRENOM, EMAIL, TELEPHONE, PROVINCE_ID_RESIDENCE, COMMUNE_ID_RESIDENCE,
        ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE, NATIONALITE_ID,DATE_PRELEVEMENT, CNI_PASSPORT_CPGL, STRUCTURE_ID, DATE_NAISSANCE,
        AGE, TYPE_IDENTITE, SEXE_ID, EST_VOYAGEUR, PAYS_PROVENANCE_ID, HOTEL_ID,POINT_ENTREE_ID, TYPE_PASSAGER_ID,
        REQUERANT_STATUT_ID, VOL_ID, DATE_ATTERISSAGE, TEMPO_REQUERANT_ID, AUTRE_HOTEL, REQUERANT_LANGUE_CERTIFICAT) => {
        try {
                var sqlQuery = "INSERT INTO requerant(REQUERANT_NOM, REQUERANT_PRENOM, EMAIL, TELEPHONE, PROVINCE_ID_RESIDENCE,COMMUNE_ID_RESIDENCE,ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE, NATIONALITE_ID ,DATE_PRELEVEMENT, CNI_PASSPORT_CPGL, STRUCTURE_ID, DATE_NAISSANCE,AGE,TYPE_IDENTITE, SEXE_ID, EST_VOYAGEUR, PAYS_PROVENANCE_ID, HOTEL_ID,POINT_ENTREE_ID, TYPE_PASSAGER_ID,REQUERANT_STATUT_ID,VOL_ID,DATE_ATTERISSAGE, TEMPO_REQUERANT_ID, AUTRE_HOTEL, REQUERANT_LANGUE_CERTIFICAT)";
                sqlQuery += "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
                return query(sqlQuery, [
                        REQUERANT_NOM, REQUERANT_PRENOM, EMAIL, TELEPHONE, PROVINCE_ID_RESIDENCE, COMMUNE_ID_RESIDENCE,
                        ZONE_ID_RESIDENCE, COLLINE_ID_RESIDENCE, NATIONALITE_ID,DATE_PRELEVEMENT, CNI_PASSPORT_CPGL, STRUCTURE_ID, DATE_NAISSANCE,
                        AGE, TYPE_IDENTITE, SEXE_ID, EST_VOYAGEUR, PAYS_PROVENANCE_ID, HOTEL_ID,POINT_ENTREE_ID, TYPE_PASSAGER_ID,
                        REQUERANT_STATUT_ID, VOL_ID, DATE_ATTERISSAGE, TEMPO_REQUERANT_ID, AUTRE_HOTEL, REQUERANT_LANGUE_CERTIFICAT
                ])
        }
        catch (error) {
                throw error
        }
}

const createOneLaboratoire = async (STRUCTURE_ID, REQUERANT_ID, STATUT) => {
        try{
                var sqlQuery = "INSERT INTO requerant_laboratoire(STRUCTURE_ID, REQUERANT_ID, STATUT)";
                        sqlQuery += "VALUES(?,?,?)"
                        return query(sqlQuery, [STRUCTURE_ID, REQUERANT_ID, STATUT])
        }
        catch(error){
                throw error
        }
}

const createOneTrancking = (REQUERANT_ID, LONGITUDE, LATITUDE, ETAPE, USER_ID) =>{
        try{
                var sqlQuery = "INSERT INTO  requerant_tracking_gps(REQUERANT_ID, LONGITUDE, LATITUDE, ETAPE, USER_ID)";
                        sqlQuery += "VALUES(?,?,?,?,?)"
                        return query(sqlQuery, [REQUERANT_ID, LONGITUDE, LATITUDE, ETAPE, USER_ID])
        }
        catch(error){
                throw error
        }
}

module.exports = {
        findAllDonnees,
        createOneHistorique,
        findByIdCheck,
        createOneLaboratoire,
        createOneTrancking
}