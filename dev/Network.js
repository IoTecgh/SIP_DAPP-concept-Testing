const sha256=require('sha256');
//const currentNodeUrl=process.argv[3];
const uuid= require('uuid/v1');
const transactionID=uuid().split('-').join(''); 
const currentNodeUrl=process.argv[3];
class Network{
    constructor(){
    this.groupMessage=[]
    this.currentNodeUrl=currentNodeUrl;
    this.networkNodes=[];


    }


}
module.exports=Network