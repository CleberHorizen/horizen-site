import Image from "next/image";
import Section from "@/components/Section";
import CtaWhatsApp from "@/components/CtaWhatsApp";
import { COMPANY, getWhatsAppSolarLink, getWhatsAppEngenhariaLink } from "@/lib/constants";

// IMPORTANTE: Coloque o arquivo logo.png em /public/logo.png
// O logo será exibido no header com dimensões 44x44px

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="w-full border-b bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#home" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Horizen Soluções"
              width={44}
              height={44}
              priority
              className="h-11 w-11 rounded"
            />
            <div className="leading-tight hidden sm:block">
              <div className="text-sm font-semibold text-[#3A3A3A]">{COMPANY.name}</div>
              <div className="text-xs text-zinc-500">{COMPANY.tagline}</div>
            </div>
            <div className="leading-tight sm:hidden">
              <div className="text-sm font-semibold text-[#3A3A3A]">{COMPANY.name}</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <a href="#home" className="text-sm font-medium text-[#3A3A3A] hover:text-[#F27A0A] transition">
              Home
            </a>
            <a href="#servicos" className="text-sm font-medium text-[#3A3A3A] hover:text-[#F27A0A] transition">
              Serviços
            </a>
            <a href="#contato" className="text-sm font-medium text-[#3A3A3A] hover:text-[#F27A0A] transition">
              Contato
            </a>
          </nav>

          <div className="flex items-center flex-shrink-0">
            <CtaWhatsApp
              label="Falar com engenheiro"
              variant="outline"
              href={`https://wa.me/5514997936983`}
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-5xl">
              Energia solar e engenharia elétrica com alto padrão e segurança.
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base md:text-lg">
              Atendemos Piraju-SP e região com soluções completas em energia solar, automação, projetos elétricos de Baixa e Média Tensão e homologação na concessionária de energia elétrica — do estudo à entrega final.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CtaWhatsApp
                label="Orçamento Solar"
                variant="primary"
                fullWidth
                href={getWhatsAppSolarLink()}
              />
              <CtaWhatsApp
                label="Outros Serviços de Engenharia"
                variant="outline"
                fullWidth
                href={getWhatsAppEngenhariaLink()}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-zinc-700 sm:grid-cols-2">
              <div className="rounded-md border border-zinc-200 p-3">
                <div className="font-semibold text-zinc-900">Projeto completo e homologação</div>
                <div className="mt-1 text-zinc-600">Dimensionamento técnico, kit gerador, documentação, aprovação na concessionária, instalação e comissionamento do sistema.</div>
              </div>
              <div className="rounded-md border border-zinc-200 p-3">
                <div className="font-semibold text-zinc-900">Entrega com padrão</div>
                <div className="mt-1 text-zinc-600">Projeto, documentação e execução alinhados.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <Section id="servicos" className="border-t bg-white">
        <h2 className="text-2xl font-extrabold">Serviços</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Soluções completas com foco em segurança, desempenho e conformidade técnica.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Venda de Kits Geradores de energia solar de alta performance",
              desc: "Kits dimensionados tecnicamente para eficiência, durabilidade e segurança elétrica."
            },
            {
              title: "Projeto, homologação e instalação de energia solar",
              desc: "Do estudo de viabilidade à energização: projeto, documentação, aprovação e execução."
            },
            {
              title: "Consultoria técnica",
              desc: "Análises, diagnósticos, validações e direcionamento técnico para tomada de decisão."
            },
            {
              title: "Projetos elétricos de BT/MT",
              desc: "Projeto executivo, diagramas, memoriais, especificações e adequação normativa."
            },
            {
              title: "Posto de transformação e medição para pivôs de irrigação",
              desc: "Projeto e homologação para área rural: padrão, proteção, medição e tramitação na concessionária."
            },
            {
              title: "Soluções em automação (residencial, comercial e industrial)",
              desc: "Automação para controle, eficiência operacional e confiabilidade."
            }
          ].map((s) => (
            <div key={s.title} className="rounded-xl border border-zinc-200 p-4 sm:p-5 hover:bg-zinc-50">
              <div className="text-base font-bold">{s.title}</div>
              <div className="mt-2 text-sm text-zinc-700">{s.desc}</div>
            </div>
          ))}
        </div>

      </Section>

      {/* Diferenciais */}
      <Section className="border-t bg-zinc-50">
        <h2 className="text-2xl font-extrabold">Por que a Horizen</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Engenharia e responsabilidade técnica",
              desc: "Decisões baseadas em critérios técnicos — não apenas comerciais. São mais de 17 anos de experiência em geração de energia elétrica (Termelétrica, Hidrelétrica e Solar)"
            },
            {
              title: "Conformidade com normas e concessionárias",
              desc: "Documentação e execução alinhadas às exigências e boas práticas."
            },
            {
              title: "Atendimento direto e acompanhamento real",
              desc: "Suporte do início ao fim, com transparência e orientação."
            }
          ].map((d) => (
            <div key={d.title} className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
              <div className="font-bold">{d.title}</div>
              <div className="mt-2 text-sm text-zinc-700">{d.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
          <div className="text-lg font-extrabold">Quer saber a melhor solução para o seu caso?</div>
          <p className="mt-2 text-sm text-zinc-700">
            Clique abaixo e envie os dados. Eu retorno com o direcionamento técnico.
          </p>
          <div className="mt-4">
            <CtaWhatsApp label="Solicitar Estudo de Viabilidade Agora" />
          </div>
        </div>
      </Section>

      {/* Atuações Regionais */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1f1f1f]">
              Atuação em Piraju e Região
            </h2>

            <p className="mt-4 text-zinc-700">
              A Horizen Soluções atende Piraju/SP e cidades da região sudoeste paulista e norte do Paraná,
              oferecendo energia solar, projetos elétricos BT/MT, homologação junto à concessionária e soluções
              em automação com responsabilidade técnica e conformidade normativa.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-zinc-700 md:grid-cols-3">
              <div>Piraju/SP</div>
              <div>Fartura/SP</div>
              <div>Timburi/SP</div>
              <div>Sarutaia/SP</div>
              <div>Tejupá/SP</div>
              <div>Taguaí/SP</div>
              <div>Taquarituba/SP</div>
              <div>Itaí/SP</div>
              <div>Paranapanema/SP</div>
              <div>Holambra/SP</div>
              <div>Cerqueira César/SP</div>
              <div>Arandu/SP</div>
              <div>Avaré/SP</div>
              <div>Águas de Santa Bárbara/SP</div>
              <div>Manduri/SP</div>
              <div>Óleo/SP</div>
              <div>Bernardino de Campos/SP</div>
              <div>Santa Cruz do Rio Pardo/SP</div>
              <div>Ipaussu/SP</div>
              <div>Chavantes/SP</div>
              <div>Canitar/SP</div>
              <div>Ourinhos/SP</div>
              <div>Ribeirão Claro/PR</div>
              <div>Cambará/PR</div>
              <div>Andirá/PR</div>
              <div>Bandeirantes/PR</div>
            </div>

            <p className="mt-8 text-sm text-zinc-600">
              Caso sua cidade não esteja listada, entre em contato. Avaliamos atendimento em toda a região.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3 md:items-baseline">
            {/* Coluna 1 */}
            <div>
              <div className="text-sm font-semibold text-[#3A3A3A]">Horizen Soluções</div>
              <div className="mt-3 text-sm text-zinc-600">
                Engenharia Elétrica • Energia Solar • Automação
              </div>
              <div className="mt-3 text-sm text-zinc-600">
                Atendimento nacional • Matriz: Piraju/SP
              </div>
              <div className="mt-3 text-sm text-zinc-600">
                CNPJ: 41.470.700/0001-27
              </div>
            </div>

            {/* Coluna 2 */}
            <div>
              <div className="text-sm font-semibold text-[#3A3A3A]">Contato</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                <li>
                  <a className="underline hover:text-zinc-900" href="https://wa.me/5514997936983" target="_blank" rel="noreferrer">
                    WhatsApp: (14) 99793-6983
                  </a>
                </li>
                <li>
                  <a className="underline hover:text-zinc-900" href="mailto:contato@horizen.com" target="_blank" rel="noreferrer">
                    comercial@horizen.com.br
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 */}
            <div>
              <div className="text-sm font-semibold text-[#3A3A3A]">Links</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                <li><a className="underline hover:text-zinc-900" href="#servicos">Serviços</a></li>
                <li><a className="underline hover:text-zinc-900" href="#">Política de Privacidade</a></li>
                <li className="flex gap-4 pt-2">
                  <a
                    className="underline hover:text-zinc-900"
                    href="https://www.instagram.com/horizensolucoes?igsh=MXJwaXRzODhoYzNmdQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>

                  <a
                    className="underline hover:text-zinc-900"
                    href="https://www.facebook.com/HorizenSolucoes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>

                  <a
                    className="underline hover:text-zinc-900"
                    href="https://www.linkedin.com/in/horizen-energia-solar-engenharia-civil-e-eletrica-581b86246/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a>

                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Horizen Soluções. Todos os direitos reservados.</div>
            <div>Engenharia • Conformidade • Alto padrão</div>
          </div>
        </div>
      </footer>
    </main>
  );
}