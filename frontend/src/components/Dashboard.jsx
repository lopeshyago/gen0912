import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CheckCircle,
  Calendar,
  Lightbulb,
  Wand2,
  Search,
  Users,
  BarChart3,
  MessageSquare,
  CheckSquare,
  Layers,
  GitBranch,
  Target,
  Palette,
  Rocket,
  BookOpen,
  Settings,
} from "lucide-react";

const Dashboard = ({ onNavigate, onOpenWizard }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const kpis = [
    {
      id: 1,
      title: "Relatórios Gerados",
      value: 12,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: 2,
      title: "Validações Concluídas",
      value: 8,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 3,
      title: "Tempo até MVP",
      value: "14 dias",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      id: 4,
      title: "Docs da IA",
      value: 15,
      icon: Lightbulb,
      color: "text-purple-600",
    },
  ];

  const steps = [
    {
      id: "contexto-problema",
      title: "Contexto e Problema",
      description:
        "Identificação inicial do problema e da oportunidade de mercado.",
      icon: Search,
      status: "completed",
      progress: 100,
      time: "1-2 dias",
      lastActivity: "Análise de problema concluída",
      tasks: "8/8 tarefas",
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "discovery",
      title: "Analisando o Mercado",
      description:
        "Exploração do problema, análise do mercado e tendências, benchmarks",
      icon: Lightbulb,
      status: "in-progress",
      progress: 65,
      time: "2-3 dias",
      lastActivity: "Pesquisa de mercado em andamento",
      tasks: "5/8 tarefas",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "swot-csd",
      title: "SWOT & CSD",
      description: "Construção da matriz SWOT e CSD para análise estratégica",
      icon: BarChart3,
      status: "completed",
      progress: 100,
      time: "1-2 dias",
      lastActivity: "Matriz SWOT finalizada",
      tasks: "6/6 tarefas",
      iconColor: "bg-green-100 text-green-600",
    },
    {
      id: "personas",
      title: "Personas",
      description:
        "Definição de perfis de usuários-alvo e suas características",
      icon: Users,
      status: "pending",
      progress: 0,
      time: "3-5 dias",
      lastActivity: "Aguardando início",
      tasks: "0/4 tarefas",
      iconColor: "bg-orange-100 text-orange-600",
    },
    {
      id: "pesquisa-usuarios",
      title: "Pesquisa com Usuários",
      description: "Criação, aplicação e análise de pesquisas com usuários",
      icon: MessageSquare,
      status: "pending",
      progress: 0,
      time: "3-5 dias",
      lastActivity: "Não iniciado",
      tasks: "0/7 tarefas",
      iconColor: "bg-pink-100 text-pink-600",
    },
    {
      id: "validacao-hipoteses",
      title: "Validação de Hipóteses",
      description:
        "Teste das hipóteses levantadas com base em dados e pesquisas",
      icon: CheckSquare,
      status: "pending",
      progress: 0,
      time: "1-2 dias",
      lastActivity: "Não iniciado",
      tasks: "0/5 tarefas",
      iconColor: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "features-priorizacao",
      title: "Features & Priorização",
      description: "Definição e priorização das funcionalidades do produto",
      icon: Layers,
      status: "pending",
      progress: 0,
      time: "2-4 dias",
      lastActivity: "Não iniciado",
      tasks: "0/6 tarefas",
      iconColor: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "user-stories-fluxos",
      title: "User Stories & Fluxos",
      description: "Criação de histórias de usuário e mapeamento de fluxos",
      icon: GitBranch,
      status: "pending",
      progress: 0,
      time: "3-5 dias",
      lastActivity: "Não iniciado",
      tasks: "0/7 tarefas",
      iconColor: "bg-teal-100 text-teal-600",
    },
    {
      id: "criterios-metricas",
      title: "Critérios e Métricas",
      description:
        "Definição de critérios de sucesso e métricas de acompanhamento",
      icon: Target,
      status: "pending",
      progress: 0,
      time: "1-2 dias",
      lastActivity: "Não iniciado",
      tasks: "0/3 tarefas",
      iconColor: "bg-cyan-100 text-cyan-600",
    },
    {
      id: "roadmap-backlog",
      title: "Roadmap & Backlog",
      description:
        "Planejamento temporal e organização do backlog de desenvolvimento",
      icon: Calendar,
      status: "pending",
      progress: 0,
      time: "2-3 dias",
      lastActivity: "Não iniciado",
      tasks: "0/5 tarefas",
      iconColor: "bg-red-100 text-red-600",
    },
    {
      id: "prototipo",
      title: "Protótipo",
      description: "Criação de protótipos e wireframes do produto",
      icon: Palette,
      status: "pending",
      progress: 0,
      time: "3-5 dias",
      lastActivity: "Não iniciado",
      tasks: "0/4 tarefas",
      iconColor: "bg-lime-100 text-lime-600",
    },
    {
      id: "prd-final",
      title: "PRD Final",
      description: "Documento final de requisitos do produto",
      icon: FileText,
      status: "pending",
      progress: 0,
      time: "1-2 dias",
      lastActivity: "Não iniciado",
      tasks: "0/2 tarefas",
      iconColor: "bg-gray-100 text-gray-600",
    },
    {
      id: "lancamento",
      title: "Lançamento",
      description: "Estratégia e execução do lançamento do produto",
      icon: Rocket,
      status: "pending",
      progress: 0,
      time: "1-2 dias",
      lastActivity: "Não iniciado",
      tasks: "0/3 tarefas",
      iconColor: "bg-fuchsia-100 text-fuchsia-600",
    },
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#1d5cfb] via-[#807ffb] to-[#5b54fb] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Acompanhe o progresso do seu projeto
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 h-9 px-4 text-sm"
            onClick={onOpenWizard}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Novo Tarefa
          </Button>
          <Button
            className="bg-blue-600 text-white shadow-lg hover:bg-blue-700 h-9 px-4 text-sm"
            onClick={() => onNavigate?.("discovery")}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Continuar Fluxo: Discovery
          </Button>
        </div>
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.id}
              className="border-none bg-white p-4 flex flex-col items-center justify-center text-center"
            >
              <Icon className={`h-8 w-8 mb-2 ${kpi.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {kpi.value}
              </div>
              <CardTitle className="text-sm font-medium text-gray-700">
                {kpi.title}
              </CardTitle>
            </Card>
          );
        })}
      </div>

      {/* Project Progress Section */}
      <div className="mb-6 cursor-context-menu">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Progresso do Projeto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.id}
                className="shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${step.iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="mb-2 text-base font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <Badge className={getStatusBadgeColor(step.status)}>
                          {step.status === "completed"
                            ? "Concluído"
                            : step.status === "in-progress"
                              ? "Em andamento"
                              : "Pendente"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>{step.tasks}</span>
                        <span>{step.time}</span>
                      </div>
                      <Progress
                        value={step.progress}
                        className="h-1.5"
                        indicatorColor={getProgressColor(step.status)}
                      />
                      <p className="text-xs text-gray-500 mt-0.5">
                        Última atividade: {step.lastActivity}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
