import { WHATSAPP } from "@/lib/constants";
import { formatCurrency, formatNumber } from "@/lib/tools/format";
import type { ConnectionType } from "@/lib/tools/solar";
import { CONNECTION_LABELS } from "@/lib/tools/solar";
import type { SolarSimulationResult } from "@/lib/tools/solar";

export const WHATSAPP_NUMBER = WHATSAPP.numberE164Digits;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá, fiz uma simulação no site da Horizen Soluções e gostaria de uma análise técnica completa.";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getDefaultWhatsAppLink(): string {
  return buildWhatsAppLink(WHATSAPP_DEFAULT_MESSAGE);
}

export function getConsumptionWhatsAppMessage(params: {
  totalConsumptionKwh: number;
  monthlyCost: number;
  annualCost: number;
}): string {
  return `Olá, fiz uma simulação de consumo no site da Horizen Soluções.

Consumo estimado: ${formatNumber(params.totalConsumptionKwh)} kWh/mês
Custo mensal estimado: ${formatCurrency(params.monthlyCost)}
Custo anual estimado: ${formatCurrency(params.annualCost)}

Gostaria de uma análise para reduzir minha conta de energia.`;
}

export function getSolarWhatsAppMessage(params: {
  name: string;
  city: string;
  state: string;
  phone: string;
  estimatedConsumptionKwh: number;
  connectionType: ConnectionType;
  result: SolarSimulationResult;
}): string {
  const { result } = params;
  return `Olá, fiz uma simulação solar no site da Horizen Soluções.

Nome: ${params.name}
Cidade: ${params.city}
WhatsApp: ${params.phone}
Consumo estimado: ${formatNumber(params.estimatedConsumptionKwh)} kWh/mês
Tipo de ligação: ${CONNECTION_LABELS[params.connectionType]}
Sistema estimado: ${formatNumber(result.finalSystemPowerKwp)} kWp
Quantidade estimada de módulos: ${result.moduleCount}

Gostaria de uma análise técnica completa.`;
}
