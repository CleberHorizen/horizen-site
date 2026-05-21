type ResultCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export default function ResultCard({ label, value, highlight }: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 ${
        highlight
          ? "border-[#F27A0A]/40 bg-gradient-to-br from-[#0F172A] to-[#0E2433] text-white shadow-lg"
          : "border-zinc-200 bg-white shadow-sm"
      }`}
    >
      <div
        className={`text-xs font-medium uppercase tracking-wide ${
          highlight ? "text-zinc-300" : "text-zinc-500"
        }`}
      >
        {label}
      </div>
      <div
        className={`mt-2 text-xl font-extrabold sm:text-2xl ${
          highlight ? "text-[#F27A0A]" : "text-[#0E2433]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
