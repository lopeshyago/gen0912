const webhookUrl =
  import.meta.env.VITE_N8N_WEBHOOK_ETAPA1_URL ||
  (typeof process !== "undefined"
    ? process.env?.N8N_WEBHOOK_ETAPA1_URL
    : undefined) ||
  "<SUBSTITUIR_PELA_URL_DO_WEBHOOK>";

/**
 * Envia os dados da Etapa 1 (Contexto & Problema) para o webhook do n8n.
 * Mantem o payload exatamente no schema solicitado pelo cliente.
 */
export async function enviarEtapa1(payload) {
  if (!webhookUrl || webhookUrl === "<SUBSTITUIR_PELA_URL_DO_WEBHOOK>") {
    throw new Error(
      "URL do webhook n8n nao configurada (defina N8N_WEBHOOK_ETAPA1_URL ou VITE_N8N_WEBHOOK_ETAPA1_URL).",
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => null);
    throw new Error(
      errorText || "Falha ao enviar dados para o webhook do n8n",
    );
  }

  return response.json().catch(() => null);
}

export function getEtapa1WebhookUrl() {
  return webhookUrl;
}
