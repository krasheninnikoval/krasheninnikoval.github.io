import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Сайт собирается в набор обычных файлов — так его умеет отдавать GitHub Pages. */
  output: "export",
  /* Адреса со слэшем на конце: /cases/имя/ — надёжнее для статического хостинга. */
  trailingSlash: true,
  images: {
    /* На GitHub Pages нет сервера, который сжимает картинки на лету,
       поэтому изображения отдаются как есть — их размеры уменьшены заранее. */
    unoptimized: true,
  },
};

export default nextConfig;
