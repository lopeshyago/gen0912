const express = require('express');
const passport = require('passport');
const { User, UserProfile, Settings } = require('../models');
const { 
  authenticateToken, 
  generateToken, 
  generateRefreshToken,
  verifyRefreshToken 
} = require('../middleware/auth');
const { 
  validateRegister, 
  validateLogin,
  validateChangePassword,
  validateResetPassword,
  validateConfirmResetPassword
} = require('../utils/validators');
const { 
  handleValidationErrors, 
  successResponse, 
  errorResponse,
  generateRandomToken,
  formatProperName,
  generateProjectColor
} = require('../utils/helpers');

const router = express.Router();

// Configurar estratégias do Passport
require('../config/passport');

// POST /api/auth/register - Cadastro de usuário
router.post('/register', validateRegister, handleValidationErrors, async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, '😅 Ops, parece que este email já está em nossa base de criadores! Tente fazer login.', 409);
    }

    // Criar usuário
    const user = await User.create({
      nome: formatProperName(nome),
      email: email.toLowerCase(),
      senha_hash: senha, // Será hasheada pelo hook do modelo
      provider: 'local',
    });

    // Criar perfil vazio
    await UserProfile.create({
      user_id: user.id,
    });

    // Criar configurações padrão
    await Settings.create({
      user_id: user.id,
    });

    // Gerar tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Buscar usuário completo para resposta
    const userWithProfile = await User.findByPk(user.id, {
      include: [
        {
          model: UserProfile,
          as: 'profile',
        },
      ],
    });

    successResponse(res, {
      user: userWithProfile,
      token,
      refresh_token: refreshToken,
    }, '✨ Cadastro concluído! Faça a sua primeira GENESI de produtos.', 201);

  } catch (error) {
    console.error('Erro no cadastro:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// POST /api/auth/login - Login com email/senha
router.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário
    const user = await User.findOne({ 
      where: { email: email.toLowerCase() },
      include: [
        {
          model: UserProfile,
          as: 'profile',
        },
      ],
    });

    if (!user) {
      return errorResponse(res, '😅 Ops, não encontramos nenhum criador com este email. Que tal se cadastrar?', 401);
    }

    // Verificar senha
    const isValidPassword = await user.verificarSenha(senha);
    if (!isValidPassword) {
      return errorResponse(res, '😅 Ops, parece que sua senha decidiu tirar férias. Tente novamente.', 401);
    }

    // Verificar se conta está ativa
    if (!user.ativo) {
      return errorResponse(res, '🚫 Sua conta está temporariamente desativada. Entre em contato com o suporte.', 403);
    }

    // Atualizar último login
    await user.update({ ultimo_login: new Date() });

    // Gerar tokens
    const token = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    successResponse(res, {
      user,
      token,
      refresh_token: refreshToken,
    }, '🔥 Bem-vindo de volta CRIADOR! Sua criação está à sua espera.');

  } catch (error) {
    console.error('Erro no login:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// GET /api/auth/me - Dados do usuário logado
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: UserProfile,
          as: 'profile',
        },
        {
          model: Settings,
          as: 'settings',
        },
      ],
    });

    if (!user) {
      return errorResponse(res, 'Usuário não encontrado', 404);
    }

    successResponse(res, { user }, 'Dados do usuário obtidos com sucesso');

  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// POST /api/auth/refresh - Renovar token
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return errorResponse(res, 'Refresh token é obrigatório', 400);
    }

    // Verificar refresh token
    const decoded = verifyRefreshToken(refresh_token);
    
    // Verificar se usuário ainda existe e está ativo
    const user = await User.findByPk(decoded.userId);
    if (!user || !user.ativo) {
      return errorResponse(res, 'Usuário inválido ou inativo', 401);
    }

    // Gerar novos tokens
    const newToken = generateToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    successResponse(res, {
      token: newToken,
      refresh_token: newRefreshToken,
    }, 'Token renovado com sucesso');

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Refresh token expirado. Faça login novamente.', 401);
    }
    
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 'Refresh token inválido', 401);
    }

    console.error('Erro ao renovar token:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// POST /api/auth/logout - Logout (invalidar token)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Em uma implementação completa, você adicionaria o token a uma blacklist
    // Por enquanto, apenas retornamos sucesso
    
    successResponse(res, null, '👋 Logout realizado com sucesso. Até a próxima criação!');

  } catch (error) {
    console.error('Erro no logout:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// POST /api/auth/change-password - Alterar senha
router.post('/change-password', authenticateToken, validateChangePassword, handleValidationErrors, async (req, res) => {
  try {
    const { senha_atual, nova_senha } = req.body;
    const user = await User.findByPk(req.userId);

    // Verificar senha atual
    const isValidPassword = await user.verificarSenha(senha_atual);
    if (!isValidPassword) {
      return errorResponse(res, 'Senha atual incorreta', 400);
    }

    // Atualizar senha
    await user.update({ senha_hash: nova_senha });

    successResponse(res, null, '🔒 Senha alterada com sucesso! Sua conta está ainda mais segura.');

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// POST /api/auth/forgot-password - Solicitar reset de senha
router.post('/forgot-password', validateResetPassword, handleValidationErrors, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    
    // Por segurança, sempre retornamos sucesso mesmo se o email não existir
    if (!user) {
      return successResponse(res, null, '📧 Se este email estiver cadastrado, você receberá as instruções para redefinir sua senha.');
    }

    // Gerar token de reset (em produção, salvar no banco com expiração)
    const resetToken = generateRandomToken();
    
    // TODO: Implementar envio de email
    // await sendPasswordResetEmail(user.email, resetToken);

    // Por enquanto, retornamos o token na resposta (apenas para desenvolvimento)
    successResponse(res, 
      process.env.NODE_ENV === 'development' ? { reset_token: resetToken } : null,
      '📧 Se este email estiver cadastrado, você receberá as instruções para redefinir sua senha.'
    );

  } catch (error) {
    console.error('Erro ao solicitar reset de senha:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// POST /api/auth/reset-password - Confirmar reset de senha
router.post('/reset-password', validateConfirmResetPassword, handleValidationErrors, async (req, res) => {
  try {
    const { token, nova_senha } = req.body;

    // TODO: Implementar verificação do token no banco de dados
    // Por enquanto, simulamos que o token é válido
    
    // Em produção, você buscaria o usuário pelo token de reset
    // const user = await User.findOne({ where: { reset_token: token } });
    
    successResponse(res, null, '🔒 Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.');

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    errorResponse(res, 'Erro interno do servidor', 500);
  }
});

// GET /api/auth/google - Iniciar login com Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// GET /api/auth/google/callback - Callback do Google
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      
      // Gerar tokens
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // Redirecionar para o frontend com tokens
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&refresh_token=${refreshToken}`);

    } catch (error) {
      console.error('Erro no callback do Google:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error?message=Erro no login com Google`);
    }
  }
);

// GET /api/auth/github - Iniciar login com GitHub
router.get('/github', passport.authenticate('github', {
  scope: ['user:email']
}));

// GET /api/auth/github/callback - Callback do GitHub
router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      
      // Gerar tokens
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // Redirecionar para o frontend com tokens
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&refresh_token=${refreshToken}`);

    } catch (error) {
      console.error('Erro no callback do GitHub:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error?message=Erro no login com GitHub`);
    }
  }
);

// GET /api/auth/linkedin - Iniciar login com LinkedIn
router.get('/linkedin', passport.authenticate('linkedin'));

// GET /api/auth/linkedin/callback - Callback do LinkedIn
router.get('/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      
      // Gerar tokens
      const token = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      // Redirecionar para o frontend com tokens
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&refresh_token=${refreshToken}`);

    } catch (error) {
      console.error('Erro no callback do LinkedIn:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error?message=Erro no login com LinkedIn`);
    }
  }
);

module.exports = router;
