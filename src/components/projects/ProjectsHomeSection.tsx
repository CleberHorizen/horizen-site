import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { getFeaturedProjects } from "@/data/projects";

export default function ProjectsHomeSection() {
  const featured = getFeaturedProjects(3);

  return (
    <section className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0E2433]">Projetos executados</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-700">
              Conheça serviços reais em energia solar, projetos elétricos, postos de transformação,
              redes e infraestrutura — com responsabilidade técnica e padrão Horizen.
            </p>
          </div>
          <Link
            href="/projetos"
            className="inline-flex w-full items-center justify-center rounded-md border border-[#0E2433] px-5 py-3 text-sm font-semibold text-[#0E2433] transition hover:bg-[#0E2433] hover:text-white sm:w-auto"
          >
            Ver projetos executados
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>

        <p className="mt-6 text-xs text-zinc-500">
          Geração, economia e dimensionamentos exibidos são estimativas indicativas e podem variar
          conforme perfil de consumo, irradiação local e configuração do sistema.
        </p>
      </div>
    </section>
  );
}
