import { getWhatsAppSolarLink } from "@/lib/constants";

type Props = {
  label: string;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  href?: string;
};

export default function CtaWhatsApp({ label, variant = "primary", fullWidth, href }: Props) {
  const link = href || getWhatsAppSolarLink();

  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition";
  const primary = "bg-[#F27A0A] text-white hover:opacity-90";
  const outline = "border border-zinc-300 text-[#3A3A3A] hover:bg-zinc-50";
  const width = fullWidth ? "w-full" : "";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={[base, variant === "primary" ? primary : outline, width].join(" ")}
    >
      {label}
    </a>
  );
}