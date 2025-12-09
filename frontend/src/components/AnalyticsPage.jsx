import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Users,
  FileText,
  Target,
  Activity,
  Calendar,
  Award,
  AlertTriangle,
  ThumbsUp,
  Eye,
  MousePointer,
  Timer,
  BookOpen,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingDown,
  Star,
  Shield,
} from "lucide-react";

const AnalyticsPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");

  // Dados de progresso do projeto
  const projectProgress = {
    completedSteps: 3,
    totalSteps: 13,
    percentage: 23,
    averageTimePerStep: 4.2,
    currentStepDuration: 6,
  };

  // Timeline do progresso (últimas 8 semanas)
  const progressTimeline = [
    { week: "Sem 1", completed: 0, planned: 1 },
    { week: "Sem 2", completed: 1, planned: 2 },
    { week: "Sem 3", completed: 2, planned: 3 },
    { week: "Sem 4", completed: 2, planned: 4 },
    { week: "Sem 5", completed: 3, planned: 5 },
    { week: "Sem 6", completed: 3, planned: 6 },
    { week: "Sem 7", completed: 3, planned: 7 },
    { week: "Sem 8", completed: 3, planned: 8 },
  ];

  // Scorecard de confiabilidade
  const reliabilityScore = {
    overallScore: 78,
    maxScore: 100,
    stepScores: [
      { step: "Contexto e Problema", score: 95, status: "excellent" },
      { step: "Discovery", score: 82, status: "good" },
      { step: "SWOT & CSD", score: 88, status: "good" },
      { step: "Personas", score: 45, status: "poor" },
      { step: "Pesquisa com Usuários", score: 30, status: "poor" },
      { step: "Validação de Hipóteses", score: 60, status: "average" },
    ],
  };

  // Colaboração e engajamento
  const teamEngagement = {
    activeMembers: 4,
    totalMembers: 5,
    memberContributions: [
      {
        name: "Maria Silva",
        tasks: 28,
        docs: 12,
        comments: 45,
        participation: 95,
      },
      {
        name: "João Santos",
        tasks: 15,
        docs: 8,
        comments: 23,
        participation: 78,
      },
      {
        name: "Ana Costa",
        tasks: 22,
        docs: 6,
        comments: 18,
        participation: 85,
      },
      {
        name: "Fernanda Lima",
        tasks: 18,
        docs: 9,
        comments: 31,
        participation: 82,
      },
      {
        name: "Pedro Almeida",
        tasks: 8,
        docs: 3,
        comments: 12,
        participation: 45,
      },
    ],
  };

  // Documentação e repositório
  const documentationStats = {
    totalArtifacts: 28,
    artifactsByType: [
      { type: "PRDs", count: 3, lastUpdate: "2 dias atrás" },
      { type: "User Stories", count: 8, lastUpdate: "1 dia atrás" },
      { type: "Personas", count: 4, lastUpdate: "5 dias atrás" },
      { type: "Jornadas", count: 2, lastUpdate: "3 dias atrás" },
      { type: "Wireframes", count: 6, lastUpdate: "1 dia atrás" },
      { type: "Backlog", count: 5, lastUpdate: "4 horas atrás" },
    ],
    stepCoverage: [
      { step: "Contexto e Problema", coverage: 100, docs: 3 },
      { step: "Discovery", coverage: 100, docs: 4 },
      { step: "SWOT & CSD", coverage: 100, docs: 2 },
      { step: "Personas", coverage: 75, docs: 3 },
      { step: "Pesquisa com Usuários", coverage: 40, docs: 2 },
      { step: "Validação de Hipóteses", coverage: 20, docs: 1 },
    ],
  };

  // Validação de mercado
  const marketValidation = {
    totalHypotheses: 24,
    confirmedHypotheses: 18,
    validationRate: 75,
    validationByCategory: [
      { category: "Problema", confirmed: 8, total: 10, rate: 80 },
      { category: "Solução", confirmed: 6, total: 8, rate: 75 },
      { category: "Mercado", confirmed: 4, total: 6, rate: 67 },
    ],
  };

  // Métricas de uso do site
  const usageMetrics = {
    dailyActiveTime: 4.2,
    weeklyActiveTime: 28.5,
    mostUsedSteps: [
      { step: "Discovery", usage: 35, time: "2.1h" },
      { step: "Documentos", usage: 28, time: "1.8h" },
      { step: "Backlog", usage: 22, time: "1.4h" },
      { step: "Prototipagem", usage: 15, time: "0.9h" },
    ],
    weeklyActivity: [
      { day: "Seg", hours: 4.2 },
      { day: "Ter", hours: 3.8 },
      { day: "Qua", hours: 5.1 },
      { day: "Qui", hours: 4.6 },
      { day: "Sex", hours: 3.9 },
      { day: "Sáb", hours: 1.2 },
      { day: "Dom", hours: 0.8 },
    ],
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100 border-green-200";
    if (score >= 60) return "bg-yellow-100 border-yellow-200";
    return "bg-red-100 border-red-200";
  };

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Métricas e insights do seu projeto
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Progresso do Projeto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Progresso do Projeto
          </CardTitle>
          <CardDescription>
            Acompanhe o progresso das etapas e velocidade de execução
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-700">
                      {projectProgress.percentage}%
                    </p>
                    <p className="text-sm text-blue-600">Etapas Concluídas</p>
                    <p className="text-xs text-gray-500">
                      {projectProgress.completedSteps}/
                      {projectProgress.totalSteps} etapas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-700">
                      {projectProgress.averageTimePerStep}
                    </p>
                    <p className="text-sm text-green-600">Dias por Etapa</p>
                    <p className="text-xs text-gray-500">Velocidade média</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Timer className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-orange-700">
                      {projectProgress.currentStepDuration}
                    </p>
                    <p className="text-sm text-orange-600">Dias Atual</p>
                    <p className="text-xs text-gray-500">
                      Discovery em andamento
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-purple-700">42</p>
                    <p className="text-sm text-purple-600">Dias Totais</p>
                    <p className="text-xs text-gray-500">Desde o início</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">
              Timeline do Progresso
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="planned"
                  stackId="1"
                  stroke="#E5E7EB"
                  fill="#E5E7EB"
                  name="Planejado"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="2"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  name="Concluído"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Scorecard de Confiabilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Scorecard de Confiabilidade
          </CardTitle>
          <CardDescription>
            Avaliação da qualidade e validação das etapas do projeto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="90%"
                      data={[{ score: reliabilityScore.overallScore }]}
                    >
                      <RadialBar
                        dataKey="score"
                        cornerRadius={10}
                        fill="#10B981"
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">
                      {reliabilityScore.overallScore}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Pontuação Geral</h4>
                  <p className="text-gray-600">
                    de {reliabilityScore.maxScore} pontos
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200 mt-1"
                  >
                    Boa Confiabilidade
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">
                Comparativo por Etapa
              </h4>
              <div className="space-y-3">
                {reliabilityScore.stepScores.map((step, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${getScoreBgColor(step.score)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{step.step}</span>
                      <span
                        className={`font-bold ${getScoreColor(step.score)}`}
                      >
                        {step.score}
                      </span>
                    </div>
                    <Progress value={step.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colaboração e Engajamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Colaboração e Engajamento do Time
          </CardTitle>
          <CardDescription>
            Análise da participação e contribuições dos membros da equipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-purple-700">
                      {teamEngagement.activeMembers}
                    </p>
                    <p className="text-sm text-purple-600">Membros Ativos</p>
                    <p className="text-xs text-gray-500">
                      de {teamEngagement.totalMembers} total
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-700">91</p>
                    <p className="text-sm text-blue-600">Total de Tarefas</p>
                    <p className="text-xs text-gray-500">Concluídas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-700">77%</p>
                    <p className="text-sm text-green-600">Participação Média</p>
                    <p className="text-xs text-gray-500">Da equipe</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">
              Contribuições por Membro
            </h4>
            <div className="space-y-3">
              {teamEngagement.memberContributions.map((member, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{member.name}</span>
                    <Badge
                      variant="outline"
                      className={`${
                        member.participation >= 80
                          ? "bg-green-100 text-green-800 border-green-200"
                          : member.participation >= 60
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {member.participation}% participação
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-blue-600">{member.tasks}</p>
                      <p className="text-gray-600">Tarefas</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-green-600">{member.docs}</p>
                      <p className="text-gray-600">Documentos</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-purple-600">
                        {member.comments}
                      </p>
                      <p className="text-gray-600">Comentários</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análises de Documentação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            Análises de Documentação e Repositório
          </CardTitle>
          <CardDescription>
            Status dos artefatos criados e cobertura das etapas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-700">
                    {documentationStats.totalArtifacts}
                  </p>
                  <p className="text-gray-600">Artefatos Criados</p>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-3">Artefatos por Tipo</h4>
              <div className="space-y-2">
                {documentationStats.artifactsByType.map((artifact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div>
                      <span className="font-medium">{artifact.type}</span>
                      <span className="ml-2 text-gray-600">
                        ({artifact.count})
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {artifact.lastUpdate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">
                Cobertura de Etapas
              </h4>
              <div className="space-y-3">
                {documentationStats.stepCoverage.map((step, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{step.step}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {step.docs} docs
                        </span>
                        <span
                          className={`text-sm font-bold ${getScoreColor(step.coverage)}`}
                        >
                          {step.coverage}%
                        </span>
                      </div>
                    </div>
                    <Progress value={step.coverage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validação de Mercado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Validação de Mercado
          </CardTitle>
          <CardDescription>
            Taxa de confirmação das hipóteses levantadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Confirmadas",
                            value: marketValidation.confirmedHypotheses,
                            fill: "#10B981",
                          },
                          {
                            name: "Não Confirmadas",
                            value:
                              marketValidation.totalHypotheses -
                              marketValidation.confirmedHypotheses,
                            fill: "#E5E7EB",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        dataKey="value"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">
                      {marketValidation.validationRate}%
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Taxa de Validação</h4>
                  <p className="text-gray-600">
                    {marketValidation.confirmedHypotheses} de{" "}
                    {marketValidation.totalHypotheses} hipóteses
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200 mt-1"
                  >
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Boa Validação
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">
                Validação por Categoria
              </h4>
              <div className="space-y-3">
                {marketValidation.validationByCategory.map(
                  (category, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{category.category}</span>
                        <span
                          className={`font-bold ${getScoreColor(category.rate)}`}
                        >
                          {category.rate}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>
                          {category.confirmed}/{category.total} confirmadas
                        </span>
                      </div>
                      <Progress value={category.rate} className="h-2 mt-1" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas de Uso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-blue-600" />
            Métricas de Uso no Site
          </CardTitle>
          <CardDescription>
            Tempo ativo na plataforma e etapas mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Eye className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-xl font-bold text-blue-700">
                          {usageMetrics.dailyActiveTime}h
                        </p>
                        <p className="text-xs text-blue-600">Tempo Diário</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="text-xl font-bold text-purple-700">
                          {usageMetrics.weeklyActiveTime}h
                        </p>
                        <p className="text-xs text-purple-600">Tempo Semanal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h4 className="text-lg font-semibold mb-3">Atividade Semanal</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={usageMetrics.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Etapas Mais Usadas</h4>
              <div className="space-y-3">
                {usageMetrics.mostUsedSteps.map((step, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{step.step}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {step.time}
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-200"
                        >
                          {step.usage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={step.usage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
