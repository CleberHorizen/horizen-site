import type { Metadata } from "next";
import ConsumptionCalculator from "@/components/tools/ConsumptionCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Consumo de Energia | Horizen Soluções",
  description:
    "Calcule o consumo mensal dos seus equipamentos elétricos, estime o custo da sua conta de energia e descubra oportunidades de economia com energia solar.",
  keywords: [
    "calculadora de consumo de energia",
    "consumo elétrico",
    "conta de luz",
    "economia de energia",
    "energia solar",
    "Horizen Soluções",
  ],
};

export default function CalculadoraConsumoPage() {
  return <ConsumptionCalculator />;
}
