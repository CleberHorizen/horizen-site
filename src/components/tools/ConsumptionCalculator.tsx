"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CtaWhatsApp from "@/components/CtaWhatsApp";
import ResultCard from "@/components/tools/ResultCard";
import ToolHero from "@/components/tools/ToolHero";
import ToolPageShell from "@/components/tools/ToolPageShell";
import WhatsAppFloatingButton from "@/components/tools/WhatsAppFloatingButton";
import {
  AC_BTU_OPTIONS,
  AC_TECHNOLOGY_LABELS,
  AC_USE_FACTORS,
  type AcTechnology,
  type EquipmentItem,
  type EquipmentType,
  calcAcConsumptionKwh,
  calcCommonConsumptionKwh,
  calcLabeledConsumptionKwh,
  calcMonthlyCost,
  getParticipationPercent,
  getTopConsumer,
  TARIFA_PADRAO,
} from "@/lib/tools/consumption";
import { formatCurrency, formatKwh, formatNumber } from "@/lib/tools/format";
import { parseDecimalInput, parseIntInput } from "@/lib/tools/parseInput";
import {
  buildWhatsAppLink,
  getConsumptionWhatsAppMessage,
  getDefaultWhatsAppLink,
} from "@/lib/tools/whatsapp";

const COMMON_PRESETS: { name: string; powerW: number }[] = [
  { name: "Chuveiro elétrico", powerW: 5500 },
  { name: "Televisão", powerW: 150 },
  { name: "Computador", powerW: 200 },
  { name: "Micro-ondas", powerW: 1200 },
  { name: "Ferro de passar", powerW: 1000 },
  { name: "Máquina de lavar", powerW: 500 },
  { name: "Iluminação", powerW: 60 },
  { name: "Bomba d'água", powerW: 750 },
  { name: "Forno elétrico", powerW: 2000 },
  { name: "Carregadores", powerW: 15 },
  { name: "Outros", powerW: 100 },
];

