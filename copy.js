const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userSchema = require('./models/user.schema')

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


// 🔹 Get all users
app.get('/api/users', async (req, res) => {
    try {
        let users = await userSchema.find()
        res.json({ users, status: 200 })
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" })
    }
})

// 🔹 Get one user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        let user = await userSchema.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json({ user, status: 200 })
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" })
    }
})

// 🔹 Create user
app.post('/api/users', async (req, res) => {
    try {
        let { name, email, phone } = req.body

        if (!name || !email || !phone) {
            return res.status(400).json({ message: "Missing data" })
        }

        let user = await userSchema.create({ name, email, phone })

        res.json({
            message: "User added successfully",
            user,
            status: 200
        })
    } catch (err) {
        res.status(500).json({ message: "Error creating user" })
    }
})

// 🔹 Update user by ID
app.put('/api/users/:id', async (req, res) => {
    try {
        let { name, email, phone } = req.body

        let user = await userSchema.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json({
            message: "User updated successfully",
            user,
            status: 200
        })
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" })
    }
})

// 🔹 Delete user by ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        let user = await userSchema.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json({
            message: "User deleted successfully",
            status: 200
        })
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" })
    }
})

// Start server
app.listen(8085, () => {
    console.log("🚀 Server running on http://localhost:8085")
})