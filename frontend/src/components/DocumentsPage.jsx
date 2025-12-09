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
import {
  FileText,
  Search,
  Filter,
  ArrowRight,
  Zap,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Palette,
  Code,
  TestTube,
  Rocket,
  TrendingUp,
  Shield,
  CheckCircle,
  Star,
} from "lucide-react";

const DocumentsPage = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const [showCrossReference, setShowCrossReference] = useState(false);

  // Dados dos documentos por etapa
  const documentSteps = [
    {
      id: 1,
      title: "Definição do Problema",
      icon: Target,
      color: "from-blue-500 to-purple-600",
      documentCount: 3,
      documents: [
        {
          name: "Análise de Mercado",
          type: "PDF",
          size: "2.4 MB",
          lastModified: "2 dias atrás",
        },
        {
          name: "Personas de Usuário",
          type: "DOCX",
          size: "1.8 MB",
          lastModified: "3 dias atrás",
        },
        {
          name: "Mapa de Jornada",
          type: "PDF",
          size: "3.2 MB",
          lastModified: "1 dia atrás",
        },
      ],
    },
    {
      id: 2,
      title: "Mercado",
      icon: BarChart3,
      color: "from-green-500 to-teal-600",
      documentCount: 4,
      documents: [
        {
          name: "Relatório de Concorrência",
          type: "PDF",
          size: "4.1 MB",
          lastModified: "1 dia atrás",
        },
        {
          name: "Análise SWOT",
          type: "DOCX",
          size: "1.2 MB",
          lastModified: "2 dias atrás",
        },
        {
          name: "Pesquisa de Tendências",
          type: "PDF",
          size: "2.8 MB",
          lastModified: "3 dias atrás",
        },
        {
          name: "Dados de Mercado",
          type: "XLSX",
          size: "5.6 MB",
          lastModified: "1 dia atrás",
        },
      ],
    },
    {
      id: 3,
      title: "Ideação",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-600",
      documentCount: 5,
      documents: [
        {
          name: "Brainstorming Session",
          type: "PDF",
          size: "1.9 MB",
          lastModified: "2 dias atrás",
        },
        {
          name: "Matriz de Ideias",
          type: "XLSX",
          size: "2.3 MB",
          lastModified: "1 dia atrás",
        },
        {
          name: "Concept Map",
          type: "PNG",
          size: "4.2 MB",
          lastModified: "3 dias atrás",
        },
        {
          name: "Feature List",
          type: "DOCX",
          size: "1.1 MB",
          lastModified: "1 dia atrás",
        },
        {
          name: "User Stories",
          type: "PDF",
          size: "2.7 MB",
          lastModified: "2 dias atrás",
        },
      ],
    },
    {
      id: 4,
      title: "Pesquisa e Validações",
      icon: CheckCircle,
      color: "from-purple-500 to-pink-600",
      documentCount: 2,
      documents: [],
    },
    {
      id: 5,
      title: "Features, Maps e Flows",
      icon: Palette,
      color: "from-pink-500 to-red-600",
      documentCount: 1,
      documents: [],
    },
    {
      id: 6,
      title: "Prototipagem",
      icon: Palette,
      color: "from-indigo-500 to-blue-600",
      documentCount: 3,
      documents: [],
    },
    {
      id: 7,
      title: "PRD",
      icon: Code,
      color: "from-teal-500 to-green-600",
      documentCount: 0,
      documents: [],
    },
    {
      id: 8,
      title: "Testes",
      icon: TestTube,
      color: "from-orange-500 to-yellow-600",
      documentCount: 2,
      documents: [],
    },
    {
      id: 9,
      title: "Lançamento",
      icon: Rocket,
      color: "from-red-500 to-pink-600",
      documentCount: 1,
      documents: [],
    },
  ];

  const totalDocuments = documentSteps.reduce(
    (sum, step) => sum + step.documentCount,
    0,
  );

  const handleStepClick = (stepId) => {
    if (stepId <= 3) {
      // Para as primeiras 3 etapas, navegar para página detalhada
      if (stepId === 1) window.location.hash = "#documents-step-1";
      if (stepId === 2) window.location.hash = "#documents-step-2";
      if (stepId === 3) window.location.hash = "#documents-step-3";
    } else {
      setSelectedStep(stepId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Documentos do Projeto
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie e visualize todos os documentos criados durante o
            desenvolvimento do produto
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <FileText className="w-4 h-4 mr-1" />
            {totalDocuments} documentos
          </Badge>
          <Button
            onClick={() => setShowCrossReference(!showCrossReference)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Zap className="w-4 h-4 mr-2" />
            Wizard de Referência
          </Button>
        </div>
      </div>

      {/* Wizard de Referência Cruzada */}
      {showCrossReference && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-600" />
              Wizard de Referência Cruzada
            </CardTitle>
            <CardDescription>
              Encontre conexões e dependências entre documentos de diferentes
              etapas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Etapa de Origem</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Selecione uma etapa...</option>
                  {documentSteps.map((step) => (
                    <option key={step.id} value={step.id}>
                      {step.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Etapa de Destino</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Selecione uma etapa...</option>
                  {documentSteps.map((step) => (
                    <option key={step.id} value={step.id}>
                      {step.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Search className="w-4 h-4 mr-2" />
                  Analisar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid de Cards de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documentSteps.map((step) => {
          const IconComponent = step.icon;
          return (
            <Card
              key={step.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-gray-200 hover:border-purple-300"
              onClick={() => handleStepClick(step.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${step.color}`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <Badge
                    variant={step.documentCount > 0 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {step.documentCount}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-semibold text-gray-800 leading-tight">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {step.documentCount === 0
                      ? "Nenhum documento"
                      : `${step.documentCount} documento${step.documentCount !== 1 ? "s" : ""}`}
                  </span>
                  {step.id <= 3 && (
                    <ArrowRight className="w-4 h-4 text-purple-500" />
                  )}
                </div>
                {step.documentCount > 0 && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full bg-gradient-to-r ${step.color}`}
                      style={{
                        width: `${Math.min(100, (step.documentCount / 5) * 100)}%`,
                      }}
                    ></div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo Estatístico */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {totalDocuments}
                </p>
                <p className="text-sm text-blue-600">Total de Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {
                    documentSteps.filter((step) => step.documentCount > 0)
                      .length
                  }
                </p>
                <p className="text-sm text-green-600">Etapas com Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-700">3</p>
                <p className="text-sm text-yellow-600">Páginas Detalhadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-700">AI</p>
                <p className="text-sm text-purple-600">Wizard Disponível</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentsPage;
