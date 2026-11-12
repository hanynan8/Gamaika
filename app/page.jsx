'use client';

import './styles/colors.css';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Menu from './components/Menu';
import ScrollerSection from './components/Scroller';

gsap.registerPlugin(ScrollTrigger);

const HERO_IMG = '/back.png';
const pizzas = [
  {
    id: 1,
    name: 'طاجن اللحم البلدي',
    price: '٣٥٠ جنيه',
    ingredients: 'قطع لحم مشوية · صوص وتتبيلة خاصة · فلفل أخضر · جزر · مرق غني بالتوابل',
    img: '/h1.png',
  },
  {
    id: 2,
    name: 'كفتة مشوية على الطريقة المصرية',
    price: '٣٥٠ جنيه',
    ingredients: 'كفتة لحم مشوية · أرز بالشعرية · سلطة طازة · صوص طحينة · فلفل وطماطم مشوية',
    img: '/h4.png',
  },
  {
    id: 3,
    name: 'مكرونة بشاميل باللحم المفروم',
    price: '٣٩٩ جنيه',
    ingredients: 'مكرونة · لحم مفروم متبل · صوص بشاميل كريمي · جبنة محمرة · أعشاب طازة',
    img: '/h3.png',
  },
  {
    id: 4,
    name: 'طاجن اللحم بالبطاطس',
    price: '٣٥٠ جنيه',
    ingredients: 'قطع لحم محمرة · بطاطس ذهبية · صوص طماطم غني · توابل شرقية · أعشاب طازة',
    img: '/h2.png',
  },
];// كل الصور اللي محتاجين نحملها من أول ما الصفحة تفتح
const ALL_PRELOAD_IMAGES = [HERO_IMG, ...pizzas.map((p) => p.img)];
 
