import { ReactNode } from "react";

export default function Section({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">{children}</div>
    </section>
  );
}