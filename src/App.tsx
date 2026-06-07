import { useState, useEffect, useRef } from "react";
import { sendEmail } from "./utils/emailService";
import { AIChatModal } from "./components/AIChatModal";
import { AIDemo } from "./components/AIDemo";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const skills = [
  { name: "React / Next.js", level: 95, color: "from-cyan-400 to-blue-500" },
  { name: "TypeScript", level: 90, color: "from-blue-400 to-indigo-500" },
  { name: "Tailwind CSS", level: 92, color: "from-teal-400 to-cyan-500" },
  { name: "Node.js / Express", level: 85, color: "from-green-400 to-emerald-500" },
  { name: "Python / Django", level: 80, color: "from-yellow-400 to-orange-500" },
  { name: "PostgreSQL / MongoDB", level: 82, color: "from-purple-400 to-pink-500" },
  { name: "UI/UX Design", level: 75, color: "from-pink-400 to-rose-500" },
  { name: "DevOps / AWS", level: 70, color: "from-orange-400 to-red-500" },
];

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard built with Next.js and Stripe.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    github: "#",
    link: "#",
    size: "large",
  },
  {
    title: "AI Chat Application",
    description:
      "Real-time AI chat powered by Groq. Experience lightning-fast responses with our advanced language model. Try it with the chat button in the bottom-right corner!",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tags: ["React", "Groq API", "Real-time", "AI"],
    github: "#",
    link: "#",
    size: "small",
  },
  {
    title: "Portfolio Generator",
    description:
      "CLI tool that generates beautiful portfolio websites from a JSON configuration file with customizable themes.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["TypeScript", "CLI", "Puppeteer", "SCSS"],
    github: "#",
    link: "#",
    size: "small",
  },
  {
    title: "Fitness Tracker",
    description:
      "Mobile-first fitness tracking app with workout plans, progress charts, and social features for community motivation.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop",
    tags: ["React Native", "Firebase", "Chart.js", "Expo"],
    github: "#",
    link: "#",
    size: "large",
  },
  {
    title: "Crypto Dashboard",
    description:
      "Live cryptocurrency dashboard with real-time price tracking, portfolio management, and advanced charting.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    tags: ["Vue.js", "D3.js", "CoinGecko API", "Tailwind"],
    github: "#",
    link: "#",
    size: "small",
  },
  {
    title: "Smart Home Hub",
    description:
      "IoT dashboard for controlling smart home devices with automation rules, energy monitoring, and voice commands.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    tags: ["React", "MQTT", "Node-RED", "Docker"],
    github: "#",
    link: "#",
    size: "small",
  },
];

