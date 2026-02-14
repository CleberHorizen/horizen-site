export const COMPANY = {
  name: "Horizen Soluções",
  tagline: "Engenharia Elétrica • Energia Solar • Automação",
};

export const WHATSAPP = {
  numberE164Digits: "5514996564946",
};

export function getWhatsAppSolarLink() {
  const message = `Olá! Quero um *Orçamento Solar*.
Posso enviar *foto da fatura*? (ou informe consumo médio kWh/12 meses).
Objetivo: (kit gerador / projeto+homologação+instalação).
Cidade/UF (se não estiver na fatura): ____`;
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP.numberE164Digits}?text=${text}`;
}

export function getWhatsAppEngenhariaLink() {
  const message = `Olá! Preciso de *Serviços de Engenharia*.
Selecione o serviço: (BT/MT / Pivô (posto/cabine) / Automação / Consultoria).
Cidade/UF: ____.
Resumo do objetivo: ____.
Se tiver, envie fotos/plantas.`;
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP.numberE164Digits}?text=${text}`;
}

// Função padrão mantida para compatibilidade (usa link solar)
export function getWhatsAppLink() {
  return getWhatsAppSolarLink();
}