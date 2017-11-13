var express = require("express");  
var path = require("path");  
var mongo = require("mongoose");   
var bodyParser = require('body-parser');   
var morgan = require("morgan");  
var db = require("./config.js");  
  
var app = express();  
var port = process.env.port || 7777;  
var srcpath  =path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  
  
  
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var projectSchema = new Schema({      
    name: { type: String   },       
    description: { type: String   },     
    skill: { type: String },       
    client: { type: String },       
    category: { type: String },       
    image: { type: String },       
},{ versionKey: false });  
   
  
var model = mongoose.model('project', projectSchema, 'project');  
  
//api for get data from database  
app.get("/api/getdata",function(req,res){   
 model.find({},function(err,data){  
            if(err){  
                res.send(err);  
            }  
            else{             
                res.send(data);  
                }  
        });  
})  
  
  
//api for Delete data from database  
app.post("/api/Removedata",function(req,res){   
 model.remove({ _id: req.body.id }, function(err) {  
            if(err){  
                res.send(err);  
            }  
            else{    
                   res.send({data:"Record has been Deleted..!!"});             
               }  
        });  
})  
  
  
//api for Update data from database  
app.post("/api/Updatedata",function(req,res){   
 model.findByIdAndUpdate(req.body.id, { name:  req.body.name, description: req.body.description, skill: req.body.skill,client:req.body.client,category: req.body.category,image: req.body.image },   
function(err) {  
 if (err) {  
 res.send(err);  
 return;  
 }  
 res.send({data:"Record has been Updated..!!"});  
 });  
})    
  
  
//api for Insert data from database  
app.post("/api/savedata",function(req,res){   
    console.log('node side.....');
    var mod = new model(req.body);  
    mod.save(function(err,data){  
        if(err){  
            res.send(err);                
        }  
        else{        
             res.send({data:"Record has been Inserted..!!"});  
        }  
    });  
})  
      
// call by default index.html page  
app.get("*",function(req,res){   
    res.sendFile(srcpath +'/index.html');  
})  
  
//server stat on given port  
app.listen(3030,function(){   
    console.log("server start on port"+ 3030);  
})