const experiences = [
  {
    role: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    period: "2023 - Present",
    description:
      "Leading development of microservices architecture serving 2M+ users. Improved system performance by 40% through optimization.",
    tech: ["React", "Node.js", "AWS", "Kubernetes"],
  },
  {
    role: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2021 - 2023",
    description:
      "Built scalable web applications from scratch. Implemented CI/CD pipelines reducing deployment time by 60%.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2019 - 2021",
    description:
      "Developed 20+ client websites with focus on responsive design and accessibility. Won 3 design awards.",
    tech: ["React", "Vue.js", "SCSS", "Figma"],
  },
  {
    role: "Junior Developer",
    company: "CodeBase Labs",
    period: "2018 - 2019",
    description:
      "Started professional journey building internal tools and learning enterprise development practices.",
    tech: ["JavaScript", "HTML/CSS", "PHP", "MySQL"],
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp Inc.",
    content:
      "Exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are outstanding. A true professional.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO, StartupXYZ",
    content:
      "Transformed our legacy codebase into a modern, scalable architecture. The performance improvements were beyond our expectations. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, Digital Agency",
    content:
      "One of the best developers I've worked with. They understand business requirements and translate them into elegant technical solutions.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
      });
    }

    let animationId: number;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139, 92, 246, 0.4)";
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "animate-slide-up" : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function GradientOrb({ className = "", size = 300 }: { className?: string; size?: number }) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] opacity-20 animate-pulse-glow ${className}`}
      style={{ width: size, height: size, background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
    />
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((n) => n.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(`#${section}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="relative group">
            <span className="text-2xl font-black gradient-text tracking-tight">
              SK<span className="text-violet-400">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                className={`nav-link text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href ? "text-violet-400" : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold overflow-hidden group"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className={`space-y-1.5 transition-all duration-300 ${mobileOpen ? "rotate-90" : ""}`}>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-fade-in">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href ? "text-violet-400" : "text-slate-400"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950" />
      <GradientOrb className="top-20 -left-40" size={500} />
      <GradientOrb className="bottom-20 -right-40" size={400} />
      <GradientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={300} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-violet-300 font-medium">Available for new opportunities</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Hi, I'm{" "}
              <span className="gradient-text">Shakib Sheikh</span>
            </h1>

            <div className="h-12 overflow-hidden">
              <p className="text-xl sm:text-2xl text-slate-400 font-medium typing-effect inline-block">
                Full Stack Developer
              </p>
            </div>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              I craft exceptional digital experiences with clean code and creative
              solutions. Passionate about building products that make a difference.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300 hover:border-white/40"
            >
              Get In Touch
            </a>
          </div>

          <div className="flex items-center gap-8 pt-4">
            {[
              { label: "5+ Years", sublabel: "Experience" },
              { label: "50+", sublabel: "Projects" },
              { label: "30+", sublabel: "Clients" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black gradient-text">{stat.label}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div
            className="relative w-[420px] h-[420px] mx-auto transition-transform duration-300"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/20 to-pink-600/20 animate-float blur-2xl" />
            <div className="relative w-full h-full rounded-full glass overflow-hidden border border-white/10 p-2">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-violet-600/20 to-pink-600/20 flex items-center justify-center">
                <svg className="w-48 h-48 text-violet-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 animate-pulse opacity-60 blur-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-10 -right-8 glass rounded-2xl p-4 animate-float" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold">
                ⚡
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Fast Performance</div>
                <div className="text-slate-400 text-xs">100/100 Lighthouse</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 -left-8 glass rounded-2xl p-4 animate-float" style={{ animationDelay: "1s" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                🎨
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Pixel Perfect</div>
                <div className="text-slate-400 text-xs">Design to Code</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <a href="#about" className="flex flex-col items-center gap-2 text-slate-500 hover:text-violet-400 transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <GradientOrb className="top-40 right-0" size={350} />
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Turning <span className="gradient-text">Ideas</span> into Reality
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl overflow-hidden gradient-border">
                <img
                  src="./ima.jpg"
                  alt="Shakib Sheikh"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm">
                      <span className="text-violet-300 text-sm font-medium">5+ Years Exp.</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 backdrop-blur-sm">
                      <span className="text-pink-300 text-sm font-medium">50+ Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400} className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              I build things for the web with passion and precision
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Hello! I'm Shakib Sheikh, a passionate Full Stack Developer based in San Francisco.
              I enjoy creating things that live on the internet, whether that be websites,
              applications, or anything in between.
            </p>
            <p className="text-slate-400 leading-relaxed">
              My journey started in 2018 when I began learning web development. Since then,
              I've had the privilege of working at various companies, startups, and have
              collaborated with amazing people to create digital products that solve real
              problems. I specialize in building exceptional digital experiences with modern
              technologies.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                "Problem Solving",
                "UI/UX Design",
                "API Development",
                "Database Design",
                "Cloud Architecture",
                "Team Leadership",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
                  <span className="text-slate-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="px-6 py-3 rounded-xl glass border border-white/10 text-white font-medium hover:bg-white/5 transition-all"
              >
                Download CV
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
              >
                View Resume
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life. Constantly learning
            and expanding my skill set.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.name} delay={index * 100}>
              <div
                className="glass rounded-2xl p-6 hover-card cursor-default group"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold group-hover:text-violet-300 transition-colors">
                    {skill.name}
                  </span>
                  <span
                    className={`text-sm font-bold transition-all duration-500 ${
                      hoveredSkill === skill.name ? "text-white scale-110" : "text-slate-500"
                    }`}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} skill-bar-fill relative`}
                    style={{ width: hoveredSkill === skill.name ? `${skill.level}%` : "0%" }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{
                      background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
                      backgroundSize: "200% 100%",
                      animation: "gradient 2s linear infinite",
                    }} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={800} className="mt-12">
          <div className="glass rounded-3xl p-8 gradient-border">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Tools & Platforms</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "VS Code", "Git", "GitHub", "Docker", "Figma", "Postman",
                "Jira", "Slack", "Vercel", "Netlify", "AWS", "Vite",
                "Webpack", "Jest", "Cypress", "Storybook", "Prisma", "GraphQL",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 hover:border-violet-500/30 hover:text-white transition-all duration-300 cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Web App", "Mobile", "Open Source", "Design"];

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => {
          if (filter === "Web App") return p.tags.some((t) => ["React", "Next.js", "Vue.js", "Node.js"].includes(t));
          if (filter === "Mobile") return p.tags.some((t) => ["React Native", "Expo", "Flutter"].includes(t));
          if (filter === "Open Source") return p.tags.includes("CLI") || p.tags.includes("TypeScript");
          if (filter === "Design") return false;
          return true;
        });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <GradientOrb className="top-20 left-1/4" size={400} />
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            A selection of projects I've worked on. Each one presented unique challenges
            and opportunities for growth.
          </p>
        </ScrollReveal>

        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/25"
                  : "glass text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 150}>
              <div
                className={`group glass rounded-3xl overflow-hidden hover-card ${
                  project.size === "large" ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <a
                      href={project.github}
                      className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </span>
                    </a>
                    <a
                      href={project.link}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </span>
                    </a>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <GradientOrb className="top-1/2 right-0 -translate-y-1/2" size={400} />
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            Career Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-pink-500/50 to-transparent hidden md:block" />

          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.role} delay={index * 200}>
              <div className={`relative grid md:grid-cols-2 gap-8 mb-16 ${
                index % 2 === 0 ? "" : "md:direction-rtl"
              }`}>
                <div className={`${index % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                  <div className="glass rounded-3xl p-8 hover-card gradient-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg ${
                          index % 2 === 0 ? "md:order-2" : ""
                        }`}
                      >
                        {exp.company[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                        <p className="text-violet-400 text-sm">{exp.company}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="text-xs text-slate-500 font-medium bg-slate-800/50 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg shadow-violet-500/50 ring-4 ring-slate-950" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            What <span className="gradient-text">People Say</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="relative max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 gradient-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-600/20 to-pink-600/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="transition-all duration-500">
                {testimonials.map((t, i) => (
                  <div
                    key={t.name}
                    className={`transition-all duration-500 ${i === current ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}
                  >
                    <blockquote className="text-xl md:text-2xl text-slate-300 leading-relaxed text-center italic mb-8">
                      "{t.content}"
                    </blockquote>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => setCurrent(i)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      i === current
                        ? "bg-white/10 border border-violet-500/30"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-violet-500/50"
                    />
                    <div className={`${i === current ? "block" : "hidden md:block"}`}>
                      <div className="text-white text-sm font-semibold">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const success = await sendEmail(formState);
    
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    } else {
      setError("Failed to send message. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <GradientOrb className="top-1/2 left-1/4 -translate-y-1/2" size={400} />
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            Contact Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message
            and let's create something amazing together.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <ScrollReveal delay={200} className="lg:col-span-2 space-y-6">
            <div className="glass rounded-3xl p-8 gradient-border">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                    label: "Email",
                    value: "shakibskty@gmail.com",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                    label: "Location",
                    value: "San Francisco, CA",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                    label: "Phone",
                    value: "+1 (555) 123-4567",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-white font-medium group-hover:text-violet-300 transition-colors">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-slate-500 text-sm mb-3">Follow me on</div>
                <div className="flex gap-3">
                  {[
                    { icon: "🐙", label: "GitHub", href: "#" },
                    { icon: "💼", label: "LinkedIn", href: "#" },
                    { icon: "🐦", label: "Twitter", href: "#" },
                    { icon: "📸", label: "Instagram", href: "#" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-xl hover:border-violet-500/30 hover:bg-violet-500/10 transition-all hover:-translate-y-1 duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 gradient-border">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4 animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-3xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400 text-center">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                      placeholder="Project Collaboration"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={6}
                      className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                            <path stroke="currentColor" strokeWidth="2" d="M12 2a10 10 0 0 1 10 10"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  {error && (
                    <div className="mt-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <a href="#home" className="inline-block mb-4">
              <span className="text-3xl font-black gradient-text">SK<span className="text-violet-400">.</span></span>
            </a>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
              Passionate full-stack developer crafting stunning digital experiences.
              Let's build something amazing together!
            </p>
            <div className="flex gap-3">
              {["🐙", "💼", "🐦", "📸"].map((emoji, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-lg hover:border-violet-500/30 hover:bg-violet-500/10 transition-all hover:-translate-y-1 duration-300"
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-slate-400 hover:text-violet-400 transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p>San Francisco, CA</p>
              <p>shakibskty@gmail.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Shakib Sheikh. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Crafted with ❤️ using React + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleField />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-2xl shadow-violet-500/50 hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Open AI Chat"
      >
        <svg
          className="w-6 h-6 group-hover:scale-110 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="absolute bottom-full mb-2 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Ask AI
        </span>
      </button>

      <AIChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpenDemo={() => {
          setChatOpen(false);
          setDemoOpen(true);
        }}
      />

      {demoOpen && <AIDemo onClose={() => setDemoOpen(false)} />}
    </div>
  );
}

export default App;
