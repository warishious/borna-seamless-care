import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from "motion/react";
import {
  Calendar,
  FileText,
  MessageSquare,
  CreditCard,
  Users,
  ClipboardList,
  Building2,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Play,
  Sparkles,
  Bell,
  CheckCircle2,
  Phone,
  Clock,
  X,
  Check,
  Activity,
  Network,
  BarChart3,
  Bot,
  HeartPulse,
} from "lucide-react";
import logoUrl from "@/assets/borna-care-logo.svg";

export const Route = createFileRoute("/")({
  component: BornaLanding,
});

/* ---------------- Shared UI ---------------- */

function GlowOrb({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl animate-pulse-glow ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function MagneticButton({
  children,
  variant = "primary",
  href = "#cta",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_40px_-10px_oklch(0.68_0.22_300/0.6)] hover:shadow-[0_20px_60px_-10px_oklch(0.68_0.22_300/0.8)]"
      : "text-white/90 border border-white/10 hover:bg-white/5";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles}`}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full"
          style={{ backgroundImage: "var(--gradient-purple)" }}
        />
      )}
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </motion.a>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest text-white/70 uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.24_305)] shadow-[0_0_10px_oklch(0.72_0.24_305)]" />
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Nav ---------------- */

function Nav() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(1100px,calc(100%-2rem))]">
      <div className="glass-panel flex items-center justify-between px-4 py-2.5">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoUrl} alt="Borna Care" className="h-6 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/70">
          <a href="#platform" className="hover:text-white transition">Platform</a>
          <a href="#experiences" className="hover:text-white transition">Experiences</a>
          <a href="#switch" className="hover:text-white transition">Why switch</a>
          <a href="#scale" className="hover:text-white transition">Scale</a>
          <a href="#ecosystem" className="hover:text-white transition">Ecosystem</a>
        </nav>
        <MagneticButton>Book a Demo</MagneticButton>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPatient = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yClinic = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-hero-glow pt-40 pb-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <GlowOrb className="left-[-10%] top-[10%] h-[500px] w-[500px] bg-[oklch(0.5_0.25_300/0.4)]" />
      <GlowOrb className="right-[-10%] top-[30%] h-[600px] w-[600px] bg-[oklch(0.45_0.22_280/0.35)]" delay={1.5} />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <SectionEyebrow>The Healthcare OS · Borna Care</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-5xl md:text-7xl leading-[1.02] text-gradient-purple">
            Modern healthcare starts
            <br />
            with a better <em className="italic font-normal">patient experience.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70 leading-relaxed">
            Patients expect online booking, digital forms, secure payments, and instant
            communication. Your team deserves one platform to manage providers, appointments,
            branches, and daily operations — without juggling multiple systems.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>Book a Demo</MagneticButton>
            <MagneticButton variant="ghost">
              <Play className="h-4 w-4" /> Watch Product Tour
            </MagneticButton>
          </div>
        </Reveal>

        {/* Split hero visual */}
        <div className="relative mt-24 grid gap-6 md:grid-cols-[1fr_1.4fr] items-center">
          <motion.div style={{ y: yPatient }}>
            <PatientPhoneMock />
          </motion.div>
          <motion.div style={{ y: yClinic }}>
            <ClinicDashboardMock />
          </motion.div>

          {/* Connecting energy */}
          <svg
            className="pointer-events-none absolute inset-0 hidden md:block"
            preserveAspectRatio="none"
            viewBox="0 0 800 400"
          >
            <defs>
              <linearGradient id="flow" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.24 305)" stopOpacity="0" />
                <stop offset="50%" stopColor="oklch(0.72 0.24 305)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="oklch(0.72 0.24 305)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M280,180 C360,140 440,240 520,200"
              stroke="url(#flow)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

function PatientPhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div
        className="relative rounded-[2.5rem] border border-white/10 p-3 animate-float-slow"
        style={{ background: "linear-gradient(180deg, oklch(0.22 0.05 285), oklch(0.16 0.04 275))", boxShadow: "var(--shadow-elevated), 0 0 80px -20px oklch(0.68 0.22 300 / 0.4)" }}
      >
        <div className="rounded-[2rem] overflow-hidden bg-[oklch(0.12_0.03_275)] p-5">
          <div className="flex items-center justify-between text-[10px] text-white/60">
            <span>9:41</span>
            <span>••• 5G</span>
          </div>
          <div className="mt-4">
            <p className="text-[11px] text-white/50">Good morning,</p>
            <p className="text-lg text-white font-medium">Sarah</p>
          </div>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-[oklch(0.55_0.24_300/0.3)] to-[oklch(0.35_0.2_285/0.2)] p-4 border border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-white/60">Next visit</p>
            <p className="mt-1 text-sm text-white">Dr. Amelie · Cardiology</p>
            <p className="text-xs text-white/70">Tomorrow · 10:30 AM</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="text-[10px] rounded-full bg-white text-black px-3 py-1">Check in</button>
              <button className="text-[10px] rounded-full border border-white/20 text-white px-3 py-1">Reschedule</button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[Calendar, FileText, MessageSquare, CreditCard].map((Icon, i) => (
              <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                <Icon className="h-4 w-4 text-white/80" />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-white/5 border border-white/5 p-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[oklch(0.55_0.24_300)]" />
              <div className="flex-1">
                <p className="text-[10px] text-white/80">Reception</p>
                <p className="text-[10px] text-white/50">Forms ready ✓</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClinicDashboardMock() {
  return (
    <div
      className="relative rounded-2xl border border-white/10 p-5 animate-float-slow"
      style={{ background: "linear-gradient(180deg, oklch(0.2 0.04 280), oklch(0.14 0.03 275))", boxShadow: "var(--shadow-elevated)", animationDelay: "1.5s" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Today</p>
          <p className="text-lg text-white">Downtown Clinic</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#4ade80]" />
          Live
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "Appointments", value: "38", trend: "+12%" },
          { label: "Check-ins", value: "26", trend: "+8%" },
          { label: "Revenue", value: "$14.2k", trend: "+21%" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
            <p className="text-[10px] text-white/50">{m.label}</p>
            <p className="mt-1 text-xl text-white"><Counter value={m.value} /></p>
            <p className="text-[10px] text-emerald-400">{m.trend}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Schedule</p>
        <div className="space-y-2">
          {[
            { t: "10:30", n: "Sarah Chen", d: "Cardiology · Dr. Amelie", s: "Confirmed" },
            { t: "11:00", n: "Michael Ross", d: "General · Dr. Kwan", s: "Forms ✓" },
            { t: "11:30", n: "Priya Patel", d: "Pediatrics · Dr. Silva", s: "Paid" },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2"
            >
              <span className="text-xs text-white/60 w-10">{r.t}</span>
              <div className="flex-1">
                <p className="text-xs text-white">{r.n}</p>
                <p className="text-[10px] text-white/50">{r.d}</p>
              </div>
              <span className="text-[10px] rounded-full bg-[oklch(0.68_0.22_300/0.2)] text-[oklch(0.85_0.15_300)] px-2 py-0.5">{r.s}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.24_300/0.15)] to-transparent border border-white/10 p-3 flex items-center gap-3">
        <Bell className="h-4 w-4 text-[oklch(0.85_0.15_300)]" />
        <p className="text-xs text-white/80">Sarah completed her intake forms · 2m ago</p>
      </div>
    </div>
  );
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(value.startsWith("$") ? "$0" : "0");
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.startsWith("$") ? "$" : "";
    const suffix = value.includes("k") ? "k" : "";
    const controls = animate(0, num, {
      duration: 1.5,
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(value.includes(".") ? 1 : 0)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

/* ---------------- Reality section ---------------- */

function Reality() {
  const steps = [
    { icon: Phone, label: "Patient calls — placed on hold" },
    { icon: FileText, label: "Paperwork forgotten before visit" },
    { icon: Clock, label: "Waiting room piles up" },
    { icon: ClipboardList, label: "Staff re-enters forms by hand" },
    { icon: CreditCard, label: "Payment chased days later" },
    { icon: X, label: "Appointments missed. Everyone frustrated." },
  ];
  return (
    <section className="relative py-32 overflow-hidden">
      <GlowOrb className="left-1/2 top-0 -translate-x-1/2 h-[400px] w-[900px] bg-[oklch(0.35_0.15_20/0.2)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionEyebrow>The reality every clinic knows</SectionEyebrow>
          <h2 className="mt-6 max-w-3xl text-4xl md:text-6xl text-white leading-[1.05]">
            Every day, small inefficiencies
            <br />
            <span className="text-white/40 italic">become lost revenue.</span>
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:left-1/2" />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={`grid md:grid-cols-2 gap-4 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className="glass-panel p-5 flex items-center gap-4 [direction:ltr]">
                    <div className="h-11 w-11 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <s.icon className="h-5 w-5 text-white/70" />
                    </div>
                    <p className="text-white/85">{s.label}</p>
                  </div>
                  <div />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="mt-20 text-center text-2xl md:text-3xl text-white/80 italic font-display">
            Healthcare has evolved. <span className="text-white">Most clinic software hasn't.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Meet Borna Care (workflow) ---------------- */

function Platform() {
  const flow = [
    { icon: Calendar, text: "Patient books online" },
    { icon: FileText, text: "Forms completed digitally" },
    { icon: Stethoscope, text: "Provider receives everything" },
    { icon: ClipboardList, text: "Appointment managed automatically" },
    { icon: CreditCard, text: "Payment collected online" },
    { icon: MessageSquare, text: "Patient receives follow-up" },
    { icon: Activity, text: "Everything updates instantly" },
  ];
  return (
    <section id="platform" className="relative py-32 overflow-hidden">
      <GlowOrb className="right-[-15%] top-[10%] h-[500px] w-[500px] bg-[oklch(0.5_0.25_300/0.25)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <SectionEyebrow>Meet Borna Care</SectionEyebrow>
            <h2 className="mt-6 mx-auto max-w-3xl text-4xl md:text-6xl text-gradient-purple leading-[1.05]">
              One connected platform for every patient, every provider, and every clinic.
            </h2>
          </div>
        </Reveal>

        <div className="mt-20 glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="relative grid gap-3 md:grid-cols-7">
            {flow.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 h-full flex flex-col items-center text-center gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--gradient-purple)", boxShadow: "0 0 20px -5px oklch(0.68 0.22 300 / 0.7)" }}
                  >
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xs text-white/80 leading-snug">{f.text}</p>
                </div>
                {i < flow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-[-6px] w-3 h-px bg-white/20" />
                )}
              </motion.div>
            ))}
          </div>
          <p className="relative mt-10 text-center text-white/60 max-w-2xl mx-auto">
            Instead of six different systems, everything happens inside Borna Care.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Two Experiences ---------------- */

