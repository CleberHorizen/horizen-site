import type { Metadata } from "next";
import SolarSimulator from "@/components/tools/SolarSimulator";

export const metadata: Metadata = {
  title: "Simulador de Energia Solar | Horizen Soluções",
  description:
    "Simule o tamanho aproximado do sistema solar ideal para sua conta de energia e solicite uma análise técnica com a Horizen Soluções.",
  keywords: [
    "simulador solar",
    "energia solar",
    "sistema fotovoltaico",
    "kit solar",
    "economia de energia",
    "energia fotovoltaica",
    "Horizen Soluções",
  ],
};

export default function SimuladorSolarPage() {
  return <SolarSimulator />;
}
