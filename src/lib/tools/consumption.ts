export const TARIFA_PADRAO = 0.95;

export const AC_BTU_CONSUMPTION: Record<number, number> = {
  7000: 14,
  9000: 17,
  12000: 23,
  18000: 34,
  22000: 42,
  24000: 46,
  30000: 58,
  36000: 70,
  48000: 95,
  60000: 120,
};

export const AC_BTU_OPTIONS = Object.keys(AC_BTU_CONSUMPTION).map(Number);

export type AcTechnology =
  | "convencional"
  | "inverter"
  | "nao_sei"
  | "uso_severo";

export const AC_USE_FACTORS: Record<AcTechnology, number> = {
  convencional: 1.0,
  inverter: 0.75,
  nao_sei: 0.9,
  uso_severo: 1.15,
};

export const AC_TECHNOLOGY_LABELS: Record<AcTechnology, string> = {
  convencional: "Convencional",
  inverter: "Inverter",
  nao_sei: "Não sei",
  uso_severo: "Uso severo / ambiente muito quente",
};

export type EquipmentType = "common" | "ac" | "labeled";

export type EquipmentItem = {
  id: string;
  name: string;
  type: EquipmentType;
  typeLabel: string;
  quantity: number;
  consumptionKwh: number;
  monthlyCost: number;
};

export function calcCommonConsumptionKwh(
  powerW: number,
  hoursPerDay: number,
  daysPerMonth: number,
  quantity: number
): number {
  return (powerW / 1000) * hoursPerDay * daysPerMonth * quantity;
}

export function calcAcConsumptionKwh(
  btu: number,
  technology: AcTechnology,
  quantity: number,
  hoursPerDay: number,
  daysPerMonth: number
): number {
  const base = AC_BTU_CONSUMPTION[btu] ?? 0;
  const factor = AC_USE_FACTORS[technology];
  return base * quantity * hoursPerDay * (daysPerMonth / 30) * factor;
}

export function calcLabeledConsumptionKwh(
  consumptionKwhPerMonth: number,
  quantity: number
): number {
  return consumptionKwhPerMonth * quantity;
}

export function calcMonthlyCost(consumptionKwh: number, tariff: number): number {
  return consumptionKwh * tariff;
}

export function getTopConsumer(items: EquipmentItem[]): EquipmentItem | null {
  if (items.length === 0) return null;
  return items.reduce((top, item) =>
    item.consumptionKwh > top.consumptionKwh ? item : top
  );
}

export function getParticipationPercent(
  itemConsumption: number,
  totalConsumption: number
): number {
  if (totalConsumption <= 0) return 0;
  return (itemConsumption / totalConsumption) * 100;
}
