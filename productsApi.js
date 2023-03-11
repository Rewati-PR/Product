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

let {productData} = require("./productsData.js");

app.get("/products",function(req, res){
   console.log("GET /products", req.query);
   let category = req.query.category;
   let maxprice = +req.query.maxprice;
   let maxqty = +req.query.maxqty;
   let minqty = +req.query.minqty;
   let arr1 = productData;
   if(category){
    arr1 = arr1.filter((p)=> p.category===category);
    }
    if(maxprice){
      arr1 = arr1.filter((p)=> p.price<=maxprice);
    }
    if(maxqty){
      arr1 = arr1.filter((p)=> p.quantity<=maxqty);
    }
    if(minqty){
      arr1 = arr1.filter((p)=> p.quantity>=minqty);
    }
   res.send(arr1);
});

app.get("/products/order/:field",function(req, res){
    let field = req.params.field;
    let arr1 = productData;
    if(field){
     if(field==="price") arr1.sort((p1,p2)=>p1.price - p2.price);
     if(field==="quantity") arr1.sort((p1,p2)=>p1.quantity - p2.quantity);
     if(field==="value") arr1.sort((p1,p2)=>p1.quantity*p1.price - p2.quantity*p2.price);
    }
    res.send(arr1);
});
app.get("/products/category/:name",function(req, res){
    let name = req.params.name;
    const arr1 = productData.filter(p=>p.category===name);
    res.send(arr1);
});

app.get("/products/:prodname",function(req, res){
    let prodname = req.params.prodname;
    const product = productData.find(p=>p.prod===prodname);
    if(product)
      res.send(product);
    else
      res.status(404).send("No product found");
});

app.post("/products", function(req,res) {
  let body = req.body;
  productData.push(body);
  res.send(body);
 });
 
 app.put("/products/:prodname", function(req,res) {
   let prodname = req.params.prodname;
   let body = req.body;
   let index = productData.findIndex((st)=>st.prod===prodname);
   if(index>=0){
    productData[index] = body;
    res.send(body);
   }
   else res.status(404).send("No product found");
 });
 
 app.delete("/products/:prodname", function(req,res) {
  let prodname = req.params.prodname;
   let index = productData.findIndex((st)=>st.prod===prodname);
   if(index>=0){
     let deleteProduct = productData.splice(index,1);
     res.send(deleteProduct);
   }
   else res.status(404).send("No product found");
 });