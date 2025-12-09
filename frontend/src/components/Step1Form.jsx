import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Plus,
  Send,
  Target,
  Trash2,
  Users,
} from "lucide-react";
import { enviarEtapa1, getEtapa1WebhookUrl } from "@/services/etapa1";

const initialFormState = {
  nomeProduto: "",
  descricaoIdeia: "",
  problemaCentral: "",
  publicoAlvo: "",
  stakeholders: [""],
  motivacao: "",
  evidencias: "",
  hipotesesPrincipais: [""],
  jobsToBeDone: [{ quando: "", quero: "", paraQue: "" }],
  cenarioAtual: "",
  concorrentes: [{ nome: "", tipo: "", forcas: "", fraquezas: "" }],
  kpisIniciais: [""],
  "5whys": [""],
  anotacoesExtras: "",
};

const requiredFields = {
  nomeProduto: "Nome do produto",
  descricaoIdeia: "Descricao da ideia",
  problemaCentral: "Problema central",
  publicoAlvo: "Publico alvo",
  motivacao: "Motivacao",
};

const maxLengthRules = {
  descricaoIdeia: 2000,
  problemaCentral: 1500,
  publicoAlvo: 1000,
  motivacao: 1500,
  evidencias: 2000,
  cenarioAtual: 2000,
  anotacoesExtras: 2000,
};

const TextFieldWithCounter = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  required,
  error,
  textarea = false,
  rows = 3,
}) => {
  const Component = textarea ? Textarea : Input;
  const currentLength = value?.length || 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="text-sm font-semibold text-gray-800">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Label>
        {maxLength ? (
          <span className="text-xs text-gray-500">
            {currentLength}/{maxLength}
          </span>
        ) : null}
      </div>
      <Component
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full ${textarea ? "min-h-[96px]" : ""}`}
        {...(textarea ? { rows } : {})}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

const StringListField = ({
  label,
  description,
  values,
  onChange,
  addLabel,
  placeholder,
  maxItems,
  idPrefix,
}) => {
  const handleChange = (index, newValue) => {
    const updated = values.map((item, i) => (i === index ? newValue : item));
    onChange(updated);
  };

  const handleAdd = () => {
    if (maxItems && values.length >= maxItems) return;
    onChange([...values, ""]);
  };

  const handleRemove = (index) => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated.length ? updated : [""]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
        <Badge variant="outline">
          {values.length}
          {maxItems ? `/${maxItems}` : ""}
        </Badge>
      </div>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={`${idPrefix}-${index}`} className="flex items-center gap-2">
            <Input
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={placeholder}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(index)}
              aria-label={`Remover ${label}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          disabled={Boolean(maxItems && values.length >= maxItems)}
          className="text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {addLabel}
        </Button>
        {maxItems && values.length >= maxItems && (
          <span className="text-xs text-gray-500">
            Limite de {maxItems} itens atingido.
          </span>
        )}
      </div>
    </div>
  );
};

