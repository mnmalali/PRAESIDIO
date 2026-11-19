import { ImageResponse } from "next/og";
export const alt = "PRAESIDIO AI — Let agents work. Stay in control.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#101c30",
        color: "#f7f9ff",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 24, color: "#bbcee8" }}>
        PRAESIDIO AI / Runtime security
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 82,
          lineHeight: 1.08,
        }}
      >
        <span>Let agents work.</span>
        <span style={{ color: "#bbcee8" }}>Stay in control.</span>
      </div>
      <div style={{ fontSize: 22, color: "#bbcee8" }}>
        Inspect the action. Apply policy. Keep the evidence.
      </div>
    </div>,
    size,
  );
}
