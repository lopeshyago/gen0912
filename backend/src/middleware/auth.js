const jwt = require('jsonwebtoken');

const accessSecret = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET || accessSecret;

// Utilidades de banco carregadas sob demanda para evitar ciclos
const loadModels = () => require('../models');

// Middleware para rotas que exigem autenticação via JWT
const authenticateToken = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [, token] = header.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, accessSecret);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    console.error('Erro na autenticação do token:', error);
    return res.status(401).json({ message: 'Não autorizado, token inválido.' });
  }
};

// Alias mantido para compatibilidade com o server.js
const protect = authenticateToken;

// Garante que o usuÃ¡rio tenha um perfil bÃ¡sico cadastrado antes de seguir
const requireCompleteProfile = async (req, res, next) => {
  try {
    const { UserProfile } = loadModels();

    if (!req.userId) {
      return res.status(401).json({ message: 'NÃ£o autorizado, nenhum token fornecido.' });
    }

    const profile = await UserProfile.findOne({ where: { user_id: req.userId } });

    if (!profile) {
      return res.status(403).json({ message: 'Complete seu perfil para continuar.' });
    }

    req.userProfile = profile;
    return next();
  } catch (error) {
    console.error('Erro ao verificar perfil do usuÃ¡rio:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Verifica se o usuÃ¡rio autenticado Ã© dono do recurso solicitado
const checkOwnership = (req, res, next) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.status(401).json({ message: 'NÃ£o autorizado, nenhum token fornecido.' });
  }
  if (id && id !== req.userId) {
    return res.status(403).json({ message: 'VocÃª nÃ£o tem permissÃ£o para alterar este recurso.' });
  }
  return next();
};

// Gera tokens curtos para autenticação das rotas
const generateToken = (userId) =>
  jwt.sign({ userId }, accessSecret, { expiresIn: '1h' });

const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, refreshSecret, { expiresIn: '7d' });

const verifyRefreshToken = (token) => jwt.verify(token, refreshSecret);

module.exports = {
  authenticateToken,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  protect,
  requireCompleteProfile,
  checkOwnership,
};
