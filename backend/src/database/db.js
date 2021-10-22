const mongoose = require('mongoose');

const projethorDB = async() => {
    try { 
        const db = await mongoose.connect("mongodb://localhost/projethor");
    } catch (err) {
            console.log(err);
            process.exit(1);
    }
 }

module.exports = projethorDB;
