import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const KIWIFY_URL = "https://pay.kiwify.com.br/DFqQy5C";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Livro Bíblico Infantil para Colorir em PDF | 50 Páginas" },
      {
        name: "description",
        content:
          "Minha Aventurinha com a Bíblia: ebook em PDF com 50 páginas de desenhos bíblicos para colorir e atividades infantis. Imprima em casa. De R$ 29,90 por R$ 14,90.",
      },
      { property: "og:title", content: "Minha Aventurinha com a Bíblia — 50 páginas em PDF" },
      {
        property: "og:description",
        content:
          "Ebook digital em PDF com 50 páginas de desenhos bíblicos para colorir e atividades para crianças. Pronto para imprimir. Por apenas R$ 14,90.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setShown(true),
      { threshold: 0.12 },
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

function BuyButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={KIWIFY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-toy font-display inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center text-lg font-extrabold leading-tight sm:text-xl ${className}`}
    >
      {children}
    </a>
  );
}

function Price({ big = false }: { big?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-base font-bold text-muted-foreground line-through">De R$ 29,90</p>
      <p
        className={`font-display font-extrabold leading-none text-primary ${
          big ? "text-6xl sm:text-7xl" : "text-5xl sm:text-6xl"
        }`}
      >
        R$ 14,90
      </p>
      <p className="text-sm font-bold text-navy/70">Pagamento único. Não é assinatura.</p>
    </div>
  );
}

const paginas = [
  { src: "/images/capa.webp", label: "Capa do ebook" },
  { src: "/images/pag1.webp", label: "Página: A Criação" },
  { src: "/images/pag2.webp", label: "Página: Caça-palavras da Criação" },
  { src: "/images/pag3.webp", label: "Página: Noé e a Arca" },
  { src: "/images/verso.webp", label: "Contracapa do ebook" },
];

const noSave = {
  onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  onDragStart: (e: React.DragEvent) => e.preventDefault(),
};

function Galeria() {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
      {paginas.map((p, i) => (
        <div
          key={p.src}
          {...noSave}
          className="book-page card-toy w-[80vw] max-w-[340px] shrink-0 snap-center overflow-hidden rounded-3xl md:w-auto md:max-w-none"
        >
          <div
            role="img"
            aria-label={p.label}
            className="aspect-[1035/1500] w-full bg-card"
            style={{
              backgroundImage: `url("${p.src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <p className="px-3 py-3 text-center text-sm font-bold text-navy/70">
            {i + 1}. {p.label}
          </p>
        </div>
      ))}
    </div>
  );
}

const beneficiosHero = [
  "50 páginas",
  "Desenhos fáceis de colorir",
  "Atividades bíblicas infantis",
  "Arquivo PDF pronto para imprimir",
  "Acesso digital após a compra",
];

const avaliacoes = [
  {
    nome: "Marina S.",
    texto:
      "Comprei o PDF pra minha filha de 6 anos e ela amou! Fica horas colorindo as histórias da Bíblia. Já imprimi várias páginas.",
    estrelas: 5,
  },
  {
    nome: "Pastor João",
    texto:
      "Uso no ministério infantil da igreja. As crianças aprendem versículos enquanto colorem. Material muito bem feito!",
    estrelas: 5,
  },
  {
    nome: "Fernanda L.",
    texto:
      "Chegou rápido o acesso depois da compra. Meu filho adorou a página de Noé e a arca. Recomendo demais pra quem quer tirar do celular.",
    estrelas: 5,
  },
  {
    nome: "Profª Carla",
    texto:
      "Sou professora da escolinha bíblica e esse ebook salvou minhas aulas. 50 páginas com desenhos fáceis e atividades. Valeu cada centavo.",
    estrelas: 5,
  },
  {
    nome: "Rafael M.",
    texto:
      "Comprei pra fazer atividade em casa com o caçula. Ele colori e ainda aprende a história. Imprimo conforme vamos usando. Top demais!",
    estrelas: 5,
  },
  {
    nome: "Patrícia R.",
    texto:
      "Melhor compra! O PDF tem 50 páginas lindas e meu sobrinho ficou encantado com os desenhos da Criação. Já indiquei pra todas as mães.",
    estrelas: 5,
  },
  {
    nome: "Diego T.",
    texto:
      "Prático e barato. Paguei, recebi o acesso e imprimi na hora. As crianças colorindo e aprendendo a Palavra ao mesmo tempo. Show!",
    estrelas: 5,
  },
  {
    nome: "Aline F.",
    texto:
      "Adorei a qualidade dos desenhos, traços grandes e fáceis das crianças colorirem. Minha filha pede pra fazer todo dia. Compra certa!",
    estrelas: 5,
  },
];

function Estrelas({ n }: { n: number }) {
  return (
    <div className="star-row text-lg" aria-label={`${n} de 5 estrelas`}>
      {"★★★★★".slice(0, n)}
      <span className="opacity-25">{"★★★★★".slice(n)}</span>
    </div>
  );
}

