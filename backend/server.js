const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Adicionado para verificar e criar a pasta
const app = express();
const port = 3001;

// Verificar e criar o diretório 'uploads/' se não existir
const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nome único para o arquivo
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

// Servir a pasta 'uploads/' para acesso público
app.use('/uploads', express.static(uploadsDir));

// Rota inicial
app.get('/', (req, res) => {
    res.send('Bem-vindo ao NeonShadowFeed!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
