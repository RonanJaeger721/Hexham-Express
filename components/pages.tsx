"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Phone, MessageCircle } from "lucide-react";
import {
  Button,
  EnquiryBand,
  FAQ,
  Gallery,
  Hero,
  Picture,
  ProductGrid,
  SectionTitle,
  Video,
} from "./site";
import { phone, products, whatsapp } from "@/lib/data";
export function Home() {
  return (
    <>
      <Hero
        home
        title={
          <>
            BUILT TO SUPPLY.
            <br />
            READY TO MOVE.
          </>
        }
        copy="Brick supply backed by the equipment and logistics to keep construction moving."
      />
      <section id="discover" className="opening section">
        <SectionTitle
          label="WHAT WE DO"
          title={
            <>
              MORE THAN
              <br />
              JUST A STACK
              <br />
              OF BRICKS.
            </>
          }
          copy="Hexham Bricks helps builders, contractors and property owners source bricks while supporting the movement of larger orders through practical loading and transport capability."
        />
        <div className="opening-foot" data-reveal>
          <div className="mini-media">
            <Picture name="bricks-detail" alt="Building bricks" />
            <span>
              Material.
              <br />
              Movement.
              <br />
              Momentum.
            </span>
          </div>
          <Link className="text-link" href="/about">
            MEET HEXHAM <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="capabilities section">
        <div className="capability large" data-reveal>
          <Picture name="brick-stacks" alt="Stacks of Hexham bricks" />
          <div>
            <span>01 / THE MATERIAL</span>
            <h3>BRICK SUPPLY</h3>
            <p>
              Brick supply for residential, commercial and general construction
              requirements.
            </p>
            <Link
              href="/bricks"
              aria-label="Explore brick supply"
              className="circle-arrow"
            >
              <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="capability narrow" data-reveal>
          <Picture name="stock-yard" alt="Bulk quantities of bricks" />
          <div>
            <span>02 / THE QUANTITY</span>
            <h3>BULK ORDERS</h3>
            <p>
              Talk to Hexham about larger project quantities and recurring
              needs.
            </p>
            <Link
              href="/bricks/bulk-brick-orders"
              aria-label="Explore bulk orders"
              className="circle-arrow"
            >
              <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="capability narrow" data-reveal>
          <Picture
            name="crane-loading"
            alt="Crane equipment and brick loading"
          />
          <div>
            <span>03 / THE MOVEMENT</span>
            <h3>LOGISTICS & HANDLING</h3>
            <p>Transport arrangements available on enquiry.</p>
            <Link
              href="/logistics"
              aria-label="Explore logistics"
              className="circle-arrow"
            >
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <SectionTitle
          label="START WITH THE RIGHT MATERIAL"
          title="BRICKS FOR THE BUILD."
          copy="From the first requirement to project quantities. Explore supply options and enquire about current availability."
        />
        <ProductGrid compact />
        <div className="section-end">
          <Button href="/bricks" secondary>
            Explore all supply options
          </Button>
        </div>
      </section>
      <section className="equipment section">
        <SectionTitle
          label="SUPPLY WITH THE MEANS TO MOVE IT"
          title={
            <>
              REAL STOCK.
              <br />
              REAL EQUIPMENT.
              <br />
              REAL PROJECT SUPPORT.
            </>
          }
          copy="Behind every order is a practical conversation about quantities, access, loading and movement."
        />
        <div className="photo-composition" data-reveal>
          <Picture
            name="loaded-truck"
            alt="Orange Hexham truck loaded with bricks"
            className="main-photo"
          />
          <Picture
            name="brick-stacks"
            alt="Building brick stock"
            className="floating-photo brick-photo"
          />
          <Picture
            name="crane-loading"
            alt="Crane-equipped loaded truck"
            className="floating-photo crane-photo"
          />
          <div className="photo-caption">
            FROM YARD TO PROJECT{" "}
            <Link href="/logistics" aria-label="Discover logistics">
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
      <Video />
      <FAQ />
      <EnquiryBand />
    </>
  );
}
const steps = [
  ["ORDER", "Tell us what your project requires.", "stock-yard"],
  [
    "PREPARE",
    "Stock preparation can be discussed according to the confirmed order.",
    "brick-stacks",
  ],
  [
    "LOAD",
    "Crane-assisted equipment supports loading where applicable.",
    "crane-loading",
  ],
  [
    "MOVE",
    "Transport arrangements can be coordinated according to the order.",
    "loaded-truck",
  ],
  [
    "OFFLOAD",
    "Handling and access requirements can be discussed when arranging the order.",
    "blue-truck",
  ],
];
function Journey() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-25% 0px -40% 0px", threshold: 0 },
    );
    ref.current
      ?.querySelectorAll("[data-step]")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section className="journey section" id="discover">
      <SectionTitle
        label="ONE ORDER. A PRACTICAL JOURNEY."
        title={
          <>
            FROM THE FIRST CALL
            <br />
            TO THE NEXT STAGE.
          </>
        }
      />
      <div className="journey-grid" ref={ref}>
        <div className="journey-image">
          {steps.map((s, i) => (
            <Picture
              key={s[0]}
              name={s[2]}
              alt={s[0] + " — Hexham operating media"}
              className={i === active ? "active" : ""}
            />
          ))}
          <div className="journey-overlay">
            <span>0{active + 1} / 05</span>
            <strong>{steps[active][0]}</strong>
            <div className="journey-progress">
              <i style={{ width: `${(active + 1) * 20}%` }} />
            </div>
          </div>
        </div>
        <div className="journey-steps">
          {steps.map(([title, copy], i) => (
            <article
              data-step={i}
              key={title}
              className={active === i ? "active" : ""}
              data-reveal
            >
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Logistics() {
  return (
    <>
      <Hero
        title={
          <>
            FROM YARD
            <br />
            TO PROJECT.
          </>
        }
        copy="Hexham combines brick supply with practical transport and material-handling capability for project orders."
        eyebrow="HEXHAM EXPRESS · LOGISTICS"
      />
      <Journey />
      <section className="logistics-notes section" data-reveal>
        <h2>
          THE DETAILS
          <br />
          MAKE THE DIFFERENCE.
        </h2>
        <div>
          <p>
            Tell us about your project location, access conditions, brick
            quantity and preferred timing. Loading, transport and offloading
            requirements can then be discussed for your order.
          </p>
          <p className="muted">
            Service availability, coverage and arrangements are confirmed on
            enquiry.
          </p>
          <Button href="/contact?transport=Yes">Discuss transport</Button>
        </div>
      </section>
      <Video />
      <Gallery />
      <EnquiryBand />
    </>
  );
}
export function Bricks() {
  return (
    <>
      <Hero
        title={
          <>
            BRICKS FOR
            <br />
            THE BUILD.
          </>
        }
        image="stock-yard"
        copy="Building materials for the plan in front of you. Enquire about available options, project quantities and transport arrangements."
        eyebrow="HEXHAM BRICKS · SUPPLY OPTIONS"
      />
      <section className="section" id="discover">
        <SectionTitle
          label="MATERIAL / QUANTITY / PROJECT"
          title="START WITH YOUR REQUIREMENT."
          copy="These are enquiry categories. Exact brick options, specifications, stock and pricing are confirmed with Hexham before an order."
        />
        <ProductGrid />
      </section>
      <section className="order-note section" data-reveal>
        <span className="eyebrow">BEFORE YOU PLACE AN ORDER</span>
        <h2>
          A CLEAR BRIEF.
          <br />A BETTER CONVERSATION.
        </h2>
        <div className="brief-list">
          <p>
            <span>01</span>Your intended application
          </p>
          <p>
            <span>02</span>Approximate quantity
          </p>
          <p>
            <span>03</span>Project location & timing
          </p>
          <p>
            <span>04</span>Transport & handling needs
          </p>
        </div>
        <Button href="/contact">Tell us about your order</Button>
      </section>
      <FAQ />
      <EnquiryBand />
    </>
  );
}
export function About() {
  return (
    <>
      <Hero
        title={
          <>
            BUILT AROUND
            <br />
            THE JOB.
          </>
        }
        image="wide-yard"
        copy="Brick supply. Practical logistics. A straightforward focus on what your project needs."
        eyebrow="THE HEXHAM APPROACH"
      />
      <section id="discover" className="section about-statement">
        <p className="eyebrow" data-reveal>
          UNDERSTAND. PREPARE. MOVE.
        </p>
        <h2 data-reveal>
          THE MATERIAL MATTERS.
          <br />
          SO DOES WHAT
          <br />
          HAPPENS NEXT.
        </h2>
        <div className="about-copy" data-reveal>
          <p>
            Hexham Bricks supports construction projects with brick supply and
            practical logistics capability.
          </p>
          <p>
            From smaller building requirements to larger project quantities, our
            focus is straightforward: understand what is needed, prepare the
            order and help keep the build moving.
          </p>
        </div>
      </section>
      <section className="principles section">
        <Picture name="yard-rows" alt="Hexham brick yard" />
        <div>
          {[
            [
              "DEPENDABLE SUPPLY",
              "Practical support for real construction requirements.",
            ],
            [
              "STRAIGHTFORWARD SERVICE",
              "Clear communication from enquiry through order coordination.",
            ],
            [
              "PROJECT-MINDED",
              "We understand that timing and quantities matter on a build.",
            ],
            [
              "EQUIPPED TO MOVE",
              "Material-handling and transport capability visible in our operating media.",
            ],
          ].map(([title, copy], i) => (
            <article data-reveal key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <Gallery />
      <EnquiryBand />
    </>
  );
}
export function ProductDetail({ slug }: { slug: string }) {
  const p = products.find((p) => p.slug === slug)!;
  return (
    <>
      <section className="product-detail section">
        <Link className="text-link" href="/bricks">
          ← ALL SUPPLY OPTIONS
        </Link>
        <div className="detail-grid">
          <div className="detail-photo" data-reveal>
            <Picture name={p.image} alt={p.name} priority />
          </div>
          <div data-reveal>
            <p className="eyebrow">HEXHAM BRICKS / SUPPLY ENQUIRY</p>
            <h1>{p.name}</h1>
            <p className="lead">{p.description}</p>
            <h3>Applications & requirements</h3>
            <p>{p.applications}</p>
            <h3>Availability & bulk enquiries</h3>
            <p>
              Share your required quantity, timing and location. Current stock,
              prices, specifications and transport arrangements are confirmed
              directly with Hexham.
            </p>
            <Button href={`/contact?requirement=${encodeURIComponent(p.name)}`}>
              Request a quote
            </Button>
            <div className="detail-contact">
              <a href={phone}>
                <Phone size={17} /> Call now
              </a>
              <a
                href={whatsapp(
                  `Hello Hexham Bricks, I'd like to enquire about ${p.name.toLowerCase()} for my project.`,
                )}
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      <EnquiryBand />
    </>
  );
}
export function Contact() {
  const [status, setStatus] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [requirement, setRequirement] = useState("");
  const [transport, setTransport] = useState("Unsure");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setRequirement(q.get("requirement") || "");
    setTransport(q.get("transport") || "Unsure");
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw Error(result.error || "Unable to prepare enquiry.");
      setUrl(result.whatsappUrl);
      setStatus(
        "Your enquiry is ready. Open WhatsApp below, review the message and send it to Hexham.",
      );
    } catch (err) {
      setStatus(
        err instanceof Error ? err.message : "Please try again or call Hexham.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <section className="contact section">
        <div className="contact-intro" data-reveal>
          <p className="eyebrow">DIRECT ENQUIRIES / HEXHAM BRICKS</p>
          <h1>
            LET’S TALK
            <br />
            ABOUT YOUR
            <br />
            NEXT ORDER.
          </h1>
          <p className="lead">
            The right material. The right quantity. A practical plan to move it.
          </p>
          <a className="contact-number" href={phone}>
            0788 828 681 <ArrowUpRight />
          </a>
          <p>International: +263 788 828 681</p>
          <div className="contact-links">
            <a href={phone}>
              <Phone size={18} /> Call Hexham
            </a>
            <a href={whatsapp()}>
              <MessageCircle size={18} /> WhatsApp Hexham
            </a>
          </div>
          <Picture
            name="loaded-truck"
            alt="Hexham truck ready for project orders"
          />
        </div>
        <div className="quote-panel" data-reveal>
          <span className="eyebrow">YOUR PROJECT DETAILS</span>
          <h2>REQUEST A QUOTE</h2>
          <p>
            Complete your details to prepare a WhatsApp enquiry. Review and send
            it directly to Hexham.
          </p>
          <form onSubmit={submit}>
            <div className="form-grid">
              <label>
                Name *
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Company
                <input
                  name="company"
                  autoComplete="organization"
                  maxLength={150}
                />
              </label>
              <label>
                Phone *
                <input
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  required
                  maxLength={40}
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  maxLength={150}
                />
              </label>
              <label className="full">
                Project location *
                <input name="location" required maxLength={200} />
              </label>
              <label className="full">
                Brick requirement *
                <select
                  name="requirement"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  required
                >
                  <option value="">Select a requirement</option>
                  {products.map((p) => (
                    <option key={p.slug}>{p.name}</option>
                  ))}
                  <option>Other / please advise</option>
                </select>
              </label>
              <label>
                Approximate quantity
                <input
                  name="quantity"
                  placeholder="e.g. 5,000 bricks"
                  maxLength={80}
                />
              </label>
              <label>
                Transport required?
                <select
                  name="transport"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                >
                  {["Unsure", "Yes", "No"].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <label className="full">
                Message
                <textarea name="message" rows={4} maxLength={2000} />
              </label>
            </div>
            <button className="button" type="submit" disabled={busy}>
              {busy ? "Preparing enquiry…" : "Request a quote"}
              <ArrowUpRight size={17} />
            </button>
            <p className="form-note">
              Your details are used to prepare this enquiry. They are not stored
              by this website.
            </p>
            {status && (
              <div
                className={`form-status ${url ? "success" : ""}`}
                role="status"
              >
                {url && <Check size={19} />}
                <p>{status}</p>
                {url && (
                  <a
                    className="button"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
            )}
          </form>
        </div>
      </section>
      <FAQ />
    </>
  );
}
