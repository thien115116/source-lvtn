const LogMerchant = require('../models/logMerchant.Model');
const Unit = require('../unit/randomString');
const adminController= require('./admin.Controller');


function writeLogMerchant(merchant, result){
    adminController.assignmentStaff((err, data)=>{
       // console.log(data);
        if(!err){
            var created_date = new Date();
            const logMerchant = new LogMerchant({
                id_log_merchant : Unit._randomLog(), 
                id_admin        :data.id_admin, 
                id_merchant     :merchant.id_merchant, 
                active_old      :merchant.is_active,
                active_new      :merchant.newActive, 
                note            :merchant.note, 
                updated_date    :created_date
            })
            LogMerchant.create(logMerchant, (err, res)=>{
                if(!err){
                    console.log('Create merchant assign for '+ data.id_admin);
                    result(null,{
                        message: "Write Log Merchant"
                    })
                }else{
                    console.log("Assign Fail");
                    result(err, null);
                }
            })
        }else{
            console.log("error: ", err);
            result(err, null);
            return;
        }
    })
    
}

module.exports={
    writeLogMerchant : writeLogMerchant
}