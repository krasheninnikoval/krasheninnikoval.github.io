import type { Profile } from "./types";

/* ЗАГЛУШКА. Заменяется на реальные данные, когда придут материалы. */
export const profile: Profile = {
  fullName: "Крашенинникова Любовь",
  role: "Продуктовый дизайнер",
  tagline:
    "Продуктовый дизайнер с опытом 3+ года в сложных B2B- и B2C-системах",
  photo: {
    src: "/images/profile.jpg",
    alt: "Крашенинникова Любовь",
    width: 1400,
    height: 1750,
  },
  telegram: { handle: "@username", url: "https://t.me/username" },
  email: "hello@example.com",
  resumeUrl: "/resume.pdf",
};
