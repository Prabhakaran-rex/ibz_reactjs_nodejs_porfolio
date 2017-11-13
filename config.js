var mongo = require("mongoose");  
var db =   
mongo.connect("mongodb://localhost:27017/ibz_databases", function(err, response){  
   if(err){ console.log('Failed to connect to ' + db); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
  
module.exports =db;