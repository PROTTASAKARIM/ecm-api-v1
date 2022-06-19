const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

require('dotenv').config()

// app init
const app = express();
app.use(express.json());
// app.use('/api/user', seedRouter);




const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jmnaf.mongodb.net/?retryWrites=true&w=majority`
// database connection
mongoose.connect(dbUrl)
.then(()=>console.log('connection successful'))
.catch(err=>console.log(err))

// application routes
app.use('/api/product', productRoutes)


// Home
app.get('/', async(req, res)=>{
    res.send('Hello')
})


// error Handle
function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err);
    }else{
        res.status(500).json({error: err});
    }
}

// start app
app.listen('5001',()=>{
    console.log('Listing port:', '5000')
})