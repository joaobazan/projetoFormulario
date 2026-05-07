const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja_carro'
});

//teste
app.get('/', (req, res) => {
    res.send('API Funcionando');
});

//salvar carros
app.post('/carros', (req, res) => {
    const {titulo, preco, marca, modelo, cambio} =
    req.body;
    const sql = `INSERT INTO carros (titulo, preco, marca, modelo, cambio) VALUES (?, ?, ?, ?, ?)`; 

    db.query(sql, [titulo, preco, marca, modelo, cambio], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro');
        } else {
            res.send(result);
        }
    });
});
