import { ImageResponse } from "next/og";
import { profile } from "@/content";

/* Картинка генерируется один раз при сборке. */
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.fullName} — портфолио`;

/** Картинка-превью для ссылки на главную: её видно при отправке в мессенджер. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf9",
          color: "#18181b",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {profile.fullName}
          </div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#52525b" }}>
            {profile.intro.join(" · ")}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#71717a" }}>
          Портфолио: проекты, кейсы и результаты
        </div>
      </div>
    ),
    size,
  );
}
