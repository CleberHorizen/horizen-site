import Link from "next/link";

const tools = [
  {
    title: "Calculadora de Consumo",
    description:
      "Descubra quanto seus equipamentos consomem por mês e veja onde sua conta de energia pesa mais.",
    href: "/calculadora-consumo",
    cta: "Calcular meu consumo",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Simulador Solar",
    description:
      "Estime o tamanho do sistema solar ideal para reduzir sua conta de energia.",
    href: "/simulador-solar",
    cta: "Simular sistema solar",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
];

export default function ToolsHomeSection() {
  return (
    <section className="border-t bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <h2 className="text-2xl font-extrabold text-[#0E2433]">Ferramentas gratuitas</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Simule seu consumo ou dimensione um sistema solar em poucos minutos — sem cadastro.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <div
              key={tool.href}
              className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-[#F27A0A]/30 hover:shadow-md sm:p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0E2433] text-[#F27A0A]">
                {tool.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0E2433]">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm text-zinc-700">{tool.description}</p>
              <Link
                href={tool.href}
                className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-[#F27A0A] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
              >
                {tool.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
