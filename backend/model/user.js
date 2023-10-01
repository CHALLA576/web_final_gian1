const mongoose = require("mongoose")

const Scema1 = mongoose.Schema({
 name:{
    type:String,
    required: true
},email:{
    type:String,
    required: true
},password:{
    type:String,
    required:true
},phonno:{
    type:String,
    required:true

}
})

module.exports = mongoose.model('User',Scema1)