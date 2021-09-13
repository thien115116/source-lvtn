const mysql = require('../../configs/database');

const VOUCHER = function(voucher){
    this.id_voucher = voucher.id_voucher,
    this.brand_id=  voucher.brand_id,
    this.totalAmount=  voucher.totalAmount,
    this.expPrice=  voucher.expPrice,
    this.totalUser= voucher.totalUser,
    this.codeName=voucher.codeName,
    this.dateStart_At= voucher.dateStart_At,
    this.dateEnd_At=  voucher.dateEnd_At,
    this.created_At=  voucher.created_At,
    this.updated_At=updated_At,
    this.isEnable =voucher.isEnable,
    this.id_typeVoucher=  voucher.id_typeVoucher,
    this.title=  voucher.title,
    this.descriptions= voucher.descriptions
}

VOUCHER.Create= (voucher, result)=>{
    mysql.query(`INSERT INTO VOUCHER SET ?`, voucher, (err, row)=>{
        if(!err){
            result(null, {
                status: true,
                message: "Success"
            })
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.FindAll=(result)=>{
    mysql.query(`SELECT 
    VOUCHER.id_voucher,
    VOUCHER.merchant_id,
    VOUCHER.brand_id,
    VOUCHER.paymentMethod_id,
    VOUCHER.totalAmount, 
    VOUCHER.expPrice, 
    VOUCHER.totalUser, 
    VOUCHER.codeName, 
    VOUCHER.dateStart_At,
    VOUCHER.dateEnd_At, 
    VOUCHER.title, 
    TYPE_VOUCHER.typeName
    FROM VOUCHER JOIN TYPE_VOUCHER ON VOUCHER.id_typeVoucher = TYPE_VOUCHER.id_typeVoucher 
    WHERE VOUCHER.brand_id is null AND VOUCHER.merchant_id is null AND VOUCHER.isEnable = 0;`, (err, row)=>{
        if(!err){
            result(null, row)
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.FindAllByBrandId=(brand_id, result)=>{
    mysql.query(`SELECT 
    VOUCHER.id_voucher,
    VOUCHER.merchant_id,
    VOUCHER.brand_id,
    VOUCHER.paymentMethod_id,
    VOUCHER.totalAmount, 
    VOUCHER.expPrice, 
    VOUCHER.totalUser, 
    VOUCHER.codeName, 
    VOUCHER.dateStart_At,
    VOUCHER.dateEnd_At, 
    VOUCHER.title, 
    TYPE_VOUCHER.typeName
    FROM VOUCHER JOIN TYPE_VOUCHER ON VOUCHER.id_typeVoucher = TYPE_VOUCHER.id_typeVoucher 
    WHERE VOUCHER.brand_id = ? AND VOUCHER.isEnable = 0;`, brand_id,(err, row)=>{
        if(!err){
            result(null, row)
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.FindAllByMerchantId=(merchant_id, result)=>{
    mysql.query(`SELECT 
    VOUCHER.id_voucher,
    VOUCHER.merchant_id,
    VOUCHER.brand_id,
    VOUCHER.paymentMethod_id,
    VOUCHER.totalAmount, 
    VOUCHER.expPrice, 
    VOUCHER.totalUser, 
    VOUCHER.codeName, 
    VOUCHER.dateStart_At,
    VOUCHER.dateEnd_At, 
    VOUCHER.title, 
    TYPE_VOUCHER.typeName
    FROM VOUCHER JOIN TYPE_VOUCHER ON VOUCHER.id_typeVoucher = TYPE_VOUCHER.id_typeVoucher 
    WHERE VOUCHER.merchant_id = ?  AND VOUCHER.isEnable = 0;`, merchant_id,(err, row)=>{
        if(!err){
            result(null, row)
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.FindOne=(id_voucher,result)=>{
    mysql.query(`SELECT 
    VOUCHER.id_voucher,
    VOUCHER.merchant_id,
    VOUCHER.brand_id,
    VOUCHER.paymentMethod_id,
    VOUCHER.totalAmount, 
    VOUCHER.expPrice, 
    VOUCHER.totalUser, 
    VOUCHER.codeName, 
    VOUCHER.dateStart_At,
    VOUCHER.dateEnd_At, 
    VOUCHER.title, 
    TYPE_VOUCHER.typeName
    FROM VOUCHER JOIN TYPE_VOUCHER ON VOUCHER.id_typeVoucher = TYPE_VOUCHER.id_typeVoucher 
    WHERE VOUCHER.id_voucher = ?;`, id_voucher, (err, row)=>{
        if(!err){
            result(null, row[0])
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.Update= (voucher, result)=>{
    mysql.query(`UPDATE VOUCHER SET ? WHERE id_voucher=?`,[voucher, voucher.id_voucher], (err, row)=>{
        if(!err){
            result(null, row)
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.CreateOderVoucher= (oderVoucher, result)=>{
    mysql.query(`INSERT INTO ODER_VOUCHER SET ?`, oderVoucher, (err, row)=>{
        if(!err){
            result(null, {
                status: true,
                message: "Success"
            })
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.FindVoucherSuggestBrand=(req, result)=>{
    mysql.query(`CALL _get_voucherOfBrand()`, (err, row)=>{
        if(!err){
            result(null, row[0])
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

VOUCHER.FindVoucherSuggestAll=(req, result)=>{
    mysql.query(`CALL _get_voucherOfApp()`, (err, row)=>{
        if(!err){
            result(null, row[0])
        }else{
            console.log(err);
            result(err, null);
        }
    })
}

module.exports = VOUCHER