import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#18181b",
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: "22px", color: "#71717a" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "80px",
              fontWeight: 700,
              color: "#18181b",
              letterSpacing: "-2px",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "16px",
              fontSize: "36px",
              color: "#2563eb",
              fontWeight: 600,
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: "26px",
              color: "#52525b",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"].map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid #e4e4e7",
                  fontSize: "22px",
                  color: "#52525b",
                }}
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    size,
  );
}
