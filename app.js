const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userSchema = require('./models/user.schema')
const userRouter = require('./routers/users.router.cjs')

app.use(express.json())

// 🔐 (Better: move this to .env later)
const uri = "mongodb+srv://icasil2011_db_user:VCfatpxvmacRPikM@cluster0.ltnzujw.mongodb.net/E-commerce"

// Connect to DB
const connectToDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(uri)
        console.log("✅ Connected To DB")
    } catch (err) {
        console.log("❌ DB Error:", err)
    }
}

connectToDB()

app.use('/' , userRouter)

app.use(function(res,req) {
    res.status(404).send({url : req.originalUrl + ' Not Found'})
})

// Start server
app.listen(4000, () => {
    console.log("🚀 Server running on http://localhost:4000")
})