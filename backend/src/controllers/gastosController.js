const Gastos = require('../models/gastos');

module.exports = {
    create: async (req, res) => {
        const { marca, valor, data, quantidade } = req.body;
        try {
            const createGastos = await Gastos.create({ marca, valor, data, quantidade });
            return res.send(createGastos);

        } catch (err) {
            return res.status(401).send({ error: 'nao deu certo galera' });
        }
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        try {
            const getGastos = await Gastos.findById(id);
            // console.log(getGastos);
            return res.status(200).send(getGastos);
        } catch (err) {
            console.log(err);
            return res.status(404).send({ error: 'nao achamo' });
        }
    },

    getMany: async (req, res) => {
        try {
            const getManyGastos = await Gastos.find();
            return res.status(200).send(getManyGastos);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'nao achamo todo mundo' });
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const deleteGastos = await Gastos.findByIdAndRemove(id);
            return res.send({ 'OK': "EI CARA APAGOU AQAUI OH" });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'nao deu pra apagar' });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const { marca, valor, quantidade } = req.body;
        try {
            const updateGastos = await Gastos.findByIdAndUpdate(
                { _id: id },
                { marca: marca, quantidade: quantidade, valor: valor }
            );
            return res.send({ 'OK': "updated" });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'nao deu pra editar' });
        }
    }


}