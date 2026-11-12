'use client';

import '../styles/colors.css';
import { useEffect, useRef } from 'react';

const storySlides = [
  {
    id: 0,
    label: 'قصتنا',
    text: 'جد "أيمن" عاش زمان في جامايكا ورجع ومعاه وصفات وحكايات مليانة روح الكاريبي. أيمن، الشيف النوبي اللي عاش فترة في أستراليا، رجع لجزيرة إلفنتين عشان يحقق حلم جده، وافتتح "كينج جاميكا" مكان بيجمع بين أصالة النوبة وسحر جامايكا في قلب النيل بأسوان.',
    img: '/3.jpg',
  },
  {
    id: 1,
    label: 'وعدنا',
    text: 'من الجيرك تشيكن على الفحم لطاجن لحم الجمل النوبي، ومن الحمام المحشي لعصائر الكركديه والمانجا الطازة... كل طبق عندنا حكاية بتجمع بين مطبخين مختلفين بروح واحدة. أكل طازة، توابل جريئة، وضيافة نوبية أصيلة في كل زيارة.',
    img: '/2.jpg',
  },
  {
    id: 2,
    label: 'أجواؤنا',
    text: 'اقعد على الكورنيش وإنت سامع موسيقى الريجي، محاط بألوان علم جامايكا والفن النوبي، وإطلالة مباشرة على النيل من جزيرة إلفنتين. كينج جاميكا مش مجرد مطعم... هو تجربة بتجمع ثقافتين وناس من كل حتة العالم حوالين طبلية واحدة.',
    img: '/1.jpg',
  },
];

const LOGO_URL =
  '/logo.jpg';

const LERP_FACTOR = 0.12;
const END_BUFFER_VH = 40;
const NAV_H = 84;

export default function StorySection() {
  const wrapperRef = useRef(null);
  const stripRef = useRef(null);
  const logoWrapRef = useRef(null);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef(null);

  const total = storySlides.length;

  useEffect(() => {
    const el = logoWrapRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150);
  }, []);

  useEffect(() => {
    let rafScheduled = false;
    const computeProgress = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolledIntoWrapper = -rect.top;
      const slidesScrollableRange = ((total * 55 - 100) / 100) * vh;
      const p = Math.min(Math.max(scrolledIntoWrapper / slidesScrollableRange, 0), 1);
      targetProgress.current = p;
    };
    const handleScroll = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => { rafScheduled = false; computeProgress(); });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    computeProgress();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [total]);

  useEffect(() => {
    const tick = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) < 0.0001) {
        currentProgress.current = targetProgress.current;
      } else {
        currentProgress.current += diff * LERP_FACTOR;
      }
      const p = currentProgress.current;
      const stripOffset = p * (total - 1) * (100 / total);
      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(${stripOffset}%)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current !== null) cancelAnimationFrame(rafId.current); };
  }, [total]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: `${total * 55 + END_BUFFER_VH}vh` }}>
      <section
        dir="rtl"
        className="story-root"
        style={{ height: `calc(100vh - ${NAV_H}px)`, position: 'sticky', top: `${NAV_H}px` }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');

          .story-root { background: #2E1A0F; overflow: hidden; width: 100%; }
          .story-strip {
            display: flex; flex-direction: row;
            width: ${total * 100}%; height: 100%;
            will-change: transform; transform: translateX(0%);
            backface-visibility: hidden;
          }
          .story-slide {
            flex: 0 0 ${100 / total}%; width: ${100 / total}%; height: 100%;
            display: flex; align-items: center; justify-content: center;
          }
          .story-text {
            flex: 0 0 auto; width: 42%; min-width: 300px;
            padding: 0 48px; display: flex; flex-direction: column;
            align-items: center; text-align: center;
          }
          .story-logo { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: -30px; margin-bottom: 22px; }
          .story-logo-icon { width: 150px; height: 150px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; overflow: hidden; border: 3px solid rgba(242,183,5,0.5); background: var(--color-white); }
          .story-logo-icon img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
          .story-title { font-family: 'Amiri', serif; font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 700; color: var(--color-primary); margin-bottom: 16px; line-height: 1.1; }
          .story-desc { font-family: 'Cairo', sans-serif; font-size: 17px; line-height: 1.9; color: rgba(242,183,5,0.85); max-width: 420px; margin: 0 auto; }
          .story-img-wrap { flex: 1; height: 100%; display: flex; align-items: center; justify-content: flex-end; align-self: stretch; padding: 28px 0 28px 64px; }
          .story-img-frame { position: relative; width: 100%; height: 100%; max-height: 640px; }
          .story-img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; box-shadow: 0 24px 60px rgba(0,0,0,0.35); display: block; }

          @media (max-width: 768px) {
            .story-slide { flex-direction: column; padding: 32px 0 0; align-items: center; }
            .story-text { width: 100%; padding: 0 24px; }
            .story-logo { margin-bottom: 16px; }
            .story-logo-icon { width: 100px; height: 100px; }
            .story-desc { max-width: 320px; font-size: 15px; }
            .story-img-wrap { width: 100%; height: 42vh; flex: none; padding: 0 20px; justify-content: center; }
            .story-img-frame { max-height: 320px; }
          }
        `}</style>

        <div ref={stripRef} className="story-strip">
          {storySlides.map((slide, idx) => (
            <div key={slide.id} className="story-slide">
              <div className="story-text">
                <div ref={idx === 0 ? logoWrapRef : null} className="story-logo">
                  <span className="story-logo-icon">
                    <img src={LOGO_URL} alt="كينج جاميكا" />
                  </span>
                </div>
                <h3 className="story-title">{slide.label}</h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="block w-12 h-[1px]" style={{ background: 'rgba(242,183,5,0.4)' }} />
                  <svg viewBox="0 0 24 24" className="w-5 h-5" style={{ color: 'var(--color-primary)' }} fill="currentColor" aria-hidden="true">
                    <path d="M12 2 21 19a10 10 0 0 1-18 0L12 2z" />
                    <path d="M4.6 15.5c1.6.8 3.2 1.2 5 1.5" fill="none" stroke="#2E1A0F" strokeWidth="1.1" strokeLinecap="round" />
                    <circle cx="12" cy="9" r="1" fill="#2E1A0F" />
                    <circle cx="9" cy="13" r="1" fill="#2E1A0F" />
                    <circle cx="14.5" cy="13.5" r="1" fill="#2E1A0F" />
                  </svg>
                  <span className="block w-12 h-[1px]" style={{ background: 'rgba(242,183,5,0.4)' }} />
                </div>
                <p className="story-desc">{slide.text}</p>
              </div>
              <div className="story-img-wrap">
                <div className="story-img-frame">
                  <img src={slide.img} alt={slide.label} className="story-img" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}