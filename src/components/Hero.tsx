import Image from "next/image";
import { profile } from "@/content";
import { Container } from "./Container";
import { ContactButtons } from "./ContactButtons";
import { TagList } from "./Tag";

/** Блок «Обо мне» — первый экран сайта. */
export function Hero() {
  return (
    <section id="about" className="relative">
      <Container className="pb-16 pt-24 sm:pt-28 lg:pt-32">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          {/* Текстовая колонка: на мобильном идёт после фотографии */}
          <div className="order-2 lg:order-1">
            <h1 className="text-[34px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[48px]">
              {profile.fullName}
            </h1>
            <div className="mt-5 sm:mt-6">
              <TagList tags={profile.intro} large />
            </div>

            <div className="mt-9 sm:mt-11">
              <ContactButtons />
            </div>
          </div>

          {/* Фотография */}
          <div className="order-1 lg:order-2 lg:justify-self-end">
            <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-card bg-chip sm:max-w-[320px] lg:w-[360px] lg:max-w-none">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Коротко о главном — в ряд, как результаты у проектов */}
        <dl className="mt-14 grid gap-x-8 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {profile.facts.map((fact) => (
            <div key={fact.title}>
              {/* Заголовку отведено две строки, чтобы тексты в ряду начинались на одной высоте */}
              <dt className="text-[19px] font-medium leading-snug tracking-[-0.01em] text-ink sm:min-h-[2lh] sm:text-[20px]">
                {fact.title}
              </dt>
              <dd className="mt-3 text-[16px] leading-relaxed text-ink/75">
                {fact.text}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
