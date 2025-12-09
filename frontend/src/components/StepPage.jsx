import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  CheckCircle,
  Upload,
  Send,
  Wand2,
  FileText,
  Edit,
  RefreshCcw,
  MessageSquare,
  TrendingUp,
  Target,
  AlertTriangle,
  Bot,
  User,
} from "lucide-react";

const StepPage = ({ stepData, onAdvanceStep }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState(
    stepData.tasks.map((task) => ({ ...task, completed: false })),
  );

  useEffect(() => {
    // Simula a mensagem inicial da IA para a etapa atual
    setMessages([
      {
        id: "ia-intro",
        sender: "IA",
        text: stepData.iaMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setGeneratedDocument(null);
  }, [stepData.id, stepData.iaMessage]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsGenerating(true);

    // Simula a resposta da IA e geração de documento
    setTimeout(() => {
      const iaResponse = {
        id: Date.now() + 1,
        sender: "IA",
        text: `Perfeito! Analisei suas informações sobre ${stepData.title}. Vou gerar um documento detalhado...`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, iaResponse]);

      setTimeout(() => {
        setGeneratedDocument({
          title: `Relatório de ${stepData.title}`,
          content: `## Relatório de ${stepData.title}\n\nBaseado nas suas informações:\n\n**Input do Usuário:** ${newMessage.text}\n\n**Análise da IA:**\n\n*   Este é um documento gerado automaticamente pela IA para a etapa de **${stepData.title}**.\n*   Ele contém insights e análises baseadas no seu input e em dados de mercado.\n*   Você pode aprovar, editar ou pedir para refazer este documento.\n\n**Próximos Passos Sugeridos:**\n\n1.  Revisar o conteúdo cuidadosamente.\n2.  Utilizar este documento como base para as próximas etapas.\n3.  Fornecer feedback para a IA aprimorar futuras gerações.\n\nEste documento está pronto para ser revisado e aprovado.`, // Conteúdo simulado
          status: "pending",
        });
        setIsGenerating(false);
      }, 2000); // Simula tempo de geração da IA
    }, 1500); // Simula tempo de resposta da IA
  };

  const handleApproveDocument = () => {
    setGeneratedDocument((prev) => ({ ...prev, status: "approved" }));
    // Aqui você enviaria o documento para o backend para salvar
    alert(`Documento de ${stepData.title} aprovado!`); // Simula a ação
  };

  const handleEditDocument = () => {
    alert("Funcionalidade de edição em desenvolvimento!");
  };

  const handleRejectDocument = () => {
    setGeneratedDocument(null);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 2,
        sender: "IA",
        text: "Entendido. Por favor, forneça mais informações ou revise as anteriores para que eu possa refazer o documento.",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleTaskToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{stepData.title}</h1>
          <p className="text-sm text-gray-600">{stepData.description}</p>
        </div>
        <Button
          onClick={onAdvanceStep}
          className="bg-blue-600 text-white shadow-lg hover:bg-blue-700 h-9 px-4 text-sm"
        >
          Avançar Tarefas
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Coluna Principal (Chat, Input, Documentos) */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          {/* Chat com IA */}
          <Card className="flex-1 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Conversa com a IA
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-5 border rounded-md bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center 
                    text-white font-bold text-xs leading-none flex-shrink-0
                      ${msg.sender === "user" ? "bg-blue-500" : "bg-purple-500"}`}
                      >
                        {msg.sender === "user" ? "Você" : "IA"}
                      </div>
                      <div
                        className={`p-2 rounded-lg shadow-sm ${msg.sender === "user" ? "bg-blue-100 text-gray-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {msg.text}
                        </p>
                        <span className="text-xs text-gray-500 block mt-2.5 text-right">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-purple-500 text-white text-xs font-bold">
                        IA
                      </div>
                      <div className="p-2 rounded-lg shadow-sm bg-gray-100 text-gray-800">
                        <div className="flex items-center space-x-2">
                          <Wand2 className="w-3.5 h-3.5 animate-pulse text-purple-600" />
                          <span className="text-sm">IA pensando...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input e Upload */}
              <div className="flex items-center space-x-2 border-t border-gray-200 pt-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Upload className="w-4 h-4" />
                </Button>
                <Textarea
                  placeholder={stepData.placeholder}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 resize-none text-sm h-8 min-h-[32px]"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-purple-500 hover:bg-purple-600 h-8 w-8"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documento de Output da IA */}
          {generatedDocument && (
            <Card className="shadow-lg border-green-500">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-green-700">
                  Documento Gerado pela IA
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="prose prose-sm max-w-none mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {generatedDocument.content}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleApproveDocument}
                    className="bg-green-500 hover:bg-green-600 text-white h-9 px-4 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Aprovar
                  </Button>
                  <Button
                    onClick={handleEditDocument}
                    variant="outline"
                    className="h-9 px-4 text-sm"
                  >
                    <Edit className="w-4 h-4 mr-2" /> Editar
                  </Button>
                  <Button
                    onClick={handleRejectDocument}
                    variant="destructive"
                    className="h-9 px-4 text-sm"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" /> Rejeitar e Refazer
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Coluna Lateral (Checklist, Insights, Documentos) */}
        <div className="lg:col-span-1 flex flex-col space-y-4">
          {/* Checklist Interativo */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Checklist da Etapa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                  >
                    {task.text}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights da IA sobre a Etapa */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Insights da IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-green-600" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-0.5">
                      Foco em Validação
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">
                      A IA sugere que esta etapa se beneficie de uma validação
                      mais aprofundada com usuários reais para garantir o
                      alinhamento com as necessidades do mercado.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-0.5">
                      Oportunidade de Inovação
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">
                      Identificamos uma oportunidade de inovação ao integrar a
                      análise de dados com feedback direto dos usuários.
                      Considere ferramentas de pesquisa mais robustas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Área de Documentos de Output */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Documentos da Etapa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-800">
                    Relatório de Mercado - V1.pdf
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  Ver
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-800">
                    Análise Competitiva - V2.docx
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  Ver
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StepPage;
