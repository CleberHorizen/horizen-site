export const COMPANY = {
  name: "Horizen Soluções",
  tagline: "Engenharia Elétrica • Energia Solar • Automação",
};

export const WHATSAPP = {
  numberE164Digits: "5514997936983",
};

export function getWhatsAppSolarLink() {
  const message = `Olá! Quero um ORÇAMENTO SOLAR.

Para agilizar, responda com 1 ou 2:
1) Vou enviar a foto da fatura agora.
2) Não tenho fatura: meu consumo médio é ____ kWh/mês (ou quero suprir ____ kWh/mês).

Se possível, informe também: cidade/UF e tipo de unidade (residencial/comercial/rural).
`;
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP.numberE164Digits}?text=${text}`;
}

export function getWhatsAppEngenhariaLink() {
  const message = `Olá! Preciso de Serviços de Engenharia.`;
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP.numberE164Digits}?text=${text}`;
}

// Função padrão mantida para compatibilidade (usa link solar)
export function getWhatsAppLink() {
  return getWhatsAppSolarLink();
}