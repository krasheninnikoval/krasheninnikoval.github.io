import { getImageProps } from "next/image";
import { profile } from "@/content";
import { Container } from "./Container";
import { ContactButtons } from "./ContactButtons";
import { TagList } from "./Tag";

/** Блок «Обо мне» — первый экран сайта. */
export function Hero() {
  const mobilePhoto = profile.mobilePhoto ?? profile.photo;
  const imageSizes =
    "(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 25vw";
  const { props: desktopPhotoProps } = getImageProps({
    src: profile.photo.src,
    alt: profile.photo.alt,
    width: profile.photo.width,
    height: profile.photo.height,
    sizes: imageSizes,
    fetchPriority: "high",
  });
  const { props: mobilePhotoProps } = getImageProps({
    src: mobilePhoto.src,
    alt: mobilePhoto.alt,
    width: mobilePhoto.width,
    height: mobilePhoto.height,
    sizes: imageSizes,
    fetchPriority: "high",
  });

  return (
    <section id="about" className="relative">
      {/* Внешний отступ до «Опыта» заметно больше внутреннего — до карточек */}
      <Container className="flex min-h-[100svh] flex-col justify-center pb-28 pt-[86px] sm:pb-36 sm:pt-[102px] lg:pt-32">
        {/* Сетка 12 колонок с межколонником 32px: текст занимает 8, фото — 4 */}
        <div className="grid gap-y-10 sm:gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-8">
          {/* Фотография — слева, 3 колонки, квадрат без обрезки */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-chip lg:aspect-square">
              <picture className="block h-full w-full">
                <source
                  media="(min-width: 1024px)"
                  srcSet={desktopPhotoProps.srcSet ?? desktopPhotoProps.src}
                />
                <img
                  {...mobilePhotoProps}
                  alt={mobilePhoto.alt}
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>

          {/* Текстовая колонка — 9 колонок, по центру фото */}
          <div className="lg:col-span-9">
            <TagList tags={profile.intro} large />
            <h1 className="mt-4 text-[36px] font-medium leading-[1.05] tracking-[-0.03em] sm:mt-5 sm:text-[48px] lg:text-[56px]">
              {profile.fullName}
            </h1>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-[22.4px] text-ink/80 lg:text-[20px] lg:leading-relaxed">
              {profile.tagline}
            </p>

            <div className="mt-12 sm:mt-14">
              <ContactButtons />
            </div>
          </div>
        </div>

        {/* Коротко о главном — карточками на серой подложке */}
        <dl className="mt-10 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {profile.facts.map((fact) => (
            <div
              key={fact.title}
              className="rounded-card bg-chip p-5"
            >
              {/* Заголовку отведено две строки, чтобы тексты в ряду начинались на одной высоте */}
              <dt className="text-[20px] font-medium leading-snug tracking-[-0.01em] text-ink sm:min-h-[2lh] 2xl:text-[22px]">
                {fact.title}
              </dt>
              <dd className="mt-3 text-[14px] leading-[19.6px] text-ink/75 lg:text-[15px] lg:leading-relaxed">
                {fact.text}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
