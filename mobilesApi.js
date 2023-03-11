var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let {mobilesData} = require("./mobilesData.js");

app.get("/mobiles",function(req, res){
    console.log("GET /mobiles", req.query);
    let ram = req.query.ram;
    let rom = req.query.rom;
    let color = req.query.color;
    let brand = req.query.brand;
    let arr1 = mobilesData;
    if(ram){
        arr1 = mobilesData.filter((m1)=>m1.RAM.find(m=>m===ram));
    }
    if(rom){
        arr1 = mobilesData.filter((m1)=>m1.ROM.find(m=>m===rom));
    }
    if(color){
        arr1 = mobilesData.filter((m1)=>m1.colors.find(m=>m===color));
    }
    if(brand){
        arr1 = mobilesData.filter((m1)=>m1.brand===brand);
    }
    res.send(arr1);
});

app.get("/mobiles/brand/:brandName",function(req, res){
    let brandName = req.params.brandName;
    const arr1 = mobilesData.filter(m1=> m1.brand===brandName);
    res.send(arr1);
});
app.get("/mobiles/color/:color",function(req, res){
    let color = req.params.color;
    const arr1 = mobilesData.filter((m1)=> m1.colors.find((c1)=> c1===color));
    res.send(arr1);
});
app.get("/mobiles/RAM/:ramSize",function(req, res){
    let ramSize = req.params.ramSize;
    const arr1 = mobilesData.filter((m1)=> m1.RAM.find((c1)=> c1===ramSize));
    res.send(arr1);
});
app.get("/mobiles/ROM/:romSize",function(req, res){
    let romSize = req.params.romSize;
    const arr1 = mobilesData.filter((m1)=> m1.ROM.find((c1)=> c1===romSize));
    res.send(arr1);
});

app.get("/mobiles/:name",function(req, res){
    let name = req.params.name;
    const mobile = mobilesData.find(m1=>m1.name===name);
      res.send(mobile);
});