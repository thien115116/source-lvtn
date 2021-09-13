const mysql = require('../../configs/database');

const Image = function(image){
    this.id_photo = image.photo,
    this.id_product = image.id_product,
    this.url_image = image.url_image
}

Image.create = (Items,result)=>{
    mysql.query('INSERT INTO IMAGE_FOOD SET ?', Items, (err, res)=>{
      if(err){
        console.log("error: ", err);
            result(err, null);
            return;
      }else{
        result(null, {...Items});
      }
    })
  }

Image.findByIdFood = (id_product, result)=>{
    mysql.query('SELECT url_image FROM IMAGE_FOOD WHERE id_product = ?', id_product,(err, rows)=>{
        if(!err){
            let images=[];
            rows.forEach(element => {
              images.push(element.url_image);
            });
            result(null, images)
        }else{
          result(err, null)
        }
    })
}

module.exports = Image;