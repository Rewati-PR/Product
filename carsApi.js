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

let {carData,carMaster} = require("./carsData.js");
app.get("/cars",function(req, res){
    console.log("GET /cars", req.query);
    let minprice = req.query.minprice;
    let maxprice = req.query.maxprice;
    let arr1 = carData;
    if(minprice){
        arr1 = arr1.filter((st)=> st.price>=minprice);
    }
    if(maxprice){
        arr1 = arr1.filter((st)=> st.price<=maxprice);
    }
    res.send(arr1);
});

app.post("/cars", function(req,res) {
    let body = req.body;
    carData.push(body);
    res.send(body);
   });
   app.put("/cars/:id", function(req,res) {
    let id = req.params.id;
    let body = req.body;
    let index = carData.findIndex((st)=>st.id===id);
    if(index>=0){
     let updatedCar = {id:id, ...body};
     carData[index] = updatedCar;
     res.send(updatedCar);
    }
    else res.status(404).send("No car found");
  });
  
  app.delete("/cars/:id", function(req,res) {
    let id = req.params.id;
    let index = carData.findIndex((st)=>st.id===id);
    if(index>=0){
      let deleteCar = carData.splice(index,1);
      res.send(deleteCar);
    }
    else res.status(404).send("No car found");
  }); 

app.get("/carMaster",function(req, res){
    console.log("GET /carMaster", req.query);
    res.send(carMaster);
});
/*app.get("/customers/:id",function(req, res){
    let id = req.params.id;
    const customer = customersData.find(p=>p.id===id);
    if(customer)
      res.send(customer);
    else
      res.status(404).send("No customer found");
});

app.post("/customers", function(req,res) {
 let body = req.body;
 customersData.push(body);
 res.send(body);
});

app.put("/customers/:id", function(req,res) {
  let id = req.params.id;
  let body = req.body;
  let index = customersData.findIndex((st)=>st.id===id);
  if(index>=0){
   let updatedCustomer = {id:id, ...body};
   customersData[index] = updatedCustomer;
   res.send(updatedCustomer);
  }
  else res.status(404).send("No customer found");
});

app.delete("/customers/:id", function(req,res) {
  let id = req.params.id;
  let index = customersData.findIndex((st)=>st.id===id);
  if(index>=0){
    let deleteCustomer = customersData.splice(index,1);
    res.send(deleteCustomer);
  }
  else res.status(404).send("No customer found");
});*/