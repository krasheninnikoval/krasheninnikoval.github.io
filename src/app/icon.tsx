import { ImageResponse } from "next/og";
import { profile } from "@/content";

/* Картинка генерируется один раз при сборке. */
export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Иконка вкладки: монограмма из инициалов. Обновляется вместе с именем в profile.ts. */
export default function Icon() {
  const initials = profile.fullName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18181b",
          color: "#fafaf9",
          fontSize: 30,
          letterSpacing: "-0.02em",
          borderRadius: 14,
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
