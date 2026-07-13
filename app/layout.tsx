import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "서울예대실용음악학원 | 양천구 실용음악 레슨";
const description =
  "서울 양천구 신정동에서 보컬, 통기타, 일렉기타, 베이스, 드럼, 피아노, 교회반주를 배우는 실용음악학원입니다.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || requestHeaders.get("host") || "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
    ? forwardedProtocol
    : host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https";

  let origin: URL;
  try {
    origin = new URL(`${protocol}://${host}`);
  } catch {
    origin = new URL("http://localhost:3000");
  }

  const socialImage = new URL("/og.png", origin);

  return {
    metadataBase: origin,
    title,
    description,
    applicationName: "서울예대실용음악학원",
    keywords: [
      "서울예대실용음악학원",
      "양천구 실용음악학원",
      "신정동 음악학원",
      "보컬 레슨",
      "기타 레슨",
      "드럼 레슨",
      "피아노 레슨",
    ],
    alternates: {
      canonical: new URL("/", origin),
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: "/og.png",
      apple: "/og.png",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: origin,
      title,
      description,
      siteName: "서울예대실용음악학원",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "서울예대실용음악학원 소개" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    formatDetection: {
      address: false,
      email: false,
      telephone: false,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css" />
        <link rel="apple-touch-icon" href="/og.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>{children}</body>
    </html>
  );
}
