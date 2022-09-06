const {query} = require("../function/db")

const findById = async(column, value) => {
        try{
                var sqlQuery = `SELECT * FROM users WHERE ${column} = ? AND(USER_PROFILE_ID = 28)`;
                return query(sqlQuery, [value])
        }
        catch(error){
                throw error
        }
}


module.exports={
        findById 
}