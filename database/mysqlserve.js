const constants = require("../constants")
const mysql = require('mysql2/promise');
const connection = require('../database/connection');
const promisePool = connection.promise();


module.exports.adminaddagency = async ({name, date}) => {
    try{
        var [newagency] = await promisePool.query(`
        INSERT INTO agencies VALUES (?, DEFAULT);
        `,[name])
    
        
        if(newagency.length < 1){
            throw new Error(constants.agencymessage.agencynotfound)
        }


        return "เพิ่มหน่วยงานสำเร็จ"
    }
    catch(error){
        if(error.errno == 1062) throw new Error("ไม่สามารถตั้งชื่อหน่วยงานซ้ำได้")

        console.log(`Something went wrong : service : adminaddagency` ,error);
        throw new Error(error)
    }
}
