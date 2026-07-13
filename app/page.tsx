"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { UI_CONFIG } from "../config/ui";
import {
  ADMISSION_ROADMAP,
  FAQ,
  FEES,
  GALLERY,
  GALLERY_CATEGORIES,
  HERO,
  LEARNING_FLOW,
  NEWS,
  PEOPLE,
  PROGRAMS,
  QUICK_PATHS,
  SCHEDULE,
  SITE,
  TRACKS,
  type GalleryItem,
} from "../lib/data";
import type { SectionId } from "../config/ui";

const phoneHref = `tel:${SITE.phone.replace(/\D/g, "")}`;

export default function Home() {
  const [galleryFilter, setGalleryFilter] = useState<(typeof GALLERY_CATEGORIES)[number]>("전체");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [consultMemo, setConsultMemo] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const sheetRef = useRef<HTMLElement>(null);

  const visibleGallery =
    galleryFilter === "전체" ? GALLERY : GALLERY.filter((item) => item.category === galleryFilter);

  useEffect(() => {
    const ids = UI_CONFIG.nav.tabs.map((tab) => (tab.id === "home" ? "top" : tab.id));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!("IntersectionObserver" in window) || targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const target = visible[0]?.target as HTMLElement | undefined;
        if (target) setActiveTab(target.id === "top" ? "home" : target.id);
      },
      { rootMargin: "-16% 0px -68% 0px", threshold: [0, 0.2, 0.5] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const sheet = sheetRef.current;
    const focusable = sheet
      ? Array.from(sheet.querySelectorAll<HTMLElement>("a, button"))
      : [];
    focusable[0]?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [menuOpen]);

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
    name: SITE.name,
    description: SITE.tagline,
    telephone: "+82-507-1408-1515",
    address: {
      "@type": "PostalAddress",
      streetAddress: "신정로7길 60-14 대승프라자 401호",
      addressLocality: "양천구",
      addressRegion: "서울특별시",
      addressCountry: "KR",
    },
    sameAs: SITE.sns.map((channel) => channel.url),
  };

  const renderSection = (section: SectionId): ReactNode => {
    switch (section) {
      case "hero":
        return (
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-glow hero-glow-one" aria-hidden="true" />
            <div className="hero-glow hero-glow-two" aria-hidden="true" />
            <div className="shell hero-grid">
              <div className="hero-copy">
                <p className="eyebrow"><span aria-hidden="true" /> 양천구 신정동 · 실용음악 전문</p>
                <h1 id="hero-title">좋아하는 음악이,<span>내 실력이 되는 곳</span></h1>
                <p className="hero-description">{HERO.sub}</p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#consult">상담 메모 만들기 <span aria-hidden="true">→</span></a>
                  <a className="button button-secondary" href={phoneHref}>바로 전화하기</a>
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
                    src={HERO.image}
                    alt="학원 제공 연출 이미지: 여러 악기가 준비된 합주실에서 통기타를 연습하는 모습"
                    width={1544}
                    height={1019}
                    priority
                    unoptimized
                    sizes="(max-width: 767px) calc(100vw - 32px), 430px"
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
        );
      case "quickPaths":
        return (
          <section className="quick-paths" aria-labelledby="quick-title">
            <div className="shell">
              <div className="section-heading compact-heading">
                <div><p className="eyebrow">START HERE</p><h2 id="quick-title">지금 내 목표에서 시작하세요</h2></div>
              </div>
              <div className="path-grid">
                {QUICK_PATHS.map((path) => (
                  <a className="path-card" href={path.href} key={path.number}>
                    <span className="path-number">{path.number}</span>
                    <div><h3>{path.title}</h3><p>{path.desc}</p></div>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        );
      case "programs":
        return (
          <section className="section programs-section" id="programs" aria-labelledby="programs-title">
            <div className="shell">
              <div className="section-heading">
                <div><p className="eyebrow">PROGRAMS</p><h2 id="programs-title">배우고 싶은 음악을 골라보세요</h2></div>
                <p>각 과정은 현재 실력, 좋아하는 음악, 연습 가능 시간에 맞춰 안내합니다.</p>
              </div>
              <div className="program-grid">
                {PROGRAMS.map((program, index) => (
                  <article className="program-card" key={program.name}>
                    <div className="program-top"><span className="program-code" aria-hidden="true">{program.code}</span><span className="program-index">0{index + 1}</span></div>
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
        );
      case "method":
        return (
          <section className="section method-section" id="method" aria-labelledby="method-title">
            <div className="shell method-grid">
              <div className="method-copy">
                <p className="eyebrow">LEARNING FLOW</p>
                <h2 id="method-title">막연한 연습을<br />보이는 단계로</h2>
                <p>빠른 진도보다 중요한 건 내게 필요한 순서를 아는 일입니다. 상담부터 한 곡을 완성하는 순간까지, 네 단계로 정리했습니다.</p>
                <a className="text-link" href="#consult">내 시작점 상담하기 <span aria-hidden="true">→</span></a>
              </div>
              <ol className="method-steps">
                {LEARNING_FLOW.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.desc}</p></div></li>)}
              </ol>
            </div>
          </section>
        );
      case "people":
        return PEOPLE.length > 0 ? <section className="section" aria-labelledby="people-title"><div className="shell"><div className="section-heading"><div><p className="eyebrow">PEOPLE</p><h2 id="people-title">{UI_CONFIG.labels.people}</h2></div></div><div className="strip">{PEOPLE.map((person) => <article className="person-card" key={person.name}><div className="person-avatar">{person.name.slice(0, 1)}</div><h3>{person.name}</h3><p>{person.role}</p><small>{person.career}</small></article>)}</div></div></section> : null;
      case "fees":
        return FEES.length > 0 ? <section className="section" aria-labelledby="fees-title"><div className="shell"><div className="section-heading"><div><p className="eyebrow">FEES</p><h2 id="fees-title">{UI_CONFIG.labels.fees}</h2></div></div><div className="fee-cards">{FEES.map((fee) => <article className="fee-card" key={fee.item}><h3>{fee.item}</h3><p>{fee.detail}</p><strong className="price">{fee.price}</strong></article>)}</div></div></section> : null;
      case "schedule":
        return SCHEDULE.type ? <section className="section" aria-labelledby="schedule-title"><div className="shell"><div className="section-heading"><div><p className="eyebrow">SCHEDULE</p><h2 id="schedule-title">{UI_CONFIG.labels.schedule}</h2></div></div><div className="schedule-wrap">{SCHEDULE.src ? <Image src={SCHEDULE.src} alt="학원 시간표" width={1200} height={800} loading="lazy" unoptimized /> : <p>[TODO] 시간표 원문을 연결해 주세요.</p>}</div></div></section> : null;
      case "gallery":
        return (
          <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
            <div className="shell">
              <div className="section-heading">
                <div><p className="eyebrow">STUDIO GALLERY</p><h2 id="gallery-title">음악에 집중하는 연습 공간</h2></div>
                <p>학원에서 제공한 연출 이미지를 바탕으로 과정별 연습 분위기를 소개합니다.</p>
              </div>
              <p className="gallery-disclosure">※ 아래 이미지는 실제 수강생 사진이 아닌 학원 제공 연출 이미지입니다.</p>
              <div className="filter-bar" role="group" aria-label="갤러리 분류">
                {GALLERY_CATEGORIES.map((category) => (
                  <button type="button" key={category} className={galleryFilter === category ? "is-active" : ""} aria-pressed={galleryFilter === category} onClick={() => setGalleryFilter(category)}>
                    {category}
                  </button>
                ))}
              </div>
              <div className="gallery-grid" aria-live="polite">
                {visibleGallery.map((item, index) => (
                  <button className={`gallery-item gallery-item-${(index % 5) + 1}`} type="button" key={item.src} onClick={() => openGallery(item)} aria-label={`${item.caption} 크게 보기`}>
                    <Image src={item.src} alt={`학원 제공 연출 이미지: ${item.alt}`} width={1200} height={800} loading="lazy" unoptimized sizes="(max-width: 767px) 78vw, 430px" />
                    <span className="gallery-overlay"><small>{item.category}</small><strong>{item.caption}</strong><i aria-hidden="true">↗</i></span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        );
      case "music":
        return (
          <section className="section music-section" id="music" aria-labelledby="music-title">
            <div className="shell music-layout">
              <div className="music-intro">
                <p className="eyebrow">ACADEMY SOUND</p>
                <h2 id="music-title">학원의 분위기를<br />음악으로 먼저 만나보세요</h2>
                <p>서울예대실용음악학원에서 제공한 네 편의 홍보 음원입니다. 재생 버튼을 눌렀을 때만 음원을 불러옵니다.</p>
                <div className="vinyl" aria-hidden="true"><span>SEOUL<br />MUSIC</span></div>
              </div>
              <div className="track-list">
                {TRACKS.map((track) => (
                  <article className="track" key={track.number}>
                    <div className="track-meta"><span>0{track.number}</span><div><h3>학원 홍보송 {track.number}</h3><p>서울예대실용음악학원 제공 · {track.duration}</p></div></div>
                    <audio controls preload="none" src={track.src} aria-label={`학원 홍보송 ${track.number}`}>브라우저가 오디오 재생을 지원하지 않습니다.</audio>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      case "admission":
        return (
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
                  {ADMISSION_ROADMAP.map((step) => <div key={step.number}><span>{step.number}</span><strong>{step.title}</strong><small>{step.desc}</small></div>)}
                </div>
              </div>
            </div>
          </section>
        );
      case "about":
        return (
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
        );
      case "news":
        return NEWS.length > 0 ? <section className="section" aria-labelledby="news-title"><div className="shell"><div className="section-heading"><div><p className="eyebrow">NEWS</p><h2 id="news-title">{UI_CONFIG.labels.news}</h2></div></div><div className="news-list">{NEWS.map((item) => <article key={`${item.date}-${item.title}`}><time>{item.date}</time><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></div></section> : null;
      case "faq":
        return (
          <section className="section faq-section" aria-labelledby="faq-title">
            <div className="shell faq-grid">
              <div><p className="eyebrow">FAQ</p><h2 id="faq-title">시작하기 전<br />궁금한 점</h2><p>더 궁금한 내용은 전화나 공식 채널에서 편하게 문의해 주세요.</p></div>
              <div className="faq-list">{FAQ.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">＋</span></summary><p>{item.a}</p></details>)}</div>
            </div>
          </section>
        );
      case "location":
        return (
          <section className="section location-section" id="location" aria-labelledby="location-title">
            <div className="shell location-grid">
              <div className="location-card">
                <p className="eyebrow">VISIT US</p>
                <h2 id="location-title">서울 양천구 신정동에서<br />만나보세요</h2>
                <dl className="location-list">
                  <div><dt>주소</dt><dd>{SITE.address}</dd></div>
                  <div><dt>운영시간</dt><dd>{SITE.hours}<small>방문 전 전화 확인을 권장합니다.</small></dd></div>
                  <div><dt>상담전화</dt><dd><a href={phoneHref}>{SITE.phone}</a><small>학원 전화 {SITE.secondaryPhone}</small></dd></div>
                </dl>
                <div className="location-actions"><a className="button button-primary" href={SITE.mapUrl} target="_blank" rel="noopener noreferrer external">네이버 지도에서 보기 <span aria-hidden="true">↗</span></a><a className="button button-secondary" href={phoneHref}>전화하기</a></div>
              </div>
              <div className="channel-card">
                <div className="channel-orbit" aria-hidden="true"><span>♪</span></div>
                <p className="eyebrow">OFFICIAL CHANNELS</p>
                <h3>최신 수업 소식은<br />공식 채널에서</h3>
                <p>게시물과 공지 내용은 원문에서 가장 정확하게 확인할 수 있습니다.</p>
                {SITE.sns.map((channel) => <a href={channel.url} target="_blank" rel="noopener noreferrer external" key={channel.url}><span>{channel.name === "네이버 블로그" ? "Blog" : "Instagram"}</span> {channel.name === "인스타그램" ? "@seoulmusic_academy" : channel.name} <i aria-hidden="true">↗</i></a>)}
              </div>
            </div>
          </section>
        );
      case "consult":
        return (
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
                  <label htmlFor="consult-name">이름<input id="consult-name" type="text" name="name" autoComplete="name" required placeholder="이름을 입력해 주세요" enterKeyHint="next" /></label>
                  <label htmlFor="consult-phone">연락처<input id="consult-phone" type="tel" name="phone" autoComplete="tel" required inputMode="tel" placeholder="010-0000-0000" enterKeyHint="next" /></label>
                </div>
                <div className="form-row">
                  <label htmlFor="consult-program">관심 과정<select id="consult-program" name="program" required defaultValue=""><option value="" disabled>과정을 선택해 주세요</option>{PROGRAMS.map((program) => <option key={program.name}>{program.name}</option>)}</select></label>
                  <label htmlFor="consult-status">현재 상태<select id="consult-status" name="status" required defaultValue=""><option value="" disabled>현재 상태를 선택해 주세요</option><option>처음 시작</option><option>취미 경험 있음</option><option>입시·오디션 준비</option><option>교회 반주 준비</option><option>기타</option></select></label>
                </div>
                <label htmlFor="consult-time">상담 희망 시간<input id="consult-time" type="text" name="time" required placeholder="예: 평일 오후 6시 이후" enterKeyHint="next" /></label>
                <label htmlFor="consult-message">문의 내용<textarea id="consult-message" name="message" rows={4} placeholder="배우고 싶은 곡이나 목표를 자유롭게 적어 주세요." /></label>
                <label className="check-label" htmlFor="consult-privacy"><input id="consult-privacy" type="checkbox" required /><span>입력 내용이 서버로 전송되지 않고, 상담용 메모만 만들어진다는 점을 확인했습니다.</span></label>
                <button className="button button-primary form-submit" type="submit">상담 메모 만들기 <span aria-hidden="true">→</span></button>
                <div className={`memo-result ${consultMemo ? "is-visible" : ""}`} aria-live="polite">
                  {consultMemo && <><div className="memo-heading"><h3>상담 메모가 준비됐어요</h3><button type="button" onClick={copyConsultMemo}>내용 복사</button></div><pre>{consultMemo}</pre><div className="memo-actions"><a href={phoneHref}>전화 상담 연결</a><a href="https://instagram.com/seoulmusic_academy" target="_blank" rel="noopener noreferrer external">인스타그램 열기</a></div></>}
                  <span className="sr-only">{copyStatus}</span>
                </div>
              </form>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <div className="app-shell">
        <header className="appbar" id="top">
          <a className="brand" href="#top" aria-label={`${SITE.name} 홈`}>
            <span className="brand-mark" aria-hidden="true">♪</span>
            <span className="brand-copy"><strong>서울예대</strong><small>실용음악학원</small></span>
          </a>
          <span className="appbar-title">{SITE.name}</span>
          <a className="appbar-call" href={phoneHref} aria-label={`${SITE.phone}로 전화 상담`}><span aria-hidden="true">☎</span></a>
          <button className="icon-button" type="button" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기" aria-expanded={menuOpen}><span /><span /><span /></button>
        </header>

        <main className="view" id="main-content" tabIndex={-1}>
          {UI_CONFIG.sectionOrder.map((section) => <Fragment key={section}>{renderSection(section)}</Fragment>)}
        </main>

        <footer className="site-footer">
          <div className="shell footer-grid">
            <div><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true">♪</span><span className="brand-copy"><strong>서울예대</strong><small>실용음악학원</small></span></a><p>좋아하는 음악을 내 실력으로 만드는 곳.</p></div>
            <div><strong>{SITE.name}</strong><p>{SITE.address}</p><p>{SITE.phone} · {SITE.hours}</p></div>
            <div className="footer-links">{SITE.sns.map((channel) => <a href={channel.url} target="_blank" rel="noopener noreferrer external" key={channel.url}>{channel.name === "네이버 블로그" ? "Blog" : "Instagram"} ↗</a>)}</div>
          </div>
          <div className="shell footer-bottom"><p>© 2026 {SITE.name}</p><p>제공된 학원 자료를 바탕으로 구성된 소개 페이지</p></div>
        </footer>
      </div>

      <nav className="tabbar" aria-label="모바일 주요 메뉴">
        {UI_CONFIG.nav.tabs.map((tab) => <a className={`${activeTab === tab.id ? "is-active" : ""} ${tab.id === "consult" ? "tab-primary" : ""}`} href={tab.href} key={tab.id}><span aria-hidden="true">{tab.icon}</span>{tab.label}</a>)}
      </nav>

      <div className={`sheet-backdrop ${menuOpen ? "is-open" : ""}`} aria-hidden="true" onClick={() => setMenuOpen(false)} />
      <aside className={`sheet ${menuOpen ? "is-open" : ""}`} ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby="sheet-title" aria-hidden={!menuOpen}>
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-heading"><div><p className="eyebrow">MENU</p><h2 id="sheet-title">{SITE.name}</h2></div><button className="sheet-close" type="button" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1} aria-label="메뉴 닫기">×</button></div>
        <nav className="sheet-nav" aria-label="전체 메뉴">
          {UI_CONFIG.nav.tabs.map((tab) => <a href={tab.href} key={tab.id} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}><span aria-hidden="true">{tab.icon}</span>{tab.label}</a>)}
          <a href="#method" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}><span aria-hidden="true">→</span>수업 방식</a>
          <a href="#location" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}><span aria-hidden="true">⌖</span>오시는 길</a>
        </nav>
        <a className="button button-primary sheet-call" href={phoneHref} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>전화 문의 <span aria-hidden="true">→</span></a>
      </aside>

      <dialog ref={dialogRef} className="gallery-dialog" onClose={() => setSelectedImage(null)} onClick={(event) => { if (event.currentTarget === event.target) closeGallery(); }}>
        {selectedImage && <div className="dialog-card"><button type="button" className="dialog-close" onClick={closeGallery} aria-label="이미지 닫기">×</button><Image src={selectedImage.src} alt={selectedImage.alt} width={1200} height={800} unoptimized sizes="100vw" /><div><span>{selectedImage.category}</span><strong>{selectedImage.caption}</strong></div></div>}
      </dialog>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