const ObjectListField = ({
  label,
  description,
  items,
  onChange,
  fields,
  addLabel,
  idPrefix,
}) => {
  const emptyItem = useMemo(
    () =>
      fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {}),
    [fields],
  );

  const handleFieldChange = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...items, { ...emptyItem }]);
  };

  const handleRemove = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated.length ? updated : [{ ...emptyItem }]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
        <Badge variant="outline">{items.length}</Badge>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`${idPrefix}-${index}`}
            className="rounded-lg border border-gray-200 bg-gray-50/60 p-3 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Badge variant="secondary">#{index + 1}</Badge>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
                aria-label={`Remover ${label} ${index + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {fields.map((field) => (
                <div key={field.name} className="md:col-span-1">
                  <Label className="text-xs text-gray-700">
                    {field.label}
                  </Label>
                  {field.textarea ? (
                    <Textarea
                      value={item[field.name]}
                      onChange={(e) =>
                        handleFieldChange(index, field.name, e.target.value)
                      }
                      placeholder={field.placeholder}
                      rows={2}
                    />
                  ) : (
                    <Input
                      value={item[field.name]}
                      onChange={(e) =>
                        handleFieldChange(index, field.name, e.target.value)
                      }
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="text-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        {addLabel}
      </Button>
    </div>
  );
};

/*
  Saida esperada do multiagente para consumo na Etapa 2:
  {
    "title": "Etapa 1 - Contexto & Problema",
    "type": "object",
    "required": [
      "project_info",
      "problem_statement",
      "root_cause",
      "stakeholders",
      "evidence",
      "hypotheses",
      "jobs_to_be_done",
      "opportunities",
      "initial_kpis",
      "competitive_landscape",
      "constraints",
      "risks",
      "summary"
    ],
    "properties": {
      "project_info": {
        "type": "object",
        "properties": {
          "product_name": { "type": "string" },
          "product_description": { "type": "string" }
        }
      },
      "problem_statement": {
        "type": "object",
        "properties": {
          "statement": { "type": "string" },
          "context": { "type": "string" },
          "impact": { "type": "string" }
        }
      },
      "root_cause": {
        "type": "object",
        "properties": {
          "analysis_5whys": { "type": "string" },
          "root_cause_summary": { "type": "string" }
        }
      },
      "stakeholders": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "role": { "type": "string" },
            "interest": { "type": "string" },
            "pain_points": { "type": "string" }
          }
        }
      },
      "evidence": {
        "type": "object",
        "properties": {
          "qualitative": { "type": "string" },
          "quantitative": { "type": "string" }
        }
      },
      "hypotheses": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "hypothesis": { "type": "string" },
            "why_it_matters": { "type": "string" }
          }
        }
      },
      "jobs_to_be_done": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "user": { "type": "string" },
            "job": { "type": "string" },
            "desired_outcome": { "type": "string" }
          }
        }
      },
      "opportunities": {
        "type": "object",
        "properties": {
          "tree_description": { "type": "string" }
        }
      },
      "initial_kpis": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "metric": { "type": "string" },
            "definition": { "type": "string" },
            "target": { "type": "string" }
          }
        }
      },
      "competitive_landscape": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "competitor": { "type": "string" },
            "strengths": { "type": "string" },
            "weaknesses": { "type": "string" },
            "opportunity_gap": { "type": "string" }
          }
        }
      },
      "constraints": {
        "type": "object",
        "properties": {
          "technical": { "type": "string" },
          "business": { "type": "string" },
          "regulatory": { "type": "string" }
        }
      },
      "risks": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "risk": { "type": "string" },
            "probability": { "type": "string" },
            "impact": { "type": "string" },
            "mitigation": { "type": "string" }
          }
        }
      },
      "summary": {
        "type": "string"
      }
    }
  }
*/

const Step1Form = ({ onAdvanceStep }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastPayload, setLastPayload] = useState(null);

  const webhookUrl = getEtapa1WebhookUrl();

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(requiredFields).forEach(([key, label]) => {
      if (!formData[key]?.trim()) {
        newErrors[key] = `${label} e obrigatorio.`;
      }
    });

    Object.entries(maxLengthRules).forEach(([key, limit]) => {
      if (formData[key] && formData[key].length > limit) {
        newErrors[key] = `Limite de ${limit} caracteres.`;
      }
    });
    return newErrors;
  };

  const buildPayload = () => ({
    nomeProduto: formData.nomeProduto.trim(),
    descricaoIdeia: formData.descricaoIdeia.trim(),
    problemaCentral: formData.problemaCentral.trim(),
    publicoAlvo: formData.publicoAlvo.trim(),
    stakeholders: formData.stakeholders
      .map((item) => item.trim())
      .filter(Boolean),
    motivacao: formData.motivacao.trim(),
    evidencias: formData.evidencias.trim(),
    hipotesesPrincipais: formData.hipotesesPrincipais
      .map((item) => item.trim())
      .filter(Boolean),
    jobsToBeDone: formData.jobsToBeDone
      .map((job) => ({
        quando: job.quando.trim(),
        quero: job.quero.trim(),
        paraQue: job.paraQue.trim(),
      }))
      .filter((job) => job.quando || job.quero || job.paraQue),
    cenarioAtual: formData.cenarioAtual.trim(),
    concorrentes: formData.concorrentes
      .map((item) => ({
        nome: item.nome.trim(),
        tipo: item.tipo.trim(),
        forcas: item.forcas.trim(),
        fraquezas: item.fraquezas.trim(),
      }))
      .filter((item) => item.nome || item.tipo || item.forcas || item.fraquezas),
    kpisIniciais: formData.kpisIniciais.map((item) => item.trim()).filter(Boolean),
    "5whys": formData["5whys"].map((item) => item.trim()).filter(Boolean),
    anotacoesExtras: formData.anotacoesExtras.trim(),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = buildPayload();
    setIsSubmitting(true);

    try {
      await enviarEtapa1(payload);
      setLastPayload(payload);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.message || "Falha ao enviar dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Etapa 1 - Contexto & Problema
          </h1>
          <p className="text-sm text-gray-600">
            Formulario estruturado para capturar o contexto do produto e o problema central.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {submitSuccess ? (
            <Badge className="bg-green-100 text-green-800 border border-green-200">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Dados enviados
            </Badge>
          ) : (
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
              <Activity className="w-4 h-4 mr-1" />
              Preenchimento
            </Badge>
          )}
          <Button
            onClick={onAdvanceStep}
            variant="default"
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={!submitSuccess}
            title={
              submitSuccess
                ? "Continuar para a Etapa 2"
                : "Envie o formulario para liberar a proxima etapa"
            }
          >
            Ir para Etapa 2
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertTriangle className="w-4 h-4" />
              <AlertTitle>Erro ao enviar</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}
          {submitSuccess && (
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle2 className="w-4 h-4" />
              <AlertTitle>Enviado com sucesso</AlertTitle>
              <AlertDescription>
                O payload foi enviado para o webhook do n8n. Os dados ficam salvos localmente para uso interno.
              </AlertDescription>
            </Alert>
          )}

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Contexto do produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextFieldWithCounter
                id="nomeProduto"
                label="Nome do produto"
                value={formData.nomeProduto}
                onChange={(value) => handleFieldChange("nomeProduto", value)}
                placeholder="Defina como o produto sera chamado"
                required
                error={errors.nomeProduto}
              />
              <TextFieldWithCounter
                id="descricaoIdeia"
                label="Descricao da ideia"
                value={formData.descricaoIdeia}
                onChange={(value) => handleFieldChange("descricaoIdeia", value)}
                placeholder="Explique a visao geral da ideia (max 2000 caracteres)"
                maxLength={maxLengthRules.descricaoIdeia}
                required
                error={errors.descricaoIdeia}
                textarea
                rows={4}
              />
              <TextFieldWithCounter
                id="problemaCentral"
                label="Problema central"
                value={formData.problemaCentral}
                onChange={(value) => handleFieldChange("problemaCentral", value)}
                placeholder="Qual dor principal o produto resolve?"
                maxLength={maxLengthRules.problemaCentral}
                required
                error={errors.problemaCentral}
                textarea
                rows={4}
              />
              <TextFieldWithCounter
                id="publicoAlvo"
                label="Publico alvo"
                value={formData.publicoAlvo}
                onChange={(value) => handleFieldChange("publicoAlvo", value)}
                placeholder="Quem sao os usuarios ou clientes?"
                maxLength={maxLengthRules.publicoAlvo}
                required
                error={errors.publicoAlvo}
                textarea
                rows={3}
              />
              <StringListField
                idPrefix="stakeholders"
                label="Stakeholders"
                description="Interessados diretos ou indiretos."
                values={formData.stakeholders}
                onChange={(value) => handleFieldChange("stakeholders", value)}
                addLabel="Adicionar stakeholder"
                placeholder="Ex: time de vendas, clientes beta, conselho"
              />
              <TextFieldWithCounter
                id="motivacao"
                label="Motivacao"
                value={formData.motivacao}
                onChange={(value) => handleFieldChange("motivacao", value)}
                placeholder="Por que este problema merece ser resolvido?"
                maxLength={maxLengthRules.motivacao}
                required
                error={errors.motivacao}
                textarea
                rows={3}
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Evidencias e cenario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextFieldWithCounter
                id="evidencias"
                label="Evidencias"
                value={formData.evidencias}
                onChange={(value) => handleFieldChange("evidencias", value)}
                placeholder="Pesquisas, feedbacks ou dados que comprovem o problema"
                maxLength={maxLengthRules.evidencias}
                textarea
                rows={3}
              />
              <StringListField
                idPrefix="hipotesesPrincipais"
                label="Hipoteses principais"
                description="Hipoteses iniciais que serao validadas."
                values={formData.hipotesesPrincipais}
                onChange={(value) =>
                  handleFieldChange("hipotesesPrincipais", value)
                }
                addLabel="Adicionar hipotese"
                placeholder="Ex: usuarios querem automatizar tarefas manuais"
              />
              <ObjectListField
                idPrefix="jobsToBeDone"
                label="Jobs to be Done"
                description="Estruture o quando / quero / para que."
                items={formData.jobsToBeDone}
                onChange={(value) => handleFieldChange("jobsToBeDone", value)}
                addLabel="Adicionar Job to be Done"
                fields={[
                  { name: "quando", label: "Quando", placeholder: "Quando eu..." },
                  { name: "quero", label: "Quero", placeholder: "Quero..." },
                  { name: "paraQue", label: "Para que", placeholder: "Para que..." },
                ]}
              />
              <TextFieldWithCounter
                id="cenarioAtual"
                label="Cenario atual"
                value={formData.cenarioAtual}
                onChange={(value) => handleFieldChange("cenarioAtual", value)}
                placeholder="Como o problema e tratado hoje? Quais limitacoes existem?"
                maxLength={maxLengthRules.cenarioAtual}
                textarea
                rows={3}
              />
              <ObjectListField
                idPrefix="concorrentes"
                label="Concorrentes"
                description="Quem ja endereca esse problema?"
                items={formData.concorrentes}
                onChange={(value) => handleFieldChange("concorrentes", value)}
                addLabel="Adicionar concorrente"
                fields={[
                  { name: "nome", label: "Nome", placeholder: "Nome do concorrente" },
                  { name: "tipo", label: "Tipo", placeholder: "Direto, indireto..." },
                  {
                    name: "forcas",
                    label: "Forcas",
                    placeholder: "Pontos fortes",
                    textarea: true,
                  },
                  {
                    name: "fraquezas",
                    label: "Fraquezas",
                    placeholder: "Pontos fracos",
                    textarea: true,
                  },
                ]}
              />
              <StringListField
                idPrefix="kpisIniciais"
                label="KPIs iniciais"
                description="Metricas para avaliar sucesso inicial."
                values={formData.kpisIniciais}
                onChange={(value) => handleFieldChange("kpisIniciais", value)}
                addLabel="Adicionar KPI inicial"
                placeholder="Ex: NPS inicial, usuarios ativos, MQLs"
              />
              <StringListField
                idPrefix="fiveWhys"
                label="5 Whys"
                description="Pergunte 'por que' ate 5 vezes para achar causa raiz."
                values={formData["5whys"]}
                onChange={(value) => handleFieldChange("5whys", value)}
                addLabel="Adicionar why"
                placeholder="Por que isso acontece?"
                maxItems={5}
              />
              <TextFieldWithCounter
                id="anotacoesExtras"
                label="Anotacoes extras"
                value={formData.anotacoesExtras}
                onChange={(value) => handleFieldChange("anotacoesExtras", value)}
                placeholder="Observacoes adicionais relevantes"
                maxLength={maxLengthRules.anotacoesExtras}
                textarea
                rows={3}
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Limpar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-purple-600 text-white hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar para webhook
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Resumo rapido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Campos obrigatorios: nome do produto, descricao da ideia, problema central, publico alvo, motivacao.
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                Use os blocos dinamicos para adicionar stakeholders, hipoteses, Jobs to be Done e concorrentes.
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-600" />
                Botao de adicionar em 5 Whys fica bloqueado ao atingir 5 itens.
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Verifique o limite de caracteres antes de enviar para evitar rejeicao do schema.
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-gray-800">
                Configuracao de envio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <p>
                Webhook atual:{" "}
                <span className="font-mono text-xs break-all">
                  {webhookUrl}
                </span>
              </p>
              <p className="text-xs text-gray-600">
                Defina a variavel N8N_WEBHOOK_ETAPA1_URL ou VITE_N8N_WEBHOOK_ETAPA1_URL para enviar ao endpoint correto.
              </p>
              {lastPayload && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">
                  <p className="text-xs text-gray-600 mb-1">
                    Ultimo payload salvo (local):
                  </p>
                  <pre className="text-[11px] leading-tight text-gray-800 overflow-x-auto">
                    {JSON.stringify(lastPayload, null, 2)}
                  </pre>
                </div>
              )}
              {submitSuccess && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onAdvanceStep}
                >
                  Avancar para Etapa 2
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Step1Form;
