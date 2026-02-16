import { getWhatsAppSolarLink } from "@/lib/constants";

type Props = {
  label: string;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  href?: string;
  tone?: "light" | "dark";
};

export default function CtaWhatsApp({
  label,
  variant = "primary",
  fullWidth,
  href,
  tone = "light"
}: Props) {
  const link = href || getWhatsAppSolarLink();

  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition";
  const primary = "bg-[#F27A0A] text-white hover:opacity-90";
  const outlineLight = "border border-zinc-300 text-[#3A3A3A] hover:bg-zinc-50";
  const outlineDark =
    "bg-transparent border border-[rgba(255,255,255,0.6)] text-[rgba(255,255,255,0.9)] hover:bg-white hover:text-[#0b1f2e] transition-colors duration-300 ease-out";
  const width = fullWidth ? "w-full" : "";
  const variantClass =
    variant === "primary" ? primary : tone === "dark" ? outlineDark : outlineLight;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={[base, variantClass, width].join(" ")}
    >
      {label}
    </a>
  );
}