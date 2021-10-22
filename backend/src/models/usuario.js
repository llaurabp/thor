const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        select: false,
        required: true,
        
    },
},
    { timestamps: true });

usuarioSchema.pre('save', async function (next) {
    let { senha } = this;
    this.senha = await bcrypt.hash(senha, 10).catch(e => next(e));

    next();

});

module.exports = mongoose.model('Usuario', usuarioSchema);