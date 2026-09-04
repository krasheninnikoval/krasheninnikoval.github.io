/* ─────────────────────────────────────────────────────────────
   Микротипографика: убираем висячие предлоги, союзы и частицы.
   Между коротким словом и следующим ставится неразрывный пробел —
   строка не может закончиться на «в», «и», «для», на числе или тире.
   Применяется автоматически ко всем текстам сайта (см. content/index.ts).
   ───────────────────────────────────────────────────────────── */

const NBSP = " ";

/** Предлоги и союзы длиной три буквы, которые тоже не оставляем в конце строки. */
const SHORT_WORDS = ["для", "при", "над", "под", "про", "без", "изо", "ото"];

/**
 * Словосочетания и слова, которые нельзя разрывать переносом.
 * Внутри них пробелы заменяются неразрывными, а дефис — неразрывным дефисом.
 * Список пополняется по мере появления таких названий.
 */
const KEEP_TOGETHER = ["Telegram Mini App", "UX-текстам"];

const NB_HYPHEN = "‑";

export function typo(text: string): string {
  if (!text.includes(" ") && !text.includes("-")) return text;

  let result = text;

  for (const phrase of KEEP_TOGETHER) {
    if (!result.includes(phrase)) continue;
    const glued = phrase
      .replaceAll(" ", NBSP)
      .replaceAll("-", NB_HYPHEN);
    result = result.replaceAll(phrase, glued);
  }

  /* Слова из одной-двух букв прилипают к следующему слову.
     Проходим дважды — на случай двух коротких слов подряд («и в поле»). */
  for (let pass = 0; pass < 2; pass++) {
    result = result.replace(
      /(^|[\s(«"' —–])([А-Яа-яЁёA-Za-z]{1,2}) /g,
      `$1$2${NBSP}`,
    );
  }

  /* Трёхбуквенные предлоги из списка */
  const shortWords = new RegExp(
    `(^|[\\s(«"'\\u00A0])(${SHORT_WORDS.join("|")}) `,
    "gi",
  );
  result = result.replace(shortWords, `$1$2${NBSP}`);

  /* Частицы прилипают к предыдущему слову */
  result = result.replace(/ (бы|ли|ль|же)(?=[\s.,!?;:)]|$)/g, `${NBSP}$1`);

  /* Тире не начинает строку: неразрывный пробел перед ним */
  result = result.replace(/ ([—–]) /g, `${NBSP}$1 `);

  /* Число не отрывается от того, что за ним: «11 филиалов», «1,5 млн» */
  result = result.replace(/(\d) (?=[А-Яа-яЁёA-Za-z%])/g, `$1${NBSP}`);

  return result;
}

/**
 * Поля, которые типографике не подлежат: это не текст для чтения,
 * а технические строки. Неразрывный пробел сломал бы их.
 */
const SKIP_KEYS = new Set([
  "arrowPath",
  "src",
  "slug",
  "url",
  "resumeUrl",
  "email",
  "handle",
]);

/** Рекурсивно применяет typo ко всем текстовым строкам объекта или массива. */
export function deepTypo<T>(value: T): T {
  if (typeof value === "string") return typo(value) as T;
  if (Array.isArray(value)) return value.map((item) => deepTypo(item)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = SKIP_KEYS.has(key) ? item : deepTypo(item);
    }
    return out as T;
  }
  return value;
}
