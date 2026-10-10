"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { gallery, phone, products, whatsapp } from "@/lib/data";
const nav = [
  ["/", "Home"],
  ["/bricks", "Bricks"],
  ["/logistics", "Logistics"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Picture({
  name,
  alt,
  className = "",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={`/media/${name}.webp`}
      srcSet={`/media/${name}-640.webp 640w, /media/${name}.webp 1280w`}
      sizes="(max-width: 700px) 100vw, 70vw"
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const controls = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          ".mobile-header a,.mobile-header button,.mobile-menu a",
        ),
      );
    document.querySelector<HTMLElement>(".mobile-menu a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.querySelector<HTMLElement>(".mobile-header button")?.focus();
      }
      if (e.key === "Tab") {
        const list = controls();
        const i = list.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          list[list.length - 1]?.focus();
        } else if (!e.shiftKey && i === list.length - 1) {
          e.preventDefault();
          list[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  useEffect(() => {
    let last = 0;
    const scroll = () => {
      setHidden(window.scrollY > last && window.scrollY > 120);
      last = window.scrollY;
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting),
        ),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <aside className={`rail ${hidden ? "dim" : ""}`}>
        <Link href="/" className="rail-brand" aria-label="Hexham home">
          <img src="/brand/hexham-symbol.png" alt="Hexham" />
        </Link>
        <nav aria-label="Main navigation">
          {nav.map(([url, label], i) => (
            <Link
              key={url}
              href={url}
              className={path === url ? "active" : ""}
              aria-current={path === url ? "page" : undefined}
            >
              <b>0{i + 1}</b>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <a className="rail-phone" href={phone}>
          <Phone size={20} />
          <span>0788 828 681</span>
        </a>
        <span className="rail-bottom">SUPPLY / MOVE</span>
      </aside>
      <header className={`mobile-header ${hidden && !open ? "hide" : ""}`}>
        <Link href="/" aria-label="Hexham home">
          <img src="/brand/hexham-logo-light.png" alt="Hexham Bricks" />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          MENU {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {open && (
        <div
          className="mobile-menu"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <nav aria-label="Mobile navigation">
            {nav.map(([url, label], i) => (
              <Link key={url} href={url} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
          <Button href="/contact">Get a quote</Button>
          <a href={phone}>0788 828 681</a>
        </div>
      )}
      <main id="main" className="site-frame" key={path} inert={open}>
        {children}
        <Footer />
      </main>
      <a className="whatsapp" href={whatsapp()} aria-label="WhatsApp Hexham">
        <MessageCircle size={21} />
        <span>Let’s talk</span>
      </a>
      <div key={`wipe-${path}`} className="page-wipe" aria-hidden="true">
        <img src="/brand/hexham-logo-light.png" alt="" />
      </div>
    </>
  );
}
export function Hero({
  title,
  copy,
  image = "loaded-truck",
  eyebrow = "HEXHAM BRICKS · ZIMBABWE",
  home = false,
}: {
  title: React.ReactNode;
  copy: string;
  image?: string;
  eyebrow?: string;
  home?: boolean;
}) {
  const slides = [
    "loaded-truck",
    "crane-loading",
    "brick-stacks",
    "wide-yard",
    "blue-truck",
  ];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (
      !home ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const t = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => clearInterval(t);
  }, [home, paused]);
  return (
    <section
      className={`hero ${home ? "home-hero" : "inner-hero"} ${paused ? "paused" : ""}`}
    >
      <div className="hero-media">
        {(home ? slides : [image]).map((name, i) => (
          <Picture
            key={name}
            name={name}
            alt="Hexham brick stock and transport equipment"
            className={`hero-slide ${!home || index === i ? "current" : ""}`}
            priority={i === 0}
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-top">
        <Link href="/" aria-label="Home">
          <img src="/brand/hexham-logo-light.png" alt="Hexham Bricks" />
        </Link>
        <span>BRICK SUPPLY & PROJECT LOGISTICS</span>
        <a href={phone}>
          0788 828 681 <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-copy">{copy}</p>
        <div className="hero-actions">
          <Button href={home ? "/bricks" : "/contact"}>
            {home ? "Explore our bricks" : "Request a quote"}
          </Button>
          <Button href={home ? "/contact" : "/logistics"} secondary>
            {home ? "Request a quote" : "Explore logistics"}
          </Button>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="film-meta">
          <span className="red-dot" /> REAL STOCK. REAL EQUIPMENT.
        </div>
        <a className="scroll-cue" href="#discover" aria-label="Explore below">
          <ArrowDown size={23} />
        </a>
        {home && (
          <button
            className="film-control"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? "Play background sequence" : "Pause background sequence"
            }
          >
            {paused ? <Play size={15} /> : <Pause size={15} />}
            <span>0{index + 1} / 05</span>
          </button>
        )}
      </div>
      {home && (
        <div className="ticker">
          <div>
            BRICK SUPPLY <span>↗</span> CRANE-ASSISTED HANDLING <span>↗</span>{" "}
            PROJECT ORDERS <span>↗</span> DIRECT ENQUIRIES <span>↗</span>{" "}
            BRICK SUPPLY <span>↗</span> CRANE-ASSISTED HANDLING <span>↗</span>{" "}
            PROJECT ORDERS <span>↗</span> DIRECT ENQUIRIES <span>↗</span>
          </div>
        </div>
      )}
    </section>
  );
}
export function SectionTitle({
  label,
  title,
  copy,
}: {
  label: string;
  title: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {copy && <p>{copy}</p>}
    </div>
  );
}
export function ProductGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`product-grid ${compact ? "compact" : ""}`}>
      {products.slice(0, compact ? 3 : 4).map((p, i) => (
        <Link
          data-reveal
          className={`product product-${i}`}
          key={p.slug}
          href={`/bricks/${p.slug}`}
        >
          <div className="product-photo">
            <Picture name={p.image} alt={p.name} />
            <span className="product-number">0{i + 1}</span>
            <span className="circle-arrow">
              <ArrowUpRight size={21} />
            </span>
          </div>
          <div className="product-copy">
            <small>{p.tag}</small>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <span className="text-link">
              REQUEST PRICE <ArrowUpRight size={15} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function EnquiryBand() {
  return (
    <section className="enquiry-band" data-reveal>
      <Picture name="blue-truck" alt="Hexham crane-equipped truck" />
      <div>
        <p className="eyebrow">YOUR NEXT ORDER STARTS HERE</p>
        <h2>
          READY WHEN
          <br />
          THE BUILD IS.
        </h2>
        <p>
          Tell us what you need, how much you need and where your project is.
        </p>
        <div className="hero-actions">
          <Button href="/contact">Request a quote</Button>
          <Button href={phone} secondary>
            Call 0788 828 681
          </Button>
        </div>
      </div>
    </section>
  );
}
export function Video() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [previewPaused, setPreviewPaused] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v || playing) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !previewPaused &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, [playing, previewPaused]);
  return (
    <section className="video-section" data-reveal>
      <SectionTitle
        label="THE COMPANY IN MOTION"
        title={
          <>
            WATCH HEXHAM
            <br />
            AT WORK.
          </>
        }
        copy="A closer look at the stock, equipment and handling behind your enquiry."
      />
      <div className="video-box">
        <video
          ref={ref}
          controls={playing}
          playsInline
          muted
          preload="metadata"
          poster="/media/crane-loading.webp"
          loop={!playing}
        >
          <source src="/media/hexham-at-work.mp4" type="video/mp4" />
          Your browser does not support video.
        </video>
        {!playing && (
          <button
            className="video-play"
            onClick={() => {
              if (ref.current) {
                setPlaying(true);
                ref.current.currentTime = 0;
                ref.current.controls = true;
                ref.current.play().catch(() => {});
              }
            }}
          >
            <span>
              <Play fill="currentColor" size={25} />
            </span>
            HEXHAM AT WORK <small>PLAY FILM ↗</small>
          </button>
        )}
        {!playing && (
          <button
            className="preview-pause"
            onClick={() => setPreviewPaused(!previewPaused)}
            aria-label={
              previewPaused ? "Play video preview" : "Pause video preview"
            }
          >
            {previewPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        )}
      </div>
    </section>
  );
}
export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const items = gallery.filter(
    (g) => filter === "All" || g.category === filter,
  );
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef(0);
  useEffect(() => {
    if (selected === null) return;
    opener.current = document.activeElement as HTMLElement;
    close.current?.focus();
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setSelected((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setSelected((i) =>
          i === null ? null : (i - 1 + items.length) % items.length,
        );
      if (e.key === "Tab") {
        e.preventDefault();
        const buttons = Array.from(
          document.querySelectorAll<HTMLButtonElement>(".lightbox button"),
        );
        const current = buttons.indexOf(
          document.activeElement as HTMLButtonElement,
        );
        buttons[
          (current + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length
        ]?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      opener.current?.focus();
    };
  }, [selected, items.length]);
  return (
    <section className="gallery-section" data-reveal>
      <SectionTitle
        label="A VIEW FROM THE YARD"
        title={
          <>
            THE REAL
            <br />
            WORKING PICTURE.
          </>
        }
      />
      <div className="filters" role="group" aria-label="Filter gallery">
        {["All", "Bricks", "Logistics", "Yard", "Loading"].map((f) => (
          <button
            aria-pressed={f === filter}
            key={f}
            className={filter === f ? "selected" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="masonry">
        {items.map((g, i) => (
          <button
            className="gallery-item"
            key={g.image}
            onClick={() => setSelected(i)}
            aria-label={`Open ${g.label}`}
          >
            <Picture name={g.image} alt={g.label} />
            <span>
              {g.category}
              <ArrowUpRight size={18} />
            </span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Company photo gallery"
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const delta = touch.current - e.changedTouches[0].clientX;
            if (Math.abs(delta) > 45)
              setSelected(
                (selected + (delta > 0 ? 1 : -1) + items.length) % items.length,
              );
          }}
        >
          <button
            ref={close}
            className="lightbox-close"
            onClick={() => setSelected(null)}
            aria-label="Close gallery"
          >
            <X />
          </button>
          <button
            className="lightbox-prev"
            onClick={() =>
              setSelected((selected - 1 + items.length) % items.length)
            }
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>
          <Picture
            name={items[selected].image}
            alt={items[selected].label}
            priority
          />
          <button
            className="lightbox-next"
            onClick={() => setSelected((selected + 1) % items.length)}
            aria-label="Next image"
          >
            <ChevronRight />
          </button>
          <p>
            {items[selected].label}{" "}
            <span>
              {selected + 1} / {items.length}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
export function FAQ() {
  return (
    <section className="faq" data-reveal>
      <SectionTitle label="BEFORE YOU ORDER" title="A FEW PRACTICAL DETAILS." />
      {[
        [
          "How do I request a price?",
          "Share your brick requirement, approximate quantity and project location through the quote form or WhatsApp. Hexham can discuss availability and pricing for your order.",
        ],
        [
          "Can I enquire about a bulk order?",
          "Yes. Tell us about your required quantities and timing so larger or recurring supply requirements can be discussed.",
        ],
        [
          "Can transport be arranged?",
          "Transport arrangements are available on enquiry. Coverage, access, timing and handling requirements need to be confirmed for your specific order.",
        ],
        [
          "Which brick specifications are available?",
          "Please contact Hexham to confirm available brick options, dimensions and suitability for your intended use before placing an order.",
        ],
      ].map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span>+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <img
            className="footer-logo"
            src="/brand/hexham-logo-light.png"
            alt="Hexham Bricks"
          />
          <h2>
            BRICKS. LOGISTICS.
            <br />
            BUILT FOR THE JOB.
          </h2>
        </div>
        <div className="footer-links">
          <div>
            <p>EXPLORE</p>
            {nav.slice(0, 4).map(([url, label]) => (
              <Link href={url} key={url}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <p>CONTACT</p>
            <a href={phone}>0788 828 681</a>
            <a href={whatsapp()}>WhatsApp</a>
            <Link href="/contact">Request a quote</Link>
          </div>
          <div>
            <p>SUPPORT</p>
            <Link href="/contact">Contact</Link>
            <Link href="/contact?requirement=Bulk%20brick%20orders">
              Bulk orders
            </Link>
            <Link href="/contact?transport=Yes">Transport enquiry</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Hexham Bricks. All rights reserved.</span>
        <a href="https://wa.me/263789937251">
          Website built & developed by Jaeger Media
        </a>
      </div>
    </footer>
  );
}
