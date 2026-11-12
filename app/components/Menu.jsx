'use client';

import '../styles/colors.css';
import { useState, useMemo } from 'react';

// ─── رقم واتساب المطعم (بالكود الدولي، من غير + أو أصفار زيادة) ──────────────
const WHATSAPP_NUMBER = '+201556699398';

// ─── صور افتراضية لكل قسم (استبدلها بصور المطعم الحقيقية) ───────────────────
const CATEGORY_IMAGES = {
  jerk_chicken:    'https://images.unsplash.com/photo-1598515213692-d872f5c8d3ae?w=600&h=700&fit=crop&crop=center',
  tagines:         'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&h=700&fit=crop&crop=center',
  seafood:         'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=700&fit=crop&crop=center',
  nubian_specials: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=700&fit=crop&crop=center',
  appetizers:      'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&h=700&fit=crop&crop=center',
  juices:          'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&h=700&fit=crop&crop=center',
  breakfast:       'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=700&fit=crop&crop=center',
  desserts:        'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=700&fit=crop&crop=center',
};

const SIZE_LABELS = { S: 'صغير', M: 'وسط', L: 'كبير' };
const SIZE_ORDER = ['S', 'M', 'L'];

// صورة احتياطية تظهر تلقائيًا لو الرابط الأصلي فشل (403/404/حظر شبكة...)
// ملاحظة: دي صورة SVG جوه data-URI منفصلة عن صفحة الموقع، فمش بتقدر تقرأ
// متغيرات CSS بتاعتنا. عشان كدا سايبين ألوانها ثابتة عن قصد.
const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#FBF8F1"/><text x="50%" y="50%" font-family="sans-serif" font-size="40" text-anchor="middle" dominant-baseline="middle" fill="#F2B705">🍗</text></svg>`
  );

function handleImgError(e) {
  if (e.target.src !== PLACEHOLDER_IMG) e.target.src = PLACEHOLDER_IMG;
}