function Experiences() {
  const patient = [
    "Online Scheduling",
    "Health & Insurance Forms",
    "Secure Messaging",
    "Online Payments",
    "Family Management",
    "Visit History",
  ];
  const practice = [
    "Appointment Management",
    "Providers & Services",
    "Forms Management",
    "Payment Tracking",
    "Multi-Branch Management",
    "Patient Records",
  ];
  return (
    <section id="experiences" className="relative py-32 overflow-hidden">
      <GlowOrb className="left-1/2 -translate-x-1/2 top-1/3 h-[600px] w-[900px] bg-[oklch(0.5_0.25_300/0.2)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <SectionEyebrow>Two experiences · one platform</SectionEyebrow>
            <h2 className="mt-6 mx-auto max-w-3xl text-4xl md:text-6xl text-white leading-[1.05]">
              When patients have a better experience,
              <br />
              <span className="text-gradient-purple italic">your practice runs better too.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass-panel p-8 h-full">
              <p className="text-xs uppercase tracking-widest text-white/50">Patient Experience</p>
              <h3 className="mt-2 text-3xl text-white">Everything patients need.</h3>
              <div className="mt-8 flex justify-center">
                <PatientPhoneMock />
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {patient.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[oklch(0.75_0.2_300)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-panel p-8 h-full">
              <p className="text-xs uppercase tracking-widest text-white/50">Practice Experience</p>
              <h3 className="mt-2 text-3xl text-white">Everything clinics need.</h3>
              <div className="mt-8">
                <ClinicDashboardMock />
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {practice.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[oklch(0.75_0.2_300)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Clinics Switch ---------------- */

function Switch() {
  const stories = [
    {
      icon: Calendar,
      title: "Scheduling",
      problem: "Patients stop waiting. Staff stop answering repetitive phone calls.",
      outcome: "Appointments happen faster.",
    },
    {
      icon: FileText,
      title: "Digital Forms",
      problem: "Patients arrive prepared. Reception spends less time on paperwork.",
      outcome: "Providers get complete information before appointments.",
    },
    {
      icon: CreditCard,
      title: "Payments",
      problem: "Invoices become digital. Reminders happen automatically.",
      outcome: "Revenue arrives sooner.",
    },
    {
      icon: Stethoscope,
      title: "Providers & Services",
      problem: "Manage providers, specialties, schedules, and services from one dashboard.",
      outcome: "Everything stays organized.",
    },
    {
      icon: Building2,
      title: "Branches",
      problem: "Whether you have one clinic or fifty, Borna Care keeps every location connected.",
      outcome: "One platform. One identity. One source of truth.",
    },
    {
      icon: MessageSquare,
      title: "Clinic Chat",
      problem: "Patients stay informed. Staff answer faster.",
      outcome: "Everything remains secure.",
    },
  ];
  return (
    <section id="switch" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <SectionEyebrow>Why clinics switch</SectionEyebrow>
            <h2 className="mt-6 mx-auto max-w-3xl text-4xl md:text-6xl text-white leading-[1.05]">
              We don't ship features. <span className="text-gradient-purple italic">We remove friction.</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group glass-panel p-6 h-full relative overflow-hidden transition hover:border-white/20">
                <div
                  className="absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition duration-700 blur-3xl"
                  style={{ background: "oklch(0.55 0.25 300 / 0.4)" }}
                />
                <div className="relative">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--gradient-purple)" }}
                  >
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-xl text-white">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{s.problem}</p>
                  <div className="my-5 h-px bg-white/10" />
                  <p className="text-sm text-white/90">{s.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Transformation (before/after) ---------------- */

function Transformation() {
  const rows: [string, string][] = [
    ["Phone calls all day", "Online scheduling"],
    ["Paper forms", "Digital forms"],
    ["Manual billing", "Online payments"],
    ["Separate scheduling software", "Provider management"],
    ["Multiple disconnected systems", "One connected platform"],
    ["Branch confusion", "Multi-branch management"],
    ["Disconnected communication", "Secure messaging"],
  ];
  return (
    <section className="relative py-32 overflow-hidden">
      <GlowOrb className="right-[-10%] bottom-0 h-[400px] w-[600px] bg-[oklch(0.5_0.25_300/0.2)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <SectionEyebrow>The transformation</SectionEyebrow>
            <h2 className="mt-6 text-4xl md:text-6xl text-white">
              Before <span className="text-white/40">/</span> After
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="glass-panel p-8">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-6">Without Borna Care</p>
            <ul className="space-y-4">
              {rows.map(([b]) => (
                <li key={b} className="flex items-start gap-3 text-white/60 line-through decoration-white/20">
                  <X className="h-4 w-4 mt-1 shrink-0 text-white/30" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-3xl p-8 relative overflow-hidden border border-white/15"
            style={{ background: "linear-gradient(160deg, oklch(0.28 0.12 295 / 0.6), oklch(0.16 0.05 275))", boxShadow: "var(--shadow-glow)" }}
          >
            <p className="text-xs uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> With Borna Care
            </p>
            <ul className="space-y-4">
              {rows.map(([, a], i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-white"
                >
                  <div className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-purple)" }}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  {a}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Scale ---------------- */

function Scale() {
  const branches = ["Clinic A", "Clinic B", "Clinic C", "Clinic D"];
  return (
    <section id="scale" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <SectionEyebrow>Built to scale</SectionEyebrow>
            <h2 className="mt-6 mx-auto max-w-3xl text-4xl md:text-6xl text-white leading-[1.05]">
              Grow from one clinic to <span className="text-gradient-purple italic">an entire healthcare network.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-20 glass-panel p-10 relative overflow-hidden">
          <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] items-center">
            <div className="space-y-3">
              {branches.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 flex items-center gap-3"
                >
                  <Building2 className="h-4 w-4 text-white/70" />
                  <span className="text-sm text-white">{b}</span>
                  <span className="ml-auto text-[10px] text-emerald-400">● Live</span>
                </motion.div>
              ))}
            </div>

            <svg width="120" height="200" className="hidden md:block">
              {branches.map((_, i) => (
                <motion.path
                  key={i}
                  d={`M0,${20 + i * 45} C60,${20 + i * 45} 60,100 120,100`}
                  stroke="oklch(0.72 0.24 305 / 0.6)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                  viewport={{ once: true }}
                />
              ))}
            </svg>

            <div
              className="rounded-2xl p-6 text-center border border-white/15"
              style={{ background: "linear-gradient(160deg, oklch(0.28 0.12 295 / 0.6), oklch(0.16 0.05 275))", boxShadow: "var(--shadow-glow)" }}
            >
              <p className="text-xs uppercase tracking-widest text-white/60">One Borna Dashboard</p>
              <div className="mt-4 space-y-2 text-sm text-white/85">
                <p className="flex items-center gap-2 justify-center"><Users className="h-4 w-4" /> Shared patient records</p>
                <p className="flex items-center gap-2 justify-center"><Calendar className="h-4 w-4" /> Centralized scheduling</p>
                <p className="flex items-center gap-2 justify-center"><BarChart3 className="h-4 w-4" /> Unified reporting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ecosystem ---------------- */

function Ecosystem() {
  const modules = [
    { icon: HeartPulse, name: "Borna Care", note: "Patient & practice" },
    { icon: MessageSquare, name: "Communication", note: "Secure messaging" },
    { icon: Users, name: "CRM", note: "Patient relationships" },
    { icon: BarChart3, name: "Analytics", note: "Practice intelligence" },
    { icon: Bot, name: "AI Automation", note: "Intake, triage, follow-up" },
    { icon: Network, name: "Future modules", note: "Growing with you" },
  ];
  return (
    <section id="ecosystem" className="relative py-32 overflow-hidden">
      <GlowOrb className="left-1/2 -translate-x-1/2 top-1/4 h-[500px] w-[800px] bg-[oklch(0.5_0.25_300/0.2)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <SectionEyebrow>The Borna Ecosystem</SectionEyebrow>
            <h2 className="mt-6 mx-auto max-w-3xl text-4xl md:text-6xl text-white leading-[1.05]">
              Not just a portal.
              <br />
              <span className="text-gradient-purple italic">A healthcare operating system.</span>
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-white/60">
              Patients stay connected while your technology grows with you.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 relative">
          <div className="grid gap-4 md:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div className="glass-panel p-6 h-full">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--gradient-purple)" }}
                    >
                      <m.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white">{m.name}</p>
                      <p className="text-xs text-white/50">{m.note}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
                    <ShieldCheck className="h-3 w-3" /> HIPAA-ready · Connected
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section id="cta" className="relative py-40 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 500px at 50% 50%, oklch(0.4 0.25 300 / 0.5), transparent 60%), radial-gradient(600px 400px at 30% 30%, oklch(0.35 0.2 280 / 0.35), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="text-5xl md:text-7xl text-gradient-purple leading-[1.02]">
            Every great patient experience starts long before the appointment.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 mx-auto max-w-xl text-lg text-white/70">
            Give patients the convenience they expect while giving your team the tools they deserve.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-white/60 font-display italic text-xl">
            One platform. One workflow. One connected healthcare experience.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center">
            <MagneticButton>Book a Demo</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
        <div className="flex items-center gap-2">
          <img src={logoUrl} alt="Borna Care" className="h-5 w-auto opacity-80" />
          <span>· © {new Date().getFullYear()} Borna Care</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Security</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function BornaLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Reality />
        <Platform />
        <Experiences />
        <Switch />
        <Transformation />
        <Scale />
        <Ecosystem />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
