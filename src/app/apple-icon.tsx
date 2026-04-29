import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E1320",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: 110,
            height: 110,
          }}
        >
          <div style={{ display: "flex", flex: 1, gap: 12 }}>
            <div style={{ flex: 1, background: "#FA2BB8" }} />
            <div style={{ flex: 1, background: "#E8FF5C" }} />
          </div>
          <div style={{ display: "flex", flex: 1, gap: 12 }}>
            <div style={{ flex: 1, background: "#E8FF5C" }} />
            <div style={{ flex: 1, background: "#FA2BB8" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
