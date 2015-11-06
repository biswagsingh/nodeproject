var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
var mongoSchema =   mongoose.Schema;
var userSchema  = {
    "appointment_id" : String,
    "token" : String,
    "phone" : String,
    "name" : String,
    "age" : String,
    "sex" : String,
    "height" : String,
    "weight" : String,
    "date" : String,
    "time" : String,
    "statuses" : String
};
module.exports = mongoose.model('patientlist',userSchema);;
