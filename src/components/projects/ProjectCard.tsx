"use client";

import Image from "next/image";
import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/tools/whatsapp";
import { PROJECT_WHATSAPP_MESSAGE, type Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

function formatLocation(project: Project): string {
  return `${project.city}/${project.state}`;
}

function TechnicalSpecs({ project }: { project: Project }) {
  const specs: string[] = [];

  if (project.category === "Energia Solar") {
    if (project.powerKwp != null) specs.push(`${project.powerKwp} kWp instalados`);
    if (project.averageGenerationKwh != null)
      specs.push(`~${project.averageGenerationKwh.toLocaleString("pt-BR")} kWh/mês`);
    if (project.estimatedSavingsPercent != null)
      specs.push(`~${project.estimatedSavingsPercent}% de economia estimada`);
    if (project.installationType) specs.push(project.installationType);
  } else {
    if (project.serviceType) specs.push(project.serviceType);
    if (project.projectScope) specs.push(project.projectScope);
    if (project.transformerPowerKva != null)
      specs.push(`${project.transformerPowerKva} kVA`);
    if (project.voltageLevel) specs.push(project.voltageLevel);
  }

  if (specs.length === 0) return null;

  return (
    <ul className="mt-3 space-y-1.5">
      {specs.map((spec) => (
        <li
          key={spec}
          className="flex items-start gap-2 text-xs text-zinc-600 sm:text-sm"
        >
          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F27A0A]" />
          <span>{spec}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const whatsappHref = buildWhatsAppLink(PROJECT_WHATSAPP_MESSAGE);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-[#F27A0A]/30 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E2433]">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#0E2433] to-[#0b1f2e] p-6 text-center">
            <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.2)_1px,transparent_1px)] [background-size:40px_40px]" />
            <span className="relative text-xs font-semibold uppercase tracking-wider text-[#F27A0A]">
              {project.category}
            </span>
            <p className="relative mt-2 max-w-[220px] text-sm font-medium text-zinc-200">
              Imagem em atualização
            </p>
            <p className="relative mt-1 text-xs text-zinc-400">
              Adicione o arquivo em public/images/projetos/
            </p>
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-[#F27A0A] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            {project.category}
          </span>
          {project.featured && (
            <span className="rounded-md border border-white/20 bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              Destaque
            </span>
          )}
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5 sm:p-6"}`}>
        <h3 className="text-lg font-bold text-[#0E2433]">{project.title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
          <span>{formatLocation(project)}</span>
          {project.clientInitials && (
            <>
              <span className="text-zinc-300" aria-hidden>
                •
              </span>
              <span>Cliente {project.clientInitials}</span>
            </>
          )}
        </div>

        <TechnicalSpecs project={project} />

        {!compact && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-700">
            {project.description}
          </p>
        )}

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center rounded-md bg-[#F27A0A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${compact ? "mt-4" : "mt-5"}`}
        >
          Quero um projeto parecido
        </a>
      </div>
    </article>
  );
}
