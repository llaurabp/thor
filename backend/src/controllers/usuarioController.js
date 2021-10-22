const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// const SECRET = require('../../secret.json');
const SECRET = "c11c4d7f45038969d78f0a4cb6afbbe1";

module.exports = {
    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const usuario = await Usuario.findOne({ email }).select('+senha');

            if (!usuario) {
                return res.send(400).send({ error: 'usuario nao encontrado' });
            }

            if (!await bcrypt.compare(senha, usuario.senha)) {
                return res.status(400).send({ error: 'credencial inválida' });
            }
            
            
            const usuarioCheck = await Usuario.findOne({ usuario });
            if (usuarioCheck != null) {
                usuarioCheck.usuario = usuario;
                return res.send({
                    usuarioCheck,
                    token: jwt.sign({ id: usuarioCheck.id }, SECRET, { 
                        expiresIn: 86400,
                    }),
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'autenticação falhou' });
        }
    },

    registrarUsuario: async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const criarUsuario = await Usuario.create({nome, email, senha});
            return res.send(criarUsuario);
        } catch (err) {
            return res.status(400).send({ error: 'não foi possivel registrar usuario' });
        }
    },

}