type ToolHeroProps = {
  title: string;
  subtitle: string;
};

export default function ToolHero({ title, subtitle }: ToolHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0E2433] to-black py-14 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.45),transparent_60%)] opacity-70 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-200 sm:text-base md:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
