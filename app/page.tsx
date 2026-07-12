"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";

type Program = {
  code: string;
  name: string;
  summary: string;
  forWhom: string;
  curriculum: string[];
};

type GalleryItem = {
  src: string;
  alt: string;
  category: "기타" | "피아노" | "드럼" | "합주";
  caption: string;
};

const programs: Program[] = [
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

const gallery: GalleryItem[] = [
  {
    src: "/images/gallery-electric-guitar.webp",
    alt: "개인 연습실에서 일렉기타를 연습하는 모습",
    category: "기타",
    caption: "일렉기타 개인 연습",
  },
  {
    src: "/images/gallery-acoustic-guitar.webp",
    alt: "피아노가 있는 연습실에서 통기타를 연주하는 모습",
    category: "기타",
    caption: "통기타 코드와 리듬 연습",
  },
  {
    src: "/images/gallery-band-room.webp",
    alt: "기타와 베이스가 준비된 개인 연습실",
    category: "기타",
    caption: "기타·베이스 연습 공간",
  },
  {
    src: "/images/gallery-upright-piano.webp",
    alt: "업라이트 피아노를 연습하는 모습",
    category: "피아노",
    caption: "기초부터 차근차근 배우는 피아노",
  },
  {
    src: "/images/gallery-piano-practice.webp",
    alt: "개인 피아노실에서 연습하는 모습",
    category: "피아노",
    caption: "집중할 수 있는 개인 피아노실",
  },
  {
    src: "/images/gallery-grand-piano.webp",
    alt: "그랜드피아노와 드럼이 갖춰진 합주실",
    category: "합주",
    caption: "다양한 악기가 모인 합주 공간",
  },
  {
    src: "/images/gallery-drum-studio.webp",
    alt: "합주실에서 어쿠스틱 드럼을 연습하는 모습",
    category: "드럼",
    caption: "어쿠스틱 드럼 실전 연습",
  },
  {
    src: "/images/gallery-acoustic-drums.webp",
    alt: "방음 연습실에서 드럼을 연주하는 모습",
    category: "드럼",
    caption: "방음 드럼 연습실",
  },
  {
    src: "/images/gallery-electronic-drums.webp",
    alt: "개인실에서 전자드럼을 연습하는 모습",
    category: "드럼",
    caption: "전자드럼 기초 연습",
  },
  {
    src: "/images/gallery-keyboard.webp",
    alt: "키보드로 반주를 연습하는 모습",
    category: "피아노",
    caption: "실용 피아노와 반주 연습",
  },
  {
    src: "/images/gallery-ensemble.webp",
    alt: "여러 악기가 있는 합주실에서 드럼을 연주하는 모습",
    category: "합주",
    caption: "밴드 사운드를 경험하는 합주실",
  },
];

const faqs = [
  ["악기를 한 번도 배운 적이 없어도 괜찮나요?", "네. 현재 경험과 목표를 먼저 확인한 뒤 자세, 리듬, 악보 읽기 등 필요한 기초부터 시작합니다."],
  ["취미 수업과 입시 수업은 어떻게 다른가요?", "취미 수업은 좋아하는 곡과 꾸준한 연주 경험에, 입시 수업은 기본기·전공 실기·레퍼토리 점검에 더 큰 비중을 둡니다."],
  ["어떤 전공이 맞을지 모르겠어요.", "상담에서 좋아하는 음악, 연습 가능 시간, 목표를 함께 살펴보고 시작하기 좋은 과정을 안내해 드립니다."],
  ["상담 전에 무엇을 준비해야 하나요?", "배우고 싶은 곡이나 목표가 있다면 알려 주세요. 정해진 것이 없어도 괜찮습니다."],
];

const galleryCategories = ["전체", "기타", "피아노", "드럼", "합주"] as const;

const tracks = [
  { number: 1, duration: "2:14" },
  { number: 2, duration: "1:55" },
  { number: 3, duration: "1:32" },
  { number: 4, duration: "1:33" },
];

const mapUrl =
  "https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%EC%98%88%EB%8C%80%EC%8B%A4%EC%9A%A9%EC%9D%8C%EC%95%85%ED%95%99%EC%9B%90";

export default function Home() {
  const [galleryFilter, setGalleryFilter] = useState<(typeof galleryCategories)[number]>("전체");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [consultMemo, setConsultMemo] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visibleGallery =
    galleryFilter === "전체"
      ? gallery
      : gallery.filter((item) => item.category === galleryFilter);

  function openGallery(item: GalleryItem) {
    setSelectedImage(item);
    window.requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function closeGallery() {
    dialogRef.current?.close();
  }

  function handleConsultSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const memo = [
      "[서울예대실용음악학원 상담 문의]",
      `이름: ${String(data.get("name") ?? "")}`,
      `연락처: ${String(data.get("phone") ?? "")}`,
      `관심 과정: ${String(data.get("program") ?? "")}`,
      `현재 상태: ${String(data.get("status") ?? "")}`,
      `희망 시간: ${String(data.get("time") ?? "")}`,
      `문의 내용: ${String(data.get("message") ?? "없음")}`,
    ].join("\n");

    setConsultMemo(memo);
    setCopyStatus("상담 메모가 준비되었습니다.");
  }

  async function copyConsultMemo() {
    try {
      await navigator.clipboard.writeText(consultMemo);
      setCopyStatus("상담 메모를 복사했습니다.");
    } catch {
      setCopyStatus("복사하지 못했습니다. 메모를 길게 눌러 직접 복사해 주세요.");
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "서울예대실용음악학원",
    description: "양천구 신정동의 보컬, 기타, 베이스, 드럼, 피아노, 교회반주 실용음악학원",
    telephone: "+82-507-1408-1515",
    address: {
      "@type": "PostalAddress",
      streetAddress: "신정로7길 60-14 대승프라자 401호",
      addressLocality: "양천구",
      addressRegion: "서울특별시",
      addressCountry: "KR",
    },
    sameAs: [
      "https://blog.naver.com/seoulmusic1",
      "https://instagram.com/seoulmusic_academy",
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        본문 바로가기
      </a>

      <header className="site-header" id="top">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="서울예대실용음악학원 홈">
            <span className="brand-mark" aria-hidden="true">♪</span>
            <span className="brand-copy">
              <strong>서울예대</strong>
              <small>실용음악학원</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="주요 메뉴">
            <a href="#programs">수업과정</a>
            <a href="#method">수업방식</a>
            <a href="#gallery">연습공간</a>
            <a href="#music">홍보음원</a>
            <a href="#location">오시는 길</a>
          </nav>

          <a className="header-call" href="tel:050714081515" aria-label="0507-1408-1515로 전화 상담">
            <span aria-hidden="true">☎</span>
            <span className="header-call-text">전화 상담</span>
          </a>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span aria-hidden="true" /> 양천구 신정동 · 실용음악 전문</p>
              <h1 id="hero-title">
                좋아하는 음악이,
                <span>내 실력이 되는 곳</span>
              </h1>
              <p className="hero-description">
                통기타부터 보컬·드럼·피아노까지. 처음 시작하는 취미부터 체계적인 입시 준비까지,
                지금의 레벨과 목표에 맞춰 시작합니다.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#consult">상담 메모 만들기 <span aria-hidden="true">→</span></a>
                <a className="button button-secondary" href="tel:050714081515">바로 전화하기</a>
              </div>
              <ul className="hero-facts" aria-label="학원 주요 정보">
                <li><strong>8개</strong><span>실용음악 과정</span></li>
                <li><strong>매일</strong><span>12:30–22:00</span></li>
                <li><strong>개인별</strong><span>목표 맞춤 안내</span></li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-photo-wrap">
                <Image
                  className="hero-photo"
                  src="/images/hero-studio.webp"
                  alt="학원 제공 연출 이미지: 여러 악기가 준비된 합주실에서 통기타를 연습하는 모습"
                  width="1544"
                  height="1019"
                  priority
                  unoptimized
                  sizes="(max-width: 860px) calc(100vw - 32px), 520px"
                />
                <div className="photo-shade" aria-hidden="true" />
                <div className="hero-photo-label">
                  <span className="sound-bars" aria-hidden="true"><i /><i /><i /><i /></span>
                  <span><small>학원 제공 연출 이미지</small><strong>한 곡을 끝까지</strong></span>
                </div>
              </div>
              <div className="hero-note hero-note-top"><span aria-hidden="true">01</span> 기초부터 차근차근</div>
              <div className="hero-note hero-note-bottom"><span aria-hidden="true">02</span> 곡으로 완성하기</div>
            </div>
          </div>
        </section>

        <section className="quick-paths" aria-labelledby="quick-title">
          <div className="shell">
            <div className="section-heading compact-heading">
              <div><p className="eyebrow">START HERE</p><h2 id="quick-title">지금 내 목표에서 시작하세요</h2></div>
            </div>
            <div className="path-grid">
              <a className="path-card" href="#programs">
                <span className="path-number">01</span><div><h3>처음 배우는 취미</h3><p>악보를 몰라도, 악기가 없어도 기초부터 시작합니다.</p></div><span aria-hidden="true">↗</span>
              </a>
              <a className="path-card" href="#programs">
                <span className="path-number">02</span><div><h3>교회·실용 반주</h3><p>코드 이해에서 실제 곡의 흐름까지 연결합니다.</p></div><span aria-hidden="true">↗</span>
              </a>
              <a className="path-card" href="#method">
                <span className="path-number">03</span><div><h3>입시·오디션 준비</h3><p>목표와 현재 수준을 확인하고 준비 순서를 설계합니다.</p></div><span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section programs-section" id="programs" aria-labelledby="programs-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="eyebrow">PROGRAMS</p><h2 id="programs-title">배우고 싶은 음악을 골라보세요</h2></div>
              <p>각 과정은 현재 실력, 좋아하는 음악, 연습 가능 시간에 맞춰 안내합니다.</p>
            </div>
            <div className="program-grid">
              {programs.map((program) => (
                <article className="program-card" key={program.name}>
                  <div className="program-top"><span className="program-code" aria-hidden="true">{program.code}</span><span className="program-index">0{programs.indexOf(program) + 1}</span></div>
                  <h3>{program.name}</h3>
                  <p className="program-summary">{program.summary}</p>
                  <p className="program-for"><span>추천</span>{program.forWhom}</p>
                  <details>
                    <summary>수업 흐름 보기 <span aria-hidden="true">＋</span></summary>
                    <ol>{program.curriculum.map((step) => <li key={step}>{step}</li>)}</ol>
                  </details>
                  <a href="#consult">이 과정으로 상담하기 <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section method-section" id="method" aria-labelledby="method-title">
          <div className="shell method-grid">
            <div className="method-copy">
              <p className="eyebrow">LEARNING FLOW</p>
              <h2 id="method-title">막연한 연습을<br />보이는 단계로</h2>
              <p>빠른 진도보다 중요한 건 내게 필요한 순서를 아는 일입니다. 상담부터 한 곡을 완성하는 순간까지, 네 단계로 정리했습니다.</p>
              <a className="text-link" href="#consult">내 시작점 상담하기 <span aria-hidden="true">→</span></a>
            </div>
            <ol className="method-steps">
              <li><span>01</span><div><h3>목표 확인</h3><p>취미, 반주, 입시 등 배우려는 이유와 좋아하는 음악을 확인합니다.</p></div></li>
              <li><span>02</span><div><h3>현재 레벨 점검</h3><p>경험이 없어도 괜찮습니다. 필요한 기초를 찾는 단계입니다.</p></div></li>
              <li><span>03</span><div><h3>개인별 연습 설계</h3><p>한 번에 연습할 양과 다음 수업까지의 목표를 분명하게 잡습니다.</p></div></li>
              <li><span>04</span><div><h3>곡으로 완성</h3><p>배운 기본기를 좋아하는 곡과 실전 연주에 연결합니다.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="eyebrow">STUDIO GALLERY</p><h2 id="gallery-title">음악에 집중하는 연습 공간</h2></div>
              <p>학원에서 제공한 연출 이미지를 바탕으로 과정별 연습 분위기를 소개합니다.</p>
            </div>
            <p className="gallery-disclosure">※ 아래 이미지는 실제 수강생 사진이 아닌 학원 제공 연출 이미지입니다.</p>
            <div className="filter-bar" role="group" aria-label="갤러리 분류">
              {galleryCategories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={galleryFilter === category ? "is-active" : ""}
                  aria-pressed={galleryFilter === category}
                  onClick={() => setGalleryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="gallery-grid" aria-live="polite">
              {visibleGallery.map((item, index) => (
                <button
                  className={`gallery-item gallery-item-${(index % 5) + 1}`}
                  type="button"
                  key={item.src}
                  onClick={() => openGallery(item)}
                  aria-label={`${item.caption} 크게 보기`}
                >
                  <Image
                    src={item.src}
                    alt={`학원 제공 연출 이미지: ${item.alt}`}
                    width="1200"
                    height="800"
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 720px) 50vw, (max-width: 1180px) 45vw, 560px"
                  />
                  <span className="gallery-overlay"><small>{item.category}</small><strong>{item.caption}</strong><i aria-hidden="true">↗</i></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section music-section" id="music" aria-labelledby="music-title">
          <div className="shell music-layout">
            <div className="music-intro">
              <p className="eyebrow">ACADEMY SOUND</p>
              <h2 id="music-title">학원의 분위기를<br />음악으로 먼저 만나보세요</h2>
              <p>서울예대실용음악학원에서 제공한 네 편의 홍보 음원입니다. 재생 버튼을 눌렀을 때만 음원을 불러옵니다.</p>
              <div className="vinyl" aria-hidden="true"><span>SEOUL<br />MUSIC</span></div>
            </div>
            <div className="track-list">
              {tracks.map((track) => (
                <article className="track" key={track.number}>
                  <div className="track-meta"><span>0{track.number}</span><div><h3>학원 홍보송 {track.number}</h3><p>서울예대실용음악학원 제공 · {track.duration}</p></div></div>
                  <audio controls preload="none" src={`/audio/academy-song-0${track.number}.mp3`} aria-label={`학원 홍보송 ${track.number}`}>
                    브라우저가 오디오 재생을 지원하지 않습니다.
                  </audio>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section admission-section" aria-labelledby="admission-title">
          <div className="shell">
            <div className="admission-card">
              <div className="admission-copy">
                <p className="eyebrow">ADMISSION & AUDITION</p>
                <h2 id="admission-title">입시는 숫자보다<br />준비 순서가 먼저입니다</h2>
                <p>확인되지 않은 합격 실적이나 과장된 통계 대신, 지금 필요한 준비를 솔직하게 안내합니다.</p>
                <a className="button button-light" href="#consult">입시 상담 준비하기 <span aria-hidden="true">→</span></a>
              </div>
              <div className="admission-roadmap" aria-label="입시 준비 로드맵">
                <div><span>01</span><strong>기초 진단</strong><small>발성·리듬·테크닉</small></div>
                <div><span>02</span><strong>곡 선정</strong><small>강점과 학교 방향</small></div>
                <div><span>03</span><strong>실전 점검</strong><small>녹음·모의 연주</small></div>
                <div><span>04</span><strong>최종 정리</strong><small>완성도와 컨디션</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-section" aria-labelledby="about-title">
          <div className="shell about-grid">
            <div className="about-lead">
              <p className="eyebrow">ABOUT US</p>
              <h2 id="about-title">음악은 비교가 아니라<br />자기 속도로 쌓는 경험</h2>
              <p>처음 악기를 잡는 순간부터 한 곡을 완성하는 기쁨까지. 서울예대실용음악학원은 학생의 목표를 먼저 듣고, 필요한 기본기와 실전 경험을 연결하는 수업을 지향합니다.</p>
            </div>
            <div className="value-grid">
              <article><span aria-hidden="true">A</span><h3>개인별 단계</h3><p>같은 전공이라도 출발점과 목표에 맞춰 연습 순서를 다르게 안내합니다.</p></article>
              <article><span aria-hidden="true">B</span><h3>곡 중심 피드백</h3><p>기본기를 배운 뒤 실제 곡에 적용하며 부족한 지점을 다시 확인합니다.</p></article>
              <article><span aria-hidden="true">C</span><h3>다양한 연습 환경</h3><p>기타, 베이스, 드럼, 피아노 등 전공별 연습 공간을 활용합니다.</p></article>
              <article><span aria-hidden="true">D</span><h3>솔직한 상담</h3><p>확인되지 않은 성과보다 현재 필요한 준비와 가능한 시작점을 안내합니다.</p></article>
            </div>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="shell faq-grid">
            <div><p className="eyebrow">FAQ</p><h2 id="faq-title">시작하기 전<br />궁금한 점</h2><p>더 궁금한 내용은 전화나 공식 채널에서 편하게 문의해 주세요.</p></div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}><summary>{question}<span aria-hidden="true">＋</span></summary><p>{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="section location-section" id="location" aria-labelledby="location-title">
          <div className="shell location-grid">
            <div className="location-card">
              <p className="eyebrow">VISIT US</p>
              <h2 id="location-title">서울 양천구 신정동에서<br />만나보세요</h2>
              <dl className="location-list">
                <div><dt>주소</dt><dd>서울 양천구 신정로7길 60-14<br />대승프라자 401호</dd></div>
                <div><dt>운영시간</dt><dd>매일 12:30–22:00<small>방문 전 전화 확인을 권장합니다.</small></dd></div>
                <div><dt>상담전화</dt><dd><a href="tel:050714081515">0507-1408-1515</a><small>학원 전화 02-2684-1515</small></dd></div>
              </dl>
              <div className="location-actions">
                <a className="button button-primary" href={mapUrl} target="_blank" rel="noopener noreferrer external">네이버 지도에서 보기 <span aria-hidden="true">↗</span></a>
                <a className="button button-secondary" href="tel:050714081515">전화하기</a>
              </div>
            </div>
            <div className="channel-card">
              <div className="channel-orbit" aria-hidden="true"><span>♪</span></div>
              <p className="eyebrow">OFFICIAL CHANNELS</p>
              <h3>최신 수업 소식은<br />공식 채널에서</h3>
              <p>게시물과 공지 내용은 원문에서 가장 정확하게 확인할 수 있습니다.</p>
              <a href="https://blog.naver.com/seoulmusic1" target="_blank" rel="noopener noreferrer external"><span>Blog</span> 네이버 블로그 <i aria-hidden="true">↗</i></a>
              <a href="https://instagram.com/seoulmusic_academy" target="_blank" rel="noopener noreferrer external"><span>Instagram</span> @seoulmusic_academy <i aria-hidden="true">↗</i></a>
            </div>
          </div>
        </section>

        <section className="section consult-section" id="consult" aria-labelledby="consult-title">
          <div className="shell consult-grid">
            <div className="consult-intro">
              <p className="eyebrow">CONSULTATION</p>
              <h2 id="consult-title">무엇을 배울지 고민이라면,<br />목표부터 적어보세요</h2>
              <p>입력한 내용은 전송되거나 저장되지 않습니다. 상담 메모를 만든 뒤 복사해 전화나 공식 채널 문의에 활용할 수 있습니다.</p>
              <div className="privacy-note"><span aria-hidden="true">✓</span><p><strong>개인정보를 서버에 보내지 않습니다.</strong><br />이 페이지 안에서 상담 내용을 정리하는 기능입니다.</p></div>
            </div>
            <form className="consult-form" onSubmit={handleConsultSubmit}>
              <div className="form-row">
                <label>이름<input type="text" name="name" autoComplete="name" required placeholder="이름을 입력해 주세요" /></label>
                <label>연락처<input type="tel" name="phone" autoComplete="tel" required inputMode="tel" placeholder="010-0000-0000" /></label>
              </div>
              <div className="form-row">
                <label>관심 과정<select name="program" required defaultValue=""><option value="" disabled>과정을 선택해 주세요</option>{programs.map((program) => <option key={program.name}>{program.name}</option>)}</select></label>
                <label>현재 상태<select name="status" required defaultValue=""><option value="" disabled>현재 상태를 선택해 주세요</option><option>처음 시작</option><option>취미 경험 있음</option><option>입시·오디션 준비</option><option>교회 반주 준비</option><option>기타</option></select></label>
              </div>
              <label>상담 희망 시간<input type="text" name="time" required placeholder="예: 평일 오후 6시 이후" /></label>
              <label>문의 내용<textarea name="message" rows={4} placeholder="배우고 싶은 곡이나 목표를 자유롭게 적어 주세요." /></label>
              <label className="check-label"><input type="checkbox" required /><span>입력 내용이 서버로 전송되지 않고, 상담용 메모만 만들어진다는 점을 확인했습니다.</span></label>
              <button className="button button-primary form-submit" type="submit">상담 메모 만들기 <span aria-hidden="true">→</span></button>

              <div className={`memo-result ${consultMemo ? "is-visible" : ""}`} aria-live="polite">
                {consultMemo && (
                  <>
                    <div className="memo-heading"><h3>상담 메모가 준비됐어요</h3><button type="button" onClick={copyConsultMemo}>내용 복사</button></div>
                    <pre>{consultMemo}</pre>
                    <div className="memo-actions"><a href="tel:050714081515">전화 상담 연결</a><a href="https://instagram.com/seoulmusic_academy" target="_blank" rel="noopener noreferrer external">인스타그램 열기</a></div>
                  </>
                )}
                <span className="sr-only">{copyStatus}</span>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">♪</span><span className="brand-copy"><strong>서울예대</strong><small>실용음악학원</small></span></a><p>좋아하는 음악을 내 실력으로 만드는 곳.</p></div>
          <div><strong>서울예대실용음악학원</strong><p>서울 양천구 신정로7길 60-14 대승프라자 401호</p><p>0507-1408-1515 · 매일 12:30–22:00</p></div>
          <div className="footer-links"><a href="https://blog.naver.com/seoulmusic1" target="_blank" rel="noopener noreferrer external">Blog ↗</a><a href="https://instagram.com/seoulmusic_academy" target="_blank" rel="noopener noreferrer external">Instagram ↗</a></div>
        </div>
        <div className="shell footer-bottom"><p>© 2026 서울예대실용음악학원</p><p>제공된 학원 자료를 바탕으로 구성된 소개 페이지</p></div>
      </footer>

      <nav className="mobile-tabbar" aria-label="모바일 주요 메뉴">
        <a href="#top"><span aria-hidden="true">⌂</span>홈</a>
        <a href="#programs"><span aria-hidden="true">♫</span>수업</a>
        <a href="#gallery"><span aria-hidden="true">▦</span>공간</a>
        <a href="#music"><span aria-hidden="true">▶</span>음원</a>
        <a className="tab-primary" href="#consult"><span aria-hidden="true">✦</span>상담</a>
      </nav>

      <a className="floating-call" href="tel:050714081515"><span aria-hidden="true">☎</span><strong>전화 상담</strong></a>

      <dialog
        className="gallery-dialog"
        ref={dialogRef}
        onClose={() => setSelectedImage(null)}
        onClick={(event) => { if (event.currentTarget === event.target) closeGallery(); }}
        aria-label="갤러리 이미지 크게 보기"
      >
        {selectedImage && (
          <div className="dialog-card">
            <button type="button" className="dialog-close" onClick={closeGallery} aria-label="이미지 닫기">×</button>
            <Image src={selectedImage.src} alt={selectedImage.alt} width="1200" height="800" unoptimized sizes="100vw" />
            <div><span>{selectedImage.category}</span><strong>{selectedImage.caption}</strong></div>
          </div>
        )}
      </dialog>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
