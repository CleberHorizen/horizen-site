import type { Metadata } from "next";
import CtaWhatsApp from "@/components/CtaWhatsApp";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ToolHero from "@/components/tools/ToolHero";
import ToolPageShell from "@/components/tools/ToolPageShell";
import { getWhatsAppEngenhariaLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projetos Executados | Horizen Soluções",
  description:
    "Conheça projetos e serviços executados pela Horizen Soluções em energia solar, projetos elétricos, postos de transformação, redes de distribuição e infraestrutura elétrica.",
  keywords: [
    "projetos executados",
    "energia solar",
    "sistemas fotovoltaicos",
    "projetos elétricos",
    "posto de transformação",
    "rede de distribuição",
    "Horizen Soluções",
  ],
};

export default function ProjetosPage() {
  return (
    <ToolPageShell>
      <ToolHero
        title="Projetos executados"
        subtitle="Portfólio de serviços em energia solar, engenharia elétrica, postos de transformação, redes de distribuição e infraestrutura — com foco em segurança, conformidade e alto padrão técnico."
      />

      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <p className="rounded-lg border border-amber-200/80 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-950 sm:text-sm">
            Os valores de geração, economia e dimensionamento apresentados são estimativas
            indicativas e podem variar conforme perfil de consumo, irradiação local, tarifas e
            configuração do sistema ou instalação.
          </p>

          <div className="mt-10">
            <ProjectsGrid />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0E2433] to-black py-16 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.5),transparent_60%)] opacity-80 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Quer um projeto com o mesmo padrão?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-200 sm:text-base">
            Fale com nossa equipe de engenharia e receba direcionamento técnico para o seu caso.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaWhatsApp
              label="Falar no WhatsApp"
              variant="primary"
              href={getWhatsAppEngenhariaLink()}
            />
          </div>
        </div>
      </section>
    </ToolPageShell>
  );
}
