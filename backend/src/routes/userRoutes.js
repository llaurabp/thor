const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/criar', usuarioController.registrarUsuario);
router.post('/login', usuarioController.login);

module.exports = router;