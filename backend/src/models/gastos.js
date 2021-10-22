const mongoose = require('mongoose');

const GastosSchema = new mongoose.Schema({
    marca: {
        type: String, 
        required: true,
    },

    valor: {
        type: Number,
        required: true,
     },
    data: {
        type: Date,
        required: true,
     },
    quantidade: {
        type: Number,
        required: true,
     },
}, { timestamps: true});

module.exports = mongoose.model('Gastos', GastosSchema);