// ═══════════════════════════════════════════════════════════════════════════
// بيانات المنيو — King Jamaica Restaurant & Cafe (جزيرة إلفنتين، أسوان)
// ملاحظة: الأصناف دي مبنية على وصف المطعم المعروف (مزيج نوبي-جامايكي، جيرك
// تشيكن، طواجن، عصائر طازة...) والأسعار تقريبية للتوضيح فقط — لازم تراجعها
// وتعدّلها بالأسعار والأصناف الفعلية من المطعم.
// ═══════════════════════════════════════════════════════════════════════════
const MENU_DATA = {
  jerk_chicken: {
    label_ar: 'جيرك تشيكن',
    label_en: 'jerk chicken',
    items: [
      { name_ar: 'جيرك تشيكن نص فرخة',      name_en: 'Jerk Chicken Half',        price: 250 },
      { name_ar: 'جيرك تشيكن فرخة كاملة',   name_en: 'Jerk Chicken Whole',       price: 450 },
      { name_ar: 'جيرك تشيكن سكيورز',       name_en: 'Jerk Chicken Skewers',     price: 180 },
      { name_ar: 'جيرك تشيكن ويجز',         name_en: 'Jerk Chicken Wings',       price: 165 },
      { name_ar: 'جيرك تشيكن مع أرز وبيجن بيز', name_en: 'Jerk Chicken with Rice & Peas', price: 270 },
    ],
  },
  tagines: {
    label_ar: 'طواجن نوبية',
    label_en: 'tagines',
    items: [
      { name_ar: 'طاجن لحم الجمل',          name_en: 'Camel Meat Tagine',   price: 320 },
      { name_ar: 'طاجن فراخ نوبي',          name_en: 'Nubian Chicken Tagine', price: 220 },
      { name_ar: 'طاجن لحم ضاني',           name_en: 'Lamb Tagine',         price: 300 },
      { name_ar: 'طاجن خضار بلدي',          name_en: 'Vegetable Tagine',    price: 150 },
    ],
  },
  seafood: {
    label_ar: 'أسماك وجمبري',
    label_en: 'seafood',
    items: [
      { name_ar: 'سمك بلطي مشوي',           name_en: 'Grilled Tilapia',     price: 220 },
      { name_ar: 'جمبري بالثوم والليمون',    name_en: 'Garlic Lemon Shrimp', price: 280 },
      { name_ar: 'كاري جمبري كاريبي',       name_en: 'Caribbean Shrimp Curry', price: 300 },
      { name_ar: 'سمك النيل بالتوابل',      name_en: 'Nile Fish Spiced',    price: 240 },
    ],
  },
  nubian_specials: {
    label_ar: 'أطباق نوبية مميزة',
    label_en: 'nubian specials',
    items: [
      { name_ar: 'الحمام المحشي',            name_en: 'Stuffed Pigeon',       price: 280 },
      { name_ar: 'ملوخية نوبي بالأرانب',      name_en: 'Nubian Molokhia',      price: 210 },
      { name_ar: 'فتة نوبية',                name_en: 'Nubian Fatta',         price: 190 },
      { name_ar: 'كباب حلة',                 name_en: 'Kabab Hala',           price: 260 },
    ],
  },
  appetizers: {
    label_ar: 'مقبلات',
    label_en: 'appetizers',
    items: [
      { name_ar: 'بطاطس بالتوابل الجامايكية', name_en: 'Jamaican Spiced Fries', price: 65 },
      { name_ar: 'سلطة نوبية',                name_en: 'Nubian Salad',          price: 55 },
      { name_ar: 'بلانتين مقلي',              name_en: 'Fried Plantain',        price: 75 },
      { name_ar: 'حمص بالطحينة',              name_en: 'Hummus with Tahini',    price: 60 },
      { name_ar: 'باذنجان بالطحينة',          name_en: 'Eggplant with Tahini',  price: 55 },
      { name_ar: 'خبز بلدي وزيتون',           name_en: 'Bread & Olives',        price: 40 },
    ],
  },
  juices: {
    label_ar: 'عصائر ومشروبات',
    label_en: 'juices & drinks',
    items: [
      { name_ar: 'عصير الكركديه والمانجا',    name_en: 'Hibiscus Mango Juice', price: 85 },
      { name_ar: 'عصير مانجا طازة',          name_en: 'Fresh Mango Juice',    price: 75 },
      { name_ar: 'عصير كركديه بارد',         name_en: 'Cold Hibiscus',        price: 60 },
      { name_ar: 'ليمون بالنعناع',           name_en: 'Lemon Mint',           price: 55 },
      { name_ar: 'شاي نوبي بالتوابل',        name_en: 'Nubian Spiced Tea',    price: 40 },
      { name_ar: 'قهوة تركي',                name_en: 'Turkish Coffee',       price: 35 },
      { name_ar: 'مياه معدنية',              name_en: 'Water',                price: 15 },
    ],
  },
  breakfast: {
    label_ar: 'فطار',
    label_en: 'breakfast',
    items: [
      { name_ar: 'فطار نوبي كامل',           name_en: 'Full Nubian Breakfast', price: 150 },
      { name_ar: 'فول وطعمية',               name_en: 'Foul & Falafel',        price: 90  },
      { name_ar: 'بيض بالجبنة',              name_en: 'Eggs with Cheese',      price: 85  },
      { name_ar: 'عيش شمسي بالعسل والطحينة', name_en: 'Sun Bread with Honey & Tahini', price: 70 },
      { name_ar: 'بان كيك بالفواكه',         name_en: 'Fruit Pancake',         price: 110 },
    ],
  },
  desserts: {
    label_ar: 'حلويات',
    label_en: 'desserts',
    items: [
      { name_ar: 'أم علي',                   name_en: 'Om Ali',              price: 75 },
      { name_ar: 'كنافة بالقشطة',            name_en: 'Kunafa with Cream',    price: 85 },
      { name_ar: 'موز بالشوكولاتة',          name_en: 'Banana with Chocolate', price: 65 },
      { name_ar: 'سلطة فواكه طازة',          name_en: 'Fresh Fruit Salad',    price: 70 },
    ],
  },
};

// ─── وصف مختصر لكل قسم بالعربي ──────────────────────────────────────────────
function descriptionFor(catKey) {
  const descriptions = {
    jerk_chicken:    'دجاج متبل بتوابل الجيرك الجامايكية الأصلية ومشوي على الفحم',
    tagines:         'طواجن نوبية تتطهى ببطء على نار هادئة بتوابل مميزة',
    seafood:         'أسماك وجمبري طازة من النيل والبحر الأحمر',
    nubian_specials: 'وصفات نوبية أصيلة من مطبخ العائلة',
    appetizers:      'مقبلات خفيفة تجمع بين النكهة المصرية والكاريبية',
    juices:          'عصائر ومشروبات طازة من فواكه أسوان المحلية',
    breakfast:       'فطار نوبي دافئ لبداية يوم مثالية على النيل',
    desserts:        'حلويات شرقية وكاريبية تختم بيها وجبتك',
  };
  return descriptions[catKey] || 'من مطبخنا بأيدي أمينة';
}

