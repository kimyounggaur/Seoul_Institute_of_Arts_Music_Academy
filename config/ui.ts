export const UI_CONFIG = {
  // 이 배열만 편집하면 섹션 표시 여부와 순서가 바뀝니다.
  sectionOrder: [
    "hero",
    "quickPaths",
    "programs",
    "method",
    "people",
    "fees",
    "schedule",
    "gallery",
    "music",
    "admission",
    "about",
    "news",
    "faq",
    "location",
    "consult",
  ] as const,
  nav: {
    mode: "tabs" as const,
    tabs: [
      { id: "home", label: "홈", href: "#top", icon: "⌂" },
      { id: "programs", label: "수업", href: "#programs", icon: "♫" },
      { id: "gallery", label: "공간", href: "#gallery", icon: "▦" },
      { id: "music", label: "음원", href: "#music", icon: "▶" },
      { id: "consult", label: "상담", href: "#consult", icon: "✦" },
    ],
  },
  labels: {
    programs: "수업 안내",
    people: "강사진",
    fees: "수강료",
    schedule: "시간표",
    gallery: "갤러리",
    news: "학원 소식",
    faq: "자주 묻는 질문",
    contact: "오시는 길",
  },
} as const;

export type SectionId = (typeof UI_CONFIG.sectionOrder)[number];
