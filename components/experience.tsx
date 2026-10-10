"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button, EnquiryBand, Hero, Picture } from "./site";

export function HomeExperience() {
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
      <section id="discover" className="quiet-intro section">
        <div className="quiet-heading" data-reveal>
          <div>
            <p className="eyebrow">HEXHAM BRICKS / HEXHAM EXPRESS</p>
            <h2>
              BRICKS. LOGISTICS.
              <br />
              BUILT FOR THE JOB.
            </h2>
          </div>
          <p>
            Hexham helps builders, contractors and property owners source
            bricks, with practical loading and transport capability for larger
            orders.
          </p>
        </div>
        <div className="quiet-yard" data-reveal>
          <Picture
            name="wide-yard"
            alt="Brick stock and trucks in the Hexham yard"
          />
          <span>REAL STOCK. REAL EQUIPMENT.</span>
        </div>
        <div className="quiet-links" data-reveal>
          <Link href="/bricks">
            Brick supply
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/bricks/bulk-brick-orders">
            Bulk orders
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/logistics">
            Delivery & handling
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="quiet-supply section">
        <div className="quiet-heading" data-reveal>
          <div>
            <p className="eyebrow">START WITH YOUR REQUIREMENT</p>
            <h2>
              THE MATERIAL
              <br />
              FOR YOUR NEXT BUILD.
            </h2>
          </div>
          <Button href="/bricks" secondary>
            Explore our bricks
          </Button>
        </div>
        <div className="quiet-product-pair">
          <Link
            className="quiet-product"
            data-reveal
            href="/bricks/common-bricks"
          >
            <div className="quiet-product-image isolated">
              <Picture name="bricks-detail" alt="Common building bricks" />
            </div>
            <div>
              <h3>Common bricks</h3>
              <ArrowUpRight size={21} />
            </div>
            <p>
              Discuss available brick options for your building requirements.
            </p>
          </Link>
          <Link
            className="quiet-product"
            data-reveal
            href="/bricks/bulk-brick-orders"
          >
            <div className="quiet-product-image">
              <Picture
                name="stock-yard"
                alt="Larger quantities of brick stock"
              />
            </div>
            <div>
              <h3>Project quantities</h3>
              <ArrowUpRight size={21} />
            </div>
            <p>
              Enquire about larger orders, availability and transport
              arrangements.
            </p>
          </Link>
        </div>
      </section>
      <section className="quiet-delivery">
        <Picture
          name="blue-truck"
          alt="Hexham crane-equipped truck carrying bricks"
        />
        <div data-reveal>
          <p className="eyebrow">THE MEANS TO MOVE IT</p>
          <h2>
            FROM YARD
            <br />
            TO PROJECT.
          </h2>
          <p>
            Loading, access and transport requirements can be discussed for your
            order.
          </p>
          <Button href="/logistics" secondary>
            Explore logistics
          </Button>
        </div>
      </section>
      <section className="quiet-company section" data-reveal>
        <p className="eyebrow">A STRAIGHTFORWARD APPROACH</p>
        <h2>
          UNDERSTAND THE JOB.
          <br />
          HELP KEEP IT MOVING.
        </h2>
        <p>
          From smaller building requirements to larger project quantities, our
          focus is practical: understand what is needed, discuss the order and
          coordinate the next steps.
        </p>
        <Button href="/about" secondary>
          Meet Hexham
        </Button>
      </section>
      <EnquiryBand />
    </>
  );
}
