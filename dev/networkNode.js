const express = require('express')
const app = express()
//const port = 3001
const body_parser=require('body-parser')
const Blockchain=require('./blockchain');
const btc=new Blockchain();
const uuid=require('uuid/v1');
const rp=require('request-promise');
const port=process.argv[2];
//reward address for the current network node
const nodeAddress=uuid().split('-').join('');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.get('/blockchain', function(req, res) {
res.send(btc)
    
})
// this endpoint registers a node and broadcast
app.post('/register-broadcast', function(req, res) {
    const newNodeUrl=req.body.newNodeUrl
    if(btc.networkNodes.indexOf(newNodeUrl)==-1)  btc.networkNodes.push(newNodeUrl);
    const RegisterNodesPromises=[]
    btc.networkNodes.forEach(NetworkNodeURL=> {
    const requestOptions={
    uri:NetworkNodeURL+ '/register-node',
    method:'POST',
    body:{newNodeUrl:newNodeUrl},
    json:true
};
RegisterNodesPromises.push(rp(requestOptions));
    });
    Promise.all(RegisterNodesPromises).then(data=>{
        //registering all avalable nodes to the new node
    const bulkRegisterOptions={
    uri:newNodeUrl+ '/register-nodes-bulk',
    method:'POST',
    body:{ allNetworkNodes: [...btc.networkNodes,btc.currentNodeUrl]},
    json:true
};
return rp(bulkRegisterOptions);
    }).then(data =>{
        res.json({note:'new node registered successfully'})
    }) 
    })
//register a node with network
    app.post('/register-node', function(req, res) {
       const newNodeUrl=req.body.newNodeUrl;
       const nodeNotPresent=btc.networkNodes.indexOf(newNodeUrl)==-1;
       const notcurrentNode=btc.currentNodeUrl!==newNodeUrl;
       if (nodeNotPresent&&notcurrentNode)btc.networkNodes.push(newNodeUrl);
       res.json({note:'new node registered successfullt with node'});

            
        })

        app.post('/register-nodes-bulk', function(req, res) {
            const allNetworkNodes=req.body.allNetworkNodes;
            allNetworkNodes.forEach(NetworkNodeURL =>{
                const nodeNotPresent=btc.networkNodes.indexOf(NetworkNodeURL)==-1
                const notcurrentNode=btc.currentNodeUrl!==NetworkNodeURL;
                if(nodeNotPresent&&notcurrentNode)btc.networkNodes.push(NetworkNodeURL) ;
            });
            res.json({note:'bulk registrattion success',allNetworkNodes})

                 
            })

app.post('/transactions', function(req, res) {

const newtrx=req.body;
   const blockIndex= btc.AddTrxToPendingTrx(newtrx);  
   res.json({note:`trx will be added in block ${blockIndex}`})

     
});

app.post('/transactions/broadcast', function(req, res) {
    var amount=req.body.amount;
    var sender=req.body.sender;
    var recipient=req.body.recipient;
    const newtrx=btc.createNewTransaction(amount,sender,recipient);
    btc.AddTrxToPendingTrx(newtrx);
    const requestPromises=[]
    btc.networkNodes.forEach(NetworkNodeURL =>{
        const requestOptions={ 
            uri:NetworkNodeURL +'/transactions',
            method:'POST',  
            body:newtrx,
            json:true
        };
       requestPromises.push( rp(requestOptions));
       Promise.all(requestPromises).then(data =>{
           res.json({note:'trx created and broadcast was successfull'})
       })
    })


    
});

app.get('/mine', function(req, res) {
const lastBlock=btc.getLastBlock();
const previousBockHash=lastBlock['hash'];
//block data for current block
const currentBlockData={
    transactions:btc.pendingTransactions,
    index:lastBlock['index']+1
}
//calculating nonce value for this block
const nonce=btc.proofOfWork(previousBockHash,currentBlockData);
const currentBlockHash=btc.hashBlock(previousBockHash,currentBlockData,nonce)
//
const newBlock=btc.createNewBlock(nonce,previousBockHash,currentBlockHash)
const requestPromises=[]
btc.networkNodes.forEach(NetworkNodeURL=>{
    const requestOptions={
        uri:NetworkNodeURL +'/recieve-new-block',
        method:'POST',
        body:{newBlock:newBlock},
        json:true
    };
   requestPromises.push(rp(requestOptions));
});
Promise.all(requestPromises).then(data=>{
    // this code below is the mining reward and and sent to pending transactions 
        const requestOptions={
            uri: btc.currentNodeUrl + '/transactions/broadcast',
            method:'POST',
            body:{
                "amount": 12.5,
                "sender": "00",
                "recipient": nodeAddress},
            json:true
        };
        return rp(requestOptions);
    
    })
        res.json({note:"new block mined successfully",
        block:newBlock })
    
       
    
        
    


    
   
});

app.post('/recieve-new-block', function(req, res) {
    const newblock=req.body.newBlock;
    const lastBlock=btc.getLastBlock();
    const correctHash=lastBlock.hash ===newblock.previousBlockHash
    const correctIndex=lastBlock.index+1===newblock.index
    if(correctHash && correctIndex){
        btc.chain.push(newblock);
        btc.pendingTransactions=[];
        res.json({note:'new blocked recieved and accepted',
    newblock:newblock});
    }
    else{

        res.json({note:'block rejected',
    newblock:newblock});
    }


     


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))