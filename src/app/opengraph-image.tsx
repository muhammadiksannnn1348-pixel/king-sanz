// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const alt = "M. Iksanuddin (King-Sanz) — Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const [heading, mono] = await Promise.all([
    loadFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.woff"
    ),
    loadFont(
      "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-500-normal.woff"
    ),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 500 | 700;
    style: "normal";
  }[] = [];
  if (heading)
    fonts.push({ name: "Space Grotesk", data: heading, weight: 700, style: "normal" });
  if (mono)
    fonts.push({ name: "JetBrains Mono", data: mono, weight: 500, style: "normal" });

  const line = "2px solid #3a3a3a";

  const corner = (
    pos: Record<string, number>,
    borders: Record<string, string>
  ) => (
    <div
      style={{
        position: "absolute",
        width: 32,
        height: 32,
        display: "flex",
        ...pos,
        ...borders,
      }}
    />
  );

  // Cincin orbit: garis solid tipis (murah untuk kompresi PNG)
  const ring = (d: number, color: string) => (
    <div
      style={{
        position: "absolute",
        width: d,
        height: d,
        borderRadius: 9999,
        border: `2px solid ${color}`,
        display: "flex",
      }}
    />
  );

  const sideLabel = {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    fontFamily: "JetBrains Mono",
    fontSize: 22,
    letterSpacing: 3,
    color: "#7a7a7a",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Cincin orbit */}
        {ring(420, "#262626")}
        {ring(640, "#1a1a1a")}
        {ring(860, "#131313")}

        {/* Corner marks */}
        {corner({ top: 36, left: 36 }, { borderTop: line, borderLeft: line })}
        {corner({ top: 36, right: 36 }, { borderTop: line, borderRight: line })}
        {corner({ bottom: 36, left: 36 }, { borderBottom: line, borderLeft: line })}
        {corner({ bottom: 36, right: 36 }, { borderBottom: line, borderRight: line })}

        {/* Elemen kiri */}
        <div style={{ ...sideLabel, position: "absolute", left: 72, top: 258 }}>
          <span style={{ color: "#ffffff" }}>01</span>
          <div style={{ width: 36, height: 2, background: "#3a3a3a", display: "flex" }} />
          <span>PORTFOLIO</span>
        </div>

        {/* Elemen kanan */}
        <div
          style={{
            ...sideLabel,
            position: "absolute",
            right: 72,
            top: 258,
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#ffffff",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#22c55e",
                display: "flex",
              }}
            />
            <span>OPEN</span>
          </div>
          <div style={{ width: 36, height: 2, background: "#3a3a3a", display: "flex" }} />
          <span>TO WORK</span>
        </div>

        {/* Teks tengah */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Space Grotesk",
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            M.IKSANUDDIN
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 36,
              padding: "14px 30px",
              borderRadius: 9999,
              border: "2px solid #2e2e2e",
              background: "#141414",
              fontFamily: "JetBrains Mono",
              fontSize: 26,
              color: "#d4d4d4",
              letterSpacing: 1,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#22c55e",
                display: "flex",
              }}
            />
            <span>Full Stack Web Developer</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: 8,
              color: "#666666",
            }}
          >
            Software Engineer
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}