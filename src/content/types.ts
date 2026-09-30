/* ─────────────────────────────────────────────────────────────
   Описание структуры контента.
   Это «форма», в которую укладываются тексты сайта. Если где-то
   пропустить обязательное поле или опечататься в названии — сборка
   упадёт с понятной ошибкой ещё до публикации.
   ───────────────────────────────────────────────────────────── */

/** Картинка. width/height нужны, чтобы страница не «прыгала» при загрузке. */
export interface ImageRef {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Короткие подписи поверх изображения, координаты заданы в процентах. */
  overlayLabels?: { text: string; left: number; top: number }[];
  /** Подпись под картинкой (необязательно) */
  caption?: string;
}

/** Показатель результата: крупная цифра + подпись под ней. */
export interface Metric {
  value: string;
  label: string;
}

/** Блоки, из которых собирается тело кейса. Порядок и состав — любые. */
/** Пункт списка: обычная строка или «выделенное начало + пояснение». */
export type ListItem = string | { term: string; text: string };

export type CaseBlock =
  | {
      type: "text";
      heading?: string;
      sub?: boolean;
      /** Временный текст: серым, пока блок не написан */
      placeholder?: boolean;
      /** Заготовка: остаётся в файле, но на странице не показывается */
      hidden?: boolean;
      paragraphs: string[];
    }
  | {
      type: "textImage";
      heading?: string;
      paragraphs: string[];
      image: ImageRef;
      /** true — картинка шире колонки текста */
      wide?: boolean;
    }
  | { type: "image"; heading?: string; image: ImageRef; wide?: boolean }
  | { type: "gallery"; heading?: string; images: ImageRef[] }
  | { type: "carousel"; images: ImageRef[]; wide?: boolean }
  | {
      type: "list";
      heading?: string;
      /** Заголовок второго уровня: блок подчинён предыдущему разделу */
      sub?: boolean;
      /** Абзацы перед списком */
      paragraphs?: string[];
      ordered?: boolean;
      items: ListItem[];
    }
  | { type: "quote"; text: string; author?: string }
  | { type: "metrics"; heading?: string; items: Metric[] }
  | { type: "divider" };

/** Композиция из двух картинок с нахлёстом и пояснительной дугой. */
export interface CoverPair {
  photo: ImageRef;
  screen: ImageRef;
  /**
   * Пояснительная дуга поверх композиции: путь SVG в системе координат
   * 1000×315 (ширина блока × высота нижней картинки). Необязательна.
   */
  arrowPath?: string;
}

/** Две пары экранов для обложки, показывающей состояние до и после. */
export interface CoverComparison {
  before: [ImageRef, ImageRef];
  after: [ImageRef, ImageRef];
}

export interface CaseStudy {
  /** Часть адреса страницы: /cases/<slug>. Латиницей, через дефис. */
  slug: string;
  /**
   * Кейс временно спрятан: карточка не показывается ни в разделе «Опыт»,
   * ни в блоке «Другие кейсы». Сама страница кейса при этом остаётся
   * доступной по прямой ссылке.
   */
  hidden?: boolean;
  title: string;
  /** Отдельный заголовок только для карточки — например, пока кейс в работе. */
  cardTitle?: string;
  /** 1–2 предложения о результатах — показывается на карточке */
  cardSummary: string;
  /** Компактная строка результата только для карточки; метрики кейса не заменяет */
  cardResult?: string;
  /** Превью для карточки на главной, горизонтальное 16:10 */
  preview: ImageRef;
  /** Обычное превью занимает всю ширину карточки как эталонная обложка. */
  cardPreviewEdgeToEdge?: boolean;
  /** Вместо временной картинки карточка показывает ровную подложку stage. */
  cardPreviewPlaceholder?: boolean;
  /** Широкая обложка в шапке страницы кейса (необязательно) */
  cover?: ImageRef;
  /**
   * Обложка-композиция: фотография контекста и экран интерфейса поверх неё.
   * Если задана, используется вместо cover и вместо превью на карточке.
   */
  coverPair?: CoverPair;
  /** Обложка-сравнение: исходные и финальные экраны интерфейса. */
  coverComparison?: CoverComparison;
  meta: {
    /** Сроки — необязательно */
    timeline?: string;
    team: string;
    /** Классификация продукта — необязательно */
    product?: string;
  };
  /** Свои тэги кейса — добавляются к тэгам проекта в его шапке */
  tags?: string[];
  /** Ключевые результаты в шапке кейса, 2–5 штук */
  results: Metric[];
  /** Краткие итоги: крупная часть и пояснение под ней */
  highlights?: { title: string; text?: string }[];
  /** Абзацы-вступление между шапкой и обложкой — необязательно */
  lead?: string[];
  blocks: CaseBlock[];
}

export interface Project {
  slug: string;
  /** Проект уходит в нижнюю группу «Другие проекты» — те, у которых нет кейса */
  secondary?: boolean;
  /** Результаты стоят колонкой рядом с описанием, а не под тэгами */
  resultsAside?: boolean;
  title: string;
  /** Компания, в штате которой велась работа — необязательно */
  company?: string;
  /** Заказчик, для которого делался продукт — необязательно */
  client?: string;
  /** Название продукта — необязательно */
  product?: string;
  /** Сроки работы над проектом — необязательно */
  period?: string;
  /** Описание проекта: строка или несколько абзацев */
  description: string | string[];
  /** Что сделала — нумерованным списком под описанием */
  descriptionList?: string[];
  /** Иллюстрации рядом с описанием — для проектов без кейса */
  media?: {
    /** Композиция из двух картинок с нахлёстом, как на обложке кейса */
    pair?: CoverPair;
    /** Одна или несколько картинок в ряд */
    images?: ImageRef[];
    /** Нейтральная заглушка вместо материалов, которые нельзя показывать */
    notice?: string;
    /** Высокие интерфейсные экраны: три в ряд на desktop, лента на mobile */
    presentation?: "screens";
  };
  tags: string[];
  results: Metric[];
  /**
   * Кейсы проекта. Сейчас на главной показывается первый —
   * это ровно то «максимум один кейс на проект», о котором договорились.
   * Список оставлен списком, чтобы позже включить второй кейс без переделки вёрстки.
   */
  cases: CaseStudy[];
}

export interface Profile {
  fullName: string;
  /** Короткая должность — используется в заголовке вкладки и разметке для поисковиков */
  role: string;
  /** Одна фраза под именем — чем занимаюсь */
  tagline: string;
  /** Тэги под фразой: специализация и опыт */
  intro: string[];
  /** Короткие блоки под первым экраном: опыт, образование, AI, цель */
  facts: { title: string; text: string }[];
  photo: ImageRef;
  telegram: { handle: string; url: string };
  email: string;
  resumeUrl: string;
}
