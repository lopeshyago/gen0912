import React, { useState } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const UserStoriesFlowsPage = () => {
  const [content, setContent] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);

  const tasks = [
    { id: 1, text: "Escrever as User Stories principais (As a..., I want..., so that...)" },
    { id: 2, text: "Mapear o User Flow principal (Ex: Cadastro -> Login -> Uso da funcionalidade A)" },
    { id: 3, text: "Definir os critérios de aceitação para cada Story" },
    { id: 4, text: "Criar um Diagrama de Fluxo (opcional)" },
    { id: 5, text: "Estimar o esforço (Story Points) das Stories" },
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
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">User Stories e Fluxos</h1>
              <p className="text-gray-600 mt-1">Descreva a jornada do usuário no seu produto</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6">
              {/* IA Message */}
              <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
                <div className="flex gap-3">
                  <GitBranch className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold text-indigo-900">IA GenesiX:</span> Conte a história do seu usuário! 📖
                    <br />
                    <br />
                    Transforme as funcionalidades em User Stories (Como um [Persona], eu quero [Funcionalidade], para que [Benefício]). Mapeie o caminho que o usuário fará na sua aplicação. Qual o fluxo mais crítico?
                  </p>
                </div>
              </div>

              {/* Textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  User Stories e Fluxos
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escreva as User Stories principais e descreva o fluxo de usuário mais importante..."
                  className="min-h-96 resize-none border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg p-4 font-medium"
                />
              </div>

              {/* Save Button */}
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                💾 Salvar Stories
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
                  <span className="text-sm font-bold text-indigo-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
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
                        className="w-5 h-5 rounded border-gray-300 text-indigo-600 cursor-pointer"
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
                          {task.id === 1 && "Use o formato: 'Como um [Persona], eu quero [Ação], para que [Benefício]'."}
                          {task.id === 2 && "Descreva o caminho completo que o usuário percorre (passo a passo)."}
                          {task.id === 3 && "Defina o que precisa ser verdadeiro para a Story estar completa."}
                          {task.id === 4 && "Crie um diagrama visual do fluxo (wireflow ou flowchart)."}
                          {task.id === 5 && "Use Fibonacci (1, 2, 3, 5, 8, 13) para estimar o esforço."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Completion Status */}
              <div className="mt-6 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg">
                <div className="flex items-center gap-2">
                  {completionPercentage === 100 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-indigo-600" />
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
              <span className="text-2xl">📝</span> Estrutura User Story
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Como um:</strong> Persona/Tipo de usuário</li>
              <li><strong>Eu quero:</strong> A ação/funcionalidade</li>
              <li><strong>Para que:</strong> O benefício/resultado</li>
              <li><strong>Critérios:</strong> Quando está pronta</li>
            </ul>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🗺️</span> Tipos de Fluxo
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>User Flow:</strong> Caminho do usuário</li>
              <li><strong>Wireflow:</strong> Wireframes + fluxo</li>
              <li><strong>Flowchart:</strong> Decisões e caminhos</li>
              <li><strong>Storyboard:</strong> Sequência visual</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserStoriesFlowsPage;
