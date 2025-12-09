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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Users,
  UserPlus,
  Settings,
  Mail,
  Phone,
  Calendar,
  Activity,
  Shield,
  Edit,
  Trash2,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Crown,
  User,
  Eye,
} from "lucide-react";

const CollaboratorsPage = () => {
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [permissionsTarget, setPermissionsTarget] = useState(null);

  // Dados dos colaboradores
  const collaborators = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@empresa.com",
      phone: "+55 11 99999-1234",
      role: "Product Manager",
      avatar: null,
      status: "online",
      joinedDate: "2024-01-15",
      permissions: ["admin", "edit", "view", "invite"],
      lastActivity: "2 minutos atrás",
      recentActivities: [
        {
          type: "document",
          action: "Criou documento",
          item: "Análise de Mercado",
          time: "2 min atrás",
        },
        {
          type: "comment",
          action: "Comentou em",
          item: "Discovery Phase",
          time: "1 hora atrás",
        },
        {
          type: "approval",
          action: "Aprovou",
          item: "User Stories",
          time: "3 horas atrás",
        },
        {
          type: "edit",
          action: "Editou",
          item: "Roadmap",
          time: "1 dia atrás",
        },
      ],
      stats: {
        documentsCreated: 12,
        tasksCompleted: 28,
        commentsPosted: 45,
      },
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@empresa.com",
      phone: "+55 11 99999-5678",
      role: "UX Designer",
      avatar: null,
      status: "online",
      joinedDate: "2024-02-01",
      permissions: ["edit", "view"],
      lastActivity: "15 minutos atrás",
      recentActivities: [
        {
          type: "document",
          action: "Atualizou",
          item: "Personas de Usuário",
          time: "15 min atrás",
        },
        {
          type: "document",
          action: "Criou",
          item: "Wireframes",
          time: "2 horas atrás",
        },
        {
          type: "comment",
          action: "Comentou em",
          item: "Prototipagem",
          time: "4 horas atrás",
        },
        {
          type: "edit",
          action: "Editou",
          item: "Design System",
          time: "1 dia atrás",
        },
      ],
      stats: {
        documentsCreated: 8,
        tasksCompleted: 15,
        commentsPosted: 23,
      },
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@empresa.com",
      phone: "+55 11 99999-9012",
      role: "Developer",
      avatar: null,
      status: "away",
      joinedDate: "2024-01-20",
      permissions: ["edit", "view"],
      lastActivity: "1 hora atrás",
      recentActivities: [
        {
          type: "document",
          action: "Revisou",
          item: "Especificações Técnicas",
          time: "1 hora atrás",
        },
        {
          type: "approval",
          action: "Aprovou",
          item: "Arquitetura",
          time: "3 horas atrás",
        },
        {
          type: "comment",
          action: "Comentou em",
          item: "Features",
          time: "5 horas atrás",
        },
        {
          type: "document",
          action: "Criou",
          item: "Documentação API",
          time: "2 dias atrás",
        },
      ],
      stats: {
        documentsCreated: 6,
        tasksCompleted: 22,
        commentsPosted: 18,
      },
    },
    {
      id: 4,
      name: "Pedro Almeida",
      email: "pedro.almeida@empresa.com",
      phone: "+55 11 99999-3456",
      role: "Business Analyst",
      avatar: null,
      status: "offline",
      joinedDate: "2024-03-01",
      permissions: ["view"],
      lastActivity: "2 dias atrás",
      recentActivities: [
        {
          type: "document",
          action: "Visualizou",
          item: "Relatório de Vendas",
          time: "2 dias atrás",
        },
        {
          type: "comment",
          action: "Comentou em",
          item: "Métricas",
          time: "3 dias atrás",
        },
        {
          type: "document",
          action: "Baixou",
          item: "Dashboard Analytics",
          time: "4 dias atrás",
        },
      ],
      stats: {
        documentsCreated: 3,
        tasksCompleted: 8,
        commentsPosted: 12,
      },
    },
    {
      id: 5,
      name: "Fernanda Lima",
      email: "fernanda.lima@empresa.com",
      phone: "+55 11 99999-7890",
      role: "Marketing Manager",
      avatar: null,
      status: "online",
      joinedDate: "2024-02-15",
      permissions: ["edit", "view"],
      lastActivity: "30 minutos atrás",
      recentActivities: [
        {
          type: "document",
          action: "Criou",
          item: "Plano de Marketing",
          time: "30 min atrás",
        },
        {
          type: "document",
          action: "Atualizou",
          item: "Estratégia de Lançamento",
          time: "2 horas atrás",
        },
        {
          type: "comment",
          action: "Comentou em",
          item: "Campanhas",
          time: "4 horas atrás",
        },
      ],
      stats: {
        documentsCreated: 9,
        tasksCompleted: 18,
        commentsPosted: 31,
      },
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "online":
        return "Online";
      case "away":
        return "Ausente";
      case "offline":
        return "Offline";
      default:
        return "Desconhecido";
    }
  };

  const getPermissionBadgeColor = (permission) => {
    switch (permission) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "edit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "view":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "invite":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPermissionIcon = (permission) => {
    switch (permission) {
      case "admin":
        return <Crown className="w-3 h-3" />;
      case "edit":
        return <Edit className="w-3 h-3" />;
      case "view":
        return <Eye className="w-3 h-3" />;
      case "invite":
        return <UserPlus className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "document":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "comment":
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      case "approval":
        return <CheckCircle className="w-4 h-4 text-purple-600" />;
      case "edit":
        return <Edit className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleCollaboratorClick = (collaborator) => {
    setSelectedCollaborator(collaborator);
  };

  const handleBackToList = () => {
    setSelectedCollaborator(null);
  };

  const handleInviteCollaborator = () => {
    setShowInviteModal(true);
  };

  const handleManagePermissions = (collaborator) => {
    setPermissionsTarget(collaborator);
    setShowPermissionsModal(true);
  };

  const totalCollaborators = collaborators.length;
  const onlineCollaborators = collaborators.filter(
    (c) => c.status === "online",
  ).length;
  const adminCollaborators = collaborators.filter((c) =>
    c.permissions.includes("admin"),
  ).length;

  if (selectedCollaborator) {
    return (
      <div className="p-6 space-y-6">
        {/* Header do Colaborador */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToList}>
              <Users className="w-4 h-4 mr-2" />
              Voltar à Equipe
            </Button>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedCollaborator.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold">
                    {selectedCollaborator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(selectedCollaborator.status)}`}
                ></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {selectedCollaborator.name}
                </h1>
                <p className="text-gray-600">{selectedCollaborator.role}</p>
                <p className="text-sm text-gray-500">
                  Última atividade: {selectedCollaborator.lastActivity}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleManagePermissions(selectedCollaborator)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Gerenciar
            </Button>
          </div>
        </div>

        {/* Informações do Colaborador */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-sm">
                    {selectedCollaborator.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Telefone</p>
                  <p className="font-semibold text-sm">
                    {selectedCollaborator.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Entrou em</p>
                  <p className="font-semibold text-sm">
                    {new Date(
                      selectedCollaborator.joinedDate,
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-sm">
                    {getStatusText(selectedCollaborator.status)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-700">
                    {selectedCollaborator.stats.documentsCreated}
                  </p>
                  <p className="text-sm text-blue-600">Documentos Criados</p>
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
                    {selectedCollaborator.stats.tasksCompleted}
                  </p>
                  <p className="text-sm text-green-600">Tarefas Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-700">
                    {selectedCollaborator.stats.commentsPosted}
                  </p>
                  <p className="text-sm text-yellow-600">Comentários</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Permissões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCollaborator.permissions.map((permission, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`${getPermissionBadgeColor(permission)} flex items-center gap-1`}
                >
                  {getPermissionIcon(permission)}
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedCollaborator.recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-gray-600"> {activity.item}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
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
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Colaboradores
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie sua equipe e colaboradores do projeto
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            <Users className="w-4 h-4 mr-1" />
            {totalCollaborators} membros
          </Badge>
          <Button
            onClick={handleInviteCollaborator}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Convidar Colaborador
          </Button>
        </div>
      </div>

      {/* Estatísticas da Equipe */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {totalCollaborators}
                </p>
                <p className="text-sm text-blue-600">Total de Membros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {onlineCollaborators}
                </p>
                <p className="text-sm text-green-600">Online Agora</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-700">
                  {adminCollaborators}
                </p>
                <p className="text-sm text-red-600">Administradores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-700">100%</p>
                <p className="text-sm text-purple-600">Segurança</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid de Cards de Colaboradores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborators.map((collaborator) => (
          <Card
            key={collaborator.id}
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-gray-200 hover:border-blue-300"
            onClick={() => handleCollaboratorClick(collaborator)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={collaborator.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                        {collaborator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(collaborator.status)}`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {collaborator.name}
                    </h3>
                    <p className="text-sm text-gray-600">{collaborator.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleManagePermissions(collaborator);
                  }}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Última atividade: {collaborator.lastActivity}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {collaborator.permissions
                    .slice(0, 3)
                    .map((permission, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`text-xs ${getPermissionBadgeColor(permission)} flex items-center gap-1`}
                      >
                        {getPermissionIcon(permission)}
                        {permission}
                      </Badge>
                    ))}
                  {collaborator.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{collaborator.permissions.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {collaborator.stats.documentsCreated}
                      </p>
                      <p className="text-xs text-gray-500">Docs</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {collaborator.stats.tasksCompleted}
                      </p>
                      <p className="text-xs text-gray-500">Tarefas</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {collaborator.stats.commentsPosted}
                      </p>
                      <p className="text-xs text-gray-500">Comentários</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Convite */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Convidar Colaborador
            </DialogTitle>
            <DialogDescription>
              Envie um convite para um novo membro se juntar à equipe.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="colaborador@empresa.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              <Input id="role" placeholder="Ex: Designer, Developer, Analyst" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permissions">Permissões Iniciais</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione as permissões" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Apenas Visualização</SelectItem>
                  <SelectItem value="edit">Edição</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(false)}
              >
                Cancelar
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                Enviar Convite
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Gerenciamento de Permissões */}
      <Dialog
        open={showPermissionsModal}
        onOpenChange={setShowPermissionsModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Gerenciar Permissões
            </DialogTitle>
            <DialogDescription>
              {permissionsTarget &&
                `Gerencie as permissões de ${permissionsTarget.name}`}
            </DialogDescription>
          </DialogHeader>
          {permissionsTarget && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {permissionsTarget.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{permissionsTarget.name}</p>
                  <p className="text-sm text-gray-600">
                    {permissionsTarget.role}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Permissões Atuais</Label>
                <div className="flex flex-wrap gap-2">
                  {permissionsTarget.permissions.map((permission, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`${getPermissionBadgeColor(permission)} flex items-center gap-1`}
                    >
                      {getPermissionIcon(permission)}
                      {permission}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Adicionar Permissão</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="edit">Edição</SelectItem>
                    <SelectItem value="view">Visualização</SelectItem>
                    <SelectItem value="invite">Convidar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowPermissionsModal(false)}
                >
                  Cancelar
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollaboratorsPage;
