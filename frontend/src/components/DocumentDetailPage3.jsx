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
  Lightbulb,
  Zap,
  Brain,
  Sparkles,
  Image,
} from "lucide-react";

const DocumentDetailPage3 = ({ onBack }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const documents = [
    {
      id: 1,
      name: "Brainstorming Session",
      type: "PDF",
      size: "1.9 MB",
      lastModified: "2 dias atrás",
      author: "Equipe de Produto",
      description:
        "Registro completo da sessão de brainstorming com todas as ideias geradas pela equipe.",
      content: {
        summary:
          "Documentação de uma sessão intensiva de brainstorming que resultou em 47 ideias iniciais, categorizadas por viabilidade e impacto potencial.",
        keyFindings: [
          "47 ideias geradas em 3 horas",
          "12 conceitos de alta viabilidade",
          "Foco em automação e IA",
          "Priorização por impacto no usuário",
        ],
        sections: [
          { title: "Metodologia Aplicada", pages: "1-2" },
          { title: "Ideias por Categoria", pages: "3-8" },
          { title: "Matriz de Priorização", pages: "9-12" },
          { title: "Próximos Passos", pages: "13-14" },
        ],
      },
    },
    {
      id: 2,
      name: "Matriz de Ideias",
      type: "XLSX",
      size: "2.3 MB",
      lastModified: "1 dia atrás",
      author: "Marina Costa",
      description:
        "Planilha estruturada com todas as ideias organizadas por critérios de avaliação.",
      content: {
        summary:
          "Matriz detalhada contendo todas as ideias geradas, com scores de viabilidade técnica, impacto no usuário, esforço de desenvolvimento e potencial de mercado.",
        keyFindings: [
          "Top 5 ideias com score > 8.0",
          "Balanceamento entre inovação e viabilidade",
          "Foco em experiência do usuário",
          "Consideração de recursos disponíveis",
        ],
        sections: [
          { title: "Critérios de Avaliação", pages: "Planilha 1" },
          { title: "Matriz Completa", pages: "Planilha 2" },
          { title: "Ranking Final", pages: "Planilha 3" },
          { title: "Análise de Clusters", pages: "Planilha 4" },
        ],
      },
    },
    {
      id: 3,
      name: "Concept Map",
      type: "PNG",
      size: "4.2 MB",
      lastModified: "3 dias atrás",
      author: "Design Team",
      description:
        "Mapa conceitual visual conectando todas as ideias e suas inter-relações.",
      content: {
        summary:
          "Representação visual das conexões entre diferentes conceitos e ideias, mostrando como elas se complementam e podem ser combinadas.",
        keyFindings: [
          "3 clusters principais identificados",
          "Múltiplas sinergias entre ideias",
          "Oportunidades de integração",
          "Evolução natural do produto",
        ],
        sections: [
          { title: "Cluster 1: Automação", pages: "Seção A" },
          { title: "Cluster 2: Personalização", pages: "Seção B" },
          { title: "Cluster 3: Colaboração", pages: "Seção C" },
          { title: "Conexões e Sinergias", pages: "Seção D" },
        ],
      },
    },
    {
      id: 4,
      name: "Feature List",
      type: "DOCX",
      size: "1.1 MB",
      lastModified: "1 dia atrás",
      author: "Pedro Almeida",
      description:
        "Lista detalhada das funcionalidades priorizadas para desenvolvimento.",
      content: {
        summary:
          "Especificação detalhada das 15 funcionalidades principais selecionadas para o MVP, incluindo descrição, critérios de aceitação e estimativas.",
        keyFindings: [
          "15 features para MVP definidas",
          "Priorização baseada em valor",
          "Estimativas de desenvolvimento",
          "Dependências mapeadas",
        ],
        sections: [
          { title: "Features Core (MVP)", pages: "1-4" },
          { title: "Features Secundárias", pages: "5-8" },
          { title: "Features Futuras", pages: "9-10" },
          { title: "Roadmap de Desenvolvimento", pages: "11-12" },
        ],
      },
    },
    {
      id: 5,
      name: "User Stories",
      type: "PDF",
      size: "2.7 MB",
      lastModified: "2 dias atrás",
      author: "Agilidade Team",
      description:
        "Conjunto completo de user stories derivadas das ideias priorizadas.",
      content: {
        summary:
          "Coleção de 32 user stories escritas seguindo o formato padrão, com critérios de aceitação e estimativas de story points.",
        keyFindings: [
          "32 user stories documentadas",
          "Cobertura completa das personas",
          "Critérios de aceitação definidos",
          "Estimativas em story points",
        ],
        sections: [
          { title: "Stories do Usuário Final", pages: "1-8" },
          { title: "Stories do Administrador", pages: "9-12" },
          { title: "Stories Técnicas", pages: "13-16" },
          { title: "Critérios de Aceitação", pages: "17-22" },
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
                <FileText className="w-5 h-5 text-yellow-600" />
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
                <Brain className="w-5 h-5 text-orange-600" />
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
                  className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg"
                >
                  <Sparkles className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-sm text-yellow-800">{finding}</span>
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
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Ideação
            </h1>
            <p className="text-gray-600 mt-1">
              Documentos relacionados ao processo criativo e geração de ideias
            </p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
          <Lightbulb className="w-4 h-4 mr-1" />
          Etapa 3
        </Badge>
      </div>

      {/* Lista de Documentos */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-yellow-300"
            onClick={() => handleDocumentClick(doc)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                    {doc.type === "PNG" ? (
                      <Image className="w-6 h-6 text-white" />
                    ) : (
                      <FileText className="w-6 h-6 text-white" />
                    )}
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

export default DocumentDetailPage3;
