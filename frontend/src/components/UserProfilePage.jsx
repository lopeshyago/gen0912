import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Mail,
  Globe,
  Clock,
  Bell,
  Moon,
  Sun,
  Shield,
  Key,
  MapPin,
  Calendar,
  Settings as SettingsIcon,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { authService, userService } from "../services/api";

const EmptyState = ({ title, description }) => (
  <Card className="border-dashed border-gray-200">
    <CardContent className="p-6 text-center text-gray-500 space-y-2">
      <p className="font-semibold text-gray-700">{title}</p>
      <p className="text-sm">{description}</p>
    </CardContent>
  </Card>
);

const UserProfilePage = () => {
  const { user: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    avatar: "",
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    plan: "",
    planStartDate: "",
    planEndDate: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    slack: false,
    discord: false,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError("");

        const me = await authService.getMe();
        const apiUser = me?.data?.user;

        if (!apiUser) {
          setError("Não foi possível carregar seu perfil.");
          return;
        }

        const profile = apiUser.profile || {};
        const settings = apiUser.settings || {};

        setUserData({
          // id salvo para updates
          id: apiUser.id,
          name: apiUser.nome || "",
          email: apiUser.email || "",
          role: profile.cargo || profile.area_atuacao || "Usuário",
          avatar: apiUser.avatar_url || "",
          language: settings.idioma || "pt-BR",
          timezone: settings.timezone || "America/Sao_Paulo",
          plan: settings.plano || "Free",
          planStartDate: settings.plano_inicio || "",
          planEndDate: settings.plano_fim || "",
        });

        setNotifications({
          email: settings.notificacoes_email ?? true,
          inApp: settings.notificacoes_push ?? true,
          slack: false,
          discord: false,
        });

        setTwoFactorEnabled(settings.dois_fatores ?? false);
        setDarkMode(settings.tema === "dark");
        setEditForm({
          name: apiUser.nome || "",
          email: apiUser.email || "",
          role: profile.cargo || profile.area_atuacao || "",
        });
        setUserId(apiUser.id);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setError(err?.message || "Erro ao carregar seu perfil.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [authUser]);

  const initials = useMemo(() => {
    if (!userData.name) return "";
    return userData.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [userData.name]);

  const getPlanColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case "trial":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "starter":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pro":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "enterprise":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      setSaving(true);
      setError("");

      // Atualiza dados básicos
      await userService.updateProfile(userId, {
        nome: editForm.name,
        email: editForm.email,
      });

      // Atualiza perfil detalhado
      await userService.updateDetailedProfile(userId, {
        cargo: editForm.role,
        area_atuacao: editForm.role,
      });

      // Refresca dados visíveis
      setUserData((prev) => ({
        ...prev,
        name: editForm.name,
        email: editForm.email,
        role: editForm.role || "Usuário",
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
      setError(err?.data?.error || err?.message || "Erro ao salvar perfil.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 text-gray-500">Carregando perfil...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {/* Header do Perfil */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="text-2xl bg-purple-600 text-white">
                  {initials || "?"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.name || "Seu nome"}
                </h2>
                {userData.plan && (
                  <Badge className={getPlanColor(userData.plan)}>
                    Plano {userData.plan}
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{userData.role}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {userData.language}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {userData.timezone}
                </span>
              </div>
              </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? "Cancelar" : "Editar perfil"}
              </Button>
              {isEditing && (
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Salvando..." : "Salvar"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Editar dados</CardTitle>
            <CardDescription>Atualize suas informações básicas</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Cargo / Área de atuação</Label>
              <Input
                value={editForm.role}
                onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="Ex.: Product Manager"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferências */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Configure como deseja ser avisado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                <span>Email</span>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(v) => setNotifications((prev) => ({ ...prev, email: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                <span>Push</span>
              </div>
              <Switch
                checked={notifications.inApp}
                onCheckedChange={(v) => setNotifications((prev) => ({ ...prev, inApp: v }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tema</CardTitle>
            <CardDescription>Claro ou escuro</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? (
                <Moon className="w-4 h-4 text-gray-500" />
              ) : (
                <Sun className="w-4 h-4 text-gray-500" />
              )}
              <span>{darkMode ? "Escuro" : "Claro"}</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={(v) => setDarkMode(v)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Proteja sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span>2FA (TOTP)</span>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={(v) => setTwoFactorEnabled(v)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Key className="w-4 h-4" />
              <span>Altere a senha no menu Segurança</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plano */}
      <Card>
        <CardHeader>
          <CardTitle>Assinatura</CardTitle>
          <CardDescription>Detalhes do seu plano</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={getPlanColor(userData.plan)}>Plano {userData.plan || "Free"}</Badge>
            {userData.planStartDate && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Início: {userData.planStartDate}
              </span>
            )}
            {userData.planEndDate && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Expira: {userData.planEndDate}
              </span>
            )}
          </div>
          <Progress value={userData.plan?.toLowerCase() === "pro" ? 75 : 30} />
        </CardContent>
      </Card>

      {/* Localização e idioma */}
      <Card>
        <CardHeader>
          <CardTitle>Preferências de conta</CardTitle>
          <CardDescription>Idioma, fuso horário e localização</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Idioma</Label>
            <div className="mt-2 flex items-center gap-2 text-gray-700">
              <Globe className="w-4 h-4" />
              <span>{userData.language}</span>
            </div>
          </div>
          <div>
            <Label>Fuso horário</Label>
            <div className="mt-2 flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>{userData.timezone}</span>
            </div>
          </div>
          <div>
            <Label>Localização</Label>
            <div className="mt-2 flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{authUser?.localizacao || "Não informado"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder para histórico/integrações */}
      <div className="grid md:grid-cols-2 gap-4">
        <EmptyState
          title="Projetos"
          description="Conecte ou crie projetos para vê-los aqui."
        />
        <EmptyState
          title="Integrações"
          description="Nenhuma integração ativa. Configure nas preferências."
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
