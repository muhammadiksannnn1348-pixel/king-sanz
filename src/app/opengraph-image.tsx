// app/opengraph-image.tsx

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "M. Iksanuddin — Full Stack Web Developer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          overflow: "hidden",
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
          }}
        />

        {/* Fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,.7) 65%, #050505 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "70px 120px",
          }}
        >
          {/* Small label */}
          <div
            style={{
              display: "flex",
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: 5,
              color: "#22c55e",
              marginBottom: 28,
            }}
          >
            PORTFOLIO / 01
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            M. IKSANUDDIN
          </div>

          {/* Role */}
          <div
            style={{
              display: "flex",
              marginTop: 30,
              padding: "14px 30px",
              borderRadius: 999,
              border: "1px solid #303030",
              background: "rgba(255,255,255,.04)",
              fontFamily: "monospace",
              fontSize: 25,
              color: "#d4d4d4",
              letterSpacing: 1,
            }}
          >
            <span style={{ color: "#22c55e" }}>●</span>
            <span style={{ marginLeft: 12 }}>
              Full Stack Web Developer
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontFamily: "monospace",
              fontSize: 19,
              color: "#777777",
              letterSpacing: 2,
              textAlign: "center",
            }}
          >
            BUILDING MODERN DIGITAL EXPERIENCES
          </div>

          {/* Website */}
          <div
            style={{
              position: "absolute",
              bottom: 55,
              display: "flex",
              fontFamily: "monospace",
              fontSize: 17,
              color: "#555555",
              letterSpacing: 2,
            }}
          >
            king-sanz.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}