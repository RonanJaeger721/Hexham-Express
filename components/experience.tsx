"use client";
import { CSSProperties, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight, RotateCcw } from "lucide-react";
import {
  Button,
  EnquiryBand,
  FAQ,
  Hero,
  Picture,
  ProductGrid,
  SectionTitle,
  Video,
} from "./site";
import { useSceneMotion } from "./motion";

export function HomeExperience() {
  const intro = useSceneMotion();
  return (
    <>
      <Hero
        home
        title={
          <>
            <span className="hero-line">BUILT TO SUPPLY.</span>
            <span className="hero-line hero-line-second">
              READY TO MOVE<span className="hero-period">.</span>
            </span>
          </>
        }
        copy="Brick supply backed by the equipment and logistics to keep construction moving."
      />
      <section ref={intro} id="discover" className="story-intro">
        <div className="intro-background">
          <Picture name="yard-rows" alt="Rows of Hexham brick stock" />
        </div>
        <div className="intro-grid scene-content">
          <div data-reveal>
            <p className="eyebrow">THE MATERIAL IS ONLY THE BEGINNING</p>
            <h2>
              MORE THAN
              <br />
              JUST A STACK
              <br />
              <span>OF BRICKS.</span>
            </h2>
            <p className="intro-statement">
              The stock.
              <br />
              The equipment.
              <br />
              The means to move it.
            </p>
          </div>
          <div className="intro-story" data-reveal>
            <div className="round-window">
              <Picture
                name="wide-yard"
                alt="Trucks and brick stock in the yard"
              />
              <span>
                THE HEXHAM
                <br />
                WORKING PICTURE
              </span>
            </div>
            <p>
              Hexham Bricks helps builders, contractors and property owners
              source bricks while supporting the movement of larger orders
              through practical loading and transport capability.
            </p>
            <Link className="text-link" href="/about">
              MEET HEXHAM <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="intro-baseline">
          <span>BRICK SUPPLY</span>
          <span>PROJECT ORDERS</span>
          <span>LOGISTICS SUPPORT</span>
        </div>
      </section>
      <CapabilityScene />
      <MaterialStudy />
      <DispatchScene />
      <section className="supply-edit section">
        <div className="supply-background">
          <Picture
            name="brick-wall"
            alt="Brick stock ready for supply enquiries"
          />
        </div>
        <SectionTitle
          label="MATERIAL, SELECTED FOR YOUR REQUIREMENT"
          title={
            <>
              BRICKS FOR
              <br />
              <span className="serif-word">the build.</span>
            </>
          }
          copy="From the first requirement to project quantities. Explore supply options and enquire about current availability."
        />
        <ProductGrid compact />
        <div className="section-end">
          <Button href="/bricks" secondary>
            Explore all supply options
          </Button>
        </div>
      </section>
      <Video />
      <FAQ />
      <EnquiryBand />
    </>
  );
}
const capabilities = [
  {
    name: "BRICK SUPPLY",
    short: "The material",
    image: "brick-stacks",
    copy: "Brick supply for residential, commercial and general construction requirements.",
    href: "/bricks",
    action: "Explore our bricks",
    caption: "The texture. The stock. The starting point.",
  },
  {
    name: "BULK ORDERS",
    short: "The quantity",
    image: "stock-yard",
    copy: "Talk to Hexham about larger project quantities and recurring requirements. Stock and timing are confirmed on enquiry.",
    href: "/bricks/bulk-brick-orders",
    action: "Discuss your quantity",
    caption: "Think beyond the first stack.",
  },
  {
    name: "LOGISTICS & HANDLING",
    short: "The movement",
    image: "crane-loading",
    copy: "Material-handling equipment and transport capability, brought into the conversation about your order. Transport arrangements available on enquiry.",
    href: "/logistics",
    action: "Explore logistics",
    caption: "Equipment that belongs in the conversation.",
  },
];
function CapabilityScene() {
  const [active, setActive] = useState(0);
  const ref = useSceneMotion();
  const item = capabilities[active];
  return (
    <section
      className="capability-scene"
      ref={ref}
      aria-label="Explore Hexham capabilities"
    >
      <div className="capability-background">
        {capabilities.map((c, i) => (
          <Picture
            key={c.image}
            name={c.image}
            alt={c.name + " — supplied Hexham operating photo"}
            className={i === active ? "active" : ""}
          />
        ))}
      </div>
      <div className="capability-top">
        <span>THE THREE SIDES OF HEXHAM</span>
        <span>
          EXPLORE THE WORKING PICTURE <MoveUpRight size={16} />
        </span>
      </div>
      <div
        className="capability-scene-content"
        id="capability-panel"
        role="tabpanel"
        aria-labelledby={`capability-tab-${active}`}
        tabIndex={0}
      >
        <p className="eyebrow">
          0{active + 1} / {item.short.toUpperCase()}
        </p>
        <h2 key={item.name}>{item.name.replace(" & ", " &\n")}</h2>
        <p>{item.copy}</p>
        <Button href={item.href}>{item.action}</Button>
      </div>
      <p className="capability-side-note">{item.caption}</p>
      <div className="capability-tabs" role="tablist" aria-label="Capabilities">
        {capabilities.map((c, i) => (
          <button
            key={c.name}
            id={`capability-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="capability-panel"
            tabIndex={active === i ? 0 : -1}
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next =
                  (active + (e.key === "ArrowRight" ? 1 : -1) + 3) % 3;
                setActive(next);
                document.getElementById(`capability-tab-${next}`)?.focus();
              }
            }}
          >
            <span>0{i + 1}</span>
            <strong>{c.short}</strong>
            <ArrowUpRight size={22} />
          </button>
        ))}
      </div>
    </section>
  );
}
function MaterialStudy() {
  const [view, setView] = useState("stack");
  const ref = useSceneMotion();
  return (
    <section className="material-study" ref={ref}>
      <div className="material-sticky">
        <div className="material-background">
          <Picture name="stock-yard" alt="Hexham brick stock" />
        </div>
        <div className="material-copy">
          <p className="eyebrow">FROM ONE REQUIREMENT TO THE WHOLE ORDER</p>
          <h2>
            EVERY BUILD
            <br />
            STARTS WITH
            <br />
            <span className="serif-word">the material.</span>
          </h2>
          <p>
            Small requirements. Project quantities. A practical conversation
            about the bricks your build needs.
          </p>
          <Button href="/bricks" secondary>
            Find your starting point
          </Button>
          <div className="material-scroll">
            <ArrowDown size={17} /> SCROLL TO BRING IT TOGETHER
          </div>
        </div>
        <div
          className={`material-stage ${view === "build" ? "build-view" : ""}`}
          onPointerMove={(e) => {
            if (
              e.pointerType === "mouse" &&
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
              const box = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--inspect-x",
                `${((e.clientX - box.left) / box.width - 0.5) * 18}deg`,
              );
              e.currentTarget.style.setProperty(
                "--inspect-y",
                `${((e.clientY - box.top) / box.height - 0.5) * -12}deg`,
              );
            }
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.setProperty("--inspect-x", "0deg");
            e.currentTarget.style.setProperty("--inspect-y", "0deg");
          }}
        >
          <div className="material-halo" />
          <div className="brick-object" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => {
              const row = Math.floor(i / 3),
                col = i % 3;
              return (
                <div
                  key={i}
                  className="scene-brick"
                  style={
                    {
                      "--bx": `${col * 124 + (view === "build" && row % 2 ? 60 : 0) - (view === "build" ? 213 : 183)}px`,
                      "--by": `${row * 48 - 80}px`,
                      "--scatter": `${(i % 2 ? 1 : -1) * (60 + row * 45)}px`,
                      "--lift": `${-150 - row * 38}px`,
                      "--turn": `${((i % 3) - 1) * 10}deg`,
                      "--shade": `${0.9 + (i % 3) * 0.04}`,
                    } as CSSProperties
                  }
                >
                  <i className="brick-front" />
                  <i className="brick-top" />
                  <i className="brick-side" />
                  <i className="brick-back" />
                </div>
              );
            })}
          </div>
          <div
            className="material-controls"
            role="group"
            aria-label="Illustrative brick arrangement"
          >
            <button
              className={view === "stack" ? "active" : ""}
              aria-pressed={view === "stack"}
              onClick={() => setView("stack")}
            >
              Stock
            </button>
            <button
              className={view === "build" ? "active" : ""}
              aria-pressed={view === "build"}
              onClick={() => setView("build")}
            >
              Build
            </button>
            <RotateCcw size={17} />
          </div>
          <p className="material-disclaimer">
            Illustrative arrangement. Brick options and specifications confirmed
            on enquiry.
          </p>
        </div>
        <span className="material-word" aria-hidden="true">
          MATERIAL
        </span>
      </div>
    </section>
  );
}
function DispatchScene() {
  const ref = useSceneMotion();
  return (
    <section className="dispatch-scene" ref={ref}>
      <div className="dispatch-background">
        <Picture
          name="loaded-truck"
          alt="Orange Hexham Express crane truck loaded with bricks"
        />
      </div>
      <div className="dispatch-copy" data-reveal>
        <p className="eyebrow">THE EQUIPMENT BEHIND THE ORDER</p>
        <h2>
          STOCK IS
          <br />
          THE START.
          <br />
          <span className="serif-word">Movement follows.</span>
        </h2>
        <p>
          From yard to project, the practical details matter. Discuss loading,
          access and transport requirements for your order.
        </p>
        <Button href="/logistics" secondary>
          Follow the journey
        </Button>
      </div>
      <Link
        href="/logistics"
        className="crane-lens"
        aria-label="Explore crane-assisted handling"
      >
        <Picture
          name="crane-loading"
          alt="A closer view of Hexham crane equipment"
        />
        <span>
          CRANE-ASSISTED
          <br />
          HANDLING <ArrowUpRight size={21} />
        </span>
      </Link>
      <div className="dispatch-bottom">
        <span>REAL STOCK. REAL EQUIPMENT.</span>
        <span>TRANSPORT ARRANGEMENTS ON ENQUIRY</span>
      </div>
      <svg
        className="scene-curve"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 100V65C320 65 450 10 720 10S1150 90 1440 60V100Z" />
      </svg>
    </section>
  );
}
