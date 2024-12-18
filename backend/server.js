const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001;

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo
    },
});

const upload = multer({ storage });

// Rota para upload de imagens
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
    }
    res.json({ message: 'Imagem enviada com sucesso!', filename: req.file.filename });
});

// Rota inicial
app.get('/', (req, res) => {
    res.send('Bem-vindo ao NeonShadowFeed!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});