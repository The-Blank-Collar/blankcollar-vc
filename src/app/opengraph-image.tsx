import { ImageResponse } from "next/og";

export const alt = "blankcollar.ventures: We help AI startups win.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E1320",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#F4F1EA",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            background: "#E8FF5C",
            opacity: 0.18,
            filter: "blur(120px)",
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -200,
            width: 500,
            height: 500,
            background: "#FA2BB8",
            opacity: 0.12,
            filter: "blur(120px)",
            borderRadius: 9999,
          }}
        />

        {/* Top: logo only */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 40, height: 40 }}>
            <div style={{ display: "flex", flex: 1, gap: 4 }}>
              <div style={{ flex: 1, background: "#FA2BB8" }} />
              <div style={{ flex: 1, background: "#E8FF5C" }} />
            </div>
            <div style={{ display: "flex", flex: 1, gap: 4 }}>
              <div style={{ flex: 1, background: "#E8FF5C" }} />
              <div style={{ flex: 1, background: "#FA2BB8" }} />
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace" }}>
            <span style={{ fontWeight: 500 }}>blankcollar</span>
            <span style={{ color: "rgba(244, 241, 234, 0.5)" }}>&nbsp;/ ventures</span>
          </div>
        </div>

        {/* Center: headline only */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 500,
            lineHeight: 0.96,
            letterSpacing: "-0.04em",
            maxWidth: 1080,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>AI changed what founders build.</span>
          <span style={{ color: "rgba(244, 241, 234, 0.45)" }}>
            We help them win.
          </span>
        </div>

        {/* Bottom: domains */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            color: "rgba(244, 241, 234, 0.5)",
          }}
        >
          <span>blankcollar.ventures</span>
          <span style={{ color: "rgba(244, 241, 234, 0.25)" }}>●</span>
          <span>theblankcollar.com</span>
          <span style={{ color: "rgba(244, 241, 234, 0.25)" }}>●</span>
          <span>blankcollar.ai</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
