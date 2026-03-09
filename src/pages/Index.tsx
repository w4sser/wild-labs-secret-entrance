import { useEffect, useRef, useCallback } from 'react';
import wolfLogo from '@/assets/WL_Wolf_CLR1.png';
import wolfWhite from '@/assets/WL_Wolf_White.png';
import fontLogo from '@/assets/WL_Font_CLR1.png';
import { Beaker, Heart, Users } from 'lucide-react';

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const sections = node.querySelectorAll('.reveal');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((s) => observerRef.current?.observe(s));
  }, []);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={setupObserver} className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center scanlines overflow-hidden">
        {/* Particle dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-cyan/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-float ${8 + Math.random() * 12}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Glow orb */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/20 pointer-events-none"
          style={{ animation: 'glow-pulse 6s ease-in-out infinite', filter: 'blur(80px)' }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8 px-4">
          <img
            src={wolfLogo}
            alt="Wild Labs Wolf Emblem"
            className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_40px_rgba(25,224,212,0.3)]"
          />
          <img
            src={fontLogo}
            alt="Wild Labs"
            className="h-10 md:h-14 object-contain"
          />
          <p className="text-muted-foreground text-base md:text-lg tracking-wide max-w-md text-center font-body">
            Something powerful is being built behind closed doors.
          </p>
          <button
            onClick={scrollToAbout}
            className="mt-4 px-8 py-3 border border-primary/50 text-primary font-display text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:glow-cyan hover:bg-primary/10 hover:border-primary"
          >
            Enter the Lab
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal opacity-0 flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-primary/10 pointer-events-none"
                style={{ animation: 'glow-pulse 5s ease-in-out infinite', filter: 'blur(60px)', transform: 'scale(1.5)' }}
              />
              <img
                src={wolfLogo}
                alt="Wild Labs Emblem"
                className="relative w-48 h-48 md:w-64 md:h-64 object-contain"
              />
            </div>
          </div>
          <div className="reveal opacity-0">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
              A studio built for experiments.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 font-body">
              Wild Labs is an independent game studio focused on bold ideas, rapid experimentation, and building games players obsess over.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              We believe the best games come from curiosity, iteration, and teams who dare to push boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Beaker, title: 'Experimentation', desc: 'We test fast, learn fast, and follow what players love.' },
            { icon: Heart, title: 'Player Obsession', desc: 'We design experiences players return to again and again.' },
            { icon: Users, title: 'Small Teams. Big Impact.', desc: 'Lean teams move faster and build better.' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="reveal opacity-0 group border border-border bg-card p-8 transition-all duration-500 hover:border-primary/40 hover:glow-cyan"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <Icon className="w-8 h-8 text-primary mb-6 transition-colors group-hover:text-primary" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold mb-3 tracking-tight">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IN THE LAB */}
      <section className="relative py-32 px-6 md:px-16 lg:px-24 blueprint-grid overflow-hidden">
        {/* Corner technical elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20 pointer-events-none" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-primary/20 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-primary/20 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20 pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center reveal opacity-0">
          <p className="text-primary/60 font-display text-xs tracking-[0.3em] uppercase mb-4">Status: Active</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6 text-glow-cyan">
            In the Lab
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 font-body">
            Wild Labs is currently building new game experiences and exploring experimental ideas.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">
            More information will be revealed soon.
          </p>
          {/* Technical diagram accent */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-primary/30" />
            <div className="w-2 h-2 border border-primary/40 rotate-45" />
            <div className="w-24 h-px bg-primary/30" />
            <div className="w-2 h-2 border border-primary/40 rotate-45" />
            <div className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </section>

      {/* JOIN US */}
      <section className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl mx-auto text-center reveal opacity-0">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Work With Us
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 font-body">
            We're always looking for curious builders who want to create something extraordinary.
          </p>
          <a
            href="mailto:hello@wildlabs.se"
            className="inline-block px-8 py-3 border border-secondary/50 text-secondary font-display text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:glow-gold hover:bg-secondary/10 hover:border-secondary"
          >
            Contact
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <img src={wolfWhite} alt="Wild Labs" className="w-8 h-8 object-contain opacity-40" />
          <div className="flex items-center gap-4 text-muted-foreground text-xs tracking-[0.15em] uppercase font-body">
            <span>Wild Labs</span>
            <span className="text-border">·</span>
            <span>Stockholm</span>
            <span className="text-border">·</span>
            <a href="mailto:hello@wildlabs.se" className="hover:text-foreground transition-colors">hello@wildlabs.se</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
