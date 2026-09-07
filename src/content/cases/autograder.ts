import type { CaseStudy } from "../types";

export const autograder: CaseStudy = {
  slug: "autograder-panel",
  title: "Редизайн интерфейса",
  cardSummary:
    "В кейсе вся работа над проектом: исследование, проектирование, тестирование, рефлексия",
  preview: {
    src: "/images/cases/autograder/nivelirovanie.png",
    alt: "Экран запуска системы 2D-нивелирования на панели автогрейдера",
    width: 1920,
    height: 1080,
  },
  coverPair: {
    arrowPath: "M400 206 C 326 206, 208 168, 157 64",
    photo: {
      src: "/images/cases/autograder/cabin.jpg",
      alt: "Кабина автогрейдера с сенсорной панелью",
      width: 1200,
      height: 675,
    },
    screen: {
      src: "/images/cases/autograder/nivelirovanie.png",
      alt: "Экран запуска системы 2D-нивелирования",
      width: 1920,
      height: 1080,
    },
  },
  meta: {
    timeline: "сентябрь 2024 – март 2025",
    team: "Единственный дизайнер в команде разработки",
    product: "Встроенный сенсорный интерфейс спецтехники, B2B",
  },
  results: [
    { value: "↓ 37%", label: "время прохождения основных сценариев" },
    { value: "↓ 95%", label: "ошибок эксплуатации" },
  ],
  blocks: [
    {
      type: "text",
      heading: "Контекст",
      /* ВРЕМЕННО: место под текст, пока он не написан. */
      placeholder: true,
      paragraphs: ["дополнить контекстом"],
    },
    {
      type: "text",
      heading: "Исследование",
      placeholder: true,
      paragraphs: ["дополнить исследованием"],
    },
    {
      type: "text",
      heading: "Проектирование",
      placeholder: true,
      paragraphs: ["дополнить текстом и картинками"],
    },
    {
      type: "text",
      heading: "Решение",
      placeholder: true,
      paragraphs: ["дополнить тем, что изменилось в интерфейсе"],
    },
    {
      type: "text",
      heading: "Тестирование",
      placeholder: true,
      paragraphs: ["дополнить юзабилити-тестом"],
    },
    {
      type: "text",
      heading: "Результаты",
      placeholder: true,
      paragraphs: ["дополнить результатами"],
    },
    {
      type: "text",
      heading: "Что бы сделала иначе",
      placeholder: true,
      paragraphs: ["дополнить рефлексией"],
    },
    {
      type: "text",
      heading: "Чему научилась",
      placeholder: true,
      paragraphs: ["дополнить рефлексией"],
    },
  ],
};
