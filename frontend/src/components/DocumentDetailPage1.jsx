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
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Edit,
  Share2,
  Clock,
  User,
  Target,
  BarChart3,
  Users,
  TrendingUp,
} from "lucide-react";

const DocumentDetailPage1 = ({ onBack }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
    {
      id: 1,
      name: "Análise de Mercado",
      type: "PDF",
      size: "2.4 MB",
      lastModified: "2 dias atrás",
      author: "Maria Silva",
      description:
        "Análise completa do mercado atual, incluindo tamanho, segmentação e oportunidades de crescimento.",
      content: {
        summary:
          "Este documento apresenta uma análise abrangente do mercado-alvo, identificando oportunidades e desafios para o desenvolvimento do produto.",
        keyFindings: [
          "Mercado em crescimento de 15% ao ano",
          "Segmento premium com menor concorrência",
          "Demanda crescente por soluções digitais",
          "Oportunidade de first-mover advantage",
        ],
        sections: [
          { title: "Tamanho do Mercado", pages: "1-5" },
          { title: "Análise Competitiva", pages: "6-12" },
          { title: "Segmentação", pages: "13-18" },
          { title: "Oportunidades", pages: "19-24" },
        ],
      },
    },
    {
      id: 2,
      name: "Personas de Usuário",
      type: "DOCX",
      size: "1.8 MB",
      lastModified: "3 dias atrás",
      author: "João Santos",
      description:
        "Definição detalhada das personas principais do produto, incluindo características, necessidades e comportamentos.",
      content: {
        summary:
          "Documento que define as três personas principais do produto, baseado em pesquisa qualitativa e quantitativa com usuários potenciais.",
        keyFindings: [
          "3 personas principais identificadas",
          "Faixa etária entre 25-45 anos",
          "Alto uso de tecnologia móvel",
          "Valorizam eficiência e praticidade",
        ],
        sections: [
          { title: "Metodologia de Pesquisa", pages: "1-3" },
          { title: "Persona 1: O Profissional Ocupado", pages: "4-7" },
          { title: "Persona 2: O Empreendedor Digital", pages: "8-11" },
          { title: "Persona 3: O Gestor Estratégico", pages: "12-15" },
        ],
      },
    },
    {
      id: 3,
      name: "Mapa de Jornada",
      type: "PDF",
      size: "3.2 MB",
      lastModified: "1 dia atrás",
      author: "Ana Costa",
      description:
        "Mapeamento completo da jornada do usuário, desde a descoberta até a retenção do produto.",
      content: {
        summary:
          "Visualização detalhada da jornada do usuário em todas as etapas de interação com o produto, identificando pontos de dor e oportunidades.",
        keyFindings: [
          "7 etapas principais na jornada",
          "3 pontos críticos de abandono",
          "Oportunidades de melhoria na onboarding",
          "Alto potencial de retenção pós-primeiro uso",
        ],
        sections: [
          { title: "Descoberta e Awareness", pages: "1-4" },
          { title: "Consideração e Avaliação", pages: "5-8" },
          { title: "Onboarding e Primeiro Uso", pages: "9-12" },
          { title: "Uso Recorrente e Retenção", pages: "13-16" },
        ],
      },
    },
  ];

  const handleDocumentClick = (doc) => {
    setSelectedDocument(doc);
  };

  const handleBackToList = () => {
    setSelectedDocument(null);
  };

  if (selectedDocument) {
    return (
      <div className="p-6 space-y-6">
        {/* Header do Documento */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToList}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar à Lista
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedDocument.name}
              </h1>
              <p className="text-gray-600">{selectedDocument.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Informações do Documento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="font-semibold">{selectedDocument.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Tamanho</p>
                  <p className="font-semibold">{selectedDocument.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Modificado</p>
                  <p className="font-semibold">
                    {selectedDocument.lastModified}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Autor</p>
                  <p className="font-semibold">{selectedDocument.author}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo Executivo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{selectedDocument.content.summary}</p>
          </CardContent>
        </Card>

        {/* Principais Descobertas */}
        <Card>
          <CardHeader>
            <CardTitle>Principais Descobertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedDocument.content.keyFindings.map((finding, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg"
                >
                  <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-blue-800">{finding}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seções do Documento */}
        <Card>
          <CardHeader>
            <CardTitle>Estrutura do Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDocument.content.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <Badge variant="secondary">Páginas {section.pages}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Documentos
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Definição do Problema
            </h1>
            <p className="text-gray-600 mt-1">
              Documentos relacionados à identificação e definição do problema
              central
            </p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <Target className="w-4 h-4 mr-1" />
          Etapa 1
        </Badge>
      </div>

      {/* Lista de Documentos */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-purple-300"
            onClick={() => handleDocumentClick(doc)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {doc.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {doc.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {doc.lastModified}
                      </span>
                      <Badge variant="outline">{doc.type}</Badge>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentDetailPage1;
