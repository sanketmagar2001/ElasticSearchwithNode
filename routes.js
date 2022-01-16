const express = require('express');

//connect to elastic Search
const {Client} = require('elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const router = express.Router();

//CRUD operations
//create index - POST
router.post('/createEmployee/:index',(req,res)=>{
    const index = req.params.index;
    client.index({
        index: index,
        body:req.body
    }).then(()=>{
        res.send("Employee Indexed !");
    }).catch((err)=>{
        console.log(err);
    });
});

//search - GET
router.get('/search/:index',(req,res)=>{
    const index = req.params.index;
    const search = req.query.q;
    client.search({
        index: index,
        body: {
          query: {
            match: {
              first_name: search
            }
          }
        }
    }).then((data)=>{
        console.log(data.hits.hits);
        res.send({hits:data.hits.hits,maxhitscore:data.hits.max_score,total:data.hits.total})
    }).catch((err)=>{
        console.log(err);
        res.status(404).send({msg:"search not found !"});
    })
})
//update - put
router.put('/updateEmployee/:index/:id',(req,res)=>{
    const index = req.params.index;
    const _id = req.params.id;
    client.update({
        index: index,
        id: _id,
        body: {
            doc: {
                first_name: req.body.first_name
          }
        }
    }).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
});
//delete 
router.delete('/deleteEmployee/:index/:id',(req,res)=>{
    const index = req.params.index;
    const _id = req.params.id;
    client.delete({
        index:index,
        id:_id
    }).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({msg:"delete unsuccessful"});
    });
});


module.exports = router;
