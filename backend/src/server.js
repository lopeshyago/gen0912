const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Inicializar banco de dados
const { protect } = require('./middleware/auth');
const { testConnection, syncDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_DIST_PATH = path.join(__dirname, '..', 'public');
const SHOULD_SERVE_FRONTEND = process.env.SERVE_FRONTEND !== 'false';

// Confiar nos proxies (necessário para rate limiting e logs corretos)
app.set('trust proxy', 1);

// Middleware de segurança
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP por janela de tempo
  message: {
    error: 'Muitas tentativas. Tente novamente em 15 minutos.',
  },
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rotas de saúde
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Rotas da API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', protect, require('./routes/users')); // Exemplo de rota protegida
app.use('/api/documents', require('./routes/documents'));
app.use('/api/collaborators', require('./routes/collaborators'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/analytics', require('./routes/analytics'));

// Servir frontend estático quando disponível
if (SHOULD_SERVE_FRONTEND && fs.existsSync(FRONTEND_DIST_PATH)) {
  app.use(express.static(FRONTEND_DIST_PATH));

  app.get(/^\/(?!api|health).*/, (req, res) => {
    res.sendFile(path.join(FRONTEND_DIST_PATH, 'index.html'));
  });
}

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: err.message,
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Token inválido ou expirado',
    });
  }
  
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado',
  });
});

// Rota 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl,
  });
});

// Inicializar servidor
const startServer = async () => {
  try {
    // Testar conexão com banco
    await testConnection();
    
    // Sincronizar modelos (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      await syncDatabase();
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor GenesiX rodando na porta ${PORT}`);
      console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 APIs de autenticação disponíveis`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
