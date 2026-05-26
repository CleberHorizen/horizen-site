"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import {
  PROJECT_CATEGORIES,
  filterProjectsByCategory,
  type ProjectFilterCategory,
} from "@/data/projects";

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectFilterCategory>("Todos");

  const filteredProjects = useMemo(
    () => filterProjectsByCategory(activeCategory),
    [activeCategory]
  );

  return (
    <div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-thin">
        {PROJECT_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={[
                "flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-[#0E2433] text-white shadow-sm"
                  : "border border-zinc-200 bg-white text-[#3A3A3A] hover:border-[#F27A0A]/40 hover:text-[#F27A0A]",
              ].join(" ")}
              aria-pressed={isActive}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-600">
          Nenhum projeto encontrado nesta categoria.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