function Avaliacoes() {
  const lista = [...avaliacoes, ...avaliacoes];
  return (
    <div className="overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:w-16" />
      <div className="review-track flex gap-4">
        {lista.map((a, i) => (
          <div
            key={i}
            className="card-toy flex w-[280px] shrink-0 flex-col gap-2 rounded-3xl p-5 sm:w-[340px]"
          >
            <Estrelas n={a.estrelas} />
            <p className="text-sm font-semibold leading-relaxed text-navy/85">
              "{a.texto}"
            </p>
            <p className="font-display mt-1 text-base font-extrabold text-primary">
              {a.nome} <span className="text-xs font-bold text-grass">✓ Compra verificada</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const valores = [
  { i: "🎨", t: "Estimula a criatividade" },
  { i: "✏️", t: "Ajuda na coordenação e concentração" },
  { i: "📖", t: "Aproxima a criança das histórias bíblicas" },
  { i: "❤️", t: "Ensina valores como amor, bondade, empatia e fé" },
  { i: "🖨️", t: "Basta imprimir e começar" },
];

const publico = [
  { i: "👨‍👩‍👧", t: "Pais e mães" },
  { i: "⛪", t: "Ministério infantil" },
  { i: "📖", t: "Escola bíblica" },
  { i: "👩‍🏫", t: "Professores e educadores" },
  { i: "🎁", t: "Presente para crianças" },
  { i: "🏠", t: "Atividades para fazer em casa" },
];

const recebe = [
  { i: "📖", t: "Ebook digital com 50 páginas" },
  { i: "🎨", t: "Desenhos bíblicos infantis para colorir" },
  { i: "✏️", t: "Atividades educativas" },
  { i: "❤️", t: "Mensagens sobre fé, amor, bondade e empatia" },
  { i: "📥", t: "Arquivo digital em PDF" },
  { i: "🖨️", t: "Pronto para imprimir" },
];

const passos = [
  { n: "1", t: "Faça sua compra", d: "Clique no botão e finalize o pagamento pela Kiwify." },
  { n: "2", t: "Receba seu ebook", d: "Após a confirmação, você recebe acesso ao arquivo digital." },
  { n: "3", t: "Imprima e divirta-se", d: "Escolha as páginas, imprima e deixe a criança colorir." },
];

const faq = [
  {
    q: "É um livro físico?",
    a: "Não. Minha Aventurinha com a Bíblia é um produto digital em PDF. Você recebe o arquivo e pode imprimir as páginas.",
  },
  { q: "Quantas páginas possui?", a: "O ebook possui 50 páginas." },
  {
    q: "Como recebo o produto?",
    a: "Após a confirmação da compra, o acesso ao produto digital é disponibilizado pela plataforma.",
  },
  {
    q: "Posso imprimir?",
    a: "Sim. O material foi criado para que você possa imprimir e utilizar com a criança.",
  },
  {
    q: "Para qual idade é indicado?",
    a: "O material foi desenvolvido especialmente para crianças, com desenhos simples, traços grandes e atividades fáceis de entender.",
  },
  { q: "É uma assinatura?", a: "Não. O pagamento é feito uma única vez." },
];

function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-4 py-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-extrabold text-navy">
            Ebook 50 páginas
          </p>
          <p className="font-display text-lg font-extrabold leading-none text-primary">R$ 14,90</p>
        </div>
        <a
          href={KIWIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-toy font-display shrink-0 rounded-full px-6 py-3 text-base font-extrabold"
        >
          COMPRAR
        </a>
      </div>
    </div>
  );
}

function Nav() {
  const linkCls =
    "whitespace-nowrap rounded-full px-3 py-2 text-sm font-extrabold text-navy/80 transition-colors hover:bg-accent hover:text-accent-foreground";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2.5 sm:px-5">
        <a
          href="#top"
          className="font-display mr-auto hidden shrink-0 text-base font-extrabold text-primary sm:block"
        >
          Minha Aventurinha 📖
        </a>
        <nav
          className="flex w-full items-center gap-1 overflow-x-auto sm:w-auto"
          aria-label="Navegação principal"
        >
          <a href="#paginas" className={linkCls}>
            Páginas do ebook
          </a>
          <a href="#incluido" className={linkCls}>
            O que está incluso
          </a>
          <a href="#como-funciona" className={linkCls}>
            Como funciona
          </a>
          <a
            href={KIWIFY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-toy shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold"
          >
            Comprar R$14,90
          </a>
        </nav>
      </div>
    </header>
  );
}

function Index() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-background pb-24 text-navy md:pb-0">
      <Nav />
      {/* HERO */}
      <section id="top" className="sky-bg px-5 pt-10 pb-14">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="text-center md:text-left">
            <h1 className="font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
              50 PÁGINAS DE DIVERSÃO COM A BÍBLIA 🎨📖
            </h1>
            <p className="mt-4 text-lg font-semibold text-navy/80">
              Um livro infantil em PDF com desenhos para colorir e atividades bíblicas para as
              crianças aprenderem enquanto se divertem.
            </p>

            <ul className="mx-auto mt-6 max-w-md space-y-2 text-left md:mx-0">
              {beneficiosHero.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base font-bold">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-sm text-accent-foreground">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div {...noSave} className="mx-auto w-full max-w-[330px]">
            <div className="book-page card-toy overflow-hidden rounded-3xl">
              <div
                role="img"
                aria-label="Capa do ebook Minha Aventurinha com a Bíblia"
                className="aspect-[1035/1500] w-full"
                style={{
                  backgroundImage: 'url("/images/capa.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mx-auto max-w-md text-center">
              <Price big />
              <BuyButton className="mt-5">QUERO MEU LIVRO BÍBLICO 📖</BuyButton>
              <p className="mt-3 text-sm font-bold text-navy/70">
                🔒 Compra segura pela Kiwify • 📥 Produto digital • 🖨️ Pronto para imprimir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="paginas" className="scroll-mt-16 bg-card px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold sm:text-3xl">
              VEJA ALGUMAS PÁGINAS DO EBOOK 👇
            </h2>
          </Reveal>
          <div className="mt-8">
            <Galeria />
          </div>
          <p className="mt-4 text-center text-base font-semibold text-navy/80">
            E isso é apenas uma amostra. O livro completo possui 50 páginas para a criança colorir,
            aprender e se divertir.
          </p>
          <div className="mx-auto mt-7 max-w-md">
            <BuyButton>QUERO AS 50 PÁGINAS</BuyButton>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-background px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold sm:text-3xl">
              MENOS TELA. MAIS CRIATIVIDADE, APRENDIZADO E FÉ. ❤️
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base font-semibold text-navy/80">
              Uma atividade simples e divertida para criar momentos especiais com as crianças
              enquanto elas conhecem valores e histórias inspiradas na Bíblia.
            </p>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {valores.map((v, i) => (
              <Reveal key={v.t} delay={i * 60}>
                <div className="card-toy flex h-full items-center gap-4 rounded-3xl p-5">
                  <span className="text-3xl">{v.i}</span>
                  <p className="font-display text-lg font-extrabold leading-snug">{v.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="bg-card px-5 py-14">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold sm:text-3xl">
              PERFEITO PARA QUEM QUER ENSINAR DE UM JEITO DIVERTIDO
            </h2>
          </Reveal>
          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {publico.map((p) => (
              <div
                key={p.t}
                className="rounded-3xl bg-secondary px-4 py-6 text-center text-secondary-foreground"
              >
                <div className="text-3xl">{p.i}</div>
                <p className="font-display mt-2 text-base font-extrabold">{p.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section id="incluido" className="sky-bg scroll-mt-16 px-5 py-14">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="card-toy rounded-[2rem] p-6 text-center sm:p-10">
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                O QUE VOCÊ RECEBE HOJE
              </h2>
              <ul className="mx-auto mt-7 max-w-md space-y-3 text-left">
                {recebe.map((r) => (
                  <li key={r.t} className="flex items-start gap-3 text-base font-bold">
                    <span className="text-xl">{r.i}</span>
                    {r.t}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Price big />
              </div>
              <BuyButton className="mt-6">SIM, QUERO GARANTIR O MEU</BuyButton>
              <p className="mt-3 text-sm font-bold text-navy/70">
                Pagamento único • Produto digital • Acesso após a compra
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="scroll-mt-16 bg-background px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold sm:text-3xl">
              É MUITO SIMPLES
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {passos.map((p) => (
              <div key={p.n} className="card-toy rounded-3xl p-6 text-center">
                <div className="font-display mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-primary-foreground">
                  {p.n}
                </div>
                <h3 className="font-display mt-4 text-xl font-extrabold">{p.t}</h3>
                <p className="mt-2 font-semibold text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-7 max-w-2xl rounded-2xl bg-sun/40 p-4 text-center text-base font-bold">
            📥 Este é um produto 100% digital. Nada será enviado pelos Correios.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card px-5 py-14">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold sm:text-3xl">
              PERGUNTAS FREQUENTES
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {faq.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border-2 border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-extrabold"
                >
                  {f.q}
                  <span className="shrink-0 text-xl">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && (
                  <p className="px-5 pb-5 text-base font-semibold text-muted-foreground">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="sky-bg px-5 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            TRANSFORME O MOMENTO DE COLORIR EM UM MOMENTO DE APRENDIZADO ❤️
          </h2>
          <p className="mt-4 text-base font-semibold text-navy/80">
            São 50 páginas para criar momentos divertidos, educativos e especiais com as crianças.
          </p>
          <div className="mt-8">
            <Price big />
          </div>
          <div className="mx-auto mt-6 max-w-md">
            <BuyButton>QUERO MINHA AVENTURINHA COM A BÍBLIA</BuyButton>
          </div>
          <p className="mt-3 text-sm font-bold text-navy/70">
            🔒 Compra segura • 📥 Produto digital • 🖨️ PDF para imprimir
          </p>
        </div>
      </section>

      <footer className="bg-navy px-5 py-8 text-center">
        <p className="font-display text-lg font-extrabold text-secondary">
          Minha Aventurinha com a Bíblia
        </p>
        <p className="mt-2 text-sm font-semibold text-card/70">
          © {new Date().getFullYear()} • Produto digital em PDF • minhaaventurinha.shop
        </p>
      </footer>

      <StickyBar />
    </main>
  );
}
