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
        {/* Сетка 12 колонок с межколонником 32px: текст занимает 8, фото — 4 */}
        <div className="grid items-center gap-y-10 sm:gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {/* Фотография — слева, 3 колонки */}
          <div className="lg:col-span-3">
            <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-card bg-chip sm:max-w-[320px] lg:max-w-none">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Текстовая колонка — 9 колонок */}
          <div className="lg:col-span-9">
            <TagList tags={profile.intro} />
            <h1 className="mt-5 text-[34px] font-medium leading-[1.05] tracking-[-0.03em] sm:mt-6 sm:text-[44px] lg:text-[48px]">
              {profile.fullName}
            </h1>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-ink/80 sm:text-[17px]">
              {profile.tagline}
            </p>

            <div className="mt-9 sm:mt-11">
              <ContactButtons />
            </div>
          </div>
        </div>

        {/* Коротко о главном — карточками на серой подложке */}
        <dl className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          {profile.facts.map((fact) => (
            <div
              key={fact.title}
              className="rounded-card bg-chip p-5 lg:col-span-3"
            >
              {/* Заголовку отведено две строки, чтобы тексты в ряду начинались на одной высоте */}
              <dt className="text-[17px] font-medium leading-snug tracking-[-0.01em] text-ink sm:min-h-[2lh]">
                {fact.title}
              </dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-ink/75">
                {fact.text}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
