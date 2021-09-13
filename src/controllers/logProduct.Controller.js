const LogProduct = require('../models/logProduct.Model');
const Unit = require('../unit/randomString');
const adminController= require('./admin.Controller');


function writeLogProduct(product, resutl){
    adminController._assignmentStaff((err, data)=>{
       // console.log(data);
        if(!err){
            var created_date = new Date();
            const LogProduct = new LogProduct({
                id_log_monan : Unit._randomLog(), 
                id_admin        :data.id_admin, 
                id_product      :product.id_product, 
                active_old      :product.is_active,
                active_new      :product.newActive, 
                note            :product.note, 
                updated_date    :created_date
            })
            LogProduct.Create(LogProduct, (err, res)=>{
                if(!err){
                    console.log('Create food assign for '+ data.id_admin);
                    resutl(null,{
                        message: "Write Log food"
                    })
                }else{
                    console.log("Assign Fail");
                    resutl(err, null);
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
    writeLogProduct : writeLogProduct
}