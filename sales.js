const orders =  [
    {orderNo:134, mobileId:1, quantity:2},
    {orderNo:156, mobileId:2, quantity:1},
    {orderNo:188, mobileId:4, quantity:3},
    {orderNo:291, mobileId:2, quantity:4},
    {orderNo:322, mobileId:4, quantity:4},
    {orderNo:215, mobileId:3, quantity:1}
];
function getMobileById(id){
   let qty= orders.find(od=> od.mobileId===id);
   if(qty!==undefined) return qty.quantity;
}
function totalOrderValue(a,b){
    return a*b;
}

module.exports.orders= orders;
module.exports.fns= {getMobileById};
module.exports.fn= {totalOrderValue};
