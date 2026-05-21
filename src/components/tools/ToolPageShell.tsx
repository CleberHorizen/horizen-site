import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { COMPANY } from "@/lib/constants";

export default function ToolPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-2 transition hover:opacity-80 sm:gap-3"
          >
            <Image
              src="/logo.png"
              alt="Horizen Soluções"
              width={44}
              height={44}
              className="h-11 w-11 rounded"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-[#3A3A3A]">{COMPANY.name}</div>
              <div className="hidden text-xs text-zinc-500 sm:block">{COMPANY.tagline}</div>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#3A3A3A] transition hover:text-[#F27A0A]"
          >
            Voltar ao site
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-zinc-600">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. Engenharia • Conformidade • Alto padrão
          </p>
          <p className="mt-2">
            <Link href="/" className="underline hover:text-zinc-900">
              Página inicial
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
