import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory text-charcoal">
      <p className="font-mono text-sm tracking-wide">{t("placeholder")}</p>
    </main>
  );
}
