import type { CaseStudy } from "../types";

/* ЗАГОТОВКА. Тексты и картинки появятся позже,
   пока на странице стоят серые заглушки. */
export const lowcode: CaseStudy = {
  slug: "lowcode-builder",
  title: "Кейс в работе",
  cardSummary: "дополнить описанием кейса",
  preview: {
    src: "/images/placeholder/content-16-10.png",
    alt: "Здесь будет обложка кейса",
    width: 1600,
    height: 1000,
  },
  meta: {
    team: "Команда из трёх дизайнеров",
  },
  results: [],
  blocks: [
    {
      type: "text",
      placeholder: true,
      paragraphs: ["скоро здесь будет подробное описание кейса"],
    },
    {
      type: "text",
      heading: "Контекст",
      placeholder: true,
      hidden: true,
      paragraphs: ["дополнить контекстом"],
    },
    {
      type: "text",
      heading: "Исследование",
      placeholder: true,
      hidden: true,
      paragraphs: ["дополнить исследованием"],
    },
    {
      type: "text",
      heading: "Проектирование",
      placeholder: true,
      hidden: true,
      paragraphs: ["дополнить текстом и картинками"],
    },
    {
      type: "text",
      heading: "Решение",
      placeholder: true,
      hidden: true,
      paragraphs: ["дополнить тем, что изменилось в интерфейсе"],
    },
    {
      type: "text",
      heading: "Результаты",
      placeholder: true,
      hidden: true,
      paragraphs: ["дополнить результатами"],
    },
    {
      type: "text",
      heading: "Что бы сделала иначе",
      placeholder: true,
      hidden: true,
      paragraphs: ["дополнить рефлексией"],
    },
    {
      type: "text",
      heading: "Чему научилась",
      placeholder: true,
      hidden: true,
      paragraphs: ["дополнить рефлексией"],
    },
  ],
};
