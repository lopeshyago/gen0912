import React, { useState } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const PRDFinalPage = () => {
  const [content, setContent] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);

  const tasks = [
    { id: 1, text: "Revisar e consolidar todas as informações das etapas anteriores" },
    { id: 2, text: "Garantir que o PRD responda a todas as perguntas do time de desenvolvimento" },
    { id: 3, text: "Incluir o Protótipo e o Roadmap" },
    { id: 4, text: "Obter a aprovação final dos stakeholders" },
    { id: 5, text: "Distribuir o PRD para o time" },
  ];

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const toggleTaskExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const completionPercentage = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-gray-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">PRD Final</h1>
              <p className="text-gray-600 mt-1">O documento mestre do seu produto</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6">
              {/* IA Message */}
              <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg">
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold text-slate-900">IA GenesiX:</span> O documento mestre está pronto! 📜
                    <br />
                    <br />
                    O PRD é a bíblia do seu produto. Ele deve conter tudo: problema, solução, Personas, User Stories, Métricas, Roadmap e Critérios de Aceitação. O que falta para fechar?
                  </p>
                </div>
              </div>

              {/* Textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  PRD Final
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Liste os capítulos do seu PRD e o que falta para finalizá-lo..."
                  className="min-h-96 resize-none border-2 border-gray-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 rounded-lg p-4 font-medium"
                />
              </div>

              {/* Save Button */}
              <Button className="w-full bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                💾 Salvar PRD
              </Button>
            </Card>
          </div>

          {/* Sidebar - Tasks */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6 sticky top-24">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Progresso</h3>
                  <span className="text-sm font-bold text-slate-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-slate-600 to-gray-700 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 mb-4">Tarefas da Etapa</h3>
                {tasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleTaskExpand(task.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={completedTasks.includes(task.id)}
                        onChange={() => toggleTask(task.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-5 h-5 rounded border-gray-300 text-slate-600 cursor-pointer"
                      />
                      <span
                        className={`flex-1 text-left text-sm font-medium transition-all ${
                          completedTasks.includes(task.id)
                            ? "text-gray-400 line-through"
                            : "text-gray-700"
                        }`}
                      >
                        {task.text}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedTask === task.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedTask === task.id && (
                      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                        <p>
                          {task.id === 1 && "Compile todas as informações: Problema, Personas, User Stories, Métricas, Roadmap."}
                          {task.id === 2 && "Certifique-se que o PRD responde: O quê? Por quê? Para quem? Como medir?"}
                          {task.id === 3 && "Anexe o protótipo, mockups e o roadmap visual."}
                          {task.id === 4 && "Apresente para stakeholders e obtenha sign-off."}
                          {task.id === 5 && "Compartilhe com o time de desenvolvimento e design."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Completion Status */}
              <div className="mt-6 p-3 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2">
                  {completionPercentage === 100 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-slate-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {completionPercentage === 100
                      ? "✨ Etapa concluída!"
                      : `${tasks.length - completedTasks.length} tarefa(s) restante(s)`}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">📋</span> Estrutura do PRD
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Visão:</strong> O que é o produto</li>
              <li><strong>Problema:</strong> Qual problema resolve</li>
              <li><strong>Personas:</strong> Para quem é</li>
              <li><strong>Funcionalidades:</strong> O que faz</li>
              <li><strong>Métricas:</strong> Como medir sucesso</li>
            </ul>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">✅</span> Checklist Final
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Completo:</strong> Todas as seções preenchidas</li>
              <li><strong>Claro:</strong> Fácil de entender</li>
              <li><strong>Aprovado:</strong> Sign-off dos stakeholders</li>
              <li><strong>Acessível:</strong> Disponível para o time</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PRDFinalPage;
