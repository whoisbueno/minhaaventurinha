import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import capa from "@/assets/capa.png.asset.json";
import verso from "@/assets/verso.png.asset.json";

const KIWIFY_URL = "https://pay.kiwify.com.br/DFqQy5C";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Minha Aventurinha com a Bíblia | Livro de Colorir Infantil" },
      {
        name: "description",
        content:
          "Ebook para imprimir com 50 páginas de desenhos bíblicos para colorir, versículos e atividades. Ideal para pais e professores. Apenas R$ 29,99.",
      },
      { property: "og:title", content: "Minha Aventurinha com a Bíblia" },
      {
        property: "og:description",
        content:
          "50 páginas de diversão com Deus: colorir, atividades e versículos para crianças. Baixe e imprima quantas vezes quiser.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

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

function Book() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="book-scene mx-auto w-full max-w-[340px] select-none">
      <button
        onClick={() => setFlipped((f) => !f)}
        aria-label="Virar o livro"
        className="animate-float-soft block w-full"
      >
        <div
          className="book-3d relative aspect-[1035/1500] w-full"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(-12deg)" }}
        >
          <img
            src={capa.url}
            alt="Capa do livro de colorir Minha Aventurinha com a Bíblia"
            className="book-face h-full w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
          />
          <img
            src={verso.url}
            alt="Verso do livro com a lista de tudo que vem dentro"
            className="book-face h-full w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
            style={{ transform: "rotateY(180deg)" }}
          />
        </div>
      </button>
      <p className="mt-4 text-center text-sm font-bold text-navy/70">
        👆 Toque no livrinho para ver o {flipped ? "a capa" : "verso"}
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

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-5 pt-12 pb-16 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <span className="animate-wiggle inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-extrabold text-secondary-foreground shadow-md">
              ✨ Ebook para imprimir • 50 páginas
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
              className="cta-toy font-display mt-8 inline-flex items-center gap-2 rounded-full px-9 py-4 text-xl font-extrabold"
            >
              QUERO O LIVRINHO! 🎨
            </a>
            <p className="mt-3 text-sm font-bold text-navy/60">
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
