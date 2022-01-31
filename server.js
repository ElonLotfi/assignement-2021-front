const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();



// Pour accepter les connexions cross-domain (CORS)
app.use(cors())
app.options('*', cors())


app.use(express.static(__dirname+"/dist/assignment-app"));

app.get("/*",function (req,res){
    res.sendFile(path.join(__dirname+"/dist/assignment-app/index.html"));
});

app.listen(process.env.PORT || 8081)