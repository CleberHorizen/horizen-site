export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Política de Privacidade</h1>
      <p className="mt-4 text-zinc-700">
        A Horizen Soluções respeita a sua privacidade. Esta página descreve, de forma
        geral, como tratamos informações fornecidas por você ao entrar em contato
        conosco.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">1. Coleta de informações</h2>
        <p className="text-zinc-700">
          Podemos coletar informações que você enviar voluntariamente por formulários,
          WhatsApp, e-mail ou outros canais, como nome, telefone, cidade e dados
          relacionados ao seu projeto (ex.: consumo informado por você).
        </p>

        <h2 className="text-xl font-semibold">2. Uso das informações</h2>
        <p className="text-zinc-700">
          As informações são utilizadas para atendimento, elaboração de orçamento,
          estudo de viabilidade, contato e melhoria dos nossos serviços.
        </p>

        <h2 className="text-xl font-semibold">3. Compartilhamento</h2>
        <p className="text-zinc-700">
          Não vendemos seus dados. Podemos compartilhar informações apenas quando
          necessário para execução do serviço (ex.: fornecedores e parceiros), sempre
          com finalidade técnica e operacional.
        </p>

        <h2 className="text-xl font-semibold">4. Segurança</h2>
        <p className="text-zinc-700">
          Adotamos medidas razoáveis para proteger suas informações contra acesso
          não autorizado.
        </p>

        <h2 className="text-xl font-semibold">5. Contato</h2>
        <p className="text-zinc-700">
          Em caso de dúvidas, entre em contato pelo e-mail informado no site.
        </p>

        <p className="pt-6 text-sm text-zinc-500">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </section>
    </main>
  );
}