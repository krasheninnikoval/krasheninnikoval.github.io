import type { Profile } from "./types";

/* ЗАГЛУШКА. Заменяется на реальные данные, когда придут материалы. */
export const profile: Profile = {
  fullName: "Крашенинникова Любовь",
  role: "Продуктовый дизайнер",
  tagline: "Продуктовый дизайнер, 3+ года опыта",
  summary:
    "Год в продукте (low-code платформа), два в заказной разработке — единственный дизайнер на трёх проектах подряд: промышленное ПО, B2B-система заявок, медицинский сайт. Легко погружаюсь в новые предметные области и выстраиваю дизайн-процесс с нуля",
  photo: {
    src: "/images/profile.jpg",
    alt: "Крашенинникова Любовь",
    width: 1400,
    height: 1750,
  },
  telegram: {
    handle: "@krasheninnikovalm",
    url: "https://t.me/krasheninnikovalm",
  },
  email: "klm1302@yandex.ru",
  resumeUrl: "/Krasheninnikova-Lyubov-resume.pdf",
};
