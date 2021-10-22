const express = require('express');
const gastosController = require('../controllers/gastosController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use(auth);


router.post('/create', gastosController.create);
router.get('/get_one/:id', gastosController.getOne);
router.get('/get_many', gastosController.getMany);
router.put('/update/:id', gastosController.update);
router.delete('/delete/:id', gastosController.delete);
module.exports = router;