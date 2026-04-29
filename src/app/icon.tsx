import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: 36,
            height: 36,
          }}
        >
          <div style={{ display: "flex", flex: 1, gap: 4 }}>
            <div style={{ flex: 1, background: "#FA2BB8" }} />
            <div style={{ flex: 1, background: "#E8FF5C" }} />
          </div>
          <div style={{ display: "flex", flex: 1, gap: 4 }}>
            <div style={{ flex: 1, background: "#E8FF5C" }} />
            <div style={{ flex: 1, background: "#FA2BB8" }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