// ─── استخراج الفئات من بيانات المنيو الثابتة ─────────────────────────────────
function parseCategories(menuData) {
  if (!menuData) return [];
  return Object.entries(menuData)
    .filter(([, cat]) => cat?.items?.length)
    .map(([key, cat]) => ({
      key,
      label_ar: cat.label_ar,
      label_en: (cat.label_en || key).toUpperCase(),
      img: CATEGORY_IMAGES[key] || CATEGORY_IMAGES.jerk_chicken,
      items: cat.items,
    }));
}

// ─── أحجام/أسعار المنتج ──────────────────────────────────────────────────────
function getVariants(item) {
  if (item.price != null) {
    return [{ key: 'default', label: null, price: item.price }];
  }
  const variants = SIZE_ORDER
    .filter((k) => item[k] != null)
    .map((k) => ({ key: k, label: SIZE_LABELS[k], price: item[k] }));
  return variants.length ? variants : [{ key: 'default', label: null, price: null }];
}

function startingPrice(item) {
  const prices = getVariants(item).map((v) => v.price).filter((p) => p != null);
  return prices.length ? Math.min(...prices) : null;
}

function itemUID(catKey, item) {
  return `${catKey}::${item.name_en || item.name_ar}`;
}

// ─── رسالة الواتساب ──────────────────────────────────────────────────────────
function buildWhatsAppMessage(cart, total) {
  const lines = cart.map(
    (c) => `• ${c.name_ar}${c.variantLabel ? ` (${c.variantLabel})` : ''} × ${c.qty} — ${c.price * c.qty} ج.م`
  );
  return encodeURIComponent(
    ['أهلاً 👋، عايز أطلب:', '', ...lines, '', `الإجمالي: ${total} ج.م`].join('\n')
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// كارت المنتج (صفحة التفاصيل)
// ═══════════════════════════════════════════════════════════════════════════
function ProductCard({ item, catKey, selectedVariant, onSelectVariant, onAdd, justAdded }) {
  const variants = useMemo(() => getVariants(item), [item]);
  const hasVariants = variants.length > 1;
  const activeVariant =
    variants.find((v) => v.key === selectedVariant) || variants[0];
  const from = startingPrice(item);

  return (
    <div className="product-card">
      <div className="product-card-img-wrap">
        <img
          src={CATEGORY_IMAGES[catKey] || CATEGORY_IMAGES.jerk_chicken}
          alt={item.name_ar}
          className="product-card-img"
          onError={handleImgError}
        />
      </div>
      <div className="product-card-body">
        <div className="product-card-top">
          <span className="product-card-price">
            {from != null ? (hasVariants ? `يبدأ من ${from} ج.م` : `${from} ج.م`) : '—'}
          </span>
          <span className="product-card-name">{item.name_ar}</span>
        </div>
        <p className="product-card-desc">{descriptionFor(catKey)}</p>

        {hasVariants && (
          <div className="size-row">
            {variants.map((v) => (
              <button
                key={v.key}
                className={`size-chip${activeVariant.key === v.key ? ' active' : ''}`}
                onClick={() => onSelectVariant(v.key)}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <button
          className={`add-btn${justAdded ? ' added' : ''}`}
          onClick={() => onAdd(activeVariant)}
        >
          {justAdded ? 'اتضاف ✓' : '+ أضف للسلة'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// الكومبوننت الرئيسي
// ═══════════════════════════════════════════════════════════════════════════
export default function MenuSection() {
  // البيانات ستاتيك بالكامل — من غير fetch ولا loading ولا error state
  const categories = useMemo(() => parseCategories(MENU_DATA), []);

  const [view, setView]               = useState('categories'); // 'categories' | 'detail'
  const [activeCategoryKey, setActiveCategoryKey] = useState(null);
  const [selectedVariants, setSelectedVariants]   = useState({}); // uid -> variantKey
  const [justAddedUid, setJustAddedUid]           = useState(null);

  const [cart, setCart]         = useState([]); // [{ uid, catKey, name_ar, variantKey, variantLabel, price, qty }]
  const [cartOpen, setCartOpen] = useState(false);

  const activeCategory = categories.find((c) => c.key === activeCategoryKey) || null;

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartTotal = cart.reduce((sum, c) => sum + c.qty * c.price, 0);

  function openCategory(key) {
    setActiveCategoryKey(key);
    setView('detail');
    window.scrollTo({ top: document.getElementById('menu')?.offsetTop ?? 0, behavior: 'smooth' });
  }

  function addToCart(catKey, item, variant) {
    const uid = itemUID(catKey, item);
    const cartId = `${uid}::${variant.key}`;
    setCart((prev) => {
      const existing = prev.find((c) => c.cartId === cartId);
      if (existing) {
        return prev.map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + 1 } : c));
      }
      return [
        ...prev,
        {
          cartId,
          catKey,
          name_ar: item.name_ar,
          img: CATEGORY_IMAGES[catKey] || CATEGORY_IMAGES.jerk_chicken,
          variantKey: variant.key,
          variantLabel: variant.label,
          price: variant.price,
          qty: 1,
        },
      ];
    });
    setJustAddedUid(cartId);
    setTimeout(() => setJustAddedUid(null), 1100);
  }

  function changeQty(cartId, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.cartId === cartId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  function checkoutOnWhatsApp() {
    if (!cart.length) return;
    const msg = buildWhatsAppMessage(cart, cartTotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  }

  return (
    <section className="ms-root" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');

        .ms-root {
          position: relative;
          background: var(--color-off-white);
          padding: 72px 0 120px;
          font-family: 'Cairo', sans-serif;
          min-height: 100vh;
        }

        .ms-eyebrow { text-align: center; margin-bottom: 40px; padding: 0 24px; }
        .ms-eyebrow-rule { display: flex; align-items: center; gap: 20px; max-width: 480px; margin: 0 auto; }
        .ms-eyebrow-rule-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, #c8a882, transparent); display: block; }
        .ms-eyebrow-tag { font-size: 1rem; font-weight: 700; letter-spacing: 0.22em; color: var(--color-secondary); text-transform: uppercase; flex-shrink: 0; }

        .ms-grid-wrapper { max-width: 1120px; margin: 0 auto; padding: 0 24px; }

        /* ── سلة عائمة أعلى الصفحة ── */
        .cart-fab {
          position: fixed; top: 100px; left: 20px; z-index: 40;
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--color-primary); color: var(--color-secondary); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
          transition: transform 0.2s;
        }
        .cart-fab:hover { transform: scale(1.06); }
        .cart-fab-badge {
          position: absolute; top: -4px; right: -4px;
          background: var(--color-secondary); color: var(--color-white); font-size: 11px; font-weight: 800;
          min-width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px; border: 2px solid var(--color-off-white);
        }

        /* ── شبكة الفئات ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        @media (min-width: 900px) { .cat-grid { grid-template-columns: repeat(3, 1fr); } }

        .cat-card {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 18px;
          overflow: hidden;
          border: none;
          cursor: pointer;
          display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
          padding: 22px 16px;
          transition: transform 0.25s ease;
        }
        .cat-card:hover { transform: translateY(-4px); }
        .cat-card-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          background: var(--color-border);
        }
        .cat-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,5,0,0.78) 0%, rgba(10,5,0,0.15) 55%, rgba(10,5,0,0.05) 100%);
        }
        .cat-card-name {
          position: relative; z-index: 1;
          font-family: 'Amiri', serif;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          font-weight: 700;
          color: var(--color-white);
          letter-spacing: 0.04em;
          margin-bottom: 12px;
          text-align: center;
        }
        .cat-card-btn {
          position: relative; z-index: 1;
          background: rgba(var(--color-primary-rgb),0.9);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.5);
          color: var(--color-secondary);
          font-size: 12px; font-weight: 700;
          padding: 8px 20px;
          border-radius: 100px;
        }

        /* ── صفحة التفاصيل ── */
        .pills-row {
          display: flex; gap: 10px; overflow-x: auto;
          padding: 4px 2px 16px;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .pills-row::-webkit-scrollbar { display: none; }
        .pill {
          flex-shrink: 0;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 13px; font-weight: 700;
          padding: 10px 20px;
          border-radius: 100px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .pill.active { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-secondary); }

        .detail-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px;
        }
        .detail-title {
          font-family: 'Amiri', serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: var(--color-secondary);
        }
        .back-link {
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-weight: 700; color: var(--color-text-muted-light);
          display: flex; align-items: center; gap: 4px;
        }
        .back-link:hover { color: var(--color-secondary); }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (min-width: 900px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 560px) { .product-grid { grid-template-columns: 1fr; } }

        .product-card {
          background: var(--color-white);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--color-border);
          display: flex; flex-direction: column;
        }
        .product-card-img-wrap { aspect-ratio: 4/3; overflow: hidden; }
        .product-card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .product-card-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .product-card-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
        .product-card-price { font-size: 12px; font-weight: 800; color: var(--color-secondary); white-space: nowrap; }
        .product-card-name { font-size: 14px; font-weight: 700; color: var(--color-secondary); text-align: left; }
        .product-card-desc { font-size: 11.5px; color: var(--color-text-muted-light); line-height: 1.5; min-height: 32px; }

        .size-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .size-chip {
          font-size: 11px; font-weight: 700;
          border: 1px solid var(--color-border); background: var(--color-white); color: var(--color-text-muted);
          padding: 5px 12px; border-radius: 100px; cursor: pointer;
          transition: all 0.15s;
        }
        .size-chip.active { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-secondary); }

        .add-btn {
          margin-top: auto;
          background: var(--color-primary); color: var(--color-secondary); border: none;
          font-size: 13px; font-weight: 700;
          padding: 11px; border-radius: 10px; cursor: pointer;
          transition: background 0.2s;
        }
        .add-btn:hover { background: var(--color-primary-hover); }
        .add-btn.added { background: var(--color-success); color: var(--color-white); }

        /* ── شريط السلة العائم أسفل الصفحة ── */
        .checkout-bar-wrap {
          position: fixed; bottom: 20px; left: 0; right: 0;
          display: flex; justify-content: center; z-index: 45;
          padding: 0 16px;
          pointer-events: none;
        }
        .checkout-bar {
          pointer-events: auto;
          background: var(--color-secondary);
          color: var(--color-white);
          border-radius: 100px;
          display: flex; align-items: center; gap: 14px;
          padding: 8px 8px 8px 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          max-width: 460px; width: 100%;
        }
        .checkout-bar-count {
          font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.7); white-space: nowrap;
        }
        .checkout-bar-total {
          font-size: 14px; font-weight: 800; margin-inline-start: auto; white-space: nowrap;
        }
        .checkout-bar-btn {
          background: var(--color-whatsapp); color: var(--color-white); border: none;
          font-size: 13px; font-weight: 700;
          padding: 11px 18px; border-radius: 100px; cursor: pointer;
          display: flex; align-items: center; gap: 8px; white-space: nowrap;
        }

        /* ── لوحة السلة ── */
        .cart-overlay {
          position: fixed; inset: 0; background: rgba(10,5,0,0.5); z-index: 60;
          display: flex; justify-content: flex-end;
        }
        .cart-panel {
          background: var(--color-white); width: 100%; max-width: 400px; height: 100%;
          padding: 22px; overflow-y: auto;
          display: flex; flex-direction: column;
          animation: cart-slide-in 0.25s ease;
        }
        @keyframes cart-slide-in { from { transform: translateX(-24px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .cart-panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .cart-panel-title { font-family: 'Amiri', serif; font-size: 1.6rem; font-weight: 700; color: var(--color-secondary); }
        .cart-close { background: var(--color-off-white); border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 15px; color: var(--color-text-muted); }
        .cart-empty { text-align: center; color: var(--color-text-muted-light); padding: 60px 0; font-size: 13px; }

        .cart-line { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--color-border); }
        .cart-line-img { width: 52px; height: 52px; border-radius: 12px; object-fit: cover; flex-shrink: 0; background: var(--color-off-white); }
        .cart-line-body { flex: 1; min-width: 0; }
        .cart-line-name { font-size: 13px; font-weight: 700; color: var(--color-secondary); }
        .cart-line-variant { font-size: 11px; color: var(--color-text-muted-light); }
        .cart-line-price { font-size: 12px; font-weight: 700; color: var(--color-secondary); margin-top: 2px; }
        .qty-stepper { display: flex; align-items: center; gap: 8px; }
        .qty-btn {
          width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--color-border);
          background: var(--color-white); cursor: pointer; font-size: 14px; color: var(--color-secondary);
          display: flex; align-items: center; justify-content: center;
        }
        .qty-val { font-size: 13px; font-weight: 700; min-width: 16px; text-align: center; }

        .cart-panel-footer { margin-top: auto; padding-top: 16px; }
        .cart-panel-total { display: flex; justify-content: space-between; font-weight: 800; font-size: 15px; color: var(--color-secondary); margin-bottom: 14px; }
        .cart-panel-checkout {
          width: 100%; background: var(--color-whatsapp); color: var(--color-white); border: none;
          font-size: 14px; font-weight: 700; padding: 14px; border-radius: 12px; cursor: pointer;
        }

        .ms-error { text-align: center; color: var(--color-secondary); padding: 60px 24px; font-size: 14px; }
      `}</style>

      {/* زرار السلة العائم */}
      {cartCount > 0 && (
        <button className="cart-fab" onClick={() => setCartOpen(true)} aria-label="السلة">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.7L21 8H6" stroke="var(--color-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="21" r="1.4" fill="var(--color-secondary)" />
            <circle cx="18" cy="21" r="1.4" fill="var(--color-secondary)" />
          </svg>
          <span className="cart-fab-badge">{cartCount}</span>
        </button>
      )}

      {/* Eyebrow */}
      <div className="ms-eyebrow">
        <div className="ms-eyebrow-rule">
          <span className="ms-eyebrow-rule-line" />
          <span className="ms-eyebrow-tag">Our Menu</span>
          <span className="ms-eyebrow-rule-line" />
        </div>
      </div>

      <div className="ms-grid-wrapper">
        {view === 'categories' ? (
          <div className="cat-grid">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className="cat-card"
                onClick={() => openCategory(cat.key)}
              >
                <img
                  src={cat.img}
                  alt={cat.label_ar}
                  className="cat-card-bg"
                  onError={handleImgError}
                />
                <span className="cat-card-overlay" />
                <span className="cat-card-name">{cat.label_en}</span>
                <span className="cat-card-btn">عرض المنيو</span>
              </button>
            ))}
          </div>
        ) : (
          activeCategory && (
            <div className="detail-view">
              <div className="pills-row">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    className={`pill${cat.key === activeCategoryKey ? ' active' : ''}`}
                    onClick={() => setActiveCategoryKey(cat.key)}
                  >
                    {cat.label_en}
                  </button>
                ))}
              </div>

              <div className="detail-header">
                <span className="detail-title">{activeCategory.label_en}</span>
                <button className="back-link" onClick={() => setView('categories')}>
                  القائمة الرئيسية ←
                </button>
              </div>

              <div className="product-grid">
                {activeCategory.items.map((item, i) => {
                  const uid = itemUID(activeCategory.key, item);
                  const variants = getVariants(item);
                  const selected = selectedVariants[uid] || variants[0].key;
                  return (
                    <ProductCard
                      key={`${uid}-${i}`}
                      item={item}
                      catKey={activeCategory.key}
                      selectedVariant={selected}
                      onSelectVariant={(vKey) =>
                        setSelectedVariants((prev) => ({ ...prev, [uid]: vKey }))
                      }
                      onAdd={(variant) => addToCart(activeCategory.key, item, variant)}
                      justAdded={justAddedUid === `${uid}::${selected}`}
                    />
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>

      {/* شريط الطلب عبر واتساب */}
      {cartCount > 0 && !cartOpen && (
        <div className="checkout-bar-wrap">
          <div className="checkout-bar">
            <span className="checkout-bar-count">{cartCount} عنصر</span>
            <span className="checkout-bar-total">{cartTotal} ج.م</span>
            <button className="checkout-bar-btn" onClick={checkoutOnWhatsApp}>
              إتمام الطلب عبر واتساب ←
            </button>
          </div>
        </div>
      )}

      {/* لوحة السلة */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-panel" dir="rtl" onClick={(e) => e.stopPropagation()}>
            <div className="cart-panel-head">
              <span className="cart-panel-title">سلتك</span>
              <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="cart-empty">السلة فاضية</p>
            ) : (
              <>
                {cart.map((c) => (
                  <div key={c.cartId} className="cart-line">
                    <img src={c.img} alt={c.name_ar} className="cart-line-img" onError={handleImgError} />
                    <div className="cart-line-body">
                      <div className="cart-line-name">{c.name_ar}</div>
                      {c.variantLabel && <div className="cart-line-variant">{c.variantLabel}</div>}
                      <div className="cart-line-price">{c.price * c.qty} ج.م</div>
                    </div>
                    <div className="qty-stepper">
                      <button className="qty-btn" onClick={() => changeQty(c.cartId, -1)}>−</button>
                      <span className="qty-val">{c.qty}</span>
                      <button className="qty-btn" onClick={() => changeQty(c.cartId, 1)}>+</button>
                    </div>
                  </div>
                ))}

                <div className="cart-panel-footer">
                  <div className="cart-panel-total">
                    <span>الإجمالي</span>
                    <span>{cartTotal} ج.م</span>
                  </div>
                  <button className="cart-panel-checkout" onClick={checkoutOnWhatsApp}>
                    إتمام الطلب عبر واتساب
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}