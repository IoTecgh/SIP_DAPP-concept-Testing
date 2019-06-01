const express = require('express')
const app = express()
//const port = 3001
const body_parser=require('body-parser')
const Network=require('./Network');
const btc=new Network();
const uuid=require('uuid/v1');
const rp=require('request-promise');
const port=process.argv[2];
//reward address for the current network node
const nodeAddress=uuid().split('-').join('');
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.get('/nodes', function(req, res) {
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

            app.post('/messages', function(req, res) {

                const newmessage=req.body.message;
                 btc.groupMessage.push(newmessage) 
                  // res.json({note:`trx will be added in block ${blockIndex}`})
                
                     
                });
                
                app.post('/messages/broadcast', function(req, res) {
                    var message=req.body.message;
                    //const newtrx=btc.createNewTransaction(amount,sender,recipient);
                    btc.groupMessage.push(message);
                    const requestPromises=[]
                    
                    btc.networkNodes.forEach(NetworkNodeURL =>{
                        res.json({note:NetworkNodeURL})
                        const requestOptions={ 
                            uri:NetworkNodeURL +'/messages',
                            method:'POST',  
                            body:{message:message},
                            json:true
                        };
                       requestPromises.push( rp(requestOptions));
                      
                    })
                    Promise.all(requestPromises).then(data =>{
                        res.json({note:'message sent to group'})
                    })
                
                    
                });

            


                app.post('/multicast/message', function(req, res) {
                    const hosts=[]
                    const multicastMessage=req.body.message;
                    hosts.push(...req.body.hosts);
                    res.json({note:  hosts})
                    const requestPromises=[];
                    hosts.forEach(NetworkNodeURL=>{
                        
                        const requestOptions={
                            uri:NetworkNodeURL + '/messages',
                            method:'POST',
                            body:{message:multicastMessage},
                            json:true
                        }
                         requestPromises.push(rp(requestOptions))
   
                    })
                    Promise.all(requestPromises).then(data =>{
                        res.json({note:'message sent '})
                    })
                })
                

app.listen(port, () => console.log(`Example app listening on port ${port}!`))