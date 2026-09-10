import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const KIWIFY_URL = "https://pay.kiwify.com.br/DFqQy5C";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minha Aventurinha com a Bíblia | Livro de Colorir Infantil" },
      {
        name: "description",
        content:
          "Ebook para imprimir com 50 páginas de desenhos bíblicos para colorir, versículos e atividades. Ideal para pais e professores. Super promoção: apenas R$ 19,90.",
      },
      { property: "og:title", content: "Minha Aventurinha com a Bíblia" },
      {
        property: "og:description",
        content:
          "50 páginas de diversão com Deus: colorir, atividades e versículos para crianças. Super promoção R$ 19,90 por tempo limitado. Baixe e imprima quantas vezes quiser.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Promoção: contagem regressiva de 6 horas reiniciando ao acabar.
function useCountdown(hours: number) {
  const KEY = "promo_deadline";
  const getDeadline = () => {
    if (typeof window === "undefined") return Date.now() + hours * 3600_000;
    const saved = Number(window.localStorage.getItem(KEY));
    if (!saved || saved < Date.now()) {
      const next = Date.now() + hours * 3600_000;
      window.localStorage.setItem(KEY, String(next));
      return next;
    }
    return saved;
  };
  const [deadline, setDeadline] = useState<number>(getDeadline);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now();
      if (t >= deadline) {
        const next = t + hours * 3600_000;
        setDeadline(next);
        if (typeof window !== "undefined") window.localStorage.setItem(KEY, String(next));
      }
      setNow(t);
    }, 1000);
    return () => clearInterval(id);
  }, [deadline, hours]);
  const rem = Math.max(0, deadline - now);
  const h = Math.floor(rem / 3600_000);
  const m = Math.floor((rem % 3600_000) / 60_000);
  const s = Math.floor((rem % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { top: "8%", scale: 1, delay: "0s", dur: "48s" },
        { top: "26%", scale: 0.7, delay: "-14s", dur: "62s" },
        { top: "48%", scale: 1.3, delay: "-30s", dur: "72s" },
      ].map((c, i) => (
        <div
          key={i}
          className="animate-cloud absolute opacity-70"
          style={{ top: c.top, animationDelay: c.delay, animationDuration: c.dur }}
        >
          <div style={{ transform: `scale(${c.scale})` }}>
            <div className="relative h-10 w-28 rounded-full bg-card">
              <div className="absolute -top-5 left-5 h-14 w-14 rounded-full bg-card" />
              <div className="absolute -top-3 left-14 h-10 w-10 rounded-full bg-card" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setShown(true),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={shown ? "animate-pop-in" : "opacity-0"}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const paginas = [
  { src: "/images/capa.webp", label: "Capa" },
  { src: "/images/pag1.webp", label: "Página 1 — A Criação" },
  { src: "/images/pag2.webp", label: "Página 2 — Caça-palavras" },
  { src: "/images/pag3.webp", label: "Página 3 — Noé e a Arca" },
  { src: "/images/verso.webp", label: "Verso" },
];

function Book() {
  const [i, setI] = useState(0);
  const [turning, setTurning] = useState(false);
  const total = paginas.length;

  const go = (dir: number) => {
    setTurning(true);
    setTimeout(() => {
      setI((p) => (p + dir + total) % total);
      setTurning(false);
    }, 260);
  };

  const noSave = {
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };

  return (
    <div className="book-scene mx-auto w-full max-w-[340px] select-none">
      <div className="animate-float-soft">
        <div
          {...noSave}
          onClick={() => go(1)}
          className="book-page relative aspect-[1035/1500] w-full cursor-pointer rounded-2xl bg-card shadow-[var(--shadow-card)]"
          style={{
            backgroundImage: `url("${paginas[i]!.src}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: turning ? "rotateY(-70deg)" : "rotateY(-6deg)",
            opacity: turning ? 0.35 : 1,
          }}
          role="button"
          aria-label={`Ver ${paginas[i]!.label} — clique para virar a página`}
        >
          <span className="absolute inset-0 rounded-2xl" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Página anterior"
          className="cta-toy font-display h-11 w-11 rounded-full text-xl font-extrabold"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {paginas.map((p, idx) => (
            <button
              key={p.src}
              onClick={() => idx !== i && (setTurning(true), setTimeout(() => (setI(idx), setTurning(false)), 260))}
              aria-label={`Ver ${p.label}`}
              className={`h-3 w-3 rounded-full transition-transform ${idx === i ? "scale-125 bg-primary" : "bg-navy/25"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Próxima página"
          className="cta-toy font-display h-11 w-11 rounded-full text-xl font-extrabold"
        >
          ›
        </button>
      </div>

      <p className="mt-3 text-center text-sm font-bold text-navy/70">
        📖 {paginas[i]!.label} • toque no livrinho ou nas setas para folhear
      </p>
    </div>
  );
}

const beneficios = [
  { icon: "📖", t: "Histórias bíblicas incríveis", d: "Passagens contadas de um jeitinho simples que a criança entende." },
  { icon: "✏️", t: "Desenhos para colorir", d: "Traços grossos e fáceis, perfeitos para lápis de cor e giz." },
  { icon: "🧩", t: "Atividades divertidas", d: "Jogos, labirintos, caça-palavras e ligue os pontos." },
  { icon: "💛", t: "Versículos para guardar", d: "Cada página ensina uma verdade linda sobre o amor de Deus." },
  { icon: "🖨️", t: "Imprima quantas vezes quiser", d: "PDF em alta qualidade, A4. Serve para casa, escola e igreja." },
  { icon: "⚡", t: "Acesso na hora", d: "Baixe imediatamente após o pagamento. Sem esperar entrega." },
];

function Index() {
  return (
    <main className="sky-bg relative min-h-screen overflow-hidden text-navy">
      <Clouds />

      {/* BANNER SUPER PROMOÇÃO */}
      <div className="relative z-10 bg-accent px-4 py-2 text-center font-display text-sm font-extrabold text-accent-foreground shadow-md md:text-base">
        🔥 SUPER PROMOÇÃO RELÂMPAGO! De R$ 59,90 por apenas R$ 19,90 — oferta termina em breve!
      </div>

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-5 pt-10 pb-16 md:pt-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <span className="animate-wiggle inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-extrabold text-accent-foreground shadow-md">
              🔥 Super promoção • R$ 19,90 por tempo limitado
            </span>
            <h1 className="font-display mt-5 text-4xl leading-tight font-extrabold text-navy md:text-5xl">
              Minha Aventurinha
              <span className="block text-primary">com a Bíblia</span>
            </h1>
            <p className="mt-4 text-lg font-semibold text-navy/80">
              Um livro de colorir e atividades que ensina as crianças sobre Deus
              brincando. Baixe, imprima e veja os pequenos se apaixonarem pelas
              histórias da Bíblia.
            </p>
            <a
              href="#oferta"
              className="cta-toy animate-pulse-toy font-display mt-8 inline-flex items-center gap-2 rounded-full px-9 py-4 text-xl font-extrabold"
            >
              QUERO O LIVRINHO! 🎨
            </a>
            <p className="font-display mt-3 text-lg font-extrabold text-primary">
              50 páginas em PDF por R$ 19,90 — acesso imediato
            </p>
            <p className="mt-1 text-sm font-bold text-navy/60 line-through">
              preço anterior R$ 29,99
            </p>
            <p className="mt-1 text-sm font-bold text-navy/60">
              Pagamento seguro • Acesso imediato
            </p>
          </div>
          <Book />
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="relative bg-card/70 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-center text-3xl font-extrabold md:text-4xl">
              Tudo que vem dentro do livrinho 🌈
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beneficios.map((b, i) => (
              <Reveal key={b.t} delay={i * 80}>
                <div className="card-toy h-full rounded-3xl p-6 transition-transform hover:-translate-y-1.5">
                  <div className="text-4xl">{b.icon}</div>
                  <h3 className="font-display mt-3 text-xl font-extrabold">{b.t}</h3>
                  <p className="mt-2 font-semibold text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <div className="card-toy rounded-[2rem] p-8 text-center md:p-12">
              <h2 className="font-display text-3xl font-extrabold">
                Feito para pais e professores 💚
              </h2>
              <p className="mt-4 text-lg font-semibold text-muted-foreground">
                Se você quer tirar as crianças da tela e colocar algo bom no
                coração delas, esse material é pra você. Use em casa, na escola
                dominical, no culto infantil ou na sala de aula.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {["👨‍👩‍👧 Famílias", "⛪ Escola dominical", "🍎 Professores"].map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl bg-secondary px-4 py-4 font-display text-lg font-extrabold text-secondary-foreground"
                  >
                    {x}
                  </div>
                ))}
              </div>
              <blockquote className="mt-10 rounded-2xl bg-sun/40 p-6 font-display text-xl font-bold italic">
                “Deixem vir a mim as crianças, pois delas é o Reino de Deus.”
                <span className="mt-2 block text-base not-italic opacity-70">
                  Marcos 10:14
                </span>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="scroll-mt-6 pb-20">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="card-toy relative overflow-hidden rounded-[2rem] p-8 text-center md:p-12">
              <div className="animate-wiggle inline-block rounded-full bg-accent px-5 py-2 font-display text-sm font-extrabold text-accent-foreground">
                OFERTA DE LANÇAMENTO
              </div>
              <h2 className="font-display mt-5 text-3xl font-extrabold md:text-4xl">
                Leve as 50 páginas hoje mesmo
              </h2>

              <ul className="mx-auto mt-7 max-w-md space-y-3 text-left">
                {[
                  "50 páginas de diversão com Deus",
                  "Desenhos bíblicos para colorir",
                  "Atividades educativas e jogos",
                  "Versículos e ensinamentos",
                  "PDF em alta qualidade para imprimir sempre",
                  "Acesso imediato e vitalício",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-3 font-bold">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-accent-foreground">
                      ✓
                    </span>
                    {li}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <p className="font-bold text-muted-foreground line-through">
                  De R$ 59,90
                </p>
                <p className="font-display text-6xl font-extrabold text-primary">
                  R$ 29,99
                </p>
                <p className="font-bold text-muted-foreground">pagamento único</p>
              </div>

              <a
                href={KIWIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-toy animate-pulse-toy font-display mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-5 text-2xl font-extrabold"
              >
                COMPRAR AGORA 🎉
              </a>
              <p className="mt-4 text-sm font-bold text-muted-foreground">
                🔒 Compra 100% segura via Kiwify • Garantia de 7 dias
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-navy py-8 text-center">
        <p className="font-display text-lg font-extrabold text-secondary">
          Feito com amor para crianças 🌈
        </p>
        <p className="mt-2 text-sm font-semibold text-card/70">
          © {new Date().getFullYear()} Minha Aventurinha com a Bíblia
        </p>
      </footer>
    </main>
  );
}
