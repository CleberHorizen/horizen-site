"use client";

import { useMemo, useState } from "react";
import CtaWhatsApp from "@/components/CtaWhatsApp";
import ResultCard from "@/components/tools/ResultCard";
import ToolHero from "@/components/tools/ToolHero";
import ToolPageShell from "@/components/tools/ToolPageShell";
import WhatsAppFloatingButton from "@/components/tools/WhatsAppFloatingButton";
import { formatKwh, formatKwp, formatNumber } from "@/lib/tools/format";
import { parseDecimalInput } from "@/lib/tools/parseInput";
import {
  CONNECTION_LABELS,
  PROPERTY_LABELS,
  type ConnectionType,
  type ConsumptionInputMode,
  type PropertyType,
  simulateSolarSystem,
  TARIFA_PADRAO,
} from "@/lib/tools/solar";
import {
  buildWhatsAppLink,
  getDefaultWhatsAppLink,
  getSolarWhatsAppMessage,
} from "@/lib/tools/whatsapp";

const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-[#F27A0A] focus:ring-2 focus:ring-[#F27A0A]/20";
const labelClass = "text-sm font-medium text-zinc-700";

export default function SolarSimulator() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("SP");
  const [phone, setPhone] = useState("");
  const [consumptionMode, setConsumptionMode] = useState<ConsumptionInputMode>("kwh");
  const [averageConsumptionKwh, setAverageConsumptionKwh] = useState("");
  const [averageBillValue, setAverageBillValue] = useState("");
  const [tariff, setTariff] = useState(String(TARIFA_PADRAO));
  const [connectionType, setConnectionType] = useState<ConnectionType>("bifasico");
  const [propertyType, setPropertyType] = useState<PropertyType>("residencial");
  const [formError, setFormError] = useState<string | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    if (!hasCalculated) return null;
    return simulateSolarSystem({
      consumptionMode,
      averageConsumptionKwh:
        consumptionMode === "kwh"
          ? parseDecimalInput(averageConsumptionKwh)
          : undefined,
      averageBillValue:
        consumptionMode === "bill"
          ? parseDecimalInput(averageBillValue)
          : undefined,
      tariff: parseDecimalInput(tariff),
      connectionType,
    });
  }, [
    hasCalculated,
    consumptionMode,
    averageConsumptionKwh,
    averageBillValue,
    tariff,
    connectionType,
  ]);

  const whatsappLink = useMemo(() => {
    if (!result || !hasCalculated) return getDefaultWhatsAppLink();
    return buildWhatsAppLink(
      getSolarWhatsAppMessage({
        name: name.trim(),
        city: `${city.trim()}/${state}`,
        state,
        phone: phone.trim(),
        estimatedConsumptionKwh: result.estimatedConsumptionKwh,
        connectionType,
        result,
      })
    );
  }, [result, hasCalculated, name, city, state, phone, connectionType]);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Informe seu nome.");
      return;
    }
    if (!phone.trim()) {
      setFormError("Informe seu WhatsApp ou telefone.");
      return;
    }
    if (!city.trim()) {
      setFormError("Informe sua cidade.");
      return;
    }
    if (!state) {
      setFormError("Informe o estado (UF).");
      return;
    }
    if (!tariff.trim()) {
      setFormError("Informe a tarifa de energia.");
      return;
    }
    if (parseDecimalInput(tariff) <= 0) {
      setFormError("Informe uma tarifa maior que zero.");
      return;
    }
    if (consumptionMode === "kwh") {
      if (!averageConsumptionKwh.trim()) {
        setFormError("Informe o consumo médio em kWh.");
        return;
      }
      const kwh = parseDecimalInput(averageConsumptionKwh);
      if (kwh <= 0) {
        setFormError("Informe o consumo médio em kWh maior que zero.");
        return;
      }
    } else {
      if (!averageBillValue.trim()) {
        setFormError("Informe o valor médio da conta.");
        return;
      }
      const bill = parseDecimalInput(averageBillValue);
      if (bill <= 0) {
        setFormError("Informe o valor médio da conta maior que zero.");
        return;
      }
    }

    setHasCalculated(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <ToolPageShell>
      <ToolHero
        title="Simulador de Sistema Solar"
        subtitle="Estime o tamanho do sistema fotovoltaico ideal para reduzir sua conta de energia."
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Dados do cliente */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#0E2433]">Seus dados</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="name">
                  Nome *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="phone">
                  WhatsApp / Telefone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="(14) 99999-9999"
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="city">
                  Cidade *
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="state">
                  Estado (UF) *
                </label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={inputClass}
                  required
                >
                  {BRAZILIAN_STATES.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="propertyType">
                  Tipo de imóvel
                </label>
                <select
                  id="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className={inputClass}
                >
                  {(Object.keys(PROPERTY_LABELS) as PropertyType[]).map((key) => (
                    <option key={key} value={key}>
                      {PROPERTY_LABELS[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dados de energia */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#0E2433]">Dados de energia</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setConsumptionMode("kwh")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  consumptionMode === "kwh"
                    ? "bg-[#0E2433] text-white"
                    : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                Tenho o consumo médio em kWh
              </button>
              <button
                type="button"
                onClick={() => setConsumptionMode("bill")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  consumptionMode === "bill"
                    ? "bg-[#0E2433] text-white"
                    : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                Tenho apenas o valor médio da conta
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {consumptionMode === "kwh" ? (
                <div>
                  <label className={labelClass} htmlFor="kwh">
                    Consumo médio mensal (kWh) *
                  </label>
                  <input
                    id="kwh"
                    type="text"
                    inputMode="decimal"
                    value={averageConsumptionKwh}
                    onChange={(e) => setAverageConsumptionKwh(e.target.value)}
                    className={inputClass}
                  />
                </div>
              ) : (
                <div>
                  <label className={labelClass} htmlFor="bill">
                    Valor médio da conta (R$) *
                  </label>
                  <input
                    id="bill"
                    type="text"
                    inputMode="decimal"
                    value={averageBillValue}
                    onChange={(e) => setAverageBillValue(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
              <div>
                <label className={labelClass} htmlFor="tariff">
                  Tarifa de energia (R$/kWh)
                </label>
                <input
                  id="tariff"
                  type="text"
                  inputMode="decimal"
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="connection">
                  Tipo de ligação *
                </label>
                <select
                  id="connection"
                  value={connectionType}
                  onChange={(e) =>
                    setConnectionType(e.target.value as ConnectionType)
                  }
                  className={inputClass}
                  required
                >
                  {(Object.keys(CONNECTION_LABELS) as ConnectionType[]).map((key) => (
                    <option key={key} value={key}>
                      {CONNECTION_LABELS[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {formError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-[#F27A0A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
          >
            Calcular simulação
          </button>
        </form>

        {result && hasCalculated && (
          <div className="mt-10">
            <h2 className="text-xl font-extrabold text-[#0E2433] sm:text-2xl">
              Resultado preliminar da sua simulação
            </h2>
            <p className="mt-2 text-sm text-zinc-700">
              Este é um dimensionamento inicial para estimativa comercial. Para definir o kit
              correto, a Horizen Soluções precisa analisar sua conta de energia, padrão de
              entrada, telhado, orientação dos módulos, sombreamento e regras da concessionária.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <ResultCard
                label="Consumo estimado"
                value={formatKwh(result.estimatedConsumptionKwh)}
                highlight
              />
              <ResultCard
                label="Consumo mínimo considerado"
                value={formatKwh(result.minimumConsumptionKwh)}
              />
              <ResultCard
                label="Consumo compensável estimado"
                value={formatKwh(result.compensableConsumptionKwh)}
              />
              <ResultCard
                label="Kit estimado"
                value={`${result.moduleCount} módulos de 620 Wp`}
              />
              <ResultCard
                label="Potência aproximada"
                value={formatKwp(result.finalSystemPowerKwp)}
              />
              <ResultCard
                label="Geração média estimada"
                value={formatKwh(result.estimatedGenerationKwh)}
              />
              <ResultCard
                label="Área aproximada necessária"
                value={`${formatNumber(result.estimatedAreaM2)} m²`}
              />
            </div>
          </div>
        )}

        <div className="mt-10 rounded-xl border border-[#F27A0A]/30 bg-gradient-to-br from-[#0F172A] via-[#0E2433] to-black p-6 text-white sm:p-8">
          <h2 className="text-xl font-extrabold sm:text-2xl">
            Quer saber o kit ideal para o seu imóvel?
          </h2>
          <p className="mt-3 text-sm text-zinc-200 sm:text-base">
            Envie sua simulação para a Horizen Soluções e receba uma análise técnica mais precisa
            com base na sua conta de energia.
          </p>
          <div className="mt-6">
            <CtaWhatsApp
              label="Solicitar análise técnica pelo WhatsApp"
              variant="primary"
              href={whatsappLink}
            />
          </div>
        </div>

        <p className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-4 text-xs leading-relaxed text-amber-900">
          Resultado estimativo preliminar. O dimensionamento definitivo depende da análise
          técnica da conta de energia, padrão de entrada, concessionária, localização,
          sombreamento, estrutura do telhado, orientação dos módulos, disponibilidade de área,
          regra de compensação vigente e demais critérios técnicos aplicáveis. A conta de energia
          não é necessariamente zerada, pois podem permanecer custos mínimos, iluminação pública,
          impostos, tarifas e componentes não compensáveis.
        </p>
      </div>

      <WhatsAppFloatingButton href={getDefaultWhatsAppLink()} />
    </ToolPageShell>
  );
}
