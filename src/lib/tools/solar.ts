export const IRRADIACAO_MEDIA_HSP = 4.8;
export const PERFORMANCE_RATIO = 0.78;
export const POTENCIA_MODULO_KWP = 0.62;
export const AREA_MEDIA_POR_MODULO_M2 = 2.8;
export const TARIFA_PADRAO = 0.95;

export type ConnectionType = "monofasico" | "bifasico" | "trifasico" | "nao_sei";

export const CONSUMO_MINIMO: Record<ConnectionType, number> = {
  monofasico: 30,
  bifasico: 50,
  trifasico: 100,
  nao_sei: 50,
};

export const CONNECTION_LABELS: Record<ConnectionType, string> = {
  monofasico: "Monofásico",
  bifasico: "Bifásico",
  trifasico: "Trifásico",
  nao_sei: "Não sei",
};

export type PropertyType =
  | "residencial"
  | "comercial"
  | "rural"
  | "industrial"
  | "outro";

export const PROPERTY_LABELS: Record<PropertyType, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  rural: "Rural",
  industrial: "Industrial",
  outro: "Outro",
};

export type ConsumptionInputMode = "kwh" | "bill";

export type SolarSimulationInput = {
  consumptionMode: ConsumptionInputMode;
  averageConsumptionKwh?: number;
  averageBillValue?: number;
  tariff: number;
  connectionType: ConnectionType;
};

export type SolarSimulationResult = {
  estimatedConsumptionKwh: number;
  minimumConsumptionKwh: number;
  compensableConsumptionKwh: number;
  systemPowerKwp: number;
  moduleCount: number;
  finalSystemPowerKwp: number;
  estimatedGenerationKwh: number;
  estimatedAreaM2: number;
};

const DENOMINATOR =
  IRRADIACAO_MEDIA_HSP * 30 * PERFORMANCE_RATIO;

export function estimateConsumptionKwh(input: SolarSimulationInput): number {
  if (input.consumptionMode === "kwh") {
    return input.averageConsumptionKwh ?? 0;
  }
  const bill = input.averageBillValue ?? 0;
  const tariff = input.tariff > 0 ? input.tariff : TARIFA_PADRAO;
  return bill / tariff;
}

export function simulateSolarSystem(
  input: SolarSimulationInput
): SolarSimulationResult {
  const estimatedConsumptionKwh = estimateConsumptionKwh(input);
  const minimumConsumptionKwh = CONSUMO_MINIMO[input.connectionType];
  const compensableConsumptionKwh = Math.max(
    0,
    estimatedConsumptionKwh - minimumConsumptionKwh
  );

  const systemPowerKwp =
    compensableConsumptionKwh > 0
      ? compensableConsumptionKwh / DENOMINATOR
      : 0;

  const moduleCount =
    systemPowerKwp > 0
      ? Math.ceil(systemPowerKwp / POTENCIA_MODULO_KWP)
      : 0;

  const finalSystemPowerKwp = moduleCount * POTENCIA_MODULO_KWP;

  const estimatedGenerationKwh =
    finalSystemPowerKwp * IRRADIACAO_MEDIA_HSP * 30 * PERFORMANCE_RATIO;

  const estimatedAreaM2 = moduleCount * AREA_MEDIA_POR_MODULO_M2;

  return {
    estimatedConsumptionKwh,
    minimumConsumptionKwh,
    compensableConsumptionKwh,
    systemPowerKwp,
    moduleCount,
    finalSystemPowerKwp,
    estimatedGenerationKwh,
    estimatedAreaM2,
  };
}
