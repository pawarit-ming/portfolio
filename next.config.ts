import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project pages are gone; a link to one in an old CV or post lands on
  // the project cards instead of a 404. Temporary, so no browser caches it.
  redirects() {
    return [
      {
        source: "/:locale(en|th)/projects/:slug",
        destination: "/:locale#projects",
        permanent: false,
      },
      {
        source: "/:locale(en|th)/for/:variant/projects/:slug",
        destination: "/:locale/for/:variant#projects",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
