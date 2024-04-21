const express = require('express')
const cors = require('cors');
require('dotenv').config()
const Transaction = require("./modals/transaction")
const mongoose = require("mongoose")
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/transaction", async (req, res) => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        const {label, note, datetime, amount, type} = req.body;
        if(!label || !note || !datetime || !amount || !type) {
            return res.status(400).json({error: "All fields are required"});
        }
        const transaction = await Transaction.create({label, note, datetime, amount, type});
        res.json(transaction);
    }catch(error){
        res.status(500).json({error: "Failed to create transaction"})
    }
})

app.get("/api/recent-transactions", async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transactions = await Transaction.find()
            .sort({datetime: -1})
            .limit(3);
        res.json(transactions)
    }catch(error){
        res.status(500).json({error: "Failed to fetch transactions"})
    }
})

app.get("/api/transactions", async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transactions = await Transaction.find().sort({datetime: -1})
        res.json(transactions)
    }catch(error){
        res.status(500).json({error: "Failed to fetch transactions"})
    }
})

app.delete("/api/delete-transactions", async(req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        await Transaction.deleteMany({});
    }catch(error){
        res.status(500).json({error: "Failed to delete transactions"})
    }
})

app.listen(4040);
