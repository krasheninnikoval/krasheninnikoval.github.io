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
  /** Подпись под картинкой (необязательно) */
  caption?: string;
}

/** Показатель результата: крупная цифра + подпись под ней. */
export interface Metric {
  value: string;
  label: string;
}

/** Блоки, из которых собирается тело кейса. Порядок и состав — любые. */
export type CaseBlock =
  | { type: "text"; heading?: string; paragraphs: string[] }
  | {
      type: "textImage";
      heading?: string;
      paragraphs: string[];
      image: ImageRef;
      /** true — картинка шире колонки текста */
      wide?: boolean;
    }
  | { type: "image"; image: ImageRef; wide?: boolean }
  | { type: "gallery"; heading?: string; images: ImageRef[] }
  | { type: "list"; heading?: string; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "metrics"; heading?: string; items: Metric[] }
  | { type: "divider" };

export interface CaseStudy {
  /** Часть адреса страницы: /cases/<slug>. Латиницей, через дефис. */
  slug: string;
  title: string;
  /** 1–2 предложения о результатах — показывается на карточке */
  cardSummary: string;
  /** Превью для карточки на главной, горизонтальное 16:10 */
  preview: ImageRef;
  /** Широкая обложка в шапке страницы кейса (необязательно) */
  cover?: ImageRef;
  /**
   * Обложка-композиция: фотография контекста и экран интерфейса поверх неё.
   * Если задана, используется вместо cover и вместо превью на карточке.
   */
  coverPair?: {
    photo: ImageRef;
    screen: ImageRef;
    /**
     * Пояснительная дуга поверх композиции: путь SVG в системе координат
     * 1000×315 (ширина блока × высота нижней картинки). Необязательна.
     */
    arrowPath?: string;
  };
  meta: {
    timeline: string;
    team: string;
    product: string;
  };
  /** Ключевые результаты в шапке кейса, 2–5 штук */
  results: Metric[];
  blocks: CaseBlock[];
}

export interface Project {
  slug: string;
  title: string;
  /** Компания, в штате которой велась работа — необязательно */
  company?: string;
  /** Заказчик, для которого делался продукт — необязательно */
  client?: string;
  /** Сроки работы над проектом — необязательно */
  period?: string;
  description: string;
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
  /** Тэги под именем: специализация, опыт, образование */
  tags: string[];
  /** Абзацы с описанием опыта под тэгами */
  summary: string[];
  photo: ImageRef;
  telegram: { handle: string; url: string };
  email: string;
  resumeUrl: string;
}
