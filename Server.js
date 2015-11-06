var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoOp     =   require("./models/mongo");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello Atansys"});
});

router.route("/patients")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        db.appointment_id = req.body.appointmentid;
        console.log(req.body.appointmentid);
        db.token = req.body.token;
        db.phone = req.body.phone;
        db.name = req.body.name;
        db.age = req.body.age;
        db.sex = req.body.sex;
        db.height = req.body.height;
        db.weight = req.body.weight;
        db.date = req.body.date;
        db.time = req.body.time;
        db.statuses = req.body.statuses;
        //db.userPassword = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

router.route("/patients/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.appointment_id !== undefined) {
                    data.appointment_id = req.body.appointment_id;
                }
                if(req.body.token !== undefined) {
                    data.token = req.body.token;
                }
                if(req.body.phone !== undefined) {
                    data.phone = req.body.phone;
                }
                if(req.body.name !== undefined) {
                    data.name = req.body.name;
                }
                if(req.body.age !== undefined) {
                    data.age = req.body.age;
                }
                if(req.body.sex !== undefined) {
                    data.sex = req.body.sex;
                }
                if(req.body.height !== undefined) {
                    data.height = req.body.height;
                }
                if(req.body.weight !== undefined) {
                    data.weight = req.body.weight;
                }
                if(req.body.date !== undefined) {
                    data.date = req.body.date;
                }
                if(req.body.time !== undefined) {
                    data.time = req.body.time;
                }
                if(req.body.statuses !== undefined) {
                    data.statuses = req.body.statuses;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");
