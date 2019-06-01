const sha256=require('sha256');
//const currentNodeUrl=process.argv[3];
const uuid= require('uuid/v1');
const transactionID=uuid().split('-').join(''); 
const currentNodeUrl=process.argv[3];
class Blockchain{
    constructor(){
    this.chain=[];
    this.pendingTransactions=[];
    this.currentNodeUrl=currentNodeUrl;
    this.networkNodes=[];
    this.createNewBlock(77,'0','0')

    }

createNewBlock(nonce,previousBlockHash,hash) {
    const newBlock={
        index:this.chain.length+1,
        timestamp:Date.now(),
        transactions:this.pendingTransactions,
        nonce:nonce,
        hash:hash,
        previousBlockHash:previousBlockHash

    };
    this.pendingTransactions=[];
    this.chain.push(newBlock);

    return newBlock;
    
}
getLastBlock(){
    return this.chain[this.chain.length-1];
}

createNewTransaction(amount,sender,recipient){ 
    const newTransaction={
        amount:amount,
        sender:sender,
        recipient:recipient,
        trxid:transactionID
    };

    //this.pendingTransactions.push(newTransaction); 
    //return this.getLastBlock()['index']  + 1;
    return newTransaction;

}

AddTrxToPendingTrx(transactionOBJ){
    this.pendingTransactions.push(transactionOBJ);
    return this.getLastBlock()['index']+1;

}
hashBlock(previousBlockHash,currentBlockData,nonce){
    const dataAsString=previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash=sha256(dataAsString);
    return hash;
}
proofOfWork(previousBlockHash,currentBlockData){
    let nonce=0;
    let hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
    while(hash.substring(0,4)!=='0000'){
        nonce++;
        hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
    }
    return nonce;

}
chainIsValid(blockchain){
    let validChain=false
    for(var i=1;i<blockchain.length;i++){
        const currentBlock=blockchain[i];
        const previousBlock=blockchain[i-1];
        const blockHash=this.hashBlock(previousBlock['hash'],{transactions:currentBlock['transactions'],index:currentBlock['index']},currentBlock['nonce'])
        if(currentBlock['previousBlockHash']===previousBlock['hash'])validChain=true; 
        if(blockHash.substring(0,4)==='0000')validChain=true
        
    };
const genesisBlock=blockchain[0];
const correctNonce=genesisBlock['nonce']===77;
const correctPrevBlockHash=genesisBlock['previousBlockHash']==='0';
const correcthash=genesisBlock['hash']==='0';
const correcttrx=genesisBlock['transactions'].length===0;
if(correctNonce  || correctPrevBlockHash || correcthash || correcttrx)
validChain=true
return validChain;
}
}

module.exports=Blockchain