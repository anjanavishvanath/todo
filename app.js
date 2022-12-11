const express = require('express')
const mongoose = require('mongoose')
const todoModel = require('./models/todoModel')
const app = express()

app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/todoDB')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', async (req,res) => {
    const items = await todoModel.find()
    const left = await todoModel.countDocuments({completed:false})
    console.log(items)
    res.render('index', {todoList:items, itemsLeft: left})
})

app.post('/add_todo', async (req,res) => {
    const todoItem = await todoModel.create({ 
        todoThing: req.body.thing,
        completed: false
    })
    console.log(todoItem)
    res.redirect('/')
})

app.put('/markComplete', async (req,res) => {
    // const doc = await todoModel.findOne({'todoThing': req.body.itemFromJS})
    // console.log(doc)
    const updatedItem = await todoModel.updateOne({'todoThing': req.body.itemFromJS},{
        $set: {
            completed: true
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    console.log(updatedItem)
    res.json('Marked complete')
})

app.put('/markIncomplete', async (req,res) => {
    const updatedItem = await todoModel.updateOne({'todoThing': req.body.itemFromJS},{
        $set: {
            completed: false
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    console.log(updatedItem)
    res.json('Marked Incomplete')
})

app.delete('/deleteItem', async (req,res) => {
    console.log(req.body.itemToDel)
    const deletedItem = await todoModel.deleteOne({'todoThing':req.body.itemToDel})
    console.log('item deleted')
    res.json("item deleted")
})

app.listen('8000', () => console.log('on port 8000'))