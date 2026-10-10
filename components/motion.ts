"use client";
import { useEffect, useRef } from "react";

/** Scroll drives composition directly; it never forces React to render per frame. */
export function useSceneMotion() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      if (!visible && !reduced.matches) return;
      const rect = element.getBoundingClientRect();
      const travel = Math.max(
        -1,
        Math.min(
          1,
          (window.innerHeight / 2 - (rect.top + rect.height / 2)) /
            window.innerHeight,
        ),
      );
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)),
      );
      element.style.setProperty(
        "--travel",
        reduced.matches ? "0" : String(travel),
      );
      element.style.setProperty(
        "--assemble",
        reduced.matches ? "1" : String(Math.min(1, progress * 1.55)),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      },
      { rootMargin: "100px" },
    );
    observer.observe(element);
    reduced.addEventListener("change", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      reduced.removeEventListener("change", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return ref;
}
