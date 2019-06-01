 const Blockchain=require('./Network');

 const btc=new Blockchain();
 const bc1={
    
        "chain": [
        {
        "index": 1,
        "timestamp": 1559364027278,
        "transactions": [],
        "nonce": 77,
        "hash": "0",
        "previousBlockHash": "0"
        },
        {
        "index": 2,
        "timestamp": 1559365642170,
        "transactions": [],
        "nonce": 18140,
        "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
        "previousBlockHash": "0"
        },
        {
        "index": 3,
        "timestamp": 1559365654984,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "616f5cf0842711e983fc85e98ec69413",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        }
        ],
        "nonce": 90235,
        "hash": "00002efb6550f274589b519abc621ea987e85dfaf7224b0c03ffbc26780362d8",
        "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
        "index": 4,
        "timestamp": 1559365676766,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "616f5cf0842711e983fc85e98ec69413",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        }
        ],
        "nonce": 165065,
        "hash": "0000bdf8d6608cb7a19c6e97eca1f3b2bba744b964c5ef19af00f779378bec14",
        "previousBlockHash": "00002efb6550f274589b519abc621ea987e85dfaf7224b0c03ffbc26780362d8"
        },
        {
        "index": 5,
        "timestamp": 1559365676871,
        "transactions": [],
        "nonce": 9680,
        "hash": "00000a75ba831d45ae228b6708b62d3f72c6b57fb14f9550c2eada7a191ac3b8",
        "previousBlockHash": "0000bdf8d6608cb7a19c6e97eca1f3b2bba744b964c5ef19af00f779378bec14"
        },
        {
        "index": 6,
        "timestamp": 1559365787364,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "616f5cf0842711e983fc85e98ec69413",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        },
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "616f5cf0842711e983fc85e98ec69413",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        },
        {
        "amount": 17,
        "sender": "3dsffgjhffvdfhdcgfsfhdcr",
        "recipient": "rhfdjnver899347yhuerjfd",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        }
        ],
        "nonce": 15761,
        "hash": "0000ab52400690e0a4de18e7b4c84cd40f8170249c1de696345e188606e6bd8b",
        "previousBlockHash": "00000a75ba831d45ae228b6708b62d3f72c6b57fb14f9550c2eada7a191ac3b8"
        },
        {
        "index": 7,
        "timestamp": 1559365824296,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "616f5cf0842711e983fc85e98ec69413",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        }
        ],
        "nonce": 69180,
        "hash": "0000a08712daf194efeed8c0c96c91d37b94757ae4b81a30b6bfdb03fa5eed67",
        "previousBlockHash": "0000ab52400690e0a4de18e7b4c84cd40f8170249c1de696345e188606e6bd8b"
        },
        {
        "index": 8,
        "timestamp": 1559365982275,
        "transactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "616f5cf0842711e983fc85e98ec69413",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        },
        {
        "amount": 235,
        "sender": "3dsffgjhffvdfhdcgfsfhdcr",
        "recipient": "rhfdjnver899347yhuerjfd",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        }
        ],
        "nonce": 181458,
        "hash": "0000a80df2b0b223b5688abb7b66fe7a0f2a408c5329fd25bba3bf5301c2fe83",
        "previousBlockHash": "0000a08712daf194efeed8c0c96c91d37b94757ae4b81a30b6bfdb03fa5eed67"
        }
        ],
        "pendingTransactions": [
        {
        "amount": 12.5,
        "sender": "00",
        "recipient": "616f5cf0842711e983fc85e98ec69413",
        "trxid": "60b7f3d0842711e983fc85e98ec69413"
        }
        ],
        "currentNodeUrl": "http://localhost:3001",
        "networkNodes": []
    
        
 }

 console.log(btc.chainIsValid(bc1));