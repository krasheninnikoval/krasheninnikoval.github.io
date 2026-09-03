import { profile } from "@/content";
import { Container } from "./Container";
import { ArrowUpRightIcon } from "./icons";

const link =
  "group inline-flex items-center gap-1.5 text-ink transition-colors hover:text-muted";

/** Футер с разделом «Связаться». */
export function Footer() {
  return (
    <footer id="contacts" className="scroll-mt-24 border-t border-line">
      <Container className="py-16 sm:py-20">
        <h2 className="text-[15px] font-medium text-muted sm:text-[17px]">
          Связаться
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-block text-[28px] font-medium tracking-[-0.02em] transition-colors hover:text-muted sm:text-[40px]"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
          <a
            href={profile.telegram.url}
            target="_blank"
            rel="noreferrer noopener"
            className={link}
          >
            Telegram
            <ArrowUpRightIcon
              width={15}
              height={15}
              className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={link}
          >
            Резюме, PDF
            <ArrowUpRightIcon
              width={15}
              height={15}
              className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <p className="mt-14 text-sm text-muted">
          {profile.fullName} · {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