// ─────────────────────────────────────────────
// HERO SECTION (fade-in now driven by GSAP instead of a raw setTimeout)
// ─────────────────────────────────────────────
function HeroSection() {
  const taglineRef = useRef(null);
  const titleRef = useRef(null);
 
  useEffect(() => {
    const el = taglineRef.current;
    const titleEl = titleRef.current;
    if (!el || !titleEl) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      );
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.6 }
      );
    });
    return () => ctx.revert();
  }, []);
 
  return (
    <main
      className="relative text-white overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url('${HERO_IMG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        minHeight: '120vh',
        paddingTop: '84px',
      }}
    >
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 mb-16">
        <h1
          ref={titleRef}
          className="font-['Cairo'] text-4xl md:text-5xl font-bold mb-4 tracking-wide"
          style={{ opacity: 0, color: 'var(--color-secondary)' }}
        >
        </h1>
        <div className="flex items-center gap-3 mb-2">
          <span className="block w-12 h-[1px] bg-white/40" />
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/40 fill-current" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.93V15h2v1.93c-0.32 0.05-0.66 0.07-1 0.07s-0.68-0.02-1-0.07zm4.92-1.45l-1.37-1.37c0.26-0.44 0.45-0.93 0.45-1.11 0-1.1-0.9-2-2-2s-2 0.9-2 2c0 0.18 0.19 0.67 0.45 1.11l-1.37 1.37C9.27 14.46 9 13.26 9 12c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.26-0.27 2.46-1.08 3.48zM6.34 17.66l1.41-1.41c0.78 0.78 1.8 1.25 2.25 1.25v2c-1.38 0-2.63-0.56-3.66-1.84zM5 12c0-0.34 0.02-0.68 0.07-1H7v2H5.07C5.02 12.68 5 12.34 5 12zm2.75-4.66L6.34 6.34C7.37 5.06 8.62 4.5 10 4.5v2c-0.45 0-1.47 0.47-2.25 1.25zM11 7.07V5.07c0.32-0.05 0.66-0.07 1-0.07s0.68 0.02 1 0.07v2c-0.32-0.05-0.66-0.07-1-0.07s-0.68 0.02-1 0.07z" />
          </svg>
          <span className="block w-12 h-[1px] bg-white/40" />
        </div>
        <p ref={taglineRef} className="font-['Cairo'] max-w-xs text-[17px] leading-relaxed mb-6" style={{ opacity: 0, color: 'var(--color-white)' }}>
          One Love ❤️💛💚
        </p>
        <a
          href="#menu"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:opacity-90 font-bold px-10 py-3 transition-opacity duration-200 cursor-pointer font-['Cairo'] text-base inline-block text-center no-underline"
          style={{ background: 'var(--color-primary)', color: 'var(--color-secondary)' }}
        >
          تصفح المينيو
        </a>
      </section>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-[var(--color-secondary)]/5 blur-[120px]" />
      </div>
    </main>
  );
}
// ─────────────────────────────────────────────
// PIZZA SECTION
// Scroll tracking: ScrollTrigger (instead of manual scroll listener + rAF)
// Slide transition: gsap.timeline() (instead of the setTimeout state machine)
// Corner text fade: gsap.to() (instead of a CSS opacity transition keyed off state)
// ─────────────────────────────────────────────
function PizzaSection() {
  const [current, setCurrent] = useState(0);
 
  const isAnimating  = useRef(false);
  const wrapperRef   = useRef(null);
  const sectionRef   = useRef(null);
  const canvasRef    = useRef(null);
  const imgInnerRef  = useRef(null);
  const cornerRefs   = useRef([]);
  const particlesRef = useRef([]);
  const rafRef       = useRef(null);
  const currentRef   = useRef(0);
  const total        = pizzas.length;
 
  useEffect(() => { currentRef.current = current; }, [current]);
 
  const INGREDIENT_IMAGES = useRef({});
  useEffect(() => {
    const urls = {
      meat:    'https://em-content.zobj.net/source/apple/354/cut-of-meat_1f969.png',
      cheese:  'https://em-content.zobj.net/source/apple/354/cheese-wedge_1f9c0.png',
      chicken: 'https://em-content.zobj.net/source/apple/354/poultry-leg_1f357.png',
    };
    Object.entries(urls).forEach(([key, url]) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => { INGREDIENT_IMAGES.current[key] = img; };
    });
  }, []);
 
  // Particle canvas engine is independent of the scroll/animation library choice — left as-is.
  // ملاحظة: ألوان الكاتشب والجبنة هنا ألوان أكل حقيقية (مش ألوان هوية الموقع)
  // فسايبينها زي ما هي عمدًا وملهاش علاقة بملف الألوان.
  const spawnParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const newP = [];
    const types = ['meat', 'cheese', 'chicken', 'meat', 'cheese', 'meat', 'chicken', 'cheese'];
    types.forEach((type) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 0.8);
      const speed = 10 + Math.random() * 14;
      newP.push({ kind:'image', type, x:cx+(Math.random()-.5)*60, y:cy+(Math.random()-.5)*20, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, size:30+Math.random()*24, rot:Math.random()*Math.PI*2, vrot:(Math.random()-.5)*0.2, gravity:0, alpha:1, life:1, decay:0.045+Math.random()*0.03 });
    });
    for (let i=0;i<10;i++) {
      const angle=-Math.PI/2+(Math.random()-.5)*(Math.PI*0.7);
      const speed=7+Math.random()*12;
      newP.push({ kind:'ketchup', x:cx+(Math.random()-.5)*50, y:cy+(Math.random()-.5)*20, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, size:6+Math.random()*12, rot:Math.random()*Math.PI*2, vrot:(Math.random()-.5)*0.18, gravity:0, alpha:1, life:1, decay:0.05+Math.random()*0.03, trail:[] });
    }
    for (let i=0;i<5;i++) {
      const angle=-Math.PI/2+(Math.random()-.5)*(Math.PI*0.6);
      const speed=6+Math.random()*9;
      newP.push({ kind:'cheeseString', x:cx+(Math.random()-.5)*40, y:cy+(Math.random()-.5)*20, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed, len:20+Math.random()*28, width:5+Math.random()*6, rot:Math.random()*Math.PI*2, vrot:(Math.random()-.5)*0.2, gravity:0, alpha:1, life:1, decay:0.05+Math.random()*0.025 });
    }
    particlesRef.current = [...particlesRef.current, ...newP];
  }, []);
 
  const drawKetchupBlob = (ctx, x, y, size, rot) => {
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
    ctx.beginPath();
    const spikes=7;
    for (let i=0;i<spikes*2;i++) { const a=(Math.PI*2*i)/(spikes*2); const r=i%2===0?size:size*(0.45+Math.random()*0.2); i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r); }
    ctx.closePath(); ctx.fillStyle=`rgba(180,20,20,${ctx.globalAlpha})`; ctx.fill();
    ctx.beginPath(); ctx.arc(-size*.2,-size*.25,size*.18,0,Math.PI*2); ctx.fillStyle=`rgba(230,60,60,${ctx.globalAlpha*.6})`; ctx.fill();
    ctx.restore();
  };
 
  const drawCheeseString = (ctx, x, y, len, width, rot) => {
    ctx.save(); ctx.translate(x,y); ctx.rotate(rot);
    ctx.beginPath(); ctx.ellipse(0,0,width/2,len/2,0,0,Math.PI*2); ctx.fillStyle=`rgba(255,210,50,${ctx.globalAlpha})`; ctx.fill();
    ctx.beginPath(); ctx.ellipse(-width*.15,-len*.2,width*.2,len*.15,0,0,Math.PI*2); ctx.fillStyle=`rgba(255,240,150,${ctx.globalAlpha*.5})`; ctx.fill();
    ctx.restore();
  };
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { const s=sectionRef.current; if(!s) return; canvas.width=s.offsetWidth; canvas.height=s.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const loop = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particlesRef.current = particlesRef.current.filter(p=>p.life>0);
      particlesRef.current.forEach(p => {
        p.x+=p.vx; p.y+=p.vy; p.vy+=p.gravity; p.vx*=0.985; p.rot+=p.vrot; p.life-=p.decay; p.alpha=Math.max(0,p.life);
        ctx.globalAlpha=p.alpha;
        if (p.kind==='image') { const img=INGREDIENT_IMAGES.current[p.type]; if(img){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.drawImage(img,-p.size/2,-p.size/2,p.size,p.size);ctx.restore();} }
        else if (p.kind==='ketchup') { if(Math.random()<.25&&p.life>.3)p.trail.push({x:p.x,y:p.y,r:p.size*.3*Math.random(),a:p.alpha*.6}); p.trail.forEach(d=>{ctx.globalAlpha=d.a*p.alpha;ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle='rgba(160,10,10,1)';ctx.fill();}); ctx.globalAlpha=p.alpha; drawKetchupBlob(ctx,p.x,p.y,p.size,p.rot); }
        else if (p.kind==='cheeseString') { drawCheeseString(ctx,p.x,p.y,p.len,p.width,p.rot); }
        ctx.globalAlpha=1;
      });
      rafRef.current=requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize',resize); };
  }, []);
 
  // Slide transition — one GSAP timeline instead of four chained setTimeouts.
  // The <img> keeps its DOM identity (no `key={current}` remount), so GSAP's
  // transform on the wrapping div survives the src swap that happens mid-timeline.
  const goTo = useCallback((next, dir) => {
    if (isAnimating.current || next === currentRef.current) return;
    isAnimating.current = true;
    const el = imgInnerRef.current;
    if (!el) { isAnimating.current = false; return; }
 
    const tl = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => { isAnimating.current = false; },
    });
 
    tl.to(el, {
        x: dir > 0 ? '12vw' : '-12vw',
        duration: 0.14,
        ease: 'power1.out',
      })
      .to(el, {
        x: dir > 0 ? '-120vw' : '120vw',
        rotate: dir > 0 ? -22 : 22,
        scale: 0.7,
        opacity: 0,
        duration: 0.24,
        ease: 'power2.in',
        onComplete: () => {
          setCurrent(next);
          currentRef.current = next;
        },
      })
      .set(el, {
        x: dir > 0 ? '120vw' : '-120vw',
        rotate: dir > 0 ? 22 : -22,
        scale: 0.7,
        opacity: 0,
      })
      .to(el, {
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 0.42,
        ease: 'power3.out',
        onStart: () => { gsap.delayedCall(0.12, spawnParticles); },
      });
  }, [spawnParticles]);
 
  // Corner labels/prices/ingredients fade — gsap.to() instead of a CSS
  // transition keyed off inline style + React state.
  useEffect(() => {
    cornerRefs.current.forEach((el, idx) => {
      if (!el) return;
      gsap.to(el, {
        opacity: idx === current ? 1 : 0.3,
        duration: 0.35,
        ease: 'power2.out',
      });
    });
  }, [current]);
 
  // Scroll tracking — ScrollTrigger instead of a manual scroll listener +
  // getBoundingClientRect + requestAnimationFrame throttle. The section stays
  // pinned via CSS `position: sticky` (already correct for this layout), so
  // ScrollTrigger here is only used to read progress and snap between steps.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
 
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: (value) => Math.round(value * (total - 1)) / (total - 1),
        duration: 0.4,
        ease: 'power2.inOut',
      },
      onUpdate: (self) => {
        const idx = Math.min(total - 1, Math.floor(self.progress * total));
        if (idx !== currentRef.current) {
          goTo(idx, idx > currentRef.current ? 1 : -1);
        }
      },
    });
 
    return () => st.kill();
  }, [goTo, total]);
 
  const pizza = pizzas[current];
  const NAV_H = 84;
 
  return (
    <div ref={wrapperRef} style={{ position: 'relative', height: `${total * 55 + 40}vh` }}>
      <section
        ref={sectionRef}
        dir="rtl"
        className="relative bg-white overflow-hidden"
        style={{ height: `calc(100vh - ${NAV_H}px)`, position: 'sticky', top: NAV_H }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');
 
          .ps-corner { position:absolute; z-index:6; display:flex; flex-direction:column; max-width:36vw; }
          .ps-corner.pos-tr, .ps-corner.pos-br { align-items:flex-end; text-align:right; }
          .ps-corner.pos-tl, .ps-corner.pos-bl { align-items:flex-start; text-align:left; }
          .ps-corner.pos-tr { top:72px; right:40px; }
          .ps-corner.pos-tl { top:72px; left:40px; }
          .ps-corner.pos-br { bottom:72px; right:40px; }
          .ps-corner.pos-bl { bottom:72px; left:40px; }
 
          .ps-corner-name-btn { background:none; border:none; padding:0; margin:0 0 2px; cursor:pointer; font-family:'Cairo',serif; font-size:clamp(1.25rem,2.3vw,1.9rem); font-weight:700; color:var(--color-secondary); line-height:1.05; transition:opacity 0.2s; }
          .ps-corner-name-btn.inactive { color:#ccc; }
          .ps-corner-name-btn.inactive:hover { color:var(--color-secondary); }
          .ps-corner-price { font-family:'Cairo',sans-serif; font-size:1rem; font-weight:900; color:var(--color-secondary); margin-bottom:2px; }
          .ps-corner-divider { width:28px; height:1px; background:var(--color-border); margin-bottom:2px; }
          .ps-corner-ingredients { font-family:'Cairo',sans-serif; font-size:16px; color:#999; line-height:1.55; margin:0; }
 
          @media (max-width:768px) {
            .ps-corner { max-width:48vw; }
            .ps-corner-name-btn { font-size:clamp(1.05rem,4.6vw,1.5rem); margin-bottom:2px; }
            .ps-corner-price { font-size:0.85rem; margin-bottom:2px; }
            .ps-corner-divider { margin-bottom:2px; }
            .ps-corner-ingredients { font-size:12.5px; line-height:1.45; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
            .ps-corner.pos-tr, .ps-corner.pos-tl { top:36px; }
            .ps-corner.pos-br, .ps-corner.pos-bl { bottom:36px; }
            .ps-corner.pos-tr, .ps-corner.pos-br { right:14px; }
            .ps-corner.pos-tl, .ps-corner.pos-bl { left:14px; }
          }
 
          .ps-center-stack { position:absolute; inset:0; display:grid; place-items:center; z-index:3; pointer-events:none; }
          .ps-ring { grid-area:1/1; border-radius:50%; pointer-events:none; }
          .ps-img-inner { grid-area:1/1; display:flex; align-items:center; justify-content:center; will-change:transform,opacity; }
          .ps-center-img { display:block; width:min(84vw,88vh,720px); max-width:96vw; height:auto; filter:drop-shadow(0 32px 64px rgba(var(--color-secondary-rgb),0.18)); }
 
          .ps-progress { position:absolute; bottom:14px; left:50%; transform:translateX(-50%); z-index:10; display:flex; align-items:center; gap:10px; }
          .ps-progress-dot { width:6px; height:6px; border-radius:50%; background:#ddd; transition:background 0.3s,transform 0.3s; }
          .ps-progress-dot.active { background:var(--color-primary); transform:scale(1.4); }
        `}</style>
 
        <canvas ref={canvasRef} style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none' }} />
 
        {[
          { pos: 'pos-tr', idx: 0 },
          { pos: 'pos-tl', idx: 1 },
          { pos: 'pos-br', idx: 2 },
          { pos: 'pos-bl', idx: 3 },
        ].map(({ pos, idx }) => {
          const p = pizzas[idx];
          const isActive = current === idx;
          return (
            <div
              key={pos}
              ref={(el) => { cornerRefs.current[idx] = el; }}
              className={`ps-corner ${pos}`}
            >
              <button onClick={() => goTo(idx, idx > current ? 1 : -1)} className={`ps-corner-name-btn${isActive ? '' : ' inactive'}`}>
                {p.name}
              </button>
              <div className="ps-corner-price">{p.price}</div>
              <div className="ps-corner-divider" />
              <p className="ps-corner-ingredients">{p.ingredients}</p>
            </div>
          );
        })}
 
        <div className="ps-center-stack">
          <div className="ps-ring" style={{ width:'min(68vw,72vh,740px)', height:'min(68vw,72vh,740px)', border:'1px solid rgba(var(--color-secondary-rgb),0.06)' }} />
          <div className="ps-ring" style={{ width:'min(78vw,82vh,840px)', height:'min(78vw,82vh,840px)', border:'1px solid rgba(var(--color-secondary-rgb),0.03)' }} />
          <div ref={imgInnerRef} className="ps-img-inner">
            <img src={pizza.img} alt={pizza.name} className="ps-center-img" />
          </div>
        </div>
 
        <div className="ps-progress">
          {pizzas.map((_, i) => (
            <div key={i} className={`ps-progress-dot${current === i ? ' active' : ''}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
 
// ─────────────────────────────────────────────
// PAGE EXPORT
// ─────────────────────────────────────────────
export default function Page() {
  // نحمّل كل صور الهيرو والأطباق مرة واحدة من أول ما الصفحة تفتح،
  // عشان لما اليوزر يوصلهم بالـ scroll يكونوا جاهزين في كاش المتصفح فورًا.
  useEffect(() => {
    ALL_PRELOAD_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);
 
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <PizzaSection />
      <div id="story">
        <ScrollerSection />
      </div>
      <div id="menu">
        <Menu />
      </div>
    </>
  );
}
 