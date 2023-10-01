const mongoose = require("mongoose")

const data1 = mongoose.Schema({
 name:{
    type:String,
    required: true
},email:{
    type:String,
    required: true
},feedback:{
    type:String,
    required:true
},phonNo:{
    type:String,
    required:true

}
})

module.exports = mongoose.model('User2',data1)