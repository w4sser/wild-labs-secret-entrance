import { useEffect, useRef, useCallback, useState } from 'react';
import wolfLogo from '@/assets/WL_Wolf_CLR1.png';
import wolfWhite from '@/assets/WL_Wolf_White.png';
import fullLogo from '@/assets/WL_logo_CLR1-2.png';
import { Beaker, Heart, Users, Menu, X } from 'lucide-react';
import wasserImg from '@/assets/team/Wasser.jpg';
import axelImg from '@/assets/team/Axel.jpg';
import carlosImg from '@/assets/team/Carlos.jpg';
import grenisImg from '@/assets/team/Grenis.jpg';
import johannesImg from '@/assets/team/Johannes.jpg';
import lordImg from '@/assets/team/Lord.jpg';
import magnusImg from '@/assets/team/Magnus.jpg';

const teamMembers = [
  { name: 'Robert Wasser', title: 'Wild CEO & Co-Founder', img: wasserImg },
  { name: 'Joakim Lord', title: 'Wild CTO & Co-Founder', img: lordImg },
  { name: 'Carlos Villarreal Kwasek', title: 'Wild Art Director & Co-Founder', img: carlosImg },
  { name: 'Magnus Sjöberg', title: 'Wild Engineer & Co-Founder', img: magnusImg },
  { name: 'Marcus Grenängen', title: 'Wild Engineer & Co-Founder', img: grenisImg },
  { name: 'Axel Ljung', title: 'Wild Engineer & Co-Founder', img: axelImg },
  { name: 'Johannes Ohlenschläger', title: 'Wild UX & UI Director & Co-Founder', img: johannesImg },
];

const navLinks = [
  { label: 'About', href: 'about' },
  { label: 'Team', href: 'team' },
  { label: 'In the Lab', href: 'lab' },
  { label: 'Contact', href: 'contact' },
];

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  return (
    <div ref={setupObserver} className="bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
            <img src={wolfWhite} alt="Wild Labs" className="w-6 h-6 object-contain opacity-70" />
            <span className="font-display text-sm tracking-[0.15em] uppercase text-foreground/70">Wild Labs</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <button key={label} onClick={() => scrollTo(href)} className="font-display text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200">
                {label}
              </button>
            ))}
          </div>
          <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background/98 border-b border-border px-6 pb-6 flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <button key={label} onClick={() => scrollTo(href)} className="font-display text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors text-left py-3 border-b border-border/40 last:border-0">
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center scanlines overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="absolute w-[2px] h-[2px] rounded-full bg-cyan/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-float ${8 + Math.random() * 12}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`
              }} />
          ))}
        </div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/20 pointer-events-none"
          style={{ animation: 'glow-pulse 6s ease-in-out infinite', filter: 'blur(80px)' }} />
        <div className="relative z-10 flex flex-col items-center gap-6 px-4">
          <img src={fullLogo} alt="Wild Labs" className="w-64 h-auto md:w-80 object-contain drop-shadow-[0_0_40px_rgba(25,224,212,0.3)]" />
          <p className="text-muted-foreground text-base md:text-lg tracking-wide max-w-md text-center font-body">Something is cooking behind closed doors.</p>
          <p className="text-muted-foreground/70 text-sm md:text-base tracking-wide max-w-sm text-center font-body">An independent studio building dark, exciting experiences with a clear point of view.</p>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <button onClick={() => scrollTo('about')} className="px-8 py-3 border border-primary/50 text-primary font-display text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:glow-cyan hover:bg-primary/10 hover:border-primary">
              Enter the Lab
            </button>
            <button onClick={() => scrollTo('lab')} className="px-8 py-3 border border-border text-muted-foreground font-display text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:border-foreground/40 hover:text-foreground">
              See What We're Building
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal opacity-0 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 pointer-events-none"
                style={{ animation: 'glow-pulse 5s ease-in-out infinite', filter: 'blur(60px)', transform: 'scale(1.5)' }} />
              <img src={wolfLogo} alt="Wild Labs Emblem" className="relative w-48 h-48 md:w-64 md:h-64 object-contain" />
            </div>
          </div>
          <div className="reveal opacity-0">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">Built to make things that stand out.</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 font-body">Wild Labs creates games with stronger identity, sharper feel, and more memorable player experiences. We care about atmosphere, clarity, and execution.</p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">We don't chase bland. Strong mood. Clear fantasy. Tight loops. Real personality.</p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8">
          {[
            { icon: Beaker, title: 'Intentional by Design', desc: 'The best games feel right from the first second. Strong mood, clear fantasy, tight loops — nothing left to chance.' },
            { icon: Heart, title: 'Player Obsession', desc: 'We design experiences that leave a mark. Games people come back to, talk about, and remember.' },
            { icon: Users, title: 'Small Teams. Big Moves.', desc: "Lean teams stay focused, move faster, and build things that don't blur into the background." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="reveal opacity-0 group border border-border bg-card p-8 transition-all duration-500 hover:border-primary/40 hover:glow-cyan"
              style={{ animationDelay: `${i * 0.15}s` }}>
              <Icon className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold mb-3 tracking-tight">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal opacity-0">
            <p className="text-primary/60 font-display text-xs tracking-[0.3em] uppercase mb-4">The Pack</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
            {teamMembers.map(({ name, title, img }, i) => (
              <div key={name}
                className={`reveal opacity-0 group text-center ${i === teamMembers.length - 1 && teamMembers.length % 3 === 1 ? 'sm:col-start-2' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative mb-4 overflow-hidden aspect-square bg-card">
                  <div className="absolute inset-0 border border-border group-hover:border-primary/40 transition-colors duration-500 z-10 pointer-events-none" />
                  <img src={img} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-color group-hover:opacity-0 transition-opacity duration-500" />
                </div>
                <h3 className="font-display text-sm md:text-base font-semibold tracking-tight">{name}</h3>
                <p className="text-muted-foreground text-xs md:text-sm font-body mt-1">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IN THE LAB */}
      <section id="lab" className="relative py-32 px-6 md:px-16 lg:px-24 blueprint-grid overflow-hidden">
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20 pointer-events-none" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-primary/20 pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-primary/20 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center reveal opacity-0">
          <p className="text-primary/60 font-display text-xs tracking-[0.3em] uppercase mb-4">Status: Active</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6 text-glow-cyan">What's Happening in the Lab</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 font-body">New projects are in development. Some details are still locked away.</p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body">That is part of the fun.</p>
          <div className="mt-12 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-primary/30" /><div className="w-2 h-2 border border-primary/40 rotate-45" /><div className="w-24 h-px bg-primary/30" /><div className="w-2 h-2 border border-primary/40 rotate-45" /><div className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl mx-auto text-center reveal opacity-0">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">The door is closed.<br />Not sealed.</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 font-body">For partnerships, publishing, or studio inquiries — reach out.</p>
          <a href="mailto:hello@wildlabs.se" className="inline-block px-8 py-3 border border-secondary/50 text-secondary font-display text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:glow-gold hover:bg-secondary/10 hover:border-secondary">Contact Wild Labs</a>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 px-6 md:px-16 lg:px-24 border-t border-border">
        <div className="max-w-xl mx-auto text-center reveal opacity-0">
          <p className="text-primary/60 font-display text-xs tracking-[0.3em] uppercase mb-4">Get Closer</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">Be first to know.</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-body">No spam. Just secrets — when the time is right.</p>
          {submitted ? (
            <p className="text-primary font-display text-sm tracking-[0.15em] uppercase animate-fade-in-up">You're in. We'll be in touch.</p>
          ) : (
            <form name="newsletter" method="POST" data-netlify="true" onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input type="hidden" name="form-name" value="newsletter" />
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-border px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors min-w-0" />
              <button type="submit" className="px-8 py-3 border border-primary/50 text-primary font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:glow-cyan hover:bg-primary/10 hover:border-primary whitespace-nowrap">Get Access</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <img src={wolfWhite} alt="Wild Labs" className="w-8 h-8 object-contain opacity-40" />
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-xs tracking-[0.15em] uppercase font-body">
            <span>Wild Labs</span><span className="text-border">·</span><span>Stockholm</span><span className="text-border">·</span>
            <a href="mailto:hello@wildlabs.se" className="hover:text-foreground transition-colors">hello@wildlabs.se</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;