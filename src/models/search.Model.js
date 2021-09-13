const mysql = require('../../configs/database');

    
function findByTag(data, result){
    mysql.query(`CALL _search_by_tag(${data.lat}, ${data.lon}, "${data.tag}")`, (err, rows)=>{
        if(err){
            console.log(err);
            result(err, null);
        }else{
            result(null, rows[0])
            
        }
    })
}

function searchByKeyWord(data, result){
    mysql.query(`CALL _search_by_keyword(${data.lat}, ${data.lon}, "${"%"+data.keyword.toUpperCase()+"%"}")`, (err, rows)=>{
        if(err){
            result(err, null);
        }else{
            result(null, rows[0])
            
        }
    })
}

module.exports = {
    findByTag: findByTag,
    searchByKeyWord: searchByKeyWord
};