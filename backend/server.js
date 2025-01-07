const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Importação do CORS
const app = express();
const port = 3001;

// Adicionar suporte ao CORS
app.use(cors());

// Verificar e criar o diretório 'uploads/' se não existir
const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo não suportado. Apenas imagens são permitidas.'));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Rota para upload de imagens com tratamento de erros
app.post('/upload', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Erro no upload: ${err.message}` });
            }
            return res.status(500).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
        }
        res.json({ message: 'Imagem enviada com sucesso!', filename: req.file.filename });
    });
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
