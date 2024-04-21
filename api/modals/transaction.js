const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const TransactionSchema =  new Schema({
    label: {type: String, required: true},
    note: {type: String, required: true},
    datetime: {type: Date, required: true},
    amount: {type: Number, required: true},
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    }
})

const TransactionModel = model('Transaction', TransactionSchema)

module.exports = TransactionModel;