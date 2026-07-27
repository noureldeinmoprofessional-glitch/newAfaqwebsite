"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/lib/gsap/useGsapContext";
import { Container, Section, Heading, Button } from "@/components/primitives";
import { TechBackground } from "@/components/visual/TechBackground";

/**
 * Reusable deep-emerald CTA band with contour lines drifting behind the
 * headline. Strings + links are passed in (resolved per page).
 */
export function InnerCta({
  id = "cta",
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  const root = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    const layers = root.current?.querySelectorAll(".ic-contour");
    if (!layers?.length) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          xPercent: i % 2 === 0 ? 6 : -6,
          yPercent: i % 2 === 0 ? -4 : 4,
          duration: 18 + i * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    });
  }, root, []);

  return (
    <Section surface="ink-900" id={id} className="relative overflow-hidden">
      <div ref={root} className="absolute inset-0">
        <TechBackground variant="topo" opacity={7} className="ic-contour text-brand-400" />
        <TechBackground variant="grid" opacity={5} className="ic-contour text-brand-400 scale-125" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-eyebrow uppercase tracking-[0.14em] text-brand-400">{eyebrow}</p>
          <Heading as="h2" size="h1" className="mt-6 text-mist-50">
            {title}
          </Heading>
          <p className="mx-auto mt-8 max-w-2xl text-body-lg text-mist-50/70">{body}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href={primary.href}>
              {primary.label}
            </Button>
            <Button variant="outline" size="lg" href={secondary.href}>
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
