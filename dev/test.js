 const Blockchain=require('./blockchain');

 const btc=new Blockchain();
 btc.createNewBlock(1,"esgdgdgdxzvcxvdvzx","zdfdsgdsgdsggd")
//  btc.createNewTransaction(131,"dfdsfsgd","sdgsdg");
//  btc.createNewTransaction(131,"dfdsfsgd","sdgsdg");
//  btc.createNewTransaction(131,"dfdsfsgd","sdgsdg");
const newtrx=btc.createNewTransaction=[{
    
amount:77,
sender:"tgfdhjg",
recipient:"iyughgh"
    
},
{
amount:77,
sender:"tgfdhjg",
recipient:"iyughgh"
}
];
 btc.hashBlock("esgdgdgdxzvcxvdvzx",newtrx,9)
 console.log(btc.hashBlock("esgdgdgdxzvcxvdvzx",newtrx,9));