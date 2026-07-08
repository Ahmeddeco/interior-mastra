import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "syillp7vjw.ufs.sh" },
      { protocol: "https", hostname: "picsum.photos" },
    ]
  },
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true
  },
}

export default nextConfig
