import Link from "next/link";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowLeftIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center">
        <Container className="py-32 text-center">
          <p className="text-sm text-muted">404</p>
          <h1 className="mt-4 text-[32px] font-medium tracking-[-0.02em] sm:text-[44px]">
            Страница не найдена
          </h1>
          <p className="mx-auto mt-4 max-w-[46ch] text-[17px] leading-relaxed text-muted">
            Возможно, страница переехала или в адресе опечатка.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[15px] text-bg transition-opacity hover:opacity-85"
          >
            <ArrowLeftIcon width={16} height={16} />
            На главную
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