const TYPE_LABELS: Record<EquipmentType, string> = {
  common: "Potência e uso",
  ac: "Ar-condicionado",
  labeled: "Consumo informado",
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition focus:border-[#F27A0A] focus:ring-2 focus:ring-[#F27A0A]/20";
const labelClass = "text-sm font-medium text-zinc-700";

export default function ConsumptionCalculator() {
  const [tariff, setTariff] = useState(String(TARIFA_PADRAO));
  const [equipmentType, setEquipmentType] = useState<EquipmentType>("common");
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Common fields
  const [commonName, setCommonName] = useState("");
  const [commonPower, setCommonPower] = useState("");
  const [commonQuantity, setCommonQuantity] = useState("1");
  const [commonHours, setCommonHours] = useState("");
  const [commonDays, setCommonDays] = useState("30");

  // AC fields
  const [acBtu, setAcBtu] = useState("12000");
  const [acTech, setAcTech] = useState<AcTechnology>("convencional");
  const [acQuantity, setAcQuantity] = useState("1");
  const [acHours, setAcHours] = useState("");
  const [acDays, setAcDays] = useState("30");

  // Labeled fields
  const [labeledName, setLabeledName] = useState("");
  const [labeledConsumption, setLabeledConsumption] = useState("");
  const [labeledQuantity, setLabeledQuantity] = useState("1");

  const totals = useMemo(() => {
    const totalConsumption = items.reduce((s, i) => s + i.consumptionKwh, 0);
    const totalMonthly = items.reduce((s, i) => s + i.monthlyCost, 0);
    return {
      totalConsumption,
      totalMonthly,
      totalAnnual: totalMonthly * 12,
      topConsumer: getTopConsumer(items),
    };
  }, [items]);

  const whatsappResultLink = useMemo(() => {
    if (items.length === 0) return getDefaultWhatsAppLink();
    return buildWhatsAppLink(
      getConsumptionWhatsAppMessage({
        totalConsumptionKwh: totals.totalConsumption,
        monthlyCost: totals.totalMonthly,
        annualCost: totals.totalAnnual,
      })
    );
  }, [items.length, totals]);

  function handlePresetSelect(name: string) {
    const preset = COMMON_PRESETS.find((p) => p.name === name);
    setCommonName(name);
    if (preset) setCommonPower(String(preset.powerW));
  }

  function validateTariff(): number | null {
    if (!tariff.trim()) {
      setFormError("Informe a tarifa de energia.");
      return null;
    }
    const tariffValue = parseDecimalInput(tariff);
    if (tariffValue <= 0) {
      setFormError("Informe uma tarifa maior que zero.");
      return null;
    }
    return tariffValue;
  }

  function addEquipment() {
    setFormError(null);
    const tariffValue = validateTariff();
    if (tariffValue === null) return;

    if (equipmentType === "common") {
      const power = parseDecimalInput(commonPower);
      const qty = parseIntInput(commonQuantity);
      const hours = parseDecimalInput(commonHours);
      const days = parseIntInput(commonDays);
      const name = commonName.trim() || "Equipamento";

      if (!commonPower.trim()) {
        setFormError("Informe a potência em watts.");
        return;
      }
      if (power <= 0) {
        setFormError("Informe uma potência maior que zero.");
        return;
      }
      if (!commonQuantity.trim()) {
        setFormError("Informe a quantidade.");
        return;
      }
      if (qty < 1) {
        setFormError("Quantidade deve ser pelo menos 1.");
        return;
      }
      if (!commonHours.trim()) {
        setFormError("Informe as horas por dia.");
        return;
      }
      if (hours < 0 || hours > 24) {
        setFormError("Horas por dia devem estar entre 0 e 24.");
        return;
      }
      if (!commonDays.trim()) {
        setFormError("Informe os dias por mês.");
        return;
      }
      if (days < 1 || days > 31) {
        setFormError("Dias por mês devem estar entre 1 e 31.");
        return;
      }

      const consumption = calcCommonConsumptionKwh(power, hours, days, qty);
      setItems((prev) => [
        ...prev,
        {
          id: generateId(),
          name,
          type: "common",
          typeLabel: TYPE_LABELS.common,
          quantity: qty,
          consumptionKwh: consumption,
          monthlyCost: calcMonthlyCost(consumption, tariffValue),
        },
      ]);
      setCommonHours("");
      return;
    }

    if (equipmentType === "ac") {
      const btu = parseIntInput(acBtu);
      const qty = parseIntInput(acQuantity);
      const hours = parseDecimalInput(acHours);
      const days = parseIntInput(acDays);

      if (!acQuantity.trim()) {
        setFormError("Informe a quantidade.");
        return;
      }
      if (qty < 1) {
        setFormError("Quantidade deve ser pelo menos 1.");
        return;
      }
      if (!acHours.trim()) {
        setFormError("Informe as horas por dia.");
        return;
      }
      if (hours < 0 || hours > 24) {
        setFormError("Horas por dia devem estar entre 0 e 24.");
        return;
      }
      if (!acDays.trim()) {
        setFormError("Informe os dias por mês.");
        return;
      }
      if (days < 1 || days > 31) {
        setFormError("Dias por mês devem estar entre 1 e 31.");
        return;
      }

      const consumption = calcAcConsumptionKwh(btu, acTech, qty, hours, days);
      setItems((prev) => [
        ...prev,
        {
          id: generateId(),
          name: `Ar-condicionado ${btu} BTU`,
          type: "ac",
          typeLabel: `${TYPE_LABELS.ac} (${AC_TECHNOLOGY_LABELS[acTech]})`,
          quantity: qty,
          consumptionKwh: consumption,
          monthlyCost: calcMonthlyCost(consumption, tariffValue),
        },
      ]);
      setAcHours("");
      return;
    }

    const consumptionVal = parseDecimalInput(labeledConsumption);
    const qty = parseIntInput(labeledQuantity);
    const name = labeledName.trim() || "Equipamento";

    if (!labeledConsumption.trim()) {
      setFormError("Informe o consumo em kWh/mês.");
      return;
    }
    if (consumptionVal <= 0) {
      setFormError("Informe o consumo em kWh/mês maior que zero.");
      return;
    }
    if (!labeledQuantity.trim()) {
      setFormError("Informe a quantidade.");
      return;
    }
    if (qty < 1) {
      setFormError("Quantidade deve ser pelo menos 1.");
      return;
    }

    const consumption = calcLabeledConsumptionKwh(consumptionVal, qty);
    setItems((prev) => [
      ...prev,
      {
        id: generateId(),
        name,
        type: "labeled",
        typeLabel: TYPE_LABELS.labeled,
        quantity: qty,
        consumptionKwh: consumption,
        monthlyCost: calcMonthlyCost(consumption, tariffValue),
      },
    ]);
    setLabeledConsumption("");
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <ToolPageShell>
      <ToolHero
        title="Calculadora de Consumo de Energia"
        subtitle="Descubra quais equipamentos mais pesam na sua conta de luz e estime seu gasto mensal de energia."
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        {/* Tarifa */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
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
          <p className="mt-2 text-xs text-zinc-500">
            Valor médio por kWh consumido. Ajuste conforme sua concessionária.
          </p>
        </div>

        {/* Formulário */}
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-[#0E2433]">Adicionar equipamento</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {(["common", "ac", "labeled"] as EquipmentType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setEquipmentType(type);
                  setFormError(null);
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  equipmentType === type
                    ? "bg-[#0E2433] text-white"
                    : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {TYPE_LABELS[type]}
              </button>
            ))}
          </div>

          {formError && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {formError}
            </p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {equipmentType === "common" && (
              <>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="preset">
                    Equipamento
                  </label>
                  <select
                    id="preset"
                    className={inputClass}
                    value={commonName}
                    onChange={(e) => handlePresetSelect(e.target.value)}
                  >
                    <option value="">Selecione ou digite abaixo</option>
                    {COMMON_PRESETS.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="commonName">
                    Nome
                  </label>
                  <input
                    id="commonName"
                    type="text"
                    value={commonName}
                    onChange={(e) => setCommonName(e.target.value)}
                    className={inputClass}
                    placeholder="Ex.: Chuveiro elétrico"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="commonPower">
                    Potência (W)
                  </label>
                  <input
                    id="commonPower"
                    type="text"
                    inputMode="decimal"
                    value={commonPower}
                    onChange={(e) => setCommonPower(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="commonQty">
                    Quantidade
                  </label>
                  <input
                    id="commonQty"
                    type="text"
                    inputMode="numeric"
                    value={commonQuantity}
                    onChange={(e) => setCommonQuantity(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="commonHours">
                    Horas/dia
                  </label>
                  <input
                    id="commonHours"
                    type="text"
                    inputMode="decimal"
                    value={commonHours}
                    onChange={(e) => setCommonHours(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="commonDays">
                    Dias/mês
                  </label>
                  <input
                    id="commonDays"
                    type="text"
                    inputMode="numeric"
                    value={commonDays}
                    onChange={(e) => setCommonDays(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {equipmentType === "ac" && (
              <>
                <div>
                  <label className={labelClass} htmlFor="acBtu">
                    Capacidade (BTU)
                  </label>
                  <select
                    id="acBtu"
                    value={acBtu}
                    onChange={(e) => setAcBtu(e.target.value)}
                    className={inputClass}
                  >
                    {AC_BTU_OPTIONS.map((btu) => (
                      <option key={btu} value={btu}>
                        {btu} BTU
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="acTech">
                    Tecnologia
                  </label>
                  <select
                    id="acTech"
                    value={acTech}
                    onChange={(e) => setAcTech(e.target.value as AcTechnology)}
                    className={inputClass}
                  >
                    {(Object.keys(AC_USE_FACTORS) as AcTechnology[]).map((key) => (
                      <option key={key} value={key}>
                        {AC_TECHNOLOGY_LABELS[key]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="acQty">
                    Quantidade
                  </label>
                  <input
                    id="acQty"
                    type="text"
                    inputMode="numeric"
                    value={acQuantity}
                    onChange={(e) => setAcQuantity(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="acHours">
                    Horas/dia
                  </label>
                  <input
                    id="acHours"
                    type="text"
                    inputMode="decimal"
                    value={acHours}
                    onChange={(e) => setAcHours(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="acDays">
                    Dias/mês
                  </label>
                  <input
                    id="acDays"
                    type="text"
                    inputMode="numeric"
                    value={acDays}
                    onChange={(e) => setAcDays(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {equipmentType === "labeled" && (
              <>
                <div>
                  <label className={labelClass} htmlFor="labeledName">
                    Nome do equipamento
                  </label>
                  <input
                    id="labeledName"
                    type="text"
                    value={labeledName}
                    onChange={(e) => setLabeledName(e.target.value)}
                    className={inputClass}
                    placeholder="Ex.: Geladeira"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="labeledKwh">
                    Consumo informado (kWh/mês)
                  </label>
                  <input
                    id="labeledKwh"
                    type="text"
                    inputMode="decimal"
                    value={labeledConsumption}
                    onChange={(e) => setLabeledConsumption(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="labeledQty">
                    Quantidade
                  </label>
                  <input
                    id="labeledQty"
                    type="text"
                    inputMode="numeric"
                    value={labeledQuantity}
                    onChange={(e) => setLabeledQuantity(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={addEquipment}
            className="mt-6 w-full rounded-md bg-[#0E2433] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
          >
            Adicionar equipamento
          </button>
        </div>

        {/* Lista */}
        {items.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-[#0E2433]">Equipamentos adicionados</h2>

            <div className="mt-4 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500">
                    <th className="pb-3 pr-4 font-medium">Equipamento</th>
                    <th className="pb-3 pr-4 font-medium">Tipo</th>
                    <th className="pb-3 pr-4 font-medium">Qtd</th>
                    <th className="pb-3 pr-4 font-medium">Consumo</th>
                    <th className="pb-3 pr-4 font-medium">Custo/mês</th>
                    <th className="pb-3 font-medium">%</th>
                    <th className="pb-3 pl-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-zinc-100">
                      <td className="py-3 pr-4 font-medium">{item.name}</td>
                      <td className="py-3 pr-4 text-zinc-600">{item.typeLabel}</td>
                      <td className="py-3 pr-4">{item.quantity}</td>
                      <td className="py-3 pr-4">{formatKwh(item.consumptionKwh)}</td>
                      <td className="py-3 pr-4">{formatCurrency(item.monthlyCost)}</td>
                      <td className="py-3 pr-4">
                        {formatNumber(
                          getParticipationPercent(
                            item.consumptionKwh,
                            totals.totalConsumption
                          )
                        )}
                        %
                      </td>
                      <td className="py-3 pl-2">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3 md:hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-zinc-500">{item.typeLabel}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-zinc-500">Consumo</span>
                      <div className="font-medium">{formatKwh(item.consumptionKwh)}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Custo/mês</span>
                      <div className="font-medium">{formatCurrency(item.monthlyCost)}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500">Participação</span>
                      <div className="font-medium">
                        {formatNumber(
                          getParticipationPercent(
                            item.consumptionKwh,
                            totals.totalConsumption
                          )
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resultados */}
        {items.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-[#0E2433]">Resultado consolidado</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard
                label="Consumo mensal total"
                value={formatKwh(totals.totalConsumption)}
                highlight
              />
              <ResultCard
                label="Custo mensal estimado"
                value={formatCurrency(totals.totalMonthly)}
              />
              <ResultCard
                label="Custo anual estimado"
                value={formatCurrency(totals.totalAnnual)}
              />
              <ResultCard
                label="Maior vilão de consumo"
                value={totals.topConsumer?.name ?? "—"}
              />
            </div>
          </div>
        )}

        {/* CTA Solar */}
        <div className="mt-10 rounded-xl border border-[#F27A0A]/30 bg-gradient-to-br from-[#0F172A] via-[#0E2433] to-black p-6 text-white sm:p-8">
          <h2 className="text-xl font-extrabold sm:text-2xl">
            Tendo alto consumo de energia?
          </h2>
          <p className="mt-3 text-sm text-zinc-200 sm:text-base">
            Com base no seu consumo estimado, a energia solar pode ajudar a reduzir sua conta de
            luz. Faça uma simulação rápida e veja o tamanho aproximado do sistema ideal.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/simulador-solar"
              className="inline-flex items-center justify-center rounded-md bg-[#F27A0A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Simular Sistema Solar
            </Link>
            <CtaWhatsApp
              label="Falar com a Horizen pelo WhatsApp"
              variant="outline"
              tone="dark"
              href={whatsappResultLink}
            />
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-zinc-500">
          Os valores apresentados são estimativas. O consumo real pode variar conforme modelo do
          equipamento, estado de conservação, temperatura ambiente, modo de uso, instalação
          elétrica e tarifa aplicada pela concessionária.
        </p>
      </div>

      <WhatsAppFloatingButton href={getDefaultWhatsAppLink()} />
    </ToolPageShell>
  );
}
