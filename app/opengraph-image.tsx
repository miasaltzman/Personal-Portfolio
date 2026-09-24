import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { profile } from "@/content/profile";

export const alt = site.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card — typeset from content/profile.ts.
export default function OpengraphImage() {
  const statement = profile.hero.statement.replace(/[{}]/g, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f6f4ef",
          color: "#141413",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, letterSpacing: 5, textTransform: "uppercase" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2a44d6" }} />
          {profile.name}
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>{statement}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#5f5c55" }}>
          <span>
            {profile.program} · {profile.school}
          </span>
          <span style={{ color: "#2a44d6" }}>AI × Product × People</span>
        </div>
      </div>
    ),
    size,
  );
}
