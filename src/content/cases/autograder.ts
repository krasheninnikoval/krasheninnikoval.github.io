import type { CaseStudy } from "../types";

export const autograder: CaseStudy = {
  slug: "autograder-panel",
  title: "Редизайн интерфейса панели управления",
  cardSummary:
    "В ходе настройки панели на автогрейдере разработчики отметили, что интерфейс не адаптирован к реальным условиям работы. Также у заказчика был запрос на сокращение времени обучения машинистов",
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
    team: "Единственный дизайнер - я, 4 backend (инженеры), 1 frontend, PM",
  },
  lead: [
    "В ходе настройки панели на автогрейдере разработчики отметили, что интерфейс не адаптирован к реальным условиям работы. Также у заказчика был запрос на сокращение времени обучения машинистов",
    "Проанализировала текущее решение, провела глубинное интервью, конкурентный анализ, анализ ЦА, разработала новую стилистику, собрала UI-kit, спроектировала решение, провела юзабилити-тестирование",
  ],
  results: [
    { value: "↓ 37%", label: "время прохождения основных сценариев необученными машинистами" },
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
