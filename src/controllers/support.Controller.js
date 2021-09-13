const _supportModel = require("../models/support.Model");
const uuid = require('../unit/randomString');
function Create(req, res) {
  if (req.body.id_type_user && req.body.content) {
    let support = {
      id_question: uuid._uuidv4(),
      id_type_user: req.body.id_type_user,
      content: req.body.content,
      state: true,
    };
    _supportModel.Create(support, (err, result)=>{
        if(!err){
            res.status(200).send({
                status: true,
                message: result
            })
        }else{
            res.status(401).send({
                status: false,
                message: err
            })
        }
    });
  }
}


module.exports = {
    Create: Create
}