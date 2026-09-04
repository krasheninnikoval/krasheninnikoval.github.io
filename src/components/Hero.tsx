import Image from "next/image";
import { profile } from "@/content";
import { Container } from "./Container";
import { ContactButtons } from "./ContactButtons";
import { TagList } from "./Tag";

/** Блок «Обо мне» — первый экран сайта. */
export function Hero() {
  return (
    <section id="about" className="relative">
      <Container className="flex flex-col justify-center pb-16 pt-24 sm:pt-28 lg:min-h-[100svh] lg:py-24">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:gap-16">
          {/* Текстовая колонка: на мобильном идёт после фотографии */}
          <div className="order-2 lg:order-1">
            <h1 className="text-[38px] font-medium leading-[1.05] tracking-[-0.03em] text-balance sm:text-[56px] lg:text-[64px]">
              {profile.fullName}
            </h1>
            <div className="mt-6 sm:mt-7">
              <TagList tags={profile.tags} large />
            </div>

            <div className="mt-5 max-w-[52ch] space-y-4 text-[17px] leading-relaxed text-muted sm:mt-6">
              {profile.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 sm:mt-11">
              <ContactButtons />
            </div>
          </div>

          {/* Фотография */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-4/5 w-full max-w-[260px] overflow-hidden rounded-card bg-chip sm:max-w-[320px] lg:max-w-none">
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
