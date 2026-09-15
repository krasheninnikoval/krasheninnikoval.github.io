import Image from "next/image";
import { Fragment } from "react";
import { profile } from "@/content";
import { Container } from "./Container";
import { ContactButtons } from "./ContactButtons";

/** Блок «Обо мне» — первый экран сайта. */
export function Hero() {
  return (
    <section id="about" className="relative">
      <Container className="pb-16 pt-24 sm:pt-28 lg:pt-32">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:items-stretch lg:gap-16">
          {/* Текстовая колонка: на мобильном идёт после фотографии */}
          <div className="order-2 lg:order-1">
            <h1 className="text-[38px] font-medium leading-[1.05] tracking-[-0.03em] text-balance sm:text-[56px] lg:text-[64px]">
              {profile.fullName}
            </h1>
            <p className="mt-5 max-w-[34ch] text-[20px] leading-snug text-balance sm:mt-6 sm:text-[26px]">
              {profile.intro.map((item, index) => (
                <Fragment key={item}>
                  {index > 0 ? (
                    <span className="px-2.5">·</span>
                  ) : null}
                  {item}
                </Fragment>
              ))}
            </p>

            {/* Коротко о главном — сеткой два на два */}
            <dl className="mt-8 grid gap-x-8 gap-y-7 sm:mt-10 sm:grid-cols-2">
              {profile.facts.map((fact) => (
                <div key={fact.title}>
                  {/* Заголовку отведено две строки, чтобы тексты в ряду начинались на одной высоте */}
                  <dt className="text-[17px] font-medium leading-snug tracking-[-0.01em] text-ink sm:min-h-[2lh]">
                    {fact.title}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                    {fact.text}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 sm:mt-11">
              <ContactButtons />
            </div>
          </div>

          {/* Фотография */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-4/5 w-full max-w-[260px] overflow-hidden rounded-card bg-chip sm:max-w-[320px] lg:aspect-auto lg:h-full lg:max-w-none">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
