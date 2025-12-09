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
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart,
} from "lucide-react";

const DocumentDetailPage2 = ({ onBack }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
    {
      id: 1,
      name: "Relatório de Concorrência",
      type: "PDF",
      size: "4.1 MB",
      lastModified: "1 dia atrás",
      author: "Carlos Oliveira",
      description:
        "Análise detalhada dos principais concorrentes, suas estratégias, pontos fortes e fracos.",
      content: {
        summary:
          "Estudo abrangente do cenário competitivo, analisando 12 concorrentes diretos e indiretos, suas estratégias de mercado e oportunidades de diferenciação.",
        keyFindings: [
          "5 concorrentes diretos identificados",
          "Gap de mercado no segmento premium",
          "Preços 30% acima da média do mercado",
          "Baixa satisfação com soluções atuais",
        ],
        sections: [
          { title: "Mapeamento Competitivo", pages: "1-8" },
          { title: "Análise de Produtos", pages: "9-16" },
          { title: "Estratégias de Preço", pages: "17-22" },
          { title: "Oportunidades", pages: "23-28" },
        ],
      },
    },
    {
      id: 2,
      name: "Análise SWOT",
      type: "DOCX",
      size: "1.2 MB",
      lastModified: "2 dias atrás",
      author: "Fernanda Lima",
      description:
        "Matriz SWOT completa identificando forças, fraquezas, oportunidades e ameaças do projeto.",
      content: {
        summary:
          "Análise estratégica utilizando a metodologia SWOT para identificar fatores internos e externos que impactam o desenvolvimento do produto.",
        keyFindings: [
          "Forte expertise técnica da equipe",
          "Limitações de recursos iniciais",
          "Mercado em expansão acelerada",
          "Entrada de grandes players",
        ],
        sections: [
          { title: "Forças (Strengths)", pages: "1-3" },
          { title: "Fraquezas (Weaknesses)", pages: "4-6" },
          { title: "Oportunidades (Opportunities)", pages: "7-9" },
          { title: "Ameaças (Threats)", pages: "10-12" },
        ],
      },
    },
    {
      id: 3,
      name: "Pesquisa de Tendências",
      type: "PDF",
      size: "2.8 MB",
      lastModified: "3 dias atrás",
      author: "Roberto Silva",
      description:
        "Levantamento das principais tendências tecnológicas e de mercado que impactam o setor.",
      content: {
        summary:
          "Identificação e análise das tendências emergentes que podem influenciar o desenvolvimento e posicionamento do produto no mercado.",
        keyFindings: [
          "IA e automação como drivers principais",
          "Crescimento de 40% em soluções mobile",
          "Sustentabilidade como fator decisivo",
          "Personalização em massa ganha força",
        ],
        sections: [
          { title: "Tendências Tecnológicas", pages: "1-6" },
          { title: "Comportamento do Consumidor", pages: "7-12" },
          { title: "Regulamentações Emergentes", pages: "13-16" },
          { title: "Impactos no Produto", pages: "17-20" },
        ],
      },
    },
    {
      id: 4,
      name: "Dados de Mercado",
      type: "XLSX",
      size: "5.6 MB",
      lastModified: "1 dia atrás",
      author: "Ana Rodrigues",
      description:
        "Base de dados completa com informações quantitativas sobre o mercado-alvo.",
      content: {
        summary:
          "Compilação de dados quantitativos sobre tamanho de mercado, segmentação, preços, e projeções de crescimento baseados em fontes primárias e secundárias.",
        keyFindings: [
          "Mercado de R$ 2.5 bilhões no Brasil",
          "Taxa de crescimento anual de 18%",
          "Concentração em 3 regiões principais",
          "Sazonalidade pronunciada no Q4",
        ],
        sections: [
          { title: "Dados Demográficos", pages: "Planilha 1" },
          { title: "Análise de Preços", pages: "Planilha 2" },
          { title: "Projeções de Crescimento", pages: "Planilha 3" },
          { title: "Segmentação Regional", pages: "Planilha 4" },
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
                <FileText className="w-5 h-5 text-green-600" />
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
                <BarChart3 className="w-5 h-5 text-teal-600" />
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
                  className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
                >
                  <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-800">{finding}</span>
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
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <Badge variant="secondary">{section.pages}</Badge>
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Pesquisa de Mercado
            </h1>
            <p className="text-gray-600 mt-1">
              Documentos relacionados à análise e pesquisa do mercado-alvo
            </p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
          <BarChart3 className="w-4 h-4 mr-1" />
          Etapa 2
        </Badge>
      </div>

      {/* Lista de Documentos */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-green-300"
            onClick={() => handleDocumentClick(doc)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
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

export default DocumentDetailPage2;
