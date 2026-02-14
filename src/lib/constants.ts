export const COMPANY = {
  name: "Horizen Soluções",
  tagline: "Engenharia Elétrica • Energia Solar • Automação",
};

export const WHATSAPP = {
  numberE164Digits: "5514996564946",
};

export function getWhatsAppSolarLink() {
  const message = `Olá! Quero um Orçamento de Energia Solar`;
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