'use client';

import '../styles/colors.css';

const LOGO_URL = '/logo.jpg';

const FACEBOOK_URL  = 'https://www.facebook.com/kingjamaica123/';
const INSTAGRAM_URL = 'https://www.instagram.com/kingjamaicaa/';
const PHONE_DISPLAY = '+20 155 669 9398';
const PHONE_TEL     = '+201556699398';

export default function Footer() {
  return (
    <footer
      dir="rtl"
      style={{
        background: 'var(--color-secondary)',
        fontFamily: "'Cairo', 'Amiri', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Amiri:wght@400;700&display=swap');

        .f-root { padding: 56px 40px 0; max-width: 1100px; margin: 0 auto; }

        .f-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
        }

        .f-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-white);
          margin: 0 0 18px;
        }

        .f-brand-name {
          font-family: 'Amiri', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--color-white);
          line-height: 1;
          margin: 0 0 14px;
        }

        .f-brand-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.9);
          line-height: 1.75;
          margin: 0 0 28px;
          max-width: 240px;
        }

        .f-social { display: flex; gap: 12px; }
        .f-social-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: none;
          background: var(--color-white);
          display: flex; align-items: center; justify-content: center;
          color: var(--color-secondary);
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .f-social-btn:hover { background: rgba(255,255,255,0.85); transform: scale(1.08); }
        .f-social-btn svg { width: 17px; height: 17px; }

        .f-info-row { display: flex; flex-direction: column; gap: 12px; }
        .f-info-item { display: flex; align-items: flex-start; gap: 11px; }
        .f-info-icon {
          width: 32px; height: 32px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .f-info-icon svg { width: 15px; height: 15px; color: rgba(255,255,255,0.9); }
        .f-info-text { font-size: 13.5px; color: rgba(255,255,255,0.9); line-height: 1.6; padding-top: 6px; }
        .f-info-link { color: rgba(255,255,255,0.9); text-decoration: none; }
        .f-info-link:hover { color: var(--color-white); }

        .f-rating {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 5px 14px;
          margin-top: 18px;
        }
        .f-rating-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; }
        .f-rating-text { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9); }

        .f-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 18px 40px;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .f-copy { font-size: 12px; color: rgba(255,255,255,0.35); }

        @media (max-width: 860px) {
          .f-root { padding: 40px 24px 0; }
          .f-grid { grid-template-columns: 1fr; gap: 36px; padding-bottom: 36px; }
          .f-bottom { padding: 16px 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="f-root">
        <div className="f-grid">

          {/* ── Brand ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <img src={LOGO_URL} alt="King Jamaica - كينج جاميكا" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <p className="f-brand-name" style={{ margin: 0, fontSize: 26, letterSpacing: '0.02em', fontFamily: "'Cairo', sans-serif" }}>King Jamaica - كينج جاميكا</p>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>Elephantine Island · Aswan</span>
              </div>
            </div>
            <p className="f-brand-sub">مطعم وكافيه على جزيرة إلفنتين في أسوان، بيقدملك مزيج فريد من الأكل النوبي والجامايكي بروح الريجي وإطلالة ساحرة على النيل.</p>
            <div className="f-social">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="f-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="f-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <p className="f-label">تواصل معانا</p>
            <div className="f-info-row">
              <div className="f-info-item">
                <span className="f-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span className="f-info-text">جزيرة إلفنتين (الجزيرة النوبية)<br/>أسوان، مصر</span>
              </div>
              <div className="f-info-item">
                <span className="f-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.96 3.38 2 2 0 0 1 3.96 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </span>
                <a href={`tel:${PHONE_TEL}`} className="f-info-text f-info-link">{PHONE_DISPLAY}</a>
              </div>
            </div>
            <div className="f-rating">
              <span className="f-rating-dot" />
              <span className="f-rating-text">تقييم 4.9 من 5 على الزيارات والتقييمات</span>
            </div>
          </div>

          {/* ── تابعنا / لينكات سريعة ── */}
          <div>
            <p className="f-label">تابعنا</p>
            <div className="f-info-row">
              <div className="f-info-item">
                <span className="f-info-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </span>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="f-info-text f-info-link">صفحتنا على فيسبوك</a>
              </div>
              <div className="f-info-item">
                <span className="f-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                  </svg>
                </span>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="f-info-text f-info-link">صفحتنا على انستجرام</a>
              </div>
              <div className="f-info-item">
                <span className="f-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-4.95A9 9 0 1 1 8.7 19.5L3 21z"/>
                  </svg>
                </span>
                <a href={`https://wa.me/${PHONE_TEL.replace('+','')}`} target="_blank" rel="noopener noreferrer" className="f-info-text f-info-link">اطلب على واتساب</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="f-bottom">
        <p className="f-copy">© {new Date().getFullYear()} King Jamaica Aswan — جميع الحقوق محفوظة</p>
        <p className="f-copy">Elephantine Island, Aswan, Egypt</p>
      </div>
    </footer>
  );
}