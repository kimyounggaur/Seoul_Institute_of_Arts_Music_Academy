export type Program = {
  code: string;
  name: string;
  summary: string;
  forWhom: string;
  curriculum: string[];
};

export type GalleryItem = {
  src: string;
  alt: string;
  category: "기타" | "피아노" | "드럼" | "합주";
  caption: string;
};

export type FaqItem = { q: string; a: string };

export const SITE = {
  name: "서울예대실용음악학원",
  nameEn: "Seoul Institute of Arts Music Academy",
  tagline: "양천구에 통기타, 일렉기타, 베이스기타, 드럼, 피아노, 교회반주, 보컬수업을 하는 실용음악학원입니다.",
  phone: "0507-1408-1515",
  secondaryPhone: "02-2684-1515",
  email: "", // [TODO] 기본 정보에 이메일이 없습니다.
  address: "서울 양천구 신정로7길 60-14 대승프라자 401호",
  mapUrl:
    "https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%EC%98%88%EB%8C%80%EC%8B%A4%EC%9A%A9%EC%9D%8C%EC%95%85%ED%95%99%EC%9B%90",
  hours: "매일 12:30 - 22:00",
  sns: [
    { name: "네이버 블로그", url: "https://blog.naver.com/seoulmusic1" },
    { name: "인스타그램", url: "https://instagram.com/seoulmusic_academy" },
  ],
} as const;

export const HERO = {
  image: "/images/hero-studio.webp",
  headline: "좋아하는 음악이, 내 실력이 되는 곳",
  sub: "통기타부터 보컬·드럼·피아노까지. 처음 시작하는 취미부터 체계적인 입시 준비까지, 지금의 레벨과 목표에 맞춰 시작합니다.",
};

export const QUICK_PATHS = [
  { number: "01", title: "처음 배우는 취미", desc: "악보를 몰라도, 악기가 없어도 기초부터 시작합니다.", href: "#programs" },
  { number: "02", title: "교회·실용 반주", desc: "코드 이해에서 실제 곡의 흐름까지 연결합니다.", href: "#programs" },
  { number: "03", title: "입시·오디션 준비", desc: "목표와 현재 수준을 확인하고 준비 순서를 설계합니다.", href: "#method" },
] as const;

export const PROGRAMS: Program[] = [
  {
    code: "VO",
    name: "보컬",
    summary: "호흡과 발성부터 곡 해석, 무대 표현까지 단계별로 익힙니다.",
    forWhom: "노래를 처음 배우는 분 · 오디션과 입시를 준비하는 분",
    curriculum: ["현재 음역과 습관 확인", "호흡·발성 기본기", "레퍼토리 적용과 녹음 피드백"],
  },
  {
    code: "AG",
    name: "통기타",
    summary: "좋아하는 곡을 직접 연주할 수 있도록 코드와 리듬을 연결합니다.",
    forWhom: "첫 악기를 시작하는 분 · 노래하며 반주하고 싶은 분",
    curriculum: ["자세와 기본 코드", "리듬 스트로크·아르페지오", "완곡과 라이브 연습"],
  },
  {
    code: "EG",
    name: "일렉기타",
    summary: "기초 테크닉부터 밴드 사운드, 솔로 연주까지 탄탄하게 쌓습니다.",
    forWhom: "밴드 합주를 꿈꾸는 분 · 실용음악 전공을 준비하는 분",
    curriculum: ["피킹과 왼손 기본기", "리프·코드 보이싱", "톤 메이킹과 합주 적용"],
  },
  {
    code: "BS",
    name: "베이스",
    summary: "리듬과 화성의 중심을 이해하며 단단한 그루브를 만듭니다.",
    forWhom: "밴드의 흐름을 배우고 싶은 분 · 입시 실기를 준비하는 분",
    curriculum: ["핑거링과 뮤트", "리듬·루트 진행", "그루브 분석과 합주"],
  },
  {
    code: "DR",
    name: "드럼",
    summary: "스틱 잡는 법부터 곡의 흐름을 이끄는 리듬 연주까지 배웁니다.",
    forWhom: "리듬 악기를 처음 접하는 분 · 밴드와 입시를 준비하는 분",
    curriculum: ["그립과 스트로크", "기본 비트·필인", "클릭 연습과 곡 완주"],
  },
  {
    code: "PN",
    name: "클래식 피아노",
    summary: "바른 자세와 독보, 표현력을 개인의 속도에 맞춰 쌓아갑니다.",
    forWhom: "피아노를 처음 시작하거나 기본기를 다시 다지고 싶은 분",
    curriculum: ["손 모양과 자세", "독보와 기초 테크닉", "곡 해석과 표현"],
  },
  {
    code: "SY",
    name: "신디사이저",
    summary: "코드와 보이싱을 익혀 실용적인 건반 반주로 연결합니다.",
    forWhom: "밴드 건반 · 대중음악 반주 · 작곡 기초에 관심 있는 분",
    curriculum: ["코드와 조성 이해", "보이싱·리듬 패턴", "밴드와 곡 반주 적용"],
  },
  {
    code: "CH",
    name: "교회반주",
    summary: "예배곡의 흐름을 이해하고 자연스럽게 이어가는 반주를 연습합니다.",
    forWhom: "찬양 반주를 시작하거나 더 안정적으로 연주하고 싶은 분",
    curriculum: ["코드와 조성 이해", "인트로·간주·엔딩", "예배 흐름에 맞춘 실전 반주"],
  },
];

// [TODO] 강사진 원문·사진은 기본 정보에 없어 생성하지 않습니다.
export const PEOPLE: Array<{ name: string; role: string; career: string; photo: string }> = [];

// [TODO] 수강료 원문이 없어 숫자를 추정하지 않습니다.
export const FEES: Array<{ item: string; detail: string; price: string }> = [];

// [TODO] 시간표 원문이 없어 비워 둡니다.
export const SCHEDULE = { type: "", src: "", rows: [] as string[][] };

export const GALLERY: GalleryItem[] = [
  { src: "/images/gallery-electric-guitar.webp", alt: "개인 연습실에서 일렉기타를 연습하는 모습", category: "기타", caption: "일렉기타 개인 연습" },
  { src: "/images/gallery-acoustic-guitar.webp", alt: "피아노가 있는 연습실에서 통기타를 연주하는 모습", category: "기타", caption: "통기타 코드와 리듬 연습" },
  { src: "/images/gallery-band-room.webp", alt: "기타와 베이스가 준비된 개인 연습실", category: "기타", caption: "기타·베이스 연습 공간" },
  { src: "/images/gallery-upright-piano.webp", alt: "업라이트 피아노를 연습하는 모습", category: "피아노", caption: "기초부터 차근차근 배우는 피아노" },
  { src: "/images/gallery-piano-practice.webp", alt: "개인 피아노실에서 연습하는 모습", category: "피아노", caption: "집중할 수 있는 개인 피아노실" },
  { src: "/images/gallery-grand-piano.webp", alt: "그랜드피아노와 드럼이 갖춰진 합주실", category: "합주", caption: "다양한 악기가 모인 합주 공간" },
  { src: "/images/gallery-drum-studio.webp", alt: "합주실에서 어쿠스틱 드럼을 연습하는 모습", category: "드럼", caption: "어쿠스틱 드럼 실전 연습" },
  { src: "/images/gallery-acoustic-drums.webp", alt: "방음 연습실에서 드럼을 연주하는 모습", category: "드럼", caption: "방음 드럼 연습실" },
  { src: "/images/gallery-electronic-drums.webp", alt: "개인실에서 전자드럼을 연습하는 모습", category: "드럼", caption: "전자드럼 기초 연습" },
  { src: "/images/gallery-keyboard.webp", alt: "키보드로 반주를 연습하는 모습", category: "피아노", caption: "실용 피아노와 반주 연습" },
  { src: "/images/gallery-ensemble.webp", alt: "여러 악기가 있는 합주실에서 드럼을 연주하는 모습", category: "합주", caption: "밴드 사운드를 경험하는 합주실" },
];

// [TODO] 학원 소식 원문이 없어 생성하지 않습니다.
export const NEWS: Array<{ date: string; title: string; desc: string }> = [];

export const FAQ: FaqItem[] = [
  { q: "악기를 한 번도 배운 적이 없어도 괜찮나요?", a: "네. 현재 경험과 목표를 먼저 확인한 뒤 자세, 리듬, 악보 읽기 등 필요한 기초부터 시작합니다." },
  { q: "취미 수업과 입시 수업은 어떻게 다른가요?", a: "취미 수업은 좋아하는 곡과 꾸준한 연주 경험에, 입시 수업은 기본기·전공 실기·레퍼토리 점검에 더 큰 비중을 둡니다." },
  { q: "어떤 전공이 맞을지 모르겠어요.", a: "상담에서 좋아하는 음악, 연습 가능 시간, 목표를 함께 살펴보고 시작하기 좋은 과정을 안내해 드립니다." },
  { q: "상담 전에 무엇을 준비해야 하나요?", a: "배우고 싶은 곡이나 목표가 있다면 알려 주세요. 정해진 것이 없어도 괜찮습니다." },
];

export const LEARNING_FLOW = [
  { number: "01", title: "목표 확인", desc: "취미, 반주, 입시 등 배우려는 이유와 좋아하는 음악을 확인합니다." },
  { number: "02", title: "현재 레벨 점검", desc: "경험이 없어도 괜찮습니다. 필요한 기초를 찾는 단계입니다." },
  { number: "03", title: "개인별 연습 설계", desc: "한 번에 연습할 양과 다음 수업까지의 목표를 분명하게 잡습니다." },
  { number: "04", title: "곡으로 완성", desc: "배운 기본기를 좋아하는 곡과 실전 연주에 연결합니다." },
] as const;

export const ADMISSION_ROADMAP = [
  { number: "01", title: "기초 진단", desc: "발성·리듬·테크닉" },
  { number: "02", title: "곡 선정", desc: "강점과 학교 방향" },
  { number: "03", title: "실전 점검", desc: "녹음·모의 연주" },
  { number: "04", title: "최종 정리", desc: "완성도와 컨디션" },
] as const;

export const TRACKS = [
  { number: 1, duration: "2:14", src: "/audio/academy-song-01.mp3" },
  { number: 2, duration: "1:55", src: "/audio/academy-song-02.mp3" },
  { number: 3, duration: "1:32", src: "/audio/academy-song-03.mp3" },
  { number: 4, duration: "1:33", src: "/audio/academy-song-04.mp3" },
] as const;

export const GALLERY_CATEGORIES = ["전체", "기타", "피아노", "드럼", "합주"] as const;
