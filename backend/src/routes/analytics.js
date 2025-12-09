const express = require('express');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { User, UserProfile, Project, Document, Collaborator, Settings } = require('../models');

const router = express.Router();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

/**
 * GET /api/analytics/dashboard
 * Métricas gerais do dashboard do usuário
 */
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30' } = req.query; // Período em dias (7, 30, 90, 365)
    
    const periodDays = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Métricas básicas
    const [
      totalProjects,
      activeProjects,
      completedProjects,
      totalDocuments,
      approvedDocuments,
      totalCollaborations,
      activeCollaborations,
      recentActivity
    ] = await Promise.all([
      // Total de projetos
      Project.count({ where: { user_id: userId } }),
      
      // Projetos ativos
      Project.count({ 
        where: { 
          user_id: userId, 
          status: ['ativo', 'rascunho'] 
        } 
      }),
      
      // Projetos concluídos
      Project.count({ 
        where: { 
          user_id: userId, 
          status: 'concluido' 
        } 
      }),
      
      // Total de documentos
      Document.count({ where: { user_id: userId } }),
      
      // Documentos aprovados
      Document.count({ 
        where: { 
          user_id: userId, 
          status: 'aprovado' 
        } 
      }),
      
      // Total de colaborações (onde o usuário é colaborador)
      Collaborator.count({ 
        where: { 
          user_id: userId, 
          status: 'ativo' 
        } 
      }),
      
      // Colaborações ativas no período
      Collaborator.count({ 
        where: { 
          user_id: userId, 
          status: 'ativo',
          created_at: { [Op.gte]: startDate }
        } 
      }),
      
      // Atividade recente (documentos criados no período)
      Document.count({ 
        where: { 
          user_id: userId,
          created_at: { [Op.gte]: startDate }
        } 
      })
    ]);

    // Progresso médio dos projetos
    const projectsWithProgress = await Project.findAll({
      where: { user_id: userId },
      attributes: ['progresso'],
      raw: true
    });

    const averageProgress = projectsWithProgress.length > 0
      ? Math.round(projectsWithProgress.reduce((sum, p) => sum + (p.progresso || 0), 0) / projectsWithProgress.length)
      : 0;

    // Distribuição por etapas
    const documentsByStep = await Document.findAll({
      where: { user_id: userId },
      attributes: [
        'etapa',
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: ['etapa'],
      raw: true
    });

    // Atividade por dia (últimos 30 dias)
    const dailyActivity = await Document.findAll({
      where: {
        user_id: userId,
        created_at: { [Op.gte]: startDate }
      },
      attributes: [
        [require('sequelize').fn('DATE', require('sequelize').col('created_at')), 'date'],
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: [require('sequelize').fn('DATE', require('sequelize').col('created_at'))],
      order: [[require('sequelize').fn('DATE', require('sequelize').col('created_at')), 'ASC']],
      raw: true
    });

    // Taxa de conclusão
    const completionRate = totalProjects > 0 
      ? Math.round((completedProjects / totalProjects) * 100) 
      : 0;

    // Taxa de aprovação de documentos
    const approvalRate = totalDocuments > 0 
      ? Math.round((approvedDocuments / totalDocuments) * 100) 
      : 0;

    res.json({
      success: true,
      data: {
        period: periodDays,
        overview: {
          total_projects: totalProjects,
          active_projects: activeProjects,
          completed_projects: completedProjects,
          total_documents: totalDocuments,
          approved_documents: approvedDocuments,
          total_collaborations: totalCollaborations,
          recent_activity: recentActivity,
          average_progress: averageProgress,
          completion_rate: completionRate,
          approval_rate: approvalRate
        },
        charts: {
          documents_by_step: documentsByStep,
          daily_activity: dailyActivity
        },
        trends: {
          new_collaborations: activeCollaborations,
          documents_created: recentActivity,
          projects_completed: completedProjects
        }
      }
    });

  } catch (error) {
    console.error('Erro ao buscar analytics do dashboard:', error);
    res.status(500).json({
      success: false,
      message: '😅 Ops! Nossos números estão fazendo uma pausa. Tente novamente em instantes.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/analytics/projects/:id
 * Analytics detalhado de um projeto específico
 */
router.get('/projects/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    // Verificar se o usuário tem acesso ao projeto
    const project = await Project.findOne({
      where: { 
        id: projectId,
        [Op.or]: [
          { user_id: userId }, // Dono do projeto
          { '$Collaborators.user_id$': userId } // Colaborador
        ]
      },
      include: [{
        model: Collaborator,
        where: { status: 'ativo' },
        required: false
      }]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: '🔍 Projeto não encontrado ou você não tem acesso a ele.'
      });
    }

    // Métricas do projeto
    const [
      totalDocuments,
      documentsByStatus,
      documentsByStep,
      collaborators,
      timeline,
      completionStats
    ] = await Promise.all([
      // Total de documentos
      Document.count({ where: { projeto_id: projectId } }),
      
      // Documentos por status
      Document.findAll({
        where: { projeto_id: projectId },
        attributes: [
          'status',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['status'],
        raw: true
      }),
      
      // Documentos por etapa
      Document.findAll({
        where: { projeto_id: projectId },
        attributes: [
          'etapa',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['etapa'],
        raw: true
      }),
      
      // Colaboradores ativos
      Collaborator.findAll({
        where: { 
          project_id: projectId, 
          status: 'ativo' 
        },
        include: [{
          model: User,
          attributes: ['nome', 'email', 'avatar_url']
        }]
      }),
      
      // Timeline de atividades (últimos 30 dias)
      Document.findAll({
        where: { 
          projeto_id: projectId,
          created_at: { 
            [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
          }
        },
        attributes: ['titulo', 'etapa', 'status', 'created_at'],
        include: [{
          model: User,
          attributes: ['nome']
        }],
        order: [['created_at', 'DESC']],
        limit: 20
      }),
      
      // Estatísticas de conclusão por etapa
      Document.findAll({
        where: { projeto_id: projectId },
        attributes: [
          'etapa',
          'status',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['etapa', 'status'],
        raw: true
      })
    ]);

    // Calcular progresso por etapa
    const stepProgress = {};
    completionStats.forEach(stat => {
      if (!stepProgress[stat.etapa]) {
        stepProgress[stat.etapa] = { total: 0, approved: 0 };
      }
      stepProgress[stat.etapa].total += parseInt(stat.count);
      if (stat.status === 'aprovado') {
        stepProgress[stat.etapa].approved += parseInt(stat.count);
      }
    });

    // Calcular percentual de conclusão por etapa
    Object.keys(stepProgress).forEach(step => {
      const data = stepProgress[step];
      stepProgress[step].percentage = data.total > 0 
        ? Math.round((data.approved / data.total) * 100) 
        : 0;
    });

    // Atividade dos colaboradores
    const collaboratorActivity = await Document.findAll({
      where: { projeto_id: projectId },
      attributes: [
        'user_id',
        [require('sequelize').fn('COUNT', require('sequelize').col('Document.id')), 'document_count']
      ],
      include: [{
        model: User,
        attributes: ['nome', 'email']
      }],
      group: ['user_id', 'User.id', 'User.nome', 'User.email'],
      raw: true
    });

    res.json({
      success: true,
      data: {
        project: {
          id: project.id,
          nome: project.nome,
          status: project.status,
          progresso: project.progresso,
          etapa_atual: project.etapa_atual,
          created_at: project.created_at
        },
        metrics: {
          total_documents: totalDocuments,
          total_collaborators: collaborators.length,
          documents_by_status: documentsByStatus,
          documents_by_step: documentsByStep,
          step_progress: stepProgress
        },
        collaborators: collaborators.map(collab => ({
          id: collab.id,
          role: collab.role,
          user: collab.User,
          joined_at: collab.created_at
        })),
        activity: {
          timeline: timeline,
          collaborator_activity: collaboratorActivity
        }
      }
    });

  } catch (error) {
    console.error('Erro ao buscar analytics do projeto:', error);
    res.status(500).json({
      success: false,
      message: '😅 Ops! Os dados do projeto estão se organizando. Tente novamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/analytics/documents
 * Analytics de documentos do usuário
 */
router.get('/documents', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30', step } = req.query;
    
    const periodDays = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    let whereClause = { 
      user_id: userId,
      created_at: { [Op.gte]: startDate }
    };

    if (step) {
      whereClause.etapa = step;
    }

    // Métricas de documentos
    const [
      totalDocuments,
      documentsByStatus,
      documentsByStep,
      documentsByFormat,
      averageVersions,
      documentsWithFeedback,
      recentDocuments
    ] = await Promise.all([
      // Total de documentos no período
      Document.count({ where: whereClause }),
      
      // Documentos por status
      Document.findAll({
        where: whereClause,
        attributes: [
          'status',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['status'],
        raw: true
      }),
      
      // Documentos por etapa
      Document.findAll({
        where: whereClause,
        attributes: [
          'etapa',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['etapa'],
        raw: true
      }),
      
      // Documentos por formato
      Document.findAll({
        where: whereClause,
        attributes: [
          'formato',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
        ],
        group: ['formato'],
        raw: true
      }),
      
      // Versão média dos documentos
      Document.findAll({
        where: { user_id: userId },
        attributes: [
          [require('sequelize').fn('AVG', require('sequelize').col('versao')), 'avg_version']
        ],
        raw: true
      }),
      
      // Documentos com feedback
      Document.count({ 
        where: { 
          user_id: userId,
          feedback: { [Op.not]: null }
        } 
      }),
      
      // Documentos recentes
      Document.findAll({
        where: whereClause,
        include: [{
          model: Project,
          attributes: ['nome']
        }],
        order: [['created_at', 'DESC']],
        limit: 10
      })
    ]);

    // Produtividade por dia
    const dailyProductivity = await Document.findAll({
      where: whereClause,
      attributes: [
        [require('sequelize').fn('DATE', require('sequelize').col('created_at')), 'date'],
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: [require('sequelize').fn('DATE', require('sequelize').col('created_at'))],
      order: [[require('sequelize').fn('DATE', require('sequelize').col('created_at')), 'ASC']],
      raw: true
    });

    // Tags mais usadas
    const tagsUsage = await Document.findAll({
      where: { 
        user_id: userId,
        tags: { [Op.not]: null }
      },
      attributes: ['tags'],
      raw: true
    });

    // Processar tags
    const tagCounts = {};
    tagsUsage.forEach(doc => {
      if (doc.tags && Array.isArray(doc.tags)) {
        doc.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const topTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    res.json({
      success: true,
      data: {
        period: periodDays,
        overview: {
          total_documents: totalDocuments,
          documents_with_feedback: documentsWithFeedback,
          average_versions: averageVersions[0]?.avg_version ? 
            Math.round(parseFloat(averageVersions[0].avg_version) * 100) / 100 : 1
        },
        distribution: {
          by_status: documentsByStatus,
          by_step: documentsByStep,
          by_format: documentsByFormat
        },
        productivity: {
          daily_activity: dailyProductivity,
          top_tags: topTags
        },
        recent_documents: recentDocuments.map(doc => ({
          id: doc.id,
          titulo: doc.titulo,
          etapa: doc.etapa,
          status: doc.status,
          versao: doc.versao,
          project_name: doc.Project?.nome,
          created_at: doc.created_at
        }))
      }
    });

  } catch (error) {
    console.error('Erro ao buscar analytics de documentos:', error);
    res.status(500).json({
      success: false,
      message: '😅 Ops! Os documentos estão se organizando. Tente novamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/analytics/collaboration
 * Analytics de colaboração do usuário
 */
router.get('/collaboration', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30' } = req.query;
    
    const periodDays = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Métricas de colaboração
    const [
      projectsOwned,
      collaborationsActive,
      invitesSent,
      invitesReceived,
      collaboratorsByRole,
      recentCollaborations,
      topCollaborators
    ] = await Promise.all([
      // Projetos que o usuário possui
      Project.count({ where: { user_id: userId } }),
      
      // Colaborações ativas (onde o usuário é colaborador)
      Collaborator.count({ 
        where: { 
          user_id: userId, 
          status: 'ativo' 
        } 
      }),
      
      // Convites enviados pelo usuário
      Collaborator.count({ 
        where: { 
          convidado_por: userId,
          created_at: { [Op.gte]: startDate }
        } 
      }),
      
      // Convites recebidos pelo usuário
      Collaborator.count({ 
        where: { 
          user_id: userId,
          created_at: { [Op.gte]: startDate }
        } 
      }),
      
      // Colaboradores por role nos projetos do usuário
      Collaborator.findAll({
        include: [{
          model: Project,
          where: { user_id: userId },
          attributes: []
        }],
        where: { status: 'ativo' },
        attributes: [
          'role',
          [require('sequelize').fn('COUNT', require('sequelize').col('Collaborator.id')), 'count']
        ],
        group: ['role'],
        raw: true
      }),
      
      // Colaborações recentes
      Collaborator.findAll({
        where: {
          [Op.or]: [
            { user_id: userId },
            { convidado_por: userId }
          ],
          created_at: { [Op.gte]: startDate }
        },
        include: [
          {
            model: User,
            attributes: ['nome', 'email', 'avatar_url']
          },
          {
            model: Project,
            attributes: ['nome']
          }
        ],
        order: [['created_at', 'DESC']],
        limit: 10
      }),
      
      // Top colaboradores (mais ativos)
      Collaborator.findAll({
        include: [{
          model: Project,
          where: { user_id: userId },
          attributes: ['nome']
        }],
        where: { 
          status: 'ativo',
          user_id: { [Op.not]: null }
        },
        include: [{
          model: User,
          attributes: ['nome', 'email', 'avatar_url']
        }],
        order: [['created_at', 'ASC']],
        limit: 5
      })
    ]);

    // Atividade de colaboração por mês
    const monthlyActivity = await Collaborator.findAll({
      where: {
        [Op.or]: [
          { user_id: userId },
          { convidado_por: userId }
        ],
        created_at: { 
          [Op.gte]: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) 
        }
      },
      attributes: [
        [require('sequelize').fn('DATE_TRUNC', 'month', require('sequelize').col('created_at')), 'month'],
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: [require('sequelize').fn('DATE_TRUNC', 'month', require('sequelize').col('created_at'))],
      order: [[require('sequelize').fn('DATE_TRUNC', 'month', require('sequelize').col('created_at')), 'ASC']],
      raw: true
    });

    // Taxa de aceitação de convites
    const totalInvitesSent = await Collaborator.count({ 
      where: { convidado_por: userId } 
    });
    const acceptedInvites = await Collaborator.count({ 
      where: { 
        convidado_por: userId,
        status: 'ativo'
      } 
    });
    
    const acceptanceRate = totalInvitesSent > 0 
      ? Math.round((acceptedInvites / totalInvitesSent) * 100) 
      : 0;

    res.json({
      success: true,
      data: {
        period: periodDays,
        overview: {
          projects_owned: projectsOwned,
          active_collaborations: collaborationsActive,
          invites_sent: invitesSent,
          invites_received: invitesReceived,
          acceptance_rate: acceptanceRate
        },
        distribution: {
          collaborators_by_role: collaboratorsByRole
        },
        activity: {
          monthly_activity: monthlyActivity,
          recent_collaborations: recentCollaborations.map(collab => ({
            id: collab.id,
            role: collab.role,
            status: collab.status,
            user: collab.User,
            project: collab.Project,
            created_at: collab.created_at
          }))
        },
        top_collaborators: topCollaborators.map(collab => ({
          user: collab.User,
          role: collab.role,
          project: collab.Project,
          since: collab.created_at
        }))
      }
    });

  } catch (error) {
    console.error('Erro ao buscar analytics de colaboração:', error);
    res.status(500).json({
      success: false,
      message: '😅 Ops! Os dados de colaboração estão se sincronizando. Tente novamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/analytics/timeline
 * Timeline de atividades do usuário
 */
router.get('/timeline', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30', limit = '20' } = req.query;
    
    const periodDays = parseInt(period);
    const limitNum = parseInt(limit);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Buscar atividades de diferentes tipos
    const [
      documentActivities,
      projectActivities,
      collaborationActivities
    ] = await Promise.all([
      // Atividades de documentos
      Document.findAll({
        where: {
          user_id: userId,
          created_at: { [Op.gte]: startDate }
        },
        include: [{
          model: Project,
          attributes: ['nome']
        }],
        attributes: ['id', 'titulo', 'etapa', 'status', 'created_at', 'updated_at'],
        order: [['created_at', 'DESC']]
      }),
      
      // Atividades de projetos
      Project.findAll({
        where: {
          user_id: userId,
          created_at: { [Op.gte]: startDate }
        },
        attributes: ['id', 'nome', 'status', 'created_at', 'updated_at'],
        order: [['created_at', 'DESC']]
      }),
      
      // Atividades de colaboração
      Collaborator.findAll({
        where: {
          [Op.or]: [
            { user_id: userId },
            { convidado_por: userId }
          ],
          created_at: { [Op.gte]: startDate }
        },
        include: [
          {
            model: User,
            attributes: ['nome', 'email']
          },
          {
            model: Project,
            attributes: ['nome']
          }
        ],
        attributes: ['id', 'role', 'status', 'created_at'],
        order: [['created_at', 'DESC']]
      })
    ]);

    // Combinar e formatar atividades
    const timeline = [];

    // Adicionar atividades de documentos
    documentActivities.forEach(doc => {
      timeline.push({
        id: `doc_${doc.id}`,
        type: 'document',
        action: 'created',
        title: `Documento criado: ${doc.titulo}`,
        description: `Etapa: ${doc.etapa} | Status: ${doc.status}`,
        project_name: doc.Project?.nome,
        timestamp: doc.created_at,
        metadata: {
          document_id: doc.id,
          etapa: doc.etapa,
          status: doc.status
        }
      });

      // Se foi atualizado recentemente, adicionar atividade de update
      if (doc.updated_at > doc.created_at) {
        timeline.push({
          id: `doc_update_${doc.id}`,
          type: 'document',
          action: 'updated',
          title: `Documento atualizado: ${doc.titulo}`,
          description: `Etapa: ${doc.etapa} | Status: ${doc.status}`,
          project_name: doc.Project?.nome,
          timestamp: doc.updated_at,
          metadata: {
            document_id: doc.id,
            etapa: doc.etapa,
            status: doc.status
          }
        });
      }
    });

    // Adicionar atividades de projetos
    projectActivities.forEach(project => {
      timeline.push({
        id: `project_${project.id}`,
        type: 'project',
        action: 'created',
        title: `Projeto criado: ${project.nome}`,
        description: `Status: ${project.status}`,
        project_name: project.nome,
        timestamp: project.created_at,
        metadata: {
          project_id: project.id,
          status: project.status
        }
      });
    });

    // Adicionar atividades de colaboração
    collaborationActivities.forEach(collab => {
      const isInviter = collab.convidado_por === userId;
      
      timeline.push({
        id: `collab_${collab.id}`,
        type: 'collaboration',
        action: isInviter ? 'invited' : 'joined',
        title: isInviter 
          ? `Colaborador convidado: ${collab.User?.nome || collab.email}`
          : `Você foi convidado para: ${collab.Project?.nome}`,
        description: `Role: ${collab.role} | Status: ${collab.status}`,
        project_name: collab.Project?.nome,
        timestamp: collab.created_at,
        metadata: {
          collaboration_id: collab.id,
          role: collab.role,
          status: collab.status,
          is_inviter: isInviter
        }
      });
    });

    // Ordenar timeline por timestamp (mais recente primeiro)
    timeline.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Limitar resultados
    const limitedTimeline = timeline.slice(0, limitNum);

    // Estatísticas da timeline
    const stats = {
      total_activities: timeline.length,
      documents_created: timeline.filter(t => t.type === 'document' && t.action === 'created').length,
      documents_updated: timeline.filter(t => t.type === 'document' && t.action === 'updated').length,
      projects_created: timeline.filter(t => t.type === 'project').length,
      collaborations: timeline.filter(t => t.type === 'collaboration').length
    };

    res.json({
      success: true,
      data: {
        period: periodDays,
        timeline: limitedTimeline,
        stats: stats,
        pagination: {
          total: timeline.length,
          showing: limitedTimeline.length,
          limit: limitNum
        }
      }
    });

  } catch (error) {
    console.error('Erro ao buscar timeline:', error);
    res.status(500).json({
      success: false,
      message: '😅 Ops! A linha do tempo está se organizando. Tente novamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/analytics/export
 * Exportar dados de analytics em diferentes formatos
 */
router.get('/export', async (req, res) => {
  try {
    const userId = req.user.id;
    const { format = 'json', period = '30' } = req.query;
    
    const periodDays = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Buscar todos os dados para export
    const [dashboardData, documentsData, collaborationData] = await Promise.all([
      // Reutilizar lógica do dashboard
      getDashboardAnalytics(userId, periodDays),
      getDocumentsAnalytics(userId, periodDays),
      getCollaborationAnalytics(userId, periodDays)
    ]);

    const exportData = {
      generated_at: new Date().toISOString(),
      period_days: periodDays,
      user_id: userId,
      dashboard: dashboardData,
      documents: documentsData,
      collaboration: collaborationData
    };

    if (format === 'csv') {
      // Converter para CSV (implementação básica)
      const csv = convertToCSV(exportData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="genesix-analytics-${Date.now()}.csv"`);
      return res.send(csv);
    }

    // Formato JSON (padrão)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="genesix-analytics-${Date.now()}.json"`);
    res.json({
      success: true,
      data: exportData
    });

  } catch (error) {
    console.error('Erro ao exportar analytics:', error);
    res.status(500).json({
      success: false,
      message: '😅 Ops! O export está sendo preparado. Tente novamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Funções auxiliares para reutilização de lógica
async function getDashboardAnalytics(userId, periodDays) {
  // Implementação simplificada - reutilizar lógica do endpoint dashboard
  return { message: 'Dashboard analytics data' };
}

async function getDocumentsAnalytics(userId, periodDays) {
  // Implementação simplificada - reutilizar lógica do endpoint documents
  return { message: 'Documents analytics data' };
}

async function getCollaborationAnalytics(userId, periodDays) {
  // Implementação simplificada - reutilizar lógica do endpoint collaboration
  return { message: 'Collaboration analytics data' };
}

function convertToCSV(data) {
  // Implementação básica de conversão para CSV
  const headers = ['Metric', 'Value', 'Period'];
  const rows = [
    ['Total Projects', data.dashboard.total_projects || 0, data.period_days],
    ['Total Documents', data.documents.total_documents || 0, data.period_days],
    ['Active Collaborations', data.collaboration.active_collaborations || 0, data.period_days]
  ];
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

module.exports = router;
