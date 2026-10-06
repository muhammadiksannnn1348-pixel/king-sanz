// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "M. Iksanuddin (King-Sanz) — Full Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [heading, mono] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.woff"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-500-normal.woff"
    ).then((r) => r.arrayBuffer()),
  ]);

  // Tanda siku di pojok (corner marks)
  const corner = (pos: Record<string, number>, borders: Record<string, string>) => (
    <div
      style={{
        position: "absolute",
        width: 28,
        height: 28,
        display: "flex",
        ...pos,
        ...borders,
      }}
    />
  );
  const line = "1px solid #3a3a3a";

  // Cincin orbit di belakang teks
  const ring = (d: number, o: number) => (
    <div
      style={{
        position: "absolute",
        width: d,
        height: d,
        borderRadius: 9999,
        border: `1px solid rgba(255,255,255,${o})`,
        display: "flex",
      }}
    />
  );

  const sideLabel = {
    display: "flex",
    flexDirection: "column" as const,
    gap: 10,
    fontFamily: "JetBrains Mono",
    fontSize: 20,
    letterSpacing: 3,
    color: "#6b6b6b",
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
          background: "#050505",
          position: "relative",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, #161616 1px, transparent 1px), linear-gradient(to bottom, #161616 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            backgroundPosition: "center center",
          }}
        />

        {/* Fade grid ke tepi */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(5,5,5,0) 0%, rgba(5,5,5,0.7) 60%, #050505 100%)",
          }}
        />

        {/* Spotlight dari atas */}
        <div
          style={{
            position: "absolute",
            top: -260,
            width: 900,
            height: 600,
            display: "flex",
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Cincin orbit */}
        {ring(420, 0.1)}
        {ring(640, 0.06)}
        {ring(860, 0.035)}

        {/* Corner marks */}
        {corner({ top: 36, left: 36 }, { borderTop: line, borderLeft: line })}
        {corner({ top: 36, right: 36 }, { borderTop: line, borderRight: line })}
        {corner({ bottom: 36, left: 36 }, { borderBottom: line, borderLeft: line })}
        {corner({ bottom: 36, right: 36 }, { borderBottom: line, borderRight: line })}

        {/* Elemen kiri */}
        <div style={{ ...sideLabel, position: "absolute", left: 72, top: 258 }}>
          <span style={{ color: "#ffffff" }}>01</span>
          <div style={{ width: 36, height: 1, background: "#3a3a3a", display: "flex" }} />
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#ffffff" }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#22c55e",
                display: "flex",
              }}
            />
            <span>OPEN</span>
          </div>
          <div style={{ width: 36, height: 1, background: "#3a3a3a", display: "flex" }} />
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
              color: "transparent",
              backgroundImage: "linear-gradient(180deg, #ffffff 30%, #6f6f6f 100%)",
              backgroundClip: "text",
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
              border: "1px solid #2e2e2e",
              background: "rgba(255,255,255,0.04)",
              fontFamily: "JetBrains Mono",
              fontSize: 26,
              color: "#d4d4d4",
              letterSpacing: 1,
            }}
          >
            <span style={{ color: "#22c55e" }}></span>
            <span>Full Stack Web Developer</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontFamily: "JetBrains Mono",
              fontSize: 20,
              letterSpacing: 8,
              color: "#555555",
            }}
          >
            Software Engineer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: heading, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}