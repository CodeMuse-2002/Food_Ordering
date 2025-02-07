const express = require('express')
const db = require('../db')
const utils = require('../utils')
const router = express.Router()

router.post('/addItem',(request,response) =>{
    const {item_name,type,price,quantity,description} = request.body
    const statement = `INSERT INTO food_items(item_name,type, price, quantity, description) VALUES(?,?,?,?,?)`

    db.pool.query(statement,[item_name,type, price, quantity, description],(error,result) =>{
        response.send(utils.createResult(error,result))
    })
})

router.put('/updateItem',(request,response) =>{
    const {item_name,type, price, quantity, description} = request.body
    const statement = `UPDATE food_items SET item_name = "?",type = "?", price = ?, quantity = ?, description = "?" WHERE food_item_id = ?`

    db.pool.query(statement,[item_name,type, price, quantity, description,request.user['id']],(error,result) =>{
        response.send(utils.createResult(error,result))
    })
})

router.delete('/deleteItem',(request,response) =>{
    const statement = `DELETE FROM food_items WHERE food_item_id = ?`

    db.pool.query(statement,[request.user['id']],(error,result) =>{
        response.send(utils.createResult(error,result))
    })
})

router.post('/addToCart/:id',(request,response) =>{
    const { id } = request.params;
    const statement = `INSERT INTO cart(food_item_id, order_date) VALUES(?,curdate())`

    db.pool.query(statement,[id],(error,result) =>{
        response.send(utils.createResult(error,result))
    })
})
router.post('/getItems',(request,response)=>{
    const { type } = request.body;
    const statement = 'SELECT food_item_id,item_name,quantity,price,description FROM food_items WHERE type = ?';

    db.pool.query(statement,[ type ], (error,data)=>{
        return response.send(utils.createResult(error,data))
    });
})

router.get('/getItemList',(request,response)=>{
    const { id } = request.headers;
    const statement = 'SELECT food_item_id,item_name,quantity,price,description FROM food_items WHERE food_item_id = ?';

    db.pool.query(statement,[ id ], (error,data)=>{
        return response.send(utils.createResult(error,data))
    });
})
router.get('/getCartItems',(request,response)=>{
    const stmnt = 'Select item_name,quantity,price,order_date from food_items,cart where food_items.food_item_id=cart.food_item_id';
    db.pool.query(stmnt,(error,data)=>{
        return response.send(utils.createResult(error,data))
    });
})
module.exports